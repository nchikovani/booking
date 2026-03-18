import { Inject, Injectable } from '@nestjs/common';
import { PRISMA } from '../prisma/prisma.module';
import type { Prisma, PrismaClient } from '@repo/prisma';

type TransactionClient = Prisma.TransactionClient;
import { parseTimeToMinutes } from '../../common/utils/time.util';
import type { ScheduleDto } from './dto/schedule.dto';

const employeeScheduleInclude = {
  days: {
    include: { breaks: true },
    orderBy: { dayOfWeek: 'asc' as const },
  },
  scheduleTemplate: {
    include: {
      days: {
        include: { breaks: true },
        orderBy: { dayOfWeek: 'asc' as const },
      },
    },
  },
} as const;

export interface EmployeeScheduleWithDetails {
  id: string;
  employeeId: string;
  scheduleTemplateId: string | null;
  createdAt: Date;
  updatedAt: Date;
  days: Array<{
    id: string;
    dayOfWeek: number;
    startTimeMinutes: number;
    endTimeMinutes: number;
    breaks: Array<{
      id: string;
      startTimeMinutes: number;
      endTimeMinutes: number;
    }>;
  }>;
  scheduleTemplate: {
    id: string;
    name: string;
    days: Array<{
      id: string;
      dayOfWeek: number;
      startTimeMinutes: number;
      endTimeMinutes: number;
      breaks: Array<{
        id: string;
        startTimeMinutes: number;
        endTimeMinutes: number;
      }>;
    }>;
  } | null;
}

@Injectable()
export class EmployeeScheduleRepository {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  async findByEmployeeId(employeeId: string): Promise<EmployeeScheduleWithDetails | null> {
    const schedule = await this.prisma.employeeSchedule.findUnique({
      where: { employeeId },
      include: employeeScheduleInclude,
    });
    return schedule as EmployeeScheduleWithDetails | null;
  }

  async syncSchedule(
    employeeId: string,
    schedule: ScheduleDto | null,
    tx?: TransactionClient,
  ): Promise<void> {
    const run = async (client: TransactionClient) => {
      const existing = await client.employeeSchedule.findUnique({
        where: { employeeId },
      });

      if (schedule === null) {
        if (existing) {
          await client.employeeSchedule.delete({ where: { employeeId } });
        }
        return;
      }

      if (schedule.scheduleTemplateId) {
        if (existing) {
          await client.employeeScheduleDayBreak.deleteMany({
            where: {
              employeeScheduleDay: { employeeScheduleId: existing.id },
            },
          });
          await client.employeeScheduleDay.deleteMany({
            where: { employeeScheduleId: existing.id },
          });
          await client.employeeSchedule.update({
            where: { employeeId },
            data: { scheduleTemplateId: schedule.scheduleTemplateId },
          });
        } else {
          await client.employeeSchedule.create({
            data: {
              employeeId,
              scheduleTemplateId: schedule.scheduleTemplateId,
            },
          });
        }
        return;
      }

      if (schedule.days !== undefined) {
        let scheduleId: string;
        if (existing) {
          await client.employeeScheduleDayBreak.deleteMany({
            where: {
              employeeScheduleDay: { employeeScheduleId: existing.id },
            },
          });
          await client.employeeScheduleDay.deleteMany({
            where: { employeeScheduleId: existing.id },
          });
          await client.employeeSchedule.update({
            where: { employeeId },
            data: { scheduleTemplateId: null },
          });
          scheduleId = existing.id;
        } else {
          const created = await client.employeeSchedule.create({
            data: { employeeId, scheduleTemplateId: null },
          });
          scheduleId = created.id;
        }

        for (const day of schedule.days) {
          const startMinutes = parseTimeToMinutes(day.startTime);
          const endMinutes = parseTimeToMinutes(day.endTime);
          if (startMinutes === null || endMinutes === null) continue;

          const createdDay = await client.employeeScheduleDay.create({
            data: {
              employeeScheduleId: scheduleId,
              dayOfWeek: day.dayOfWeek,
              startTimeMinutes: startMinutes,
              endTimeMinutes: endMinutes,
            },
          });

          for (const b of day.breaks ?? []) {
            const bStart = parseTimeToMinutes(b.startTime);
            const bEnd = parseTimeToMinutes(b.endTime);
            if (bStart !== null && bEnd !== null) {
              await client.employeeScheduleDayBreak.create({
                data: {
                  employeeScheduleDayId: createdDay.id,
                  startTimeMinutes: bStart,
                  endTimeMinutes: bEnd,
                },
              });
            }
          }
        }
      }
    };

    if (tx) {
      await run(tx);
    } else {
      await this.prisma.$transaction(run);
    }
  }
}
