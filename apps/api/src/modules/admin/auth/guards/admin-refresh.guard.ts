import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AppException } from '../../../../common/errors/app.exception';
import { ErrorCode } from '../../../../common/errors/error-codes';
import { AppConfigService } from '../../../../config/app-config.service';

interface JwtPayload {
  sub: string;
  type: string;
  jti?: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AdminRefreshGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: AppConfigService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const cookieName = this.config.get('auth.cookieName', 'refreshToken');
    const token = request.cookies?.[cookieName];

    if (!token) {
      throw AppException.create(ErrorCode.REFRESH_TOKEN_EXPIRED);
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      if (payload.type !== 'refresh') {
        throw AppException.create(ErrorCode.UNAUTHORIZED);
      }
      (request as Request & { refreshPayload: JwtPayload }).refreshPayload = payload;
      return true;
    } catch {
      throw AppException.create(ErrorCode.REFRESH_TOKEN_EXPIRED);
    }
  }
}
