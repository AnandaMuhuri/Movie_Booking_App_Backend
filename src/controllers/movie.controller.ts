import { Request, Response } from 'express';
import { Movie } from '../types/movie.type';
import movieService from '../services/movie.service';

const createMovie = async (req: Request, res: Response) => {
  try {
    const movieData: Movie = req.body;
    const adddedMovie = await movieService.createMovie(movieData);
    return res.status(201).json({
      success: true,
      data: adddedMovie,
      error: {},
      message: 'Movie created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: {},
      error: error,
      message: 'Failed to create movie',
    });
  }
};

const getMovieById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const movieId = req.params.id;
    const movie = await movieService.getMovieById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        data: {},
        error: {},
        message: 'Movie not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: movie,
      error: {},
      message: 'Movie retrieved successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: {},
      error: error,
      message: 'Failed to retrieve movie',
    });
  }
};

const deleteMovieById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const movieId = req.params.id;
    const deleted = await movieService.deleteMovieById(movieId);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        data: {},
        error: {},
        message: 'Movie not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: {},
      error: {},
      message: 'Movie deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: {},
      error: error,
      message: 'Failed to delete movie',
    });
  }
};

const updateMovie = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const response = await movieService.updateMovieById(
      req.params.id,
      req.body,
    );
    if (response && 'error' in response) {
      return res.status(response.code).json({
        success: false,
        data: {},
        error: response.error,
        message: 'Validation error while updating movie details',
      });
    }
    return res.status(200).json({
      success: true,
      data: response,
      error: {},
      message: 'Movie details updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: {},
      error: error,
      message: 'Error while updating movie details',
    });
  }
};

const movieController = {
  createMovie,
  getMovieById,
  deleteMovieById,
  updateMovie,
};

export default movieController;
