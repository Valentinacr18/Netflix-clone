import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Movie } from '../types/Movie';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/movies/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setMovie(data);
          setLoading(false);
          const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
          setIsFavorite(favorites.includes(data._id));
        })
        .catch((err) => {
          console.error('Error fetching movie:', err);
          setLoading(false);
        });
    }
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((favId: string) => favId !== movie?._id);
    } else {
      updatedFavorites = [...favorites, movie?._id];
    }
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) return <p className="loading">Loading movie...</p>;
  if (!movie) return <p className="error">Movie not found.</p>;

  return (
    <div className="movie-details-container">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>

      <div className="movie-details-content">
        {/* LEFT SIDE */}
        <div className="left-content">
          <img className="movie-image" src={movie.image} alt={movie.title} />
          <div className="movie-info">
            <h1>{movie.title}</h1>
            <p className="genre-year">{movie.genre} • {movie.year}</p>
            <p className="cast"><strong>Cast:</strong> {movie.cast.join(', ')}</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-content">
          <div className="synopsis-section">
            <h3>Synopsis</h3>
            <p className="synopsis">{movie.synopsis}</p>
          </div>

          <button onClick={toggleFavorite} className="favorite-button">
            {isFavorite ? '★ In Favorites' : '☆ Add to Favorites'}
          </button>

          {movie.trailer && (
            <div className="trailer">
              <h3>Watch Trailer</h3>
              <iframe
                src={movie.trailer}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;