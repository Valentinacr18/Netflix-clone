import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  genre: { type: String, required: true },
  year: { type: Number, required: true },
  synopsis: { type: String, required: true },
  cast: { type: [String], required: true }, 
  trailer: { type: String, required: false },
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;