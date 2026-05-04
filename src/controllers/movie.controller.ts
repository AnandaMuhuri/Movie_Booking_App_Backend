import { Request, Response } from 'express';
import { Movie } from '../types/movie.type';
import { MovieModel } from '../models/movie.model';

 const createMovie = async (req: Request, res: Response) => {
   try {
    const movieData: Movie = req.body;
    const adddedMovie = await MovieModel.create(movieData);
    return res.status(201).json({
        'success': true,    
        'data': adddedMovie,
        'error': {},
        'message':'Movie created successfully'});
    } catch (error) {
        return res.status(500).json({
            'success': false,
            'data': {},
            'error': error,
            'message': 'Failed to create movie'
        });
   }
}

const getMovieById = async (req: Request, res: Response) => {
    try {
        const movieId = req.params.id;
        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            return res.status(404).json({
                'success': false,
                'data': {},
                'error': {},
                'message': 'Movie not found'
            });
        }
        return res.status(200).json({
            'success': true,
            'data': movie,
            'error': {},
            'message': 'Movie retrieved successfully'
        });
    } catch (error) {
        return res.status(500).json({
            'success': false,
            'data': {},
            'error': error,
            'message': 'Failed to retrieve movie'
        });
    }   
}

  const deleteMovieById = async (req: Request, res: Response) => {
    try {
        const movieId = req.params.id;
        const deletedMovie = await MovieModel.deleteOne({ _id: movieId });
        if (deletedMovie.deletedCount === 0) {
            return res.status(404).json({
                'success': false,   
                'data': {},
                'error': {},
                'message': 'Movie not found'
            });
        }
        return res.status(200).json({
            'success': true,
            'data': {},
            'error': {},
            'message': 'Movie deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            'success': false,       
            'data': {},
            'error': error,
            'message': 'Failed to delete movie'
        });
    }
}

export { 
    createMovie,
    getMovieById,
    deleteMovieById
 };



