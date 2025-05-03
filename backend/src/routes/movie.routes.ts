import express, { Request, Response } from 'express';
import { getAllMovies, createMovieHandler, getMovieById } from '../controllers/movie.controller';

const router = express.Router();

// Routes
router.get('/', getAllMovies);

router.post('/', (req: Request, res: Response) => {
  createMovieHandler(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
  getMovieById(req, res);
});


export default router;