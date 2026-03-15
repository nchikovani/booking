import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AppException } from '../../../../common/errors/app.exception';
import { ErrorCode } from '../../../../common/errors/error-codes';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

interface JwtPayload {
  sub: string;
  type: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      throw AppException.create(ErrorCode.UNAUTHORIZED);
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      if (payload.type !== 'access') {
        throw AppException.create(ErrorCode.UNAUTHORIZED);
      }
      (request as Request & { user: { adminUserId: string } }).user = {
        adminUserId: payload.sub,
      };
      return true;
    } catch {
      throw AppException.create(ErrorCode.UNAUTHORIZED);
    }
  }
}
