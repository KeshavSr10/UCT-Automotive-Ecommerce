import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Sequelize instance directly with your cloud URI
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Keeps your terminal clean
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Required for Neon cloud hosting
    },
  },
});