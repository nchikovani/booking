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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiResponse({
    status: 200,
    description: 'Список услуг',
    schema: {
      properties: {
        items: { type: 'array', items: { $ref: '#/components/schemas/ServiceResponseDto' } },
        nextCursor: { type: 'string', nullable: true },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'INVALID_CURSOR, INVALID_CATEGORY' })
  @ApiResponse({ status: 404, description: 'Нет доступа' })
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
  @ApiResponse({ status: 201, description: 'Услуга создана', type: ServiceResponseDto })
  @ApiResponse({ status: 404, description: 'Нет доступа или категория не найдена' })
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
  @ApiResponse({ status: 200, description: 'Данные услуги', type: ServiceResponseDto })
  @ApiResponse({ status: 404, description: 'Не найден' })
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
  @ApiResponse({ status: 200, description: 'Позиция обновлена', type: ServiceResponseDto })
  @ApiResponse({ status: 404, description: 'Не найден' })
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
  @ApiResponse({ status: 200, description: 'Услуга обновлена', type: ServiceResponseDto })
  @ApiResponse({ status: 404, description: 'Не найден' })
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
  @ApiResponse({ status: 200, description: 'Услуга удалена' })
  @ApiResponse({ status: 404, description: 'Не найден' })
  async delete(
    @Param('businessId') businessId: string,
    @Param('id') id: string,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.serviceService.delete(id, businessId);
  }
}
