import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiWrappedOkResponse,
  ApiWrappedErrorResponse,
} from '../../../common/decorators/ApiWrappedResponse';
import { AppException } from '../../../common/errors/app.exception';
import { ErrorCode } from '../../../common/errors/error-codes';
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { BusinessService } from '../../business/business.service';
import { UpdateBusinessDto } from '../../business/dto/update-business.dto';
import { BusinessResponseDto } from '../../business/dto/business-response.dto';

@ApiTags('Admin Business')
@Controller('admin/businesses')
@UseGuards(AdminAuthGuard)
@ApiBearerAuth()
export class AdminBusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get()
  @ApiOperation({ summary: 'Список бизнесов', description: 'Бизнесы текущего пользователя' })
  @ApiWrappedOkResponse('Список бизнесов')
  async list(@CurrentUser('adminUserId') adminUserId: string) {
    return this.businessService.findByAdminUser(adminUserId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение бизнеса' })
  @ApiParam({ name: 'id' })
  @ApiWrappedOkResponse('Данные бизнеса', BusinessResponseDto)
  @ApiWrappedErrorResponse(404)
  async get(@Param('id') id: string, @CurrentUser('adminUserId') adminUserId: string) {
    const member = await this.businessService.requireBusinessMember(adminUserId, id);
    return this.businessService.toBusinessResponse(member.business);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление бизнеса' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateBusinessDto })
  @ApiWrappedOkResponse('Обновлённый бизнес', BusinessResponseDto)
  @ApiWrappedErrorResponse(404)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBusinessDto,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, id);
    const updated = await this.businessService.update(id, dto);
    return this.businessService.toBusinessResponse(updated);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление бизнеса', description: 'Только для роли OWNER' })
  @ApiParam({ name: 'id' })
  @ApiWrappedOkResponse('Бизнес удалён')
  @ApiWrappedErrorResponse(404)
  async delete(@Param('id') id: string, @CurrentUser('adminUserId') adminUserId: string) {
    await this.businessService.requireBusinessOwner(adminUserId, id);
    await this.businessService.delete(id);
    return null;
  }

  @Post(':id/logo')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 8 * 1024 * 1024 } }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
      required: ['file'],
    },
  })
  @ApiOperation({ summary: 'Загрузка логотипа' })
  @ApiParam({ name: 'id' })
  @ApiWrappedOkResponse('URL загруженного логотипа')
  @ApiWrappedErrorResponse(404)
  async uploadLogo(
    @Param('id') id: string,
    @CurrentUser('adminUserId') adminUserId: string,
    @UploadedFile() file: Express.Multer.File | undefined,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, id);
    if (!file?.buffer) throw AppException.create(ErrorCode.VALIDATION_FAILED, 'File is required');
    return this.businessService.uploadLogo(id, file.buffer);
  }

  @Post(':id/image')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 8 * 1024 * 1024 } }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
      required: ['file'],
    },
  })
  @ApiOperation({ summary: 'Загрузка изображения' })
  @ApiParam({ name: 'id' })
  @ApiWrappedOkResponse('URL загруженного изображения')
  @ApiWrappedErrorResponse(404)
  async uploadImage(
    @Param('id') id: string,
    @CurrentUser('adminUserId') adminUserId: string,
    @UploadedFile() file: Express.Multer.File | undefined,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, id);
    if (!file?.buffer) throw AppException.create(ErrorCode.VALIDATION_FAILED, 'File is required');
    return this.businessService.uploadImage(id, file.buffer);
  }

  @Delete(':id/logo')
  @ApiOperation({ summary: 'Удаление логотипа' })
  @ApiParam({ name: 'id' })
  @ApiWrappedOkResponse('Логотип удалён')
  @ApiWrappedErrorResponse(404)
  async deleteLogo(@Param('id') id: string, @CurrentUser('adminUserId') adminUserId: string) {
    await this.businessService.requireBusinessMember(adminUserId, id);
    await this.businessService.deleteLogo(id);
    return {};
  }

  @Delete(':id/image')
  @ApiOperation({ summary: 'Удаление изображения' })
  @ApiParam({ name: 'id' })
  @ApiWrappedOkResponse('Изображение удалено')
  @ApiWrappedErrorResponse(404)
  async deleteImage(@Param('id') id: string, @CurrentUser('adminUserId') adminUserId: string) {
    await this.businessService.requireBusinessMember(adminUserId, id);
    await this.businessService.deleteImage(id);
    return {};
  }
}
