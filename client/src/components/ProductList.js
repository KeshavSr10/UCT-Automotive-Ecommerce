// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { fetchProducts } from '../utils/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchProducts();
        // Handle the envelope response format from backend: { success, count, products }
        if (response && response.products && Array.isArray(response.products)) {
          setProducts(response.products);
        } else {
          setProducts([]); // Fallback to empty array if format is unexpected
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div className="product-list">Loading products...</div>;
  }

  if (error) {
    return <div className="product-list error">Error: {error}</div>;
  }

  // Guard check to ensure products is an array before mapping
  if (!Array.isArray(products)) {
    return <div className="product-list error">Invalid product data format</div>;
  }

  return (
    <div className="product-list">
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;