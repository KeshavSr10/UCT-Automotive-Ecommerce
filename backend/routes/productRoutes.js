import express from 'express';
const router = express.Router();

// Make sure to include the .js extension on your import!
import { getProducts, createProduct } from '../controllers/productController.js';

// Route for getting all products and creating a new product
router.route('/').get(getProducts).post(createProduct);

export default router;