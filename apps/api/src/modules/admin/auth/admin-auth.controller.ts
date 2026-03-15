import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import type * as express from 'express';
import { Throttle } from '@nestjs/throttler';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AdminRefreshGuard } from './guards/admin-refresh.guard';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthResponseDto, AuthUserDto, MessageResponseDto } from './dto/auth-response.dto';
import { AppConfigService } from '../../../config/app-config.service';
import { parseExpiresToSeconds } from './utils/parse-expires';

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
  @Throttle({ default: { limit: 5, ttl: 900000 } })
  @ApiOperation({
    summary: 'Регистрация',
    description: 'Создание учётной записи администратора. Refresh token устанавливается в HttpOnly cookie.',
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Успешная регистрация', type: AuthResponseDto })
  @ApiResponse({ status: 400, description: 'Ошибка валидации' })
  @ApiResponse({ status: 409, description: 'Email уже зарегистрирован' })
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
  @Throttle({ default: { limit: 5, ttl: 900000 } })
  @ApiOperation({
    summary: 'Вход',
    description: 'Аутентификация по email и паролю. Refresh token устанавливается в HttpOnly cookie.',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Успешный вход', type: AuthResponseDto })
  @ApiResponse({ status: 400, description: 'Ошибка валидации' })
  @ApiResponse({ status: 401, description: 'Неверный email или пароль' })
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

  @UseGuards(AdminRefreshGuard)
  @Post('refresh')
  @ApiCookieAuth('refreshToken')
  @ApiOperation({
    summary: 'Обновление токена',
    description: 'Обновление access token по refresh token из cookie. Выдаётся новая пара токенов.',
  })
  @ApiResponse({ status: 200, description: 'Токены обновлены', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Refresh token отсутствует, истёк или отозван' })
  async refresh(@Req() req: express.Request, @Res({ passthrough: true }) res: express.Response) {
    const payload = (req as express.Request & { refreshPayload: { sub: string } }).refreshPayload;
    const result = await this.authService.refresh(payload.sub, req);
    this.setRefreshCookie(res, result.refreshToken);
    return { user: result.user, accessToken: result.accessToken, expiresIn: result.expiresIn };
  }

  @UseGuards(AdminRefreshGuard)
  @Post('logout')
  @ApiCookieAuth('refreshToken')
  @ApiOperation({
    summary: 'Выход',
    description: 'Инвалидация текущей сессии. Требуется refresh token в cookie.',
  })
  @ApiResponse({ status: 200, description: 'Успешный выход' })
  @ApiResponse({ status: 401, description: 'Refresh cookie отсутствует' })
  async logout(@Req() req: express.Request, @Res({ passthrough: true }) res: express.Response) {
    const payload = (req as express.Request & { refreshPayload: { sub: string; jti?: string } }).refreshPayload;
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
  @ApiResponse({ status: 200, description: 'Данные пользователя', type: AuthUserDto })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  async me(@CurrentUser('adminUserId') adminUserId: string) {
    return this.authService.me(adminUserId);
  }

  @Public()
  @Post('forgot-password')
  @Throttle({ default: { limit: 5, ttl: 900000 } })
  @ApiOperation({
    summary: 'Забытый пароль',
    description:
      'Запрос ссылки для сброса пароля. Ответ всегда 200 — не раскрывает наличие email в системе.',
  })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Запрос обработан',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Если аккаунт существует, на email отправлена ссылка для сброса пароля',
        },
      },
    },
  })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.authService.forgotPassword(dto);
    return {
      message:
        'Если аккаунт существует, на email отправлена ссылка для сброса пароля',
    };
  }

  @Public()
  @Post('reset-password')
  @Throttle({ default: { limit: 5, ttl: 900000 } })
  @ApiOperation({
    summary: 'Сброс пароля',
    description: 'Установка нового пароля по токену из ссылки. Отзывает все сессии пользователя.',
  })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Пароль успешно изменён', type: MessageResponseDto })
  @ApiResponse({ status: 400, description: 'Токен неверный, истёк или уже использован' })
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
