import { UseInterceptors } from '@nestjs/common';
import { AuthRateLimitInterceptor } from '../interceptors/auth-rate-limit.interceptor';

/**
 * Применяет rate limiting по email для auth-эндпоинтов.
 * Ошибки валидации DTO (400) не засчитываются в лимит.
 */
export const AuthRateLimit = (): MethodDecorator => UseInterceptors(AuthRateLimitInterceptor);
