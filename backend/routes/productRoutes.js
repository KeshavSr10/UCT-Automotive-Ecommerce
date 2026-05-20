import express from 'express';
import { getProducts, createProduct } from '../controllers/productController.js';

const router = express.Router();

// Maps directly to GET /api/products and POST /api/products
router.route('/')
  .get(getProducts)
  .post(createProduct);

export default router;