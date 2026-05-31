// src/components/ProductCard.js
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css'; // Import CSS file

const ProductCard = ({ product }) => {
  // Memoize the formatted price to prevent recalculation on every render
  const formattedPrice = useMemo(() => {
    return product.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [product.price]);

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?product=Image+Not+Available';
          }}
          className="product-image-img"
        />
      </div>
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">₹{formattedPrice}</div>
        <div className="product-meta">
          <span>Category: {product.category}</span>
          <span>Stock: {product.stock}</span>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    imageUrl: PropTypes.string
  }).isRequired
};

export default ProductCard;