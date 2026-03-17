import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
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
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppException } from '../../../common/errors/app.exception';
import { ErrorCode } from '../../../common/errors/error-codes';
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { BusinessService } from '../../business/business.service';
import { EmployeeService } from '../../employee/employee.service';
import { CreateEmployeeDto } from '../../employee/dto/create-employee.dto';
import { UpdateEmployeeDto } from '../../employee/dto/update-employee.dto';
import { EmployeeListQueryDto } from '../../employee/dto/employee-list-query.dto';
import { EmployeeResponseDto } from '../../employee/dto/employee-response.dto';

@ApiTags('Admin Employees')
@Controller('admin/businesses/:businessId/employees')
@UseGuards(AdminAuthGuard)
@ApiBearerAuth()
export class AdminEmployeeController {
  constructor(
    private readonly businessService: BusinessService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Список сотрудников' })
  @ApiParam({ name: 'businessId' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: ['name', '-name'] })
  @ApiResponse({ status: 200, description: 'Список сотрудников', type: [EmployeeResponseDto] })
  @ApiResponse({ status: 404, description: 'Нет доступа' })
  async list(
    @Param('businessId', ParseUUIDPipe) businessId: string,
    @Query() query: EmployeeListQueryDto,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.employeeService.findByBusinessId(businessId, query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Создание сотрудника' })
  @ApiParam({ name: 'businessId' })
  @ApiBody({ type: CreateEmployeeDto })
  @ApiResponse({ status: 201, description: 'Сотрудник создан', type: EmployeeResponseDto })
  @ApiResponse({ status: 404, description: 'Нет доступа или услуга не найдена' })
  async create(
    @Param('businessId', ParseUUIDPipe) businessId: string,
    @Body() dto: CreateEmployeeDto,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.employeeService.create(businessId, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение сотрудника' })
  @ApiParam({ name: 'businessId' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Данные сотрудника', type: EmployeeResponseDto })
  @ApiResponse({ status: 404, description: 'Не найден' })
  async get(
    @Param('businessId', ParseUUIDPipe) businessId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.employeeService.findById(id, businessId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление сотрудника' })
  @ApiParam({ name: 'businessId' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateEmployeeDto })
  @ApiResponse({ status: 200, description: 'Сотрудник обновлён', type: EmployeeResponseDto })
  @ApiResponse({ status: 404, description: 'Не найден' })
  async update(
    @Param('businessId', ParseUUIDPipe) businessId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEmployeeDto,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.employeeService.update(id, businessId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление сотрудника' })
  @ApiParam({ name: 'businessId' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Сотрудник удалён' })
  @ApiResponse({ status: 404, description: 'Не найден' })
  async delete(
    @Param('businessId', ParseUUIDPipe) businessId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.employeeService.delete(id, businessId);
  }

  @Post(':id/photo')
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
  @ApiOperation({ summary: 'Загрузка фото сотрудника' })
  @ApiParam({ name: 'businessId' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'URL загруженного фото' })
  @ApiResponse({ status: 404, description: 'Не найден' })
  async uploadPhoto(
    @Param('businessId', ParseUUIDPipe) businessId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('adminUserId') adminUserId: string,
    @UploadedFile() file: Express.Multer.File | undefined,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    if (!file?.buffer) throw AppException.create(ErrorCode.VALIDATION_FAILED, 'File is required');
    return this.employeeService.uploadPhoto(id, businessId, file.buffer);
  }

  @Delete(':id/photo')
  @ApiOperation({ summary: 'Удаление фото сотрудника' })
  @ApiParam({ name: 'businessId' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Фото удалено' })
  @ApiResponse({ status: 404, description: 'Не найден' })
  async deletePhoto(
    @Param('businessId', ParseUUIDPipe) businessId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    await this.employeeService.deletePhoto(id, businessId);
    return null;
  }
}
