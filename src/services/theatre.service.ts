import TheatreModel from '../models/theatre.model';
import { Theatre } from '../types/theatre.type';
import mongoose from 'mongoose';
import {
  AppError,
  getValidationErrors,
  normalizeError,
} from '../utils/appError';

const createTheatre = async (theatreData: Theatre): Promise<Theatre> => {
  try {
    const addedTheatre = await TheatreModel.create(theatreData);
    return addedTheatre;
  } catch (error) {
    const validationErrors = getValidationErrors(error);

    if (validationErrors) {
      console.error('createTheatre | Validation error:', validationErrors);
      throw new AppError(
        'Validation error while creating theatre',
        422,
        validationErrors,
      );
    }
    console.error('createTheatre | Error creating theatre:', error);
    throw new AppError('Error creating theatre', 500, normalizeError(error));
  }
};

const deleteTheatreById = async (theatreId: string): Promise<void> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(theatreId)) {
      throw new AppError('Invalid theatre ID format', 400);
    }
    const { deletedCount } = await TheatreModel.deleteOne({ _id: theatreId });
    if (deletedCount === 0) {
      console.warn(
        `deleteTheatreById | No theatre found with ID: ${theatreId}`,
      );
      throw new AppError('Theatre not found', 404);
    }
    console.log(
      `deleteTheatreById | Successfully deleted theatre with ID: ${theatreId}`,
    );
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error('deleteTheatreById | Error deleting theatre:', error);
    throw new AppError('Error deleting theatre', 500, normalizeError(error));
  }
};

const getTheatreById = async (theatreId: string): Promise<Theatre> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(theatreId)) {
      throw new AppError('Invalid theatre ID format', 400);
    }
    const theatre = await TheatreModel.findById(theatreId);
    if (!theatre) {
      throw new AppError('No theatre found for the given ID', 404);
    }
    return theatre;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Error fetching theatre', 500, normalizeError(error));
  }
};

const getAllTheatres = async (): Promise<Theatre[]> => {
  try {
    const theatres = await TheatreModel.find({});
    if (theatres.length === 0) {
      console.warn('getAllTheatres | No theatres found in the database');
      throw new AppError('No theatres found', 404);
    }
    return theatres;
  } catch (error) {
    console.error('getAllTheatres | Error fetching theatres:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Error fetching theatres', 500, normalizeError(error));
  }
};

const theatreService = {
  createTheatre,
  deleteTheatreById,
  getTheatreById,
  getAllTheatres,
};

export default theatreService;
