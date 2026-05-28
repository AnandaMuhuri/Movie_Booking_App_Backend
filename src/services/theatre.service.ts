import TheatreModel from '../models/theatre.model';
import { Theatre } from '../types/theatre.type';

const createTheatre = async (theatreData: Theatre): Promise<Theatre> => {
  try {
    const addedTheatre = await TheatreModel.create(theatreData);
    return addedTheatre;
  } catch (error: any) {
    if (error?.name === 'ValidationError' && error.errors) {
      const err: Record<string, string> = {};
      Object.keys(error.errors).forEach((key: string) => {
        err[key] = error.errors[key].message;
      });
      console.error('Validation error:', err);
      throw { error: err, code: 422 };
    }
    console.error('Error creating theatre:', error);
    throw error;
  }
};

const theatreService = {
  createTheatre,
};

export default theatreService;
