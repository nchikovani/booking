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
import { ScheduleTemplateService } from '../../schedule-template/schedule-template.service';
import { CreateScheduleTemplateDto } from '../../schedule-template/dto/create-schedule-template.dto';
import { UpdateScheduleTemplateDto } from '../../schedule-template/dto/update-schedule-template.dto';
import { ScheduleTemplateResponseDto } from '../../schedule-template/dto/schedule-template-response.dto';

@ApiTags('Admin Schedule Templates')
@Controller('admin/businesses/:businessId/schedule-templates')
@UseGuards(AdminAuthGuard)
@ApiBearerAuth()
export class AdminScheduleTemplateController {
  constructor(
    private readonly businessService: BusinessService,
    private readonly scheduleTemplateService: ScheduleTemplateService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Список шаблонов графика' })
  @ApiParam({ name: 'businessId' })
  @ApiWrappedOkResponse('Список шаблонов', ScheduleTemplateResponseDto, { isArray: true })
  @ApiWrappedErrorResponse(404)
  async list(
    @Param('businessId', ParseUUIDPipe) businessId: string,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.scheduleTemplateService.findByBusinessId(businessId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Создание шаблона графика' })
  @ApiParam({ name: 'businessId' })
  @ApiBody({ type: CreateScheduleTemplateDto })
  @ApiWrappedCreatedResponse('Шаблон создан', ScheduleTemplateResponseDto)
  @ApiWrappedErrorResponse(400)
  @ApiWrappedErrorResponse(404)
  async create(
    @Param('businessId', ParseUUIDPipe) businessId: string,
    @Body() dto: CreateScheduleTemplateDto,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.scheduleTemplateService.create(businessId, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение шаблона графика' })
  @ApiParam({ name: 'businessId' })
  @ApiParam({ name: 'id' })
  @ApiWrappedOkResponse('Данные шаблона', ScheduleTemplateResponseDto)
  @ApiWrappedErrorResponse(404)
  async get(
    @Param('businessId', ParseUUIDPipe) businessId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.scheduleTemplateService.findById(id, businessId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление шаблона графика' })
  @ApiParam({ name: 'businessId' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateScheduleTemplateDto })
  @ApiWrappedOkResponse('Шаблон обновлён', ScheduleTemplateResponseDto)
  @ApiWrappedErrorResponse(400, 'Ошибка валидации (в т.ч. days: [])')
  @ApiWrappedErrorResponse(404)
  async update(
    @Param('businessId', ParseUUIDPipe) businessId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateScheduleTemplateDto,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.scheduleTemplateService.update(id, businessId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление шаблона графика' })
  @ApiParam({ name: 'businessId' })
  @ApiParam({ name: 'id' })
  @ApiWrappedOkResponse('Шаблон удалён')
  @ApiWrappedErrorResponse(404)
  async delete(
    @Param('businessId', ParseUUIDPipe) businessId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('adminUserId') adminUserId: string,
  ) {
    await this.businessService.requireBusinessMember(adminUserId, businessId);
    return this.scheduleTemplateService.delete(id, businessId);
  }
}
