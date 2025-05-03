import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/Movie';
import '../styles/MovieCard.css';

interface Props {
  movie: Movie;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  return (
    <Link to={`/movies/${movie._id}`} className="movie-card">
      <img src={movie.image} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.genre} • {movie.year}</p>
      </div>
    </Link>
  );
};

export default MovieCard;


