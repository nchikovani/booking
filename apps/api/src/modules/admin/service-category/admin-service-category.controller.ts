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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  ApiWrappedOkResponse,
  ApiWrappedCreatedResponse,
  ApiWrappedErrorResponse,
} from '../../../common/decorators/ApiWrappedResponse';
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { BusinessService } from '../../business/business.service';
import { ServiceCategoryService } from '../../service-category/service-category.service';
import { CreateServiceCategoryDto } from '../../service-category/dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from '../../service-category/dto/update-service-category.dto';
import { ServiceCategoryResponseDto } from '../../service-category/dto/service-category-response.dto';

@ApiTags('Admin Service Categories')
@Controller('admin/businesses/:businessId/categories')
@UseGuards(AdminAuthGuard)
@ApiBearerAuth()
export class AdminServiceCategoryController {
  constructor(
    private readonly businessService: BusinessService,
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Список категорий услуг' })
  @ApiParam({ name: 'businessId' })
  @ApiWrappedOkResponse('Список категорий', ServiceCategoryResponseDto, { isArray: true })
  @ApiWrappedErrorResponse(404)
  async list(
    @Param('businessId') businessId: string,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.serviceCategoryService.findByBusinessId(businessId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Создание категории' })
  @ApiParam({ name: 'businessId' })
  @ApiBody({ type: CreateServiceCategoryDto })
  @ApiWrappedCreatedResponse('Категория создана', ServiceCategoryResponseDto)
  @ApiWrappedErrorResponse(404)
  @ApiWrappedErrorResponse(409, 'Дубликат имени')
  async create(
    @Param('businessId') businessId: string,
    @Body() dto: CreateServiceCategoryDto,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.serviceCategoryService.create(businessId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление категории' })
  @ApiParam({ name: 'businessId' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateServiceCategoryDto })
  @ApiWrappedOkResponse('Категория обновлена', ServiceCategoryResponseDto)
  @ApiWrappedErrorResponse(404)
  @ApiWrappedErrorResponse(409, 'Дубликат имени')
  async update(
    @Param('businessId') businessId: string,
    @Param('id') id: string,
    @Body() dto: UpdateServiceCategoryDto,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.serviceCategoryService.update(id, businessId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление категории' })
  @ApiParam({ name: 'businessId' })
  @ApiParam({ name: 'id' })
  @ApiWrappedOkResponse('Категория удалена')
  @ApiWrappedErrorResponse(404)
  async delete(
    @Param('businessId') businessId: string,
    @Param('id') id: string,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.serviceCategoryService.delete(id, businessId);
  }
}
