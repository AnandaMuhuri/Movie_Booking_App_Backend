import { Application } from 'express';
import theatreController from '../controllers/theatre.controller';
import theatreMiddlewares from '../middlewares/theatre.middleware';

const theatreRoutes = (app: Application) => {
  app.post(
    '/api/v1/theatres',
    theatreMiddlewares.validateTheatreCreateRequest,
    theatreController.createTheatre,
  );

  app.delete('/api/v1/theatres/:id', theatreController.deleteTheatreById);

  app.get('/api/v1/theatres/:id', theatreController.getTheatreById);

  app.get('/api/v1/theatres', theatreController.getAllTheatres);

  // Future routes for theatres can be added here
};

export default theatreRoutes;
