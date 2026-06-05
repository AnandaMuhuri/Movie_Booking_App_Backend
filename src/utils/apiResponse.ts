import { Response } from 'express';
import { isAppError } from './appError';

export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  data: T,
  message: string,
) => {
  return res.status(statusCode).json({
    success: true,
    data,
    error: {},
    message,
  });
};

export const sendError = (
  res: Response,
  error: unknown,
  fallbackMessage: string,
) => {
  if (isAppError(error)) {
    return res.status(error.statusCode).json({
      success: false,
      data: {},
      error: error.details,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    data: {},
    error,
    message: fallbackMessage,
  });
};
