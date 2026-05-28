import { Request, Response, NextFunction } from 'express';

const badRequestResponse = {
  success: false,
  data: {},
  error: '',
  message: 'Malformed request | Bad Request',
};

const validateMovieCreateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body) {
    badRequestResponse.error = 'Request body is missing';
    return res.status(400).json(badRequestResponse);
  }

  if (!req.body.name) {
    badRequestResponse.error =
      'The name of the movie is not present in the request';
    return res.status(400).json(badRequestResponse);
  }

  if (
    !req.body.casts ||
    !Array.isArray(req.body.casts) ||
    req.body.casts.length === 0
  ) {
    badRequestResponse.error =
      'The casts of the movie is not present or is not a valid array in the request';
    return res.status(400).json(badRequestResponse);
  }

  if (!req.body.director) {
    badRequestResponse.error = 'The director is not present in the request';
    return res.status(400).json(badRequestResponse);
  }

  if (!req.body.releaseDate) {
    badRequestResponse.error = 'The release date is not present in the request';
    return res.status(400).json(badRequestResponse);
  }

  if (!req.body.trailerUrl) {
    badRequestResponse.error = 'The trailer URL is not present in the request';
    return res.status(400).json(badRequestResponse);
  }

  next();
};

export const movieMiddlewares = {
  validateMovieCreateRequest,
};
