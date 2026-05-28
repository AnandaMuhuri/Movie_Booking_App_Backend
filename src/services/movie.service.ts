import { Movie } from '../types/movie.type';
import { MovieModel } from '../models/movie.model';

const createMovie = async (movieData: Movie): Promise<Movie> => {
  try {
    const addedMovie = await MovieModel.create(movieData);
    return addedMovie;
  } catch (error) {
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
      console.error('Error updating movie:', error);
      throw error;
    }
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
      return {
        error: 'No movies found matching the provided filters',
        code: 404,
      };
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
