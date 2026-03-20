import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type * as express from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AdminRefreshGuard } from './guards/admin-refresh.guard';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthRateLimit } from './decorators/auth-rate-limit.decorator';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthResponseDto, MeUserDto, MessageResponseDto } from './dto/auth-response.dto';
import { AppConfigService } from '../../../config/app-config.service';
import { parseExpiresToSeconds } from './utils/parse-expires';
import {
  ApiWrappedOkResponse,
  ApiWrappedCreatedResponse,
  ApiWrappedErrorResponse,
} from '../../../common/decorators/ApiWrappedResponse';

@ApiTags('Admin Auth')
@Controller('admin/auth')
@UseGuards(AdminAuthGuard)
export class AdminAuthController {
  constructor(
    private readonly authService: AdminAuthService,
    private readonly config: AppConfigService,
  ) { }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @AuthRateLimit()
  @ApiOperation({
    summary: 'Регистрация',
    description:
      'Создание учётной записи администратора. Refresh token устанавливается в HttpOnly cookie.',
  })
  @ApiBody({ type: RegisterDto })
  @ApiWrappedCreatedResponse('Успешная регистрация', AuthResponseDto)
  @ApiWrappedErrorResponse(400)
  @ApiWrappedErrorResponse(409, 'Email уже зарегистрирован')
  @ApiWrappedErrorResponse(429, 'Превышен лимит попыток для email')
  async register(
    @Body() dto: RegisterDto,
    @Req() req: express.Request,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const deviceInfo = req.headers['user-agent'];
    const result = await this.authService.register(dto, deviceInfo);
    this.setRefreshCookie(res, result.refreshToken);
    return { user: result.user, accessToken: result.accessToken, expiresIn: result.expiresIn };
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @AuthRateLimit()
  @ApiOperation({
    summary: 'Вход',
    description:
      'Аутентификация по email и паролю. Refresh token устанавливается в HttpOnly cookie.',
  })
  @ApiBody({ type: LoginDto })
  @ApiWrappedOkResponse('Успешный вход', AuthResponseDto)
  @ApiWrappedErrorResponse(400)
  @ApiWrappedErrorResponse(401, 'Неверный email или пароль')
  @ApiWrappedErrorResponse(429, 'Превышен лимит попыток для email')
  async login(
    @Body() dto: LoginDto,
    @Req() req: express.Request,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const deviceInfo = req.headers['user-agent'];
    const ipAddress = req.ip ?? req.socket?.remoteAddress;
    const result = await this.authService.login(dto, deviceInfo, ipAddress);
    this.setRefreshCookie(res, result.refreshToken);
    return { user: result.user, accessToken: result.accessToken, expiresIn: result.expiresIn };
  }

  @Public()
  @UseGuards(AdminRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth('refreshToken')
  @ApiOperation({
    summary: 'Обновление токена',
    description: 'Обновление access token по refresh token из cookie. Выдаётся новая пара токенов.',
  })
  @ApiWrappedOkResponse('Токены обновлены', AuthResponseDto)
  @ApiWrappedErrorResponse(401, 'Refresh token отсутствует, истёк или отозван')
  async refresh(@Req() req: express.Request, @Res({ passthrough: true }) res: express.Response) {
    const payload = (req as express.Request & { refreshPayload: { sub: string } }).refreshPayload;
    const result = await this.authService.refresh(payload.sub, req);
    this.setRefreshCookie(res, result.refreshToken);
    return { user: result.user, accessToken: result.accessToken, expiresIn: result.expiresIn };
  }

  @Public()
  @UseGuards(AdminRefreshGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth('refreshToken')
  @ApiOperation({
    summary: 'Выход',
    description: 'Инвалидация текущей сессии. Требуется refresh token в cookie.',
  })
  @ApiWrappedOkResponse('Успешный выход')
  @ApiWrappedErrorResponse(401, 'Refresh cookie отсутствует')
  async logout(@Req() req: express.Request, @Res({ passthrough: true }) res: express.Response) {
    const payload = (req as express.Request & { refreshPayload: { sub: string; jti?: string } })
      .refreshPayload;
    await this.authService.logout(payload, req);
    this.clearRefreshCookie(res);
    return {};
  }

  @UseGuards(AdminAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Текущий пользователь',
    description: 'Получение данных текущего аутентифицированного пользователя.',
  })
  @ApiWrappedOkResponse('Данные пользователя', MeUserDto)
  @ApiWrappedErrorResponse(401)
  async me(@CurrentUser('adminUserId') adminUserId: string) {
    return this.authService.me(adminUserId);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @AuthRateLimit()
  @ApiOperation({
    summary: 'Забытый пароль',
    description:
      'Запрос ссылки для сброса пароля. Ответ всегда 200 — не раскрывает наличие email в системе.',
  })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiWrappedOkResponse('Запрос обработан', MessageResponseDto)
  @ApiWrappedErrorResponse(429, 'Превышен лимит попыток для email')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.authService.forgotPassword(dto);
    return {
      message: 'Если аккаунт существует, на email отправлена ссылка для сброса пароля',
    };
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Сброс пароля',
    description: 'Установка нового пароля по токену из ссылки. Отзывает все сессии пользователя.',
  })
  @ApiBody({ type: ResetPasswordDto })
  @ApiWrappedOkResponse('Пароль успешно изменён', MessageResponseDto)
  @ApiWrappedErrorResponse(400, 'Токен неверный, истёк или уже использован')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto);
    return { message: 'Пароль успешно изменён' };
  }

  private setRefreshCookie(res: express.Response, token: string): void {
    const cookieName = this.config.get('auth.cookieName', 'refreshToken');
    const cookieDomain = this.config.get('auth.cookieDomain', '');
    const isProd = process.env.NODE_ENV === 'production';
    const refreshExpires = this.config.get('jwt.refreshExpires', '7d');
    const maxAge = parseExpiresToSeconds(refreshExpires);

    let cookieValue = `${cookieName}=${token}; Path=/api/v1/admin/auth; HttpOnly; Max-Age=${maxAge}; SameSite=${isProd ? 'Strict' : 'Lax'}`;
    if (isProd) cookieValue += '; Secure';
    if (cookieDomain) cookieValue += `; Domain=${cookieDomain}`;

    res.setHeader('Set-Cookie', cookieValue);
  }

  private clearRefreshCookie(res: express.Response): void {
    const cookieName = this.config.get('auth.cookieName', 'refreshToken');
    const cookieDomain = this.config.get('auth.cookieDomain', '');
    let cookieValue = `${cookieName}=; Path=/api/v1/admin/auth; HttpOnly; Max-Age=0`;
    if (cookieDomain) cookieValue += `; Domain=${cookieDomain}`;
    res.setHeader('Set-Cookie', cookieValue);
  }
}
