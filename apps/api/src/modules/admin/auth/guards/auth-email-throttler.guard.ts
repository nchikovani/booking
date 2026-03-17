import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RedisService } from '@nestjs-labs/nestjs-ioredis';
import { AppException } from '../../../../common/errors/app.exception';
import { ErrorCode } from '../../../../common/errors/error-codes';
import { AppConfigService } from '../../../../config/app-config.service';

const KEY_PREFIX = 'auth:rate:email:';
const DEFAULT_LIMIT = 5;
const DEFAULT_TTL_MS = 900000; // 15 min

@Injectable()
export class AuthEmailThrottlerGuard implements CanActivate {
  constructor(
    private readonly redis: RedisService,
    private readonly config: AppConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const email = this.extractEmail(request);

    if (!email) return true;

    const normalized = email.trim().toLowerCase();
    const limit = this.config.get('auth.rateLimit.limit', DEFAULT_LIMIT);
    const ttlMs = this.config.get('auth.rateLimit.ttl', DEFAULT_TTL_MS);
    const ttlSec = Math.ceil(ttlMs / 1000);
    const key = `${KEY_PREFIX}${normalized}`;

    try {
      const redis = this.redis.getOrThrow();
      const count = await redis.incr(key);
      if (count === 1) await redis.expire(key, ttlSec);
      if (count > limit) {
        throw AppException.create(ErrorCode.RATE_LIMIT_EXCEEDED);
      }
      return true;
    } catch (e) {
      if (e instanceof AppException) throw e;
      return true;
    }
  }

  private extractEmail(req: Request): string | undefined {
    const body = req.body as Record<string, unknown>;
    if (!body || typeof body !== 'object') return undefined;
    const email = body.email;
    return typeof email === 'string' ? email : undefined;
  }
}
