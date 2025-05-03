import React, { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import MovieCard from '../components/MovieCard';

const MyList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    fetch('http://localhost:3000/movies')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((movie: Movie) => savedFavorites.includes(movie._id));
        setMovies(filtered);
      })
      .catch((err) => console.error('Error fetching movies:', err));
  }, []);

  return (
    <section style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '16px' }}>My List</h2>
      {movies.length === 0 ? (
        <p style={{ color: '#aaa', fontSize: '16px' }}>You haven't added any favorites yet.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyList;