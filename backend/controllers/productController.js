import Product from '../models/Product.js';

// @desc    Fetch all automotive products
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error fetching products',
      error: error.message
    });
  }
};

// @desc    Create a single product
// @route   POST /api/products
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Product validation failed',
      error: error.message
    });
  }
};