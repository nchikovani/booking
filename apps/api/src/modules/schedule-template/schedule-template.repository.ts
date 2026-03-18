import { Inject, Injectable } from '@nestjs/common';
import { PRISMA } from '../prisma/prisma.module';
import type { Prisma, PrismaClient } from '@repo/prisma';

type TransactionClient = Prisma.TransactionClient;
import { parseTimeToMinutes } from '../../common/utils/time.util';
import type { ScheduleTemplateDayDto } from './dto/schedule-template-day.dto';

const scheduleTemplateInclude = {
  days: {
    include: {
      breaks: true,
    },
    orderBy: { dayOfWeek: 'asc' as const },
  },
} as const;

export interface ScheduleTemplateWithDays {
  id: string;
  businessId: string;
  name: string;
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
}

@Injectable()
export class ScheduleTemplateRepository {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  async findByBusinessId(businessId: string): Promise<ScheduleTemplateWithDays[]> {
    return this.prisma.scheduleTemplate.findMany({
      where: { businessId },
      include: scheduleTemplateInclude,
      orderBy: { name: 'asc' },
    }) as Promise<ScheduleTemplateWithDays[]>;
  }

  async findById(id: string): Promise<ScheduleTemplateWithDays | null> {
    return this.prisma.scheduleTemplate.findUnique({
      where: { id },
      include: scheduleTemplateInclude,
    }) as Promise<ScheduleTemplateWithDays | null>;
  }

  async findByIdAndBusiness(
    id: string,
    businessId: string,
    tx?: TransactionClient,
  ): Promise<ScheduleTemplateWithDays | null> {
    const client = tx ?? this.prisma;
    const template = await client.scheduleTemplate.findUnique({
      where: { id, businessId },
      include: scheduleTemplateInclude,
    });
    return template as ScheduleTemplateWithDays | null;
  }

  async create(
    businessId: string,
    data: { name: string; days: ScheduleTemplateDayDto[] },
    tx?: TransactionClient,
  ): Promise<ScheduleTemplateWithDays> {
    const run = async (client: TransactionClient) => {
      const template = await client.scheduleTemplate.create({
        data: {
          businessId,
          name: data.name,
        },
      });

      for (const day of data.days) {
        const startMinutes = parseTimeToMinutes(day.startTime);
        const endMinutes = parseTimeToMinutes(day.endTime);
        if (startMinutes === null || endMinutes === null) continue;

        const createdDay = await client.scheduleTemplateDay.create({
          data: {
            scheduleTemplateId: template.id,
            dayOfWeek: day.dayOfWeek,
            startTimeMinutes: startMinutes,
            endTimeMinutes: endMinutes,
          },
        });

        for (const b of day.breaks ?? []) {
          const bStart = parseTimeToMinutes(b.startTime);
          const bEnd = parseTimeToMinutes(b.endTime);
          if (bStart !== null && bEnd !== null) {
            await client.scheduleTemplateDayBreak.create({
              data: {
                scheduleTemplateDayId: createdDay.id,
                startTimeMinutes: bStart,
                endTimeMinutes: bEnd,
              },
            });
          }
        }
      }

      const result = await client.scheduleTemplate.findUnique({
        where: { id: template.id },
        include: scheduleTemplateInclude,
      });
      return result as ScheduleTemplateWithDays;
    };

    if (tx) {
      return run(tx);
    }
    return this.prisma.$transaction(run);
  }

  async update(
    id: string,
    data: { name?: string; days?: ScheduleTemplateDayDto[] },
  ): Promise<ScheduleTemplateWithDays> {
    return this.prisma.$transaction(async (tx) => {
      if (data.name !== undefined) {
        await tx.scheduleTemplate.update({
          where: { id },
          data: { name: data.name },
        });
      }

      if (data.days !== undefined) {
        const existingDays = await tx.scheduleTemplateDay.findMany({
          where: { scheduleTemplateId: id },
          select: { id: true },
        });

        for (const d of existingDays) {
          await tx.scheduleTemplateDayBreak.deleteMany({
            where: { scheduleTemplateDayId: d.id },
          });
        }
        await tx.scheduleTemplateDay.deleteMany({
          where: { scheduleTemplateId: id },
        });

        for (const day of data.days) {
          const startMinutes = parseTimeToMinutes(day.startTime);
          const endMinutes = parseTimeToMinutes(day.endTime);
          if (startMinutes === null || endMinutes === null) continue;

          const createdDay = await tx.scheduleTemplateDay.create({
            data: {
              scheduleTemplateId: id,
              dayOfWeek: day.dayOfWeek,
              startTimeMinutes: startMinutes,
              endTimeMinutes: endMinutes,
            },
          });

          for (const b of day.breaks ?? []) {
            const bStart = parseTimeToMinutes(b.startTime);
            const bEnd = parseTimeToMinutes(b.endTime);
            if (bStart !== null && bEnd !== null) {
              await tx.scheduleTemplateDayBreak.create({
                data: {
                  scheduleTemplateDayId: createdDay.id,
                  startTimeMinutes: bStart,
                  endTimeMinutes: bEnd,
                },
              });
            }
          }
        }
      }

      const result = await tx.scheduleTemplate.findUnique({
        where: { id },
        include: scheduleTemplateInclude,
      });
      return result as ScheduleTemplateWithDays;
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.employeeSchedule.deleteMany({
        where: { scheduleTemplateId: id },
      });
      await tx.scheduleTemplate.delete({
        where: { id },
      });
    });
  }
}
