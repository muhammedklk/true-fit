import './ProductCard.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ShoppingCart, Heart } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useProducts();

  return (
    <div className="product-card fade-in">
      <div className="product-image-wrapper">
        <Link to={`/product/${product.id}`}>
          <img 
            src={(product.images && product.images.length > 0 && product.images[0]) ? product.images[0] : 'https://via.placeholder.com/400?text=No+Image'} 
            alt={product.name} 
            className="product-image" 
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400?text=Image+Not+Found'; }}
          />
        </Link>
        <div className="product-actions">
          <button className="action-btn" onClick={() => addToCart(product)}>
            <Plus size={20} />
          </button>
          <button className="action-btn">
            <Heart size={20} />
          </button>
        </div>
      </div>
      <div className="product-info">
        <div className="product-cat">{product.category}</div>
        <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
        <div className="product-price">Rs.{product.price}</div>
      </div>

      
    </div>
  );
};

export default ProductCard;
