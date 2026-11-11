import { z } from 'zod';
import { ERRORS, type ErrorCode } from './errors.js';

export interface Pagination {
  limit: number;
  offset: number;
}

export type SortOrder = 'asc' | 'desc';

export interface Sort<F extends string> {
  sortBy: F;
  sortOrder: SortOrder;
}

export class HttpError extends Error {
  readonly status: number;
  readonly code: ErrorCode;

  constructor(code: ErrorCode, message: string = ERRORS[code].message) {
    super(message);

    this.name = 'HttpError';
    this.status = ERRORS[code].status;
    this.code = code;
  }
}

export function parseId(value: unknown): number {
  const id = Number(value);

  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new HttpError('INVALID_ID');
  }

  return id;
}

export function assertFound<T>(
  value: T | null | undefined,
  code: ErrorCode,
): T {
  if (value === null || value === undefined) {
    throw new HttpError(code);
  }

  return value;
}

export function parsePagination(query: {
  limit?: unknown;
  offset?: unknown;
}): Pagination {
  const limit = query.limit === undefined ? 30 : Number(query.limit);
  const offset = query.offset === undefined ? 0 : Number(query.offset);

  if (
    !Number.isSafeInteger(limit) ||
    limit < 1 ||
    limit > 100 ||
    !Number.isSafeInteger(offset) ||
    offset < 0
  ) {
    throw new HttpError('INVALID_PAGINATION');
  }

  return { limit, offset };
}

export function validate<T extends z.ZodType>(
  schema: T,
  body: unknown,
): z.infer<T> {
  const result = schema.safeParse(body);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');

    throw new HttpError('VALIDATION_ERROR', message);
  }

  return result.data;
}

export function parseSort<F extends string>(
  query: { sort_by?: unknown; sort_order?: unknown },
  allowedFields: readonly F[],
  defaultField: F,
  defaultOrder: SortOrder = 'asc',
): Sort<F> {
  const sortBy =
    query.sort_by === undefined
      ? defaultField
      : allowedFields.find((field) => field === query.sort_by);

  if (sortBy === undefined) {
    throw new HttpError(
      'INVALID_SORT_FIELD',
      `sort_by должен быть одним из: ${allowedFields.join(', ')}`,
    );
  }

  const sortOrder = query.sort_order ?? defaultOrder;

  if (sortOrder !== 'asc' && sortOrder !== 'desc') {
    throw new HttpError('INVALID_SORT_ORDER');
  }

  return { sortBy, sortOrder };
}