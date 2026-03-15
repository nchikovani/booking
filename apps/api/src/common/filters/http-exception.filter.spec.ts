import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { AppException } from '../errors/app.exception';
import { ErrorCode } from '../errors/error-codes';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@repo/prisma';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;
  let mockResponse: { status: jest.Mock; json: jest.Mock };
  let mockRequest: { url: string; method: string };
  let mockHost: ArgumentsHost;

  beforeEach(() => {
    filter = new HttpExceptionFilter();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockRequest = { url: '/test', method: 'GET' };
    mockHost = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    } as unknown as ArgumentsHost;
  });

  it('should handle AppException', () => {
    const exception = AppException.create(ErrorCode.NOT_FOUND, 'User not found');
    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: {
        code: ErrorCode.NOT_FOUND,
        message: 'User not found',
      },
    });
  });

  it('should handle HttpException (NotFoundException)', () => {
    const exception = new NotFoundException('Resource not found');
    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: {
        code: ErrorCode.NOT_FOUND,
        message: 'Resource not found',
      },
    });
  });

  it('should handle HttpException with array message (validation)', () => {
    const exception = new BadRequestException({
      message: ['field1 is required', 'field2 must be email'],
    });
    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: {
        code: ErrorCode.VALIDATION_FAILED,
        message: 'field1 is required, field2 must be email',
      },
    });
  });

  it('should handle PrismaClientKnownRequestError P2025', () => {
    const exception = new Prisma.PrismaClientKnownRequestError(
      'Record not found',
      { code: 'P2025', clientVersion: '1.0' },
    );
    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: {
        code: 'P2025',
        message: 'Record not found',
      },
    });
  });

  it('should handle PrismaClientKnownRequestError P2002', () => {
    const exception = new Prisma.PrismaClientKnownRequestError(
      'Unique constraint failed',
      { code: 'P2002', clientVersion: '1.0' },
    );
    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: {
        code: 'P2002',
        message: 'A record with this value already exists',
      },
    });
  });

  it('should handle unknown exception in production', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const exception = new Error('Unexpected error');
    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: {
        code: ErrorCode.INTERNAL_ERROR,
        message: 'Internal server error',
      },
    });

    process.env.NODE_ENV = originalEnv;
  });
});
