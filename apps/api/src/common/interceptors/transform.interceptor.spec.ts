import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { TransformInterceptor } from './transform.interceptor';
import { Reflector } from '@nestjs/core';

describe('TransformInterceptor', () => {
  let interceptor: TransformInterceptor;
  let mockReflector: jest.Mocked<Reflector>;
  let mockContext: ExecutionContext;
  let mockNext: CallHandler;

  beforeEach(() => {
    mockReflector = {
      getAllAndOverride: jest.fn().mockReturnValue(false),
    } as unknown as jest.Mocked<Reflector>;
    interceptor = new TransformInterceptor(mockReflector);
    mockNext = {
      handle: () => of({ id: 1, name: 'test' }),
    } as CallHandler;
  });

  const createMockContext = (path: string) =>
    ({
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ url: path, path }),
      }),
    }) as unknown as ExecutionContext;

  it('should wrap response in { status, data }', (done) => {
    mockContext = createMockContext('/api/v1/users');
    interceptor.intercept(mockContext, mockNext).subscribe({
      next: (result) => {
        expect(result).toEqual({
          status: 'success',
          data: { id: 1, name: 'test' },
        });
        done();
      },
    });
  });

  it('should skip transform for health endpoint', (done) => {
    mockContext = createMockContext('/api/v1/health');
    interceptor.intercept(mockContext, mockNext).subscribe({
      next: (result) => {
        expect(result).toEqual({ id: 1, name: 'test' });
        done();
      },
    });
  });

  it('should skip transform for swagger', (done) => {
    mockContext = createMockContext('/swagger');
    interceptor.intercept(mockContext, mockNext).subscribe({
      next: (result) => {
        expect(result).toEqual({ id: 1, name: 'test' });
        done();
      },
    });
  });

  it('should skip transform when SkipTransform decorator is used', (done) => {
    mockReflector.getAllAndOverride.mockReturnValue(true);
    mockContext = createMockContext('/api/v1/users');
    interceptor.intercept(mockContext, mockNext).subscribe({
      next: (result) => {
        expect(result).toEqual({ id: 1, name: 'test' });
        done();
      },
    });
  });
});
