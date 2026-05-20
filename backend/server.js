import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js'; // <-- Add this import

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Mounted API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes); // <-- Add this route mounting

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected...');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));