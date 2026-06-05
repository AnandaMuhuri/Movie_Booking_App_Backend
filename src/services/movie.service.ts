import { Movie } from '../types/movie.type';
import MovieModel from '../models/movie.model';
import { AppError, getValidationErrors } from '../utils/appError';

const createMovie = async (movieData: Movie): Promise<Movie> => {
  try {
    const addedMovie = await MovieModel.create(movieData);
    return addedMovie;
  } catch (error) {
    const validationErrors = getValidationErrors(error);

    if (validationErrors) {
      console.error('Validation error:', validationErrors);
      throw new AppError(
        'Validation error while creating movie',
        422,
        validationErrors,
      );
    }

    console.error('Error creating movie:', error);
    throw error;
  }
};

const getMovieById = async (movieId: string): Promise<Movie | null> => {
  try {
    const movie = await MovieModel.findById(movieId);
    return movie;
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw error;
  }
};

const deleteMovieById = async (movieId: string): Promise<boolean> => {
  try {
    const deletedMovie = await MovieModel.deleteOne({ _id: movieId });
    return deletedMovie.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};

const updateMovieById = async (
  movieId: string,
  updateData: Partial<Movie>,
): Promise<Movie | null> => {
  try {
    const updatedMovie = await MovieModel.findByIdAndUpdate(
      movieId,
      updateData,
      { new: true, runValidators: true },
    );
    return updatedMovie;
  } catch (error) {
    const validationErrors = getValidationErrors(error);

    if (validationErrors) {
      console.error('Validation error:', validationErrors);
      throw new AppError(
        'Validation error while updating movie details',
        422,
        validationErrors,
      );
    }

    console.error('Error updating movie:', error);
    throw error;
  }
};

const fetchMovies = async (filter: any) => {
  let query = {};
  if (filter.name) {
    query = { ...query, name: { $regex: filter.name, $options: 'i' } };
  }
  if (filter.language) {
    query = { ...query, language: filter.language };
  }
  try {
    const movies = await MovieModel.find(query);
    if (!movies) {
      throw new AppError(
        'Error while fetching movies with the provided filters',
        404,
        'No movies found matching the provided filters',
      );
    }
    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

const movieService = {
  createMovie,
  getMovieById,
  deleteMovieById,
  updateMovieById,
  fetchMovies,
};

export default movieService;
