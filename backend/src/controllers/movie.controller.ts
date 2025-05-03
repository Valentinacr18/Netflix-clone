import { Request, Response } from 'express';
import Movie from '../models/movie.model';

// GET /movies
export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving movies' });
  }
};

// POST /movies
export const createMovieHandler = async (req: Request, res: Response) => {
  try {
    const { title, image, genre, year, synopsis, cast, trailer } = req.body;

    if (!title || !image || !genre || !year || !synopsis || !cast || !trailer) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newMovie = await Movie.create({
      title,
      image,
      genre,
      year,
      synopsis,
      cast,
      trailer,
    });

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: 'Error creating movie', error });
  }
};

// GET /movies/:id
export const getMovieById = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving movie', error });
  }
};
