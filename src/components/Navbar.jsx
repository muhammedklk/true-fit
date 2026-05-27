import './Navbar.css';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, LogOut } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, user, logout } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="nav-left">
           <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(true)}>
             <Menu size={24} />
           </button>
           <Link to="/" className="logo">
             TRUE<span>FIT</span>
           </Link>
        </div>

        <div className={`nav-links-wrapper ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-header">
             <div className="logo">TRUE<span>FIT</span></div>
             <button className="close-menu-btn" onClick={() => setIsMenuOpen(false)}>
               <X size={24} />
             </button>
          </div>
          <div className="nav-links">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={location.pathname === link.path ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user && user.role === 'admin' && (
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>
            )}
          </div>
        </div>

        <div className="nav-actions">
          {isSearchOpen ? (
            <form onSubmit={handleSearchSubmit} className="search-form d-none-mobile">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="search-input"
              />
              <button type="button" className="close-search-btn" onClick={() => setIsSearchOpen(false)}>
                <X size={16} />
              </button>
            </form>
          ) : (
            <button className="nav-icon-btn d-none-mobile" onClick={() => setIsSearchOpen(true)}>
              <Search size={20} />
            </button>
          )}
          <div className="user-profile">
            <button className="nav-icon-btn profile-trigger" onClick={() => !user && navigate('/login')}>
              <User size={20} />
            </button>
            <div className="profile-dropdown">
              {user ? (
                <>
                  <div className="dropdown-header">
                    <strong>{user.name}</strong>
                    <span>{user.role === 'admin' ? 'Administrator' : 'Customer'}</span>
                  </div>
                  {user.role === 'admin' ? (
                    <Link to="/admin">Admin Dashboard</Link>
                  ) : (
                    <Link to="/profile">My Profile</Link>
                  )}
                  <button onClick={() => { logout(); navigate('/'); }} className="logout-btn">
                    <LogOut size={16} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <div className="dropdown-header">
                    <strong>Guest</strong>
                    <span>Welcome to True Fit</span>
                  </div>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                </>
              )}
            </div>
          </div>
          <Link to="/cart" className="nav-icon-btn cart-btn">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>

      
    </nav>
  );
};

export default Navbar;
