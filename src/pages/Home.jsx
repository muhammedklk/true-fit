import './Home.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Star, ShoppingBag, Zap } from 'lucide-react';

const Home = () => {
  const { products, categories, offers, addToCart } = useProducts();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState(0);

  const heroShowcaseProducts = [
    {
      id: 18,
      name: "Ocean Hoodie",
      category: "Coats",
      price: 489,
      image: "/images/ocean_hoodie.png",
      tag: "Best Seller",
      colorName: "Ocean Blue"
    },
    {
      id: 6,
      name: "Sand Oversize T-Shirt",
      category: "T-Shirts",
      price: 498,
      image: "/images/sand_tshirt.png",
      tag: "New Trend",
      colorName: "Sand Beige"
    },
    {
      id: 13,
      name: "Ocean Leather Watch",
      category: "Watches",
      price: 1999,
      image: "/images/blue_watch.png",
      tag: "Premium Edition",
      colorName: "Cobalt Blue"
    }
  ];

  const currentShowcase = heroShowcaseProducts[activeShowcaseIdx];
  const trendingProducts = products.filter(p => p.trending).slice(0, 4);
  const filteredProducts = products.filter(p => activeCategory === 'All' || p.category === activeCategory).slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-glow-overlay" style={{
          background: `radial-gradient(circle at 75% 50%, ${
            activeShowcaseIdx === 0 ? 'rgba(0, 119, 182, 0.12)' :
            activeShowcaseIdx === 1 ? 'rgba(210, 180, 140, 0.12)' :
            'rgba(74, 78, 105, 0.12)'
          } 0%, transparent 60%)`
        }}></div>

        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge fade-in">
              <span className="sparkle">✨</span> Premium Modern Essentials
            </div>
            <h1 className="hero-title fade-in">
              Redefine Your <br />
              <span>Signature</span> Look
            </h1>
            <p className="hero-desc fade-in">
              Discover the ultimate fusion of absolute comfort and tailored sophistication. 
              Our new studio collection is designed for the modern man who values quality.
            </p>
            
            <div className="hero-btns-row fade-in">
              <Link to="/shop" className="hero-btn-primary">
                Shop Collection <ArrowRight className="btn-arrow" size={18} />
              </Link>
              <a href="#categories-section" className="hero-btn-secondary">
                View Details
              </a>
            </div>

            <div className="hero-trust-box fade-in">
              <div className="trust-avatars">
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100" alt="user" />
                <img src="https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100" alt="user" />
                <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" alt="user" />
              </div>
              <div className="trust-text">
                <div className="stars">
                  <Star size={14} fill="#79a321" color="#79a321" />
                  <Star size={14} fill="#79a321" color="#79a321" />
                  <Star size={14} fill="#79a321" color="#79a321" />
                  <Star size={14} fill="#79a321" color="#79a321" />
                  <Star size={14} fill="#79a321" color="#79a321" />
                </div>
                <span>Over <strong>15k+</strong> positive customer reviews</span>
              </div>
            </div>
          </div>

          <div className="hero-showcase-column fade-in">
            <div className="showcase-card-wrapper">
              {/* Spinning Badge */}
              <div className="spinning-badge-container">
                <svg viewBox="0 0 100 100" className="spinning-badge-svg">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                  <text className="spinning-text">
                    <textPath href="#circlePath">
                      • PREMIUM QUALITY • COMFORT FIT • EST 2026 • TRUE FIT
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Glass disk backdrop */}
              <div className="glass-showcase-disk"></div>

              {/* Showcase Main Display */}
              <div className="showcase-main-display">
                <span className="showcase-item-badge">{currentShowcase.tag}</span>
                <div className="showcase-image-container">
                  <img 
                    src={currentShowcase.image} 
                    alt={currentShowcase.name} 
                    className="showcase-hero-image"
                    key={currentShowcase.id} 
                  />
                </div>
                
                {/* Floating Product Details */}
                <div className="showcase-floating-details">
                  <div className="details-header">
                    <h4>{currentShowcase.name}</h4>
                    <span className="color-tag">{currentShowcase.colorName}</span>
                  </div>
                  <div className="details-footer">
                    <span className="price-tag">Rs. {currentShowcase.price}</span>
                    <button className="details-cart-btn" onClick={() => {
                      const matchedProd = products.find(p => p.id === currentShowcase.id);
                      if (matchedProd) addToCart(matchedProd);
                    }}>
                      Add <ShoppingBag size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Showcase Selector Thumbnails */}
            <div className="showcase-thumbnails">
              {heroShowcaseProducts.map((prod, idx) => (
                <button
                  key={prod.id}
                  className={`showcase-thumb-btn ${idx === activeShowcaseIdx ? 'active' : ''}`}
                  onClick={() => setActiveShowcaseIdx(idx)}
                >
                  <img src={prod.image} alt={prod.name} />
                  <span className="thumb-indicator"></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories-section" className="categories section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Find Your <span>Style</span></h2>
            <p className="section-subtitle">Browse our curated selection of premium menswear essentials.</p>
          </div>
          <div className="category-filters">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`cat-filter-btn ${cat === activeCategory ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="empty-category" style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: 'var(--secondary-color)' }}>No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Heritage Section */}
      <section className="heritage section-padding">
        <div className="container grid-2">
          <div className="heritage-images">
             <div className="img-box-1"><img src="https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Fashion" /></div>
             <div className="img-box-2"><img src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Style" /></div>
          </div>
          <div className="heritage-content">
             <h2 className="section-title">Heritage Meets <span>Modern</span> Craftsmanship</h2>
             <p>Our pieces are meticulously crafted to stand the test of time, blending traditional techniques with modern aesthetics.</p>
             <div className="heritage-stats">
               <div className="stat-item">
                 <strong>230k</strong>
                 <span>Global Sales</span>
               </div>
               <div className="stat-item">
                 <strong>9/10</strong>
                 <span>Client Satisfaction</span>
               </div>
             </div>
             <Link to="/shop" className="btn btn-primary">Discover More</Link>
          </div>
        </div>
      </section>

      {/* Offers Section with Different Designs */}
      <section className="offers section-padding">
        <div className="container">
          <div className="offers-layout">
            {/* Offer 1: Dark Glass Design */}
            {offers && offers[0] && (
              <div className="offer-one fade-in">
                <img src={offers[0].image} alt={offers[0].title} />
                <div className="offer-one-content">
                  <div className="offer-badge"><Zap size={14} /> Flash Sale</div>
                  <h2>{offers[0].title}</h2>
                  <p>{offers[0].subtitle}</p>
                  <Link to={offers[0].link || '/shop'} className="btn btn-primary">Shop Now</Link>
                </div>
              </div>
            )}

            {/* Offer 2: Minimalist Split Design */}
            {offers && offers[1] && (
              <div className="offer-two fade-in">
                <div className="offer-two-text">
                  <div className="offer-tag">New Season</div>
                  <h2>{offers[1].title}</h2>
                  <p>{offers[1].subtitle}</p>
                  <Link to={offers[1].link || '/shop'} className="btn-text">Explore Collection <ArrowRight size={18} /></Link>
                </div>
                <div className="offer-two-img">
                  <img src={offers[1].image} alt={offers[1].title} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="trending section-padding">
        <div className="container">
           <h2 className="trending-title">Trending Right <span>Now</span></h2>
           <div className="trending-grid">
             <div className="trending-card large t1">
                <img src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Streetwear" />
                <div className="trending-content">
                  <h3>Street-Ready Styles</h3>
                  <Link to="/shop" className="btn btn-white">Shop Now</Link>
                </div>
             </div>
             <div className="trending-card large t2">
                <img src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Classics" />
                <div className="trending-content">
                   <div className="promo-badge">-30%</div>
                   <h3>Everyday Classics</h3>
                   <Link to="/shop" className="btn btn-white">Shop Now</Link>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* FAQ & Testimonials can follow here if needed, but keeping it focused on the user's latest request */}

      
    </div>
  );
};

export default Home;
