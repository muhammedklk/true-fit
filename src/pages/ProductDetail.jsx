import './ProductDetail.css';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { Star, ShieldCheck, Truck, RotateCcw, Plus, Minus, ShoppingBag, Play } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [activeSize, setActiveSize] = useState('M');
  const [activeMedia, setActiveMedia] = useState(0); // 0, 1, 2... for images, then videos

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="section-padding flex-center"><h2>Product not found</h2></div>;
  }

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const allMedia = [
    ...(product.images || []).map(url => ({ type: 'image', url })),
    ...(product.videos || []).map(url => ({ type: 'video', url }))
  ];

  if (allMedia.length === 0) {
    allMedia.push({ type: 'image', url: 'https://via.placeholder.com/600?text=No+Media+Available' });
  }

  const currentMedia = allMedia[activeMedia] || allMedia[0];

  return (
    <div className="product-detail-page section-padding">
      <div className="container">
        <div className="detail-grid">
          <div className="detail-gallery fade-in">
             <div className="main-img-box">
                {currentMedia?.type === 'video' ? (
                  <video src={currentMedia.url} controls autoPlay muted loop className="detail-video"></video>
                ) : (
                  <img src={currentMedia?.url || 'https://via.placeholder.com/600'} alt={product.name} />
                )}
             </div>
             <div className="gallery-thumbs">
                {allMedia.map((media, idx) => (
                  <div 
                    key={idx} 
                    className={`thumb-box ${activeMedia === idx ? 'active' : ''}`}
                    onClick={() => setActiveMedia(idx)}
                  >
                    {media.type === 'video' ? (
                      <div className="video-thumb-overlay"><Play size={16} /></div>
                    ) : null}
                    <img src={media.type === 'video' ? 'https://via.placeholder.com/100?text=Video' : media.url} alt="thumb" />
                  </div>
                ))}
             </div>
          </div>

          <div className="detail-info fade-in">
             <div className="detail-cat">{product.category}</div>
             <h1 className="detail-name">{product.name}</h1>
             <div className="detail-rating">
                <div className="stars">
                   <Star size={16} fill="#ffc107" color="#ffc107" />
                   <Star size={16} fill="#ffc107" color="#ffc107" />
                   <Star size={16} fill="#ffc107" color="#ffc107" />
                   <Star size={16} fill="#ffc107" color="#ffc107" />
                   <Star size={16} fill="#ffc107" color="#ffc107" />
                </div>
                <span>(120 Reviews)</span>
             </div>
             <div className="detail-price">${product.price}</div>
             <p className="detail-desc">
                {product.description || "Elevate your wardrobe with this premium piece. Crafted from high-quality materials, it offers both comfort and style for any occasion."}
             </p>

             <div className="detail-options">
                <div className="option-group">
                   <label>Select Size</label>
                   <div className="size-grid">
                      {sizes.map(size => (
                        <button 
                          key={size} 
                          className={`size-btn ${activeSize === size ? 'active' : ''}`}
                          onClick={() => setActiveSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="option-group">
                   <label>Quantity</label>
                   <div className="qty-control">
                      <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={18} /></button>
                      <span>{quantity}</span>
                      <button onClick={() => setQuantity(q => q + 1)}><Plus size={18} /></button>
                   </div>
                </div>
             </div>

             <div className="detail-actions">
                <button className="btn btn-primary buy-btn" onClick={() => {
                  addToCart({...product, quantity});
                  navigate('/cart');
                }}>
                  Add to Cart <ShoppingBag size={20} />
                </button>
             </div>

             <div className="detail-features">
                <div className="feature-item">
                   <Truck size={20} />
                   <div><strong>Free Shipping</strong><span>On orders over $150</span></div>
                </div>
                <div className="feature-item">
                   <RotateCcw size={20} />
                   <div><strong>30-Day Returns</strong><span>Hassle-free exchanges</span></div>
                </div>
                <div className="feature-item">
                   <ShieldCheck size={20} />
                   <div><strong>Secure Payment</strong><span>100% data protection</span></div>
                </div>
             </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ProductDetail;
