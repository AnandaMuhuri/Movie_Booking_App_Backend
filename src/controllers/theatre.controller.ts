import { Request, Response } from 'express';
import theatreService from '../services/theatre.service';
import { Theatre } from '../types/theatre.type';

const createTheatre = async (req: Request, res: Response) => {
  try {
    const theatreData: Theatre = req.body;
    const response = await theatreService.createTheatre(theatreData);

    return res.status(201).json({
      success: true,
      data: response,
      error: {},
      message: 'Theatre created successfully',
    });
  } catch (error: any) {
    console.error('Error in createTheatre controller:', error);

    return res.status(error.code || 500).json({
      success: false,
      data: {},
      error: error.error || error,
      message:
        error.code === 422
          ? 'Validation error while creating theatre'
          : 'Failed to create theatre',
    });
  }
};

const theatreController = {
  createTheatre,
};

export default theatreController;
