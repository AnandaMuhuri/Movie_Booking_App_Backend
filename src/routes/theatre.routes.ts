import { Application } from 'express';
import theatreController from '../controllers/theatre.controller';

const theatreRoutes = (app: Application) => {
  app.post('/api/v1/theatres', theatreController.createTheatre);

  // Future routes for theatres can be added here
};

export default theatreRoutes;
