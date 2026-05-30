import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Test Connection and Sync Models
sequelize.authenticate()
  .then(() => {
    console.log('🚀 PostgreSQL connection established successfully via Neon!');
    return sequelize.sync({ alter: true }); // Syncs models to cloud database tables
  })
  .then(() => {
    console.log('📦 All PostgreSQL models synchronized successfully!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ Unable to connect to the PostgreSQL database:', err.message);
  });