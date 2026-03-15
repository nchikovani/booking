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
