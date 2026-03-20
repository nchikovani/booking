import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import type { Request } from 'express';
import { RedisService } from '@nestjs-labs/nestjs-ioredis';
import { AppException } from '../../../../common/errors/app.exception';
import { ErrorCode } from '../../../../common/errors/error-codes';
import { AppConfigService } from '../../../../config/app-config.service';

const EMAIL_KEY_PREFIX = 'auth:rate:email:';
const IP_KEY_PREFIX = 'auth:rate:ip:';

/**
 * Interceptor для rate limiting auth-эндпоинтов по email и IP.
 * Выполняется ПОСЛЕ ValidationPipe, поэтому не засчитывает ошибки валидации DTO
 * (например, слабый пароль) — счётчики инкрементируются, но при BadRequestException откатываются.
 * Лимиты читаются из конфига (auth.rateLimit.limit / auth.rateLimit.ttl).
 */
@Injectable()
export class AuthRateLimitInterceptor implements NestInterceptor {
  constructor(
    private readonly redis: RedisService,
    private readonly config: AppConfigService,
  ) { }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest<Request>();
    const email = this.extractEmail(request);
    const ip = this.extractIp(request);

    if (!email && !ip) return next.handle();

    const limit = this.config.get('auth.rateLimit.limit', 5);
    const ttlMs = this.config.get('auth.rateLimit.ttl', 900_000);
    const ttlSec = Math.ceil(ttlMs / 1000);

    const emailKey = email ? `${EMAIL_KEY_PREFIX}${email.trim().toLowerCase()}` : null;
    const ipKey = ip ? `${IP_KEY_PREFIX}${ip}` : null;

    const incrementedKeys: string[] = [];

    try {
      const redisClient = this.redis.getOrThrow();

      for (const key of [emailKey, ipKey]) {
        if (!key) continue;
        const count = await redisClient.incr(key);
        incrementedKeys.push(key);
        if (count === 1) await redisClient.expire(key, ttlSec);

        if (count > limit) {
          // Откатываем все инкременты этого запроса
          await Promise.all(incrementedKeys.map((k) => redisClient.decr(k)));
          throw AppException.create(ErrorCode.RATE_LIMIT_EXCEEDED);
        }
      }
    } catch (e) {
      if (e instanceof AppException) throw e;
      // Redis недоступен — пропускаем запрос
      return next.handle();
    }

    return next.handle().pipe(
      catchError((err) => {
        // Ошибки валидации DTO (400) не являются попытками взлома — откатываем счётчики
        if (err instanceof BadRequestException) {
          void this.tryDecrementAll(incrementedKeys);
        }
        return throwError(() => err);
      }),
    );
  }

  private extractEmail(req: Request): string | undefined {
    const body = req.body as Record<string, unknown>;
    if (!body || typeof body !== 'object') return undefined;
    const email = body.email;
    return typeof email === 'string' ? email : undefined;
  }

  private extractIp(req: Request): string | undefined {
    return req.ip ?? req.socket?.remoteAddress ?? undefined;
  }

  private async tryDecrementAll(keys: string[]): Promise<void> {
    try {
      const redisClient = this.redis.getOrThrow();
      await Promise.all(keys.map((k) => redisClient.decr(k)));
    } catch {
      // best-effort
    }
  }
}
