import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RedisService } from '@nestjs-labs/nestjs-ioredis';
import { PrismaClient } from '@repo/prisma';
import { InjectMinio } from 'nestjs-minio';
import { Client } from 'minio';
import { PRISMA } from '../prisma/prisma.module';

interface HealthCheckResult {
  status: 'ok' | 'error';
  info?: Record<string, { status: string }>;
  error?: Record<string, { status: string; message?: string }>;
}

@ApiTags('Система')
@Controller('health')
export class HealthController {
  constructor(
    @Inject(PRISMA) private readonly prisma: PrismaClient,
    private readonly redis: RedisService,
    @InjectMinio() private readonly minio: Client,
  ) { }

  @Get()
  async check(): Promise<HealthCheckResult> {
    const results: Record<string, { status: string; message?: string }> = {};
    const statuses: string[] = [];

    const [dbOk, redisOk, minioOk] = await Promise.allSettled([
      this.checkDatabase(),
      this.checkRedis(),
      this.checkMinio(),
    ]);

    results['database'] = dbOk.status === 'fulfilled' ? { status: 'up' } : { status: 'down', message: dbOk.reason?.message };
    results['redis'] = redisOk.status === 'fulfilled' ? { status: 'up' } : { status: 'down', message: redisOk.reason?.message };
    results['minio'] = minioOk.status === 'fulfilled' ? { status: 'up' } : { status: 'down', message: minioOk.reason?.message };

    statuses.push(dbOk.status === 'fulfilled' ? 'up' : 'down');
    statuses.push(redisOk.status === 'fulfilled' ? 'up' : 'down');
    statuses.push(minioOk.status === 'fulfilled' ? 'up' : 'down');

    const overallStatus = statuses.every((s) => s === 'up') ? 'ok' : 'error';

    const response: HealthCheckResult = {
      status: overallStatus,
      info: Object.fromEntries(
        Object.entries(results).filter(([, v]) => v.status === 'up').map(([k, v]) => [k, { status: v.status }]),
      ),
    };

    if (overallStatus === 'error') {
      response.error = Object.fromEntries(
        Object.entries(results).filter(([, v]) => v.status === 'down').map(([k, v]) => [k, { status: v.status, message: v.message }]),
      );
    }

    return response;
  }

  private async checkDatabase(): Promise<void> {
    await this.prisma.$queryRaw`SELECT 1`;
  }

  private async checkRedis(): Promise<void> {
    await this.redis.getOrThrow().ping();
  }

  private async checkMinio(): Promise<void> {
    await this.minio.listBuckets();
  }
}
