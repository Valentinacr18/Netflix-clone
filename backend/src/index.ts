import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import movieRoutes from './routes/movie.routes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/movies', movieRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));