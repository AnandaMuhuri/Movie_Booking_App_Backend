import { Request, Response } from 'express';
import theatreService from '../services/theatre.service';
import { Theatre } from '../types/theatre.type';
import { sendError, sendSuccess } from '../utils/apiResponse';
import { AppError, normalizeError } from '../utils/appError';

const createTheatre = async (req: Request, res: Response) => {
  try {
    const theatreData: Theatre = req.body;
    const response = await theatreService.createTheatre(theatreData);
    return sendSuccess(res, 201, response, 'Theatre created successfully');
  } catch (error) {
    console.error('Error in createTheatre controller:', error);
    const appError =
      error instanceof AppError
        ? error
        : new AppError('Internal server error', 500, normalizeError(error));
    return sendError(res, appError, 'Failed to create theatre');
  }
};

const deleteTheatreById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    await theatreService.deleteTheatreById(req.params.id);
    return sendSuccess(res, 200, {}, 'Theatre deleted successfully');
  } catch (error) {
    console.error('Error in deleteTheatreById controller:', error);
    const appError =
      error instanceof AppError
        ? error
        : new AppError('Internal server error', 500);
    return sendError(res, appError, 'Failed to delete theatre');
  }
};

const getTheatreById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const theatre = await theatreService.getTheatreById(req.params.id);
    return sendSuccess(res, 200, theatre, 'Theatre fetched successfully');
  } catch (error) {
    console.error('Error in getTheatreById controller:', error);
    const appError =
      error instanceof AppError
        ? error
        : new AppError('Internal server error', 500, normalizeError(error));
    return sendError(res, appError, 'Failed to fetch theatre');
  }
};

const getAllTheatres = async (req: Request, res: Response) => {
  try {
    const theatres = await theatreService.getAllTheatres();
    return sendSuccess(res, 200, theatres, 'Theatres fetched successfully');
  } catch (error) {
    console.error('Error in getAllTheatres controller:', error);
    const appError =
      error instanceof AppError
        ? error
        : new AppError('Internal server error', 500, normalizeError(error));
    return sendError(res, appError, 'Failed to fetch theatres');
  }
};

const theatreController = {
  createTheatre,
  deleteTheatreById,
  getTheatreById,
  getAllTheatres,
};

export default theatreController;
