import './Shop.css';
import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Shop = () => {
  const { products, categories } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [brandFilter, setBrandFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [colorFilter, setColorFilter] = useState('All');
  const [materialFilter, setMaterialFilter] = useState('All');
  
  const activeCat = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = products.filter(p => {
    const matchCat = activeCat === 'All' || p.category === activeCat;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Brand Filter Match
    const matchBrand = brandFilter === 'All' || p.brand === brandFilter;
    
    // Color Filter Match
    const matchColor = colorFilter === 'All' || p.color === colorFilter;
    
    // Material Filter Match
    const matchMaterial = materialFilter === 'All' || p.material === materialFilter;
    
    // Price Filter Match
    let matchPrice = true;
    if (priceFilter === 'under500') {
      matchPrice = p.price < 500;
    } else if (priceFilter === '500to1500') {
      matchPrice = p.price >= 500 && p.price <= 1500;
    } else if (priceFilter === '1500to3000') {
      matchPrice = p.price >= 1500 && p.price <= 3000;
    } else if (priceFilter === 'over3000') {
      matchPrice = p.price > 3000;
    }

    return matchCat && matchSearch && matchBrand && matchColor && matchMaterial && matchPrice;
  });

  const handleCatChange = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleClearAll = () => {
    setBrandFilter('All');
    setPriceFilter('All');
    setColorFilter('All');
    setMaterialFilter('All');
  };

  return (
    <div className="shop-page section-padding">
      <div className="container">
        <div className="shop-header">
          <h1 className="hero-title">Our <span>Collection</span></h1>
          <div className="shop-controls">
            <div className="cat-scroll">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`cat-btn ${activeCat === cat ? 'active' : ''}`}
                  onClick={() => handleCatChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button className={`filter-trigger ${brandFilter !== 'All' || priceFilter !== 'All' || colorFilter !== 'All' || materialFilter !== 'All' ? 'active-filters' : ''}`} onClick={() => setIsFilterOpen(true)}>
               <SlidersHorizontal size={18} />
               Filters {(brandFilter !== 'All' || priceFilter !== 'All' || colorFilter !== 'All' || materialFilter !== 'All') && <span className="filter-count-badge">●</span>}
            </button>
          </div>
        </div>

        <div className="row g-3 g-md-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-shop" style={{ textAlign: 'center', padding: '50px 0' }}>
            <h3>No products found {searchQuery ? `for "${searchQuery}"` : 'matching your filters'}.</h3>
            <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => {
              searchParams.delete('search');
              searchParams.delete('category');
              setSearchParams(searchParams);
              handleClearAll();
            }}>Clear Filters</button>
          </div>
        )}
      </div>

      {/* Filter Sidebar Drawer */}
      <div className={`filter-drawer-backdrop ${isFilterOpen ? 'open' : ''}`} onClick={() => setIsFilterOpen(false)}></div>
      <div className={`filter-drawer ${isFilterOpen ? 'open' : ''}`}>
        <div className="filter-drawer-header">
          <h3>Filter Options</h3>
          <button className="close-filter-btn" onClick={() => setIsFilterOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="filter-drawer-body">
          {/* Price Filters */}
          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="filter-options-grid">
              <button 
                className={`filter-pill-btn ${priceFilter === 'All' ? 'active' : ''}`} 
                onClick={() => setPriceFilter('All')}
              >
                All Prices
              </button>
              <button 
                className={`filter-pill-btn ${priceFilter === 'under500' ? 'active' : ''}`} 
                onClick={() => setPriceFilter('under500')}
              >
                Under ₹500
              </button>
              <button 
                className={`filter-pill-btn ${priceFilter === '500to1500' ? 'active' : ''}`} 
                onClick={() => setPriceFilter('500to1500')}
              >
                ₹500 - ₹1500
              </button>
              <button 
                className={`filter-pill-btn ${priceFilter === '1500to3000' ? 'active' : ''}`} 
                onClick={() => setPriceFilter('1500to3000')}
              >
                ₹1500 - ₹3000
              </button>
              <button 
                className={`filter-pill-btn ${priceFilter === 'over3000' ? 'active' : ''}`} 
                onClick={() => setPriceFilter('over3000')}
              >
                Over ₹3000
              </button>
            </div>
          </div>

          {/* Brands Filters */}
          <div className="filter-section">
            <h4>Brands</h4>
            <div className="filter-options-grid">
              {["All", "Zara", "H&M", "Uniqlo", "True Fit", "Nike"].map(brand => (
                <button 
                  key={brand}
                  className={`filter-pill-btn ${brandFilter === brand ? 'active' : ''}`} 
                  onClick={() => setBrandFilter(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Colors Filters */}
          <div className="filter-section">
            <h4>Color</h4>
            <div className="filter-colors-grid">
              <button 
                className={`color-swatch-btn all-colors ${colorFilter === 'All' ? 'active' : ''}`}
                onClick={() => setColorFilter('All')}
                title="All Colors"
              >
                All
              </button>
              {[
                { name: "Black", code: "#111111" },
                { name: "White", code: "#fcfcfc", border: true },
                { name: "Grey", code: "#888888" },
                { name: "Blue", code: "#0077b6" },
                { name: "Olive", code: "#556b2f" },
                { name: "Gold", code: "#ffd700" },
                { name: "Beige", code: "#f5f5dc", border: true },
                { name: "Brown", code: "#8b4513" }
              ].map(color => (
                <button 
                  key={color.name}
                  className={`color-swatch-btn ${colorFilter === color.name ? 'active' : ''}`}
                  onClick={() => setColorFilter(color.name)}
                  style={{ 
                    backgroundColor: color.code,
                    border: color.border ? '1px solid #ddd' : 'none'
                  }}
                  title={color.name}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quality / Material Filters */}
          <div className="filter-section">
            <h4>Quality & Material</h4>
            <div className="filter-options-grid">
              {["All", "Organic Cotton", "Denim", "Merino Wool", "Genuine Leather", "Stainless Steel"].map(mat => (
                <button 
                  key={mat}
                  className={`filter-pill-btn ${materialFilter === mat ? 'active' : ''}`} 
                  onClick={() => setMaterialFilter(mat)}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="filter-drawer-footer">
          <button className="clear-all-btn" onClick={handleClearAll}>
            Clear All
          </button>
          <button className="apply-btn" onClick={() => setIsFilterOpen(false)}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
