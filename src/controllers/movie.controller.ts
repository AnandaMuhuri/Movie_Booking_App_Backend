import { Request, Response } from 'express';
import { Movie } from '../types/movie.type';
import movieService from '../services/movie.service';
import { AppError } from '../utils/appError';
import { sendError, sendSuccess } from '../utils/apiResponse';

const createMovie = async (req: Request, res: Response) => {
  try {
    const movieData: Movie = req.body;
    const adddedMovie = await movieService.createMovie(movieData);
    return sendSuccess(res, 201, adddedMovie, 'Movie created successfully');
  } catch (error) {
    return sendError(res, error, 'Failed to create movie');
  }
};

const getMovieById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const movieId = req.params.id;
    const movie = await movieService.getMovieById(movieId);
    if (!movie) {
      return sendError(
        res,
        new AppError('Movie not found', 404),
        'Movie not found',
      );
    }
    return sendSuccess(res, 200, movie, 'Movie retrieved successfully');
  } catch (error) {
    return sendError(res, error, 'Failed to retrieve movie');
  }
};

const deleteMovieById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const movieId = req.params.id;
    const deleted = await movieService.deleteMovieById(movieId);
    if (!deleted) {
      return sendError(
        res,
        new AppError('Movie not found', 404),
        'Movie not found',
      );
    }
    return sendSuccess(res, 200, {}, 'Movie deleted successfully');
  } catch (error) {
    return sendError(res, error, 'Failed to delete movie');
  }
};

const updateMovie = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const response = await movieService.updateMovieById(
      req.params.id,
      req.body,
    );

    return sendSuccess(
      res,
      200,
      response,
      'Movie details updated successfully',
    );
  } catch (error) {
    console.error('Error in updateMovie controller:', error);
    return sendError(res, error, 'Error while updating movie details');
  }
};

const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await movieService.fetchMovies(req.query);
    return sendSuccess(res, 200, movies, 'Movies fetched successfully');
  } catch (error) {
    console.error('Error in getMovies controller:', error);
    return sendError(res, error, 'Error while fetching movies');
  }
};

const movieController = {
  createMovie,
  getMovieById,
  deleteMovieById,
  updateMovie,
  getMovies,
};

export default movieController;
