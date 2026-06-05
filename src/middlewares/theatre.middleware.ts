import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';
import { AppError } from '../utils/appError';

const validateTheatreCreateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body) {
    return sendError(
      res,
      new AppError('Request body is missing', 400),
      'Request body is missing',
    );
  }

  if (!req.body.name) {
    return sendError(
      res,
      new AppError(
        'The name of the theatre is not present in the request',
        400,
      ),
      'The name of the theatre is not present in the request',
    );
  }

  if (!req.body.pinCode) {
    return sendError(
      res,
      new AppError(
        'The pin code of the theatre is not present in the request',
        400,
      ),
      'The pin code of the theatre is not present in the request',
    );
  }

  if (!req.body.city) {
    return sendError(
      res,
      new AppError(
        'The city of the theatre is not present in the request',
        400,
      ),
      'The city of the theatre is not present in the request',
    );
  }

  next();
};

const theatreMiddlewares = {
  validateTheatreCreateRequest,
};

export default theatreMiddlewares;
