import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

const ERROR_SCHEMA = {
  type: 'object',
  required: ['status', 'error'],
  properties: {
    status: { type: 'string', enum: ['error'], example: 'error' },
    error: {
      type: 'object',
      required: ['code', 'message'],
      properties: {
        code: { type: 'string', example: 'VALIDATION_FAILED' },
        message: { type: 'string', example: 'Validation failed' },
      },
    },
  },
};

const ERROR_STATUS_DESCRIPTIONS: Record<number, string> = {
  [HttpStatus.BAD_REQUEST]: 'Ошибка валидации',
  [HttpStatus.UNAUTHORIZED]: 'Не авторизован',
  [HttpStatus.FORBIDDEN]: 'Доступ запрещён',
  [HttpStatus.NOT_FOUND]: 'Ресурс не найден',
  [HttpStatus.CONFLICT]: 'Конфликт данных',
  [HttpStatus.TOO_MANY_REQUESTS]: 'Превышен лимит запросов',
  [HttpStatus.INTERNAL_SERVER_ERROR]: 'Внутренняя ошибка сервера',
};

/**
 * Документирует успешный ответ с оберткой TransformInterceptor:
 * { status: 'success', data: Model }
 *
 * Если model не передан — data описывается как nullable object (void/null).
 * Передайте isArray: true для ответов-массивов.
 */
export const ApiWrappedResponse = <TModel extends Type<unknown>>(
  status: number,
  description: string,
  model?: TModel,
  options: { isArray?: boolean } = {},
) => {
  const { isArray = false } = options;

  let dataSchema: object;
  if (model) {
    dataSchema = isArray
      ? { type: 'array', items: { $ref: getSchemaPath(model) } }
      : { $ref: getSchemaPath(model) };
  } else {
    dataSchema = { type: 'object', nullable: true };
  }

  return applyDecorators(
    ...(model ? [ApiExtraModels(model)] : []),
    ApiResponse({
      status,
      description,
      schema: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
          status: { type: 'string', enum: ['success'], example: 'success' },
          data: dataSchema,
        },
      },
    }),
  );
};

/** Успешный ответ 200 */
export const ApiWrappedOkResponse = <TModel extends Type<unknown>>(
  description: string,
  model?: TModel,
  options: { isArray?: boolean } = {},
) => ApiWrappedResponse(HttpStatus.OK, description, model, options);

/** Успешный ответ 201 */
export const ApiWrappedCreatedResponse = <TModel extends Type<unknown>>(
  description: string,
  model?: TModel,
) => ApiWrappedResponse(HttpStatus.CREATED, description, model);

/**
 * Документирует ошибочный ответ с оберткой HttpExceptionFilter:
 * { status: 'error', error: { code, message } }
 */
export const ApiWrappedErrorResponse = (status: number, description?: string) =>
  ApiResponse({
    status,
    description: description ?? ERROR_STATUS_DESCRIPTIONS[status] ?? 'Ошибка',
    schema: ERROR_SCHEMA,
  });

/**
 * Добавляет документацию для набора типовых ошибок.
 * По умолчанию: 400, 401, 403, 404, 429, 500.
 *
 * @example
 * \@ApiCommonErrorResponses()                        // стандартный набор
 * \@ApiCommonErrorResponses(400, 409)                // только указанные статусы
 */
export const ApiCommonErrorResponses = (...statuses: number[]) => {
  const codes = statuses.length
    ? statuses
    : [400, 401, 403, 404, 429, 500];

  return applyDecorators(...codes.map((s) => ApiWrappedErrorResponse(s)));
};