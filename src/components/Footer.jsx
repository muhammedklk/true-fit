import './Footer.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo light">
              TRUE<span>FIT</span>
            </Link>
            <p className="footer-desc">
              Your complete source for premium quality men's fashion. Reach us at klkmmuhammed@gmail.com or +91 9656216086.
            </p>
            <div className="social-links">
              <a href="#"><Facebook size={18} /></a>
              <a href="#"><Twitter size={18} /></a>
              <a href="#"><Instagram size={18} /></a>
              <a href="#"><Youtube size={18} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/shop">New Arrivals</Link></li>
              <li><Link to="/shop">Best Sellers</Link></li>
              <li><Link to="/shop">Outerwear</Link></li>
              <li><Link to="/shop">Accessories</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4>Newsletter</h4>
            <p>Join our list and get 15% off your first order.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Email Address" />
              <button><Send size={18} /></button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 True Fit. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/terms-of-service">Terms</Link>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>

      
    </footer>
  );
};

export default Footer;
