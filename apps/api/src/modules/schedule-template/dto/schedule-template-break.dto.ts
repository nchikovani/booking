import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { IsTimeMultipleOf5 } from '../../../common/validators/is-time-multiple-of-five.validator';
import { IsStartTimeBeforeEndTime } from '../../../common/validators/is-start-time-before-end-time.validator';

export class ScheduleTemplateBreakDto {
  @ApiProperty({ example: '13:00', description: 'Начало перерыва HH:mm' })
  @IsString()
  @Matches(/^\d{1,2}:\d{2}$/, { message: 'startTime must be in HH:mm format' })
  @IsTimeMultipleOf5()
  startTime!: string;

  @ApiProperty({ example: '14:00', description: 'Конец перерыва HH:mm' })
  @IsString()
  @Matches(/^\d{1,2}:\d{2}$/, { message: 'endTime must be in HH:mm format' })
  @IsTimeMultipleOf5()
  @IsStartTimeBeforeEndTime()
  endTime!: string;
}
