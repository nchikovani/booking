import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-codes';

export const ERROR_DEFINITIONS: Record<
  ErrorCode,
  { status: HttpStatus; message: string }
> = {
  [ErrorCode.VALIDATION_FAILED]: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Validation failed',
  },
  [ErrorCode.UNAUTHORIZED]: {
    status: HttpStatus.UNAUTHORIZED,
    message: 'Unauthorized',
  },
  [ErrorCode.FORBIDDEN]: {
    status: HttpStatus.FORBIDDEN,
    message: 'Forbidden',
  },
  [ErrorCode.EMAIL_ALREADY_EXISTS]: {
    status: HttpStatus.CONFLICT,
    message: 'Email already registered',
  },
  [ErrorCode.INVALID_CREDENTIALS]: {
    status: HttpStatus.UNAUTHORIZED,
    message: 'Invalid email or password',
  },
  [ErrorCode.ACCOUNT_LOCKED]: {
    status: HttpStatus.FORBIDDEN,
    message: 'Account is locked',
  },
  [ErrorCode.REFRESH_TOKEN_EXPIRED]: {
    status: HttpStatus.UNAUTHORIZED,
    message: 'Refresh token expired',
  },
  [ErrorCode.REFRESH_TOKEN_REVOKED]: {
    status: HttpStatus.UNAUTHORIZED,
    message: 'Refresh token revoked',
  },
  [ErrorCode.EMAIL_REQUIRED]: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Email is required',
  },
  [ErrorCode.WEAK_PASSWORD]: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Password does not meet requirements',
  },
  [ErrorCode.INVALID_OR_EXPIRED_TOKEN]: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Invalid or expired token',
  },
  [ErrorCode.RATE_LIMIT_EXCEEDED]: {
    status: HttpStatus.TOO_MANY_REQUESTS,
    message: 'Too many requests',
  },
  [ErrorCode.NOT_FOUND]: {
    status: HttpStatus.NOT_FOUND,
    message: 'Resource not found',
  },
  [ErrorCode.CONFLICT]: {
    status: HttpStatus.CONFLICT,
    message: 'Conflict',
  },
  [ErrorCode.SLOT_UNAVAILABLE]: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Slot unavailable',
  },
  [ErrorCode.BOOKING_LIMIT_EXCEEDED]: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Booking limit exceeded',
  },
  [ErrorCode.INTERNAL_ERROR]: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  },
};
