import { Movie } from '../types/movie.type';
import { MovieModel } from '../models/movie.model';

const createMovie = async (movieData: Movie): Promise<Movie> => {
  try {
    const addedMovie = await MovieModel.create(movieData);
    return addedMovie;
  } catch (error) {
    throw error;
  }
};

const getMovieById = async (movieId: string): Promise<Movie | null> => {
  try {
    const movie = await MovieModel.findById(movieId);
    return movie;
  } catch (error) {
    throw error;
  }
};

const deleteMovieById = async (movieId: string): Promise<boolean> => {
  try {
    const deletedMovie = await MovieModel.deleteOne({ _id: movieId });
    return deletedMovie.deletedCount > 0;
  } catch (error) {
    throw error;
  }
};

const updateMovieById = async (
  movieId: string,
  updateData: Partial<Movie>,
): Promise<Movie | null | { error: Record<string, string>; code: number }> => {
  try {
    const updatedMovie = await MovieModel.findByIdAndUpdate(
      movieId,
      updateData,
      { new: true, runValidators: true },
    );
    return updatedMovie;
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const err: Record<string, string> = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.error('Validation error:', err);
      return { error: err, code: 422 };
    } else {
      throw error;
    }
  }
};

const movieService = {
  createMovie,
  getMovieById,
  deleteMovieById,
  updateMovieById,
};

export default movieService;
