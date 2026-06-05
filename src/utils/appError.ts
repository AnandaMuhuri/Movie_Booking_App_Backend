export type ErrorDetails = Record<string, string> | string | object;

export class AppError extends Error {
  statusCode: number;
  details: ErrorDetails;

  constructor(message: string, statusCode: number, details: ErrorDetails = {}) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const isAppError = (error: unknown): error is AppError =>
  error instanceof AppError;

export const getValidationErrors = (
  error: unknown,
): Record<string, string> | null => {
  if (!isRecord(error) || error.name !== 'ValidationError') {
    return null;
  }

  const errors = error.errors;

  if (!isRecord(errors)) {
    return null;
  }

  const validationErrors: Record<string, string> = {};

  Object.keys(errors).forEach((key: string) => {
    const fieldError = errors[key];

    if (isRecord(fieldError) && typeof fieldError.message === 'string') {
      validationErrors[key] = fieldError.message;
    }
  });

  return validationErrors;
};

// utils/normalizeError.ts
export const normalizeError = (error: unknown): ErrorDetails => {
  if (error instanceof Error) {
    return {
      originalMessage: error.message,
      stack: error.stack,
    };
  }
  return { originalMessage: String(error) };
};
