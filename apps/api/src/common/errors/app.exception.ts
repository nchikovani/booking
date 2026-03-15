import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-codes';
import { ERROR_DEFINITIONS } from './error-definitions';

export class AppException extends HttpException {
  constructor(
    statusCode: HttpStatus,
    public readonly code: ErrorCode,
    message: string,
  ) {
    super({ code, message }, statusCode);
  }

  static create(code: ErrorCode, message?: string): AppException {
    const def = ERROR_DEFINITIONS[code];
    return new AppException(def.status, code, message ?? def.message);
  }
}
