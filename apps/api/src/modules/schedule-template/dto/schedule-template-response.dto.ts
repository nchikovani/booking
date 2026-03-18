import { ApiProperty } from '@nestjs/swagger';

export class ScheduleTemplateBreakResponseDto {
  @ApiProperty({ example: '13:00' })
  startTime!: string;

  @ApiProperty({ example: '14:00' })
  endTime!: string;
}

export class ScheduleTemplateDayResponseDto {
  @ApiProperty({ example: 1 })
  dayOfWeek!: number;

  @ApiProperty({ example: '09:00' })
  startTime!: string;

  @ApiProperty({ example: '18:00' })
  endTime!: string;

  @ApiProperty({ type: [ScheduleTemplateBreakResponseDto] })
  breaks!: ScheduleTemplateBreakResponseDto[];
}

export class ScheduleTemplateResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ type: [ScheduleTemplateDayResponseDto] })
  days!: ScheduleTemplateDayResponseDto[];

  @ApiProperty()
  createdAt!: string;
}
