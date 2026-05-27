import './Home.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Star, ShoppingBag, Zap } from 'lucide-react';

const Home = () => {
  const { products, categories, offers } = useProducts();
  const trendingProducts = products.filter(p => p.trending).slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge fade-in">2024 Collection</div>
            <h1 className="hero-title fade-in">Redefine Your <span>Style</span></h1>
            <p className="hero-desc fade-in">
              Discover the ultimate fusion of comfort and sophistication. Our premium 
              collection is designed for the modern man who values quality.
            </p>
            <div className="hero-btns fade-in">
              <Link to="/shop" className="btn btn-primary">Shop Collection <ArrowRight size={18} /></Link>
              <Link to="/shop" className="btn btn-outline">Explore Styles</Link>
            </div>
          </div>
          <div className="hero-image-box fade-in">
             <img src="https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Hero Model" className="hero-image" />
             <div className="hero-floating-card">
               <div className="card-top">
                 <div className="avatar-group">
                   <img src="https://i.pravatar.cc/100?img=1" alt="user" />
                   <img src="https://i.pravatar.cc/100?img=2" alt="user" />
                   <img src="https://i.pravatar.cc/100?img=3" alt="user" />
                 </div>
                 <div className="card-stats">
                   <strong>230k+</strong>
                   <span>Joined users</span>
                 </div>
               </div>
             </div>
             <div className="hero-accent-banner">
                <span>Shop the <strong>LOOK</strong></span>
                <ArrowRight size={20} />
             </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Find Your <span>Style</span></h2>
            <p className="section-subtitle">Browse our curated selection of premium menswear essentials.</p>
          </div>
          <div className="category-filters">
            {categories.map(cat => (
              <button key={cat} className={`cat-filter-btn ${cat === 'All' ? 'active' : ''}`}>{cat}</button>
            ))}
          </div>
          <div className="grid-4">
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
