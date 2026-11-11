import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';

import { HttpError } from '../utils/http.js';
import { ERRORS, type ErrorCode } from '../utils/errors.js';

interface ErrorDetails {
  code?: unknown;
  type?: unknown;
}

const DB_ERRORS: Record<string, ErrorCode> = {
  '23503': 'FOREIGN_KEY_CONFLICT',
  '23505': 'UNIQUE_CONSTRAINT_VIOLATION',
  '23514': 'CHECK_CONSTRAINT_VIOLATION',
  '23502': 'NOT_NULL_VIOLATION',
};

function sendError(res: Response, code: ErrorCode): void {
  const { status, message } = ERRORS[code];

  res.status(status).json({
    code,
    message,
  });
}

export function notFound(
  _req: Request,
  _res: Response,
  next: NextFunction,
): void {
  next(new HttpError('ROUTE_NOT_FOUND'));
}

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _req,
  res,
  _next,
) => {
  if (err instanceof HttpError) {
    sendError(res, err.code);
    return;
  }

  const { code, type } = (
    typeof err === 'object' && err !== null ? err : {}
  ) as ErrorDetails;

  if (type === 'entity.parse.failed') {
    sendError(res, 'INVALID_JSON');
    return;
  }

  if (type === 'entity.too.large') {
    sendError(res, 'PAYLOAD_TOO_LARGE');
    return;
  }

  if (typeof code === 'string') {
    const dbError = DB_ERRORS[code];

    if (dbError) {
      sendError(res, dbError);
      return;
    }

    if (code.startsWith('22')) {
      sendError(res, 'INVALID_DATABASE_VALUE');
      return;
    }
  }

  console.error(err);
  sendError(res, 'INTERNAL_SERVER_ERROR');
};