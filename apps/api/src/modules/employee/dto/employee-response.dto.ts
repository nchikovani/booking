import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ServiceLinkResponseDto {
  @ApiProperty()
  serviceId!: string;

  @ApiPropertyOptional()
  priceOverride?: string | null;

  @ApiPropertyOptional()
  durationMinutesOverride?: number | null;
}

export class ScheduleBreakResponseDto {
  @ApiProperty()
  startTime!: string;

  @ApiProperty()
  endTime!: string;
}

export class ScheduleDayResponseDto {
  @ApiProperty()
  dayOfWeek!: number;

  @ApiProperty()
  startTime!: string;

  @ApiProperty()
  endTime!: string;

  @ApiProperty({ type: [ScheduleBreakResponseDto] })
  breaks!: ScheduleBreakResponseDto[];
}

export class ScheduleResponseDto {
  @ApiProperty({ enum: ['template', 'custom'] })
  type!: 'template' | 'custom';

  @ApiPropertyOptional()
  scheduleTemplateId?: string;

  @ApiPropertyOptional()
  scheduleTemplateName?: string;

  @ApiProperty({ type: [ScheduleDayResponseDto] })
  days!: ScheduleDayResponseDto[];
}

export class EmployeeResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  specialization?: string | null;

  @ApiPropertyOptional()
  imageUrl?: string | null;

  @ApiProperty({ type: [ServiceLinkResponseDto] })
  services!: ServiceLinkResponseDto[];

  @ApiPropertyOptional({ type: ScheduleResponseDto, nullable: true })
  schedule?: ScheduleResponseDto | null;

  @ApiProperty()
  createdAt!: string;

  @ApiPropertyOptional()
  updatedAt?: string;
}
