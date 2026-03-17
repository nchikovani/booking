import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

const SKIP_TRANSFORM_KEY = 'skipTransform';

export const SkipTransform = () => (target: object, key?: string | symbol) => {
  if (key) {
    Reflect.defineMetadata(SKIP_TRANSFORM_KEY, true, target, key);
  } else {
    Reflect.defineMetadata(SKIP_TRANSFORM_KEY, true, target);
  }
};

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const skipTransform =
      this.reflector.getAllAndOverride<boolean>(SKIP_TRANSFORM_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? false;

    if (skipTransform) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const path = request.url ?? request.path ?? '';

    if (path.includes('/health') || path.includes('/swagger') || path.includes('/swagger-json')) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        data,
      })),
    );
  }
}
