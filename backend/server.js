import dns from 'node:dns';
// Forces Node to bypass the broken local ISP lookup using Google and Cloudflare DNS
dns.setServers(['8.8.8.8', '1.1.1.1']); 

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// 1. Import your new modular product routes
import productRoutes from './routes/productRoutes.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/automotive_ecommerce';

// Middleware for parsing JSON bodies
app.use(express.json());

// 2. Link the product routes to your API endpoint
app.use('/api/products', productRoutes);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

// Connect to database and then start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});