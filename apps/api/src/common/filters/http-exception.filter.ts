import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import type { MulterError } from 'multer';
import { Prisma } from '@repo/prisma';
import { ErrorCode } from '../errors/error-codes';
import { AppException } from '../errors/app.exception';

const PRISMA_ERROR_MAP: Record<string, { status: HttpStatus; code: ErrorCode }> = {
  P2000: { status: HttpStatus.BAD_REQUEST, code: ErrorCode.VALIDATION_FAILED },
  P2002: { status: HttpStatus.CONFLICT, code: ErrorCode.CONFLICT },
  P2025: { status: HttpStatus.NOT_FOUND, code: ErrorCode.NOT_FOUND },
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { statusCode, body } = this.mapException(exception);

    if (statusCode >= 500) {
      const requestId = (request as Request & { id?: string }).id;
      this.logger.error(
        exception instanceof Error ? exception.message : String(exception),
        exception instanceof Error ? exception.stack : undefined,
        { path: request.url, method: request.method, statusCode, requestId },
      );
    }

    response.status(statusCode).json(body);
  }

  private mapException(exception: unknown): {
    statusCode: number;
    body: { status: 'error'; error: { code: string; message: string } };
  } {
    if (exception instanceof AppException) {
      return {
        statusCode: exception.getStatus(),
        body: {
          status: 'error',
          error: {
            code: exception.code,
            message: exception.message,
          },
        },
      };
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();
      const message = this.extractHttpExceptionMessage(res);
      const code = this.statusToErrorCode(status);

      return {
        statusCode: status,
        body: {
          status: 'error',
          error: { code, message },
        },
      };
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const mapped = PRISMA_ERROR_MAP[exception.code];
      const status = mapped?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
      const code = mapped?.code ?? ErrorCode.INTERNAL_ERROR;
      const message = this.getPrismaErrorMessage(exception);

      return {
        statusCode: status,
        body: {
          status: 'error',
          error: { code, message },
        },
      };
    }

    const isProduction = process.env.NODE_ENV === 'production';
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      body: {
        status: 'error',
        error: {
          code: ErrorCode.INTERNAL_ERROR,
          message: isProduction
            ? 'Internal server error'
            : exception instanceof Error
              ? exception.message
              : String(exception),
        },
      },
    };
  }

  private extractHttpExceptionMessage(response: string | object): string {
    if (typeof response === 'string') return response;
    if (typeof response === 'object' && response !== null) {
      const obj = response as Record<string, unknown>;
      if (Array.isArray(obj.message)) {
        return obj.message.join(', ');
      }
      if (typeof obj.message === 'string') return obj.message;
    }
    return 'An error occurred';
  }

  private statusToErrorCode(status: number): string {
    const map: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: ErrorCode.VALIDATION_FAILED,
      [HttpStatus.UNAUTHORIZED]: ErrorCode.UNAUTHORIZED,
      [HttpStatus.FORBIDDEN]: ErrorCode.FORBIDDEN,
      [HttpStatus.NOT_FOUND]: ErrorCode.NOT_FOUND,
      [HttpStatus.CONFLICT]: ErrorCode.CONFLICT,
      [HttpStatus.TOO_MANY_REQUESTS]: ErrorCode.RATE_LIMIT_EXCEEDED,
    };
    return map[status] ?? ErrorCode.INTERNAL_ERROR;
  }

  private getPrismaErrorMessage(error: Prisma.PrismaClientKnownRequestError): string {
    switch (error.code) {
      case 'P2000':
        return 'The provided value is too long for the column';
      case 'P2002':
        return 'A record with this value already exists';
      case 'P2025':
        return 'Record not found';
      default:
        return error.message;
    }
  }
}
