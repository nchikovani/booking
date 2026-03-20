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
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiWrappedOkResponse,
  ApiWrappedCreatedResponse,
  ApiWrappedErrorResponse,
} from '../../../common/decorators/ApiWrappedResponse';
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { BusinessService } from '../../business/business.service';
import { ServiceService } from '../../service/service.service';
import { CreateServiceDto } from '../../service/dto/create-service.dto';
import { UpdateServiceDto } from '../../service/dto/update-service.dto';
import { ReorderServiceDto } from '../../service/dto/reorder-service.dto';
import { ServiceListQueryDto } from '../../service/dto/service-list-query.dto';
import { ServiceResponseDto } from '../../service/dto/service-response.dto';

@ApiTags('Admin Services')
@Controller('admin/businesses/:businessId/services')
@UseGuards(AdminAuthGuard)
@ApiBearerAuth()
export class AdminServiceController {
  constructor(
    private readonly businessService: BusinessService,
    private readonly serviceService: ServiceService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Список услуг с пагинацией' })
  @ApiParam({ name: 'businessId' })
  @ApiQuery({ name: 'cursor', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: ['name', '-name', 'position', '-position'] })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiWrappedOkResponse('Список услуг')
  @ApiWrappedErrorResponse(400, 'INVALID_CURSOR, INVALID_CATEGORY')
  @ApiWrappedErrorResponse(404)
  async list(
    @Param('businessId') businessId: string,
    @Query() query: ServiceListQueryDto,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.serviceService.findPaginated(businessId, query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Создание услуги' })
  @ApiParam({ name: 'businessId' })
  @ApiBody({ type: CreateServiceDto })
  @ApiWrappedCreatedResponse('Услуга создана', ServiceResponseDto)
  @ApiWrappedErrorResponse(404, 'Нет доступа или категория не найдена')
  async create(
    @Param('businessId') businessId: string,
    @Body() dto: CreateServiceDto,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.serviceService.create(businessId, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение услуги' })
  @ApiParam({ name: 'businessId' })
  @ApiParam({ name: 'id' })
  @ApiWrappedOkResponse('Данные услуги', ServiceResponseDto)
  @ApiWrappedErrorResponse(404)
  async get(
    @Param('businessId') businessId: string,
    @Param('id') id: string,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.serviceService.findById(id, businessId);
  }

  @Patch(':id/reorder')
  @ApiOperation({ summary: 'Изменение позиции услуги' })
  @ApiParam({ name: 'businessId' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: ReorderServiceDto })
  @ApiWrappedOkResponse('Позиция обновлена', ServiceResponseDto)
  @ApiWrappedErrorResponse(404)
  async reorder(
    @Param('businessId') businessId: string,
    @Param('id') id: string,
    @Body() dto: ReorderServiceDto,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.serviceService.reorder(id, businessId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление услуги' })
  @ApiParam({ name: 'businessId' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateServiceDto })
  @ApiWrappedOkResponse('Услуга обновлена', ServiceResponseDto)
  @ApiWrappedErrorResponse(404)
  async update(
    @Param('businessId') businessId: string,
    @Param('id') id: string,
    @Body() dto: UpdateServiceDto,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.serviceService.update(id, businessId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление услуги' })
  @ApiParam({ name: 'businessId' })
  @ApiParam({ name: 'id' })
  @ApiWrappedOkResponse('Услуга удалена')
  @ApiWrappedErrorResponse(404)
  async delete(
    @Param('businessId') businessId: string,
    @Param('id') id: string,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.serviceService.delete(id, businessId);
  }
}
