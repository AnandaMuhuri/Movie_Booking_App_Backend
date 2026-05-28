import { Application } from 'express';
import movieController from '../controllers/movie.controller';
import { movieMiddlewares } from '../middlewares/movie.middlewares';

export const routes = (app: Application) => {
  app.post(
    '/api/v1/movies',
    movieMiddlewares.validateMovieCreateRequest,
    movieController.createMovie,
  );

  app.get('/api/v1/movies/:id', movieController.getMovieById);

  app.delete('/api/v1/movies/:id', movieController.deleteMovieById);

  app.put('/api/v1/movies/:id', movieController.updateMovie);
};
