import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/Movie';

interface HomeProps {
  searchTerm: string;
}

const Home: React.FC<HomeProps> = ({ searchTerm }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/movies')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
        setLoading(false);
      });
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '16px' }}>Popular Movies</h2>
      {loading ? (
        <p>Loading movies...</p>
      ) : filteredMovies.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '32px',
            justifyItems: 'center',
            paddingLeft: '16px',
            paddingRight: '16px',
            boxSizing: 'border-box',
          }}
        >
          {filteredMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </section>
  );
};

export default Home;
