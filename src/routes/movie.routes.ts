import { Application } from 'express';
import { createMovie, getMovieById, deleteMovieById } from '../controllers/movie.controller';

export const routes = (app: Application) => {
    app.post('/api/v1/movies', createMovie);

    app.get('/api/v1/movies/:id', getMovieById);

    app.delete('/api/v1/movies/:id', deleteMovieById);

}   