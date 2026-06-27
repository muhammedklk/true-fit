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

  // Multi-select: empty array = "All" selected
  const [brandFilters, setBrandFilters] = useState([]);
  const [priceFilters, setPriceFilters] = useState([]);
  const [colorFilters, setColorFilters] = useState([]);
  const [materialFilters, setMaterialFilters] = useState([]);
  
  const activeCat = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';

  // Generic toggle helper for multi-select arrays
  const toggleFilter = (current, setter, value) => {
    if (value === 'All') {
      setter([]);
      return;
    }
    if (current.includes(value)) {
      // deselect it
      const next = current.filter(v => v !== value);
      setter(next);
    } else {
      setter([...current, value]);
    }
  };

  // Price range checker helper
  const priceInRange = (price, range) => {
    if (range === 'under500')   return price < 500;
    if (range === '500to1500')  return price >= 500 && price <= 1500;
    if (range === '1500to3000') return price >= 1500 && price <= 3000;
    if (range === 'over3000')   return price > 3000;
    return false;
  };

  const hasActiveFilters = brandFilters.length > 0 || priceFilters.length > 0 || colorFilters.length > 0 || materialFilters.length > 0;

  const filteredProducts = products.filter(p => {
    const matchCat    = activeCat === 'All' || p.category === activeCat;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Multi-select: empty array means "All"
    const matchBrand    = brandFilters.length === 0 || brandFilters.includes(p.brand);
    const matchColor    = colorFilters.length === 0 || colorFilters.includes(p.color);
    const matchMaterial = materialFilters.length === 0 || materialFilters.includes(p.material);
    const matchPrice    = priceFilters.length === 0 || priceFilters.some(range => priceInRange(p.price, range));

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
    setBrandFilters([]);
    setPriceFilters([]);
    setColorFilters([]);
    setMaterialFilters([]);
  };

  const PRICE_OPTIONS = [
    { label: 'Under ₹500',    value: 'under500' },
    { label: '₹500 - ₹1500', value: '500to1500' },
    { label: '₹1500 - ₹3000',value: '1500to3000' },
    { label: 'Over ₹3000',   value: 'over3000' },
  ];

  const BRAND_OPTIONS = ["Zara", "H&M", "Uniqlo", "True Fit", "Nike"];

  const COLOR_OPTIONS = [
    { name: "Black", code: "#111111" },
    { name: "White", code: "#fcfcfc", border: true },
    { name: "Grey",  code: "#888888" },
    { name: "Blue",  code: "#0077b6" },
    { name: "Olive", code: "#556b2f" },
    { name: "Gold",  code: "#ffd700" },
    { name: "Beige", code: "#f5f5dc", border: true },
    { name: "Brown", code: "#8b4513" },
  ];

  const MATERIAL_OPTIONS = ["Organic Cotton", "Denim", "Merino Wool", "Genuine Leather", "Stainless Steel"];

  return (
    <div className="shop-page">
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
            <button
              className={`filter-trigger ${hasActiveFilters ? 'active-filters' : ''}`}
              onClick={() => setIsFilterOpen(true)}
            >
              <SlidersHorizontal size={18} />
              Filters
              {hasActiveFilters && (
                <span className="filter-count-badge">
                  {brandFilters.length + priceFilters.length + colorFilters.length + materialFilters.length}
                </span>
              )}
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
        <div className="filter-drawer-drag-handle"></div>
        <div className="filter-drawer-header">
          <h3>Filter Options</h3>
          <button className="close-filter-btn" onClick={() => setIsFilterOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="filter-drawer-body">
          {/* Price Filters - Multi-select */}
          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="filter-options-grid">
              <button
                className={`filter-pill-btn ${priceFilters.length === 0 ? 'active' : ''}`}
                onClick={() => setPriceFilters([])}
              >
                All Prices
              </button>
              {PRICE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`filter-pill-btn ${priceFilters.includes(opt.value) ? 'active' : ''}`}
                  onClick={() => toggleFilter(priceFilters, setPriceFilters, opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filters - Multi-select */}
          <div className="filter-section">
            <h4>Brands</h4>
            <div className="filter-options-grid">
              <button
                className={`filter-pill-btn ${brandFilters.length === 0 ? 'active' : ''}`}
                onClick={() => setBrandFilters([])}
              >
                All
              </button>
              {BRAND_OPTIONS.map(brand => (
                <button
                  key={brand}
                  className={`filter-pill-btn ${brandFilters.includes(brand) ? 'active' : ''}`}
                  onClick={() => toggleFilter(brandFilters, setBrandFilters, brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Colors Filters - Multi-select */}
          <div className="filter-section">
            <h4>Color</h4>
            <div className="filter-colors-grid">
              <button
                className={`color-swatch-btn all-colors ${colorFilters.length === 0 ? 'active' : ''}`}
                onClick={() => setColorFilters([])}
                title="All Colors"
              >
                All
              </button>
              {COLOR_OPTIONS.map(color => (
                <button
                  key={color.name}
                  className={`color-swatch-btn ${colorFilters.includes(color.name) ? 'active' : ''}`}
                  onClick={() => toggleFilter(colorFilters, setColorFilters, color.name)}
                  style={{
                    backgroundColor: color.code,
                    border: color.border ? '2px solid #ddd' : '2px solid transparent'
                  }}
                  title={color.name}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quality / Material Filters - Multi-select */}
          <div className="filter-section">
            <h4>Quality &amp; Material</h4>
            <div className="filter-options-grid">
              <button
                className={`filter-pill-btn ${materialFilters.length === 0 ? 'active' : ''}`}
                onClick={() => setMaterialFilters([])}
              >
                All
              </button>
              {MATERIAL_OPTIONS.map(mat => (
                <button
                  key={mat}
                  className={`filter-pill-btn ${materialFilters.includes(mat) ? 'active' : ''}`}
                  onClick={() => toggleFilter(materialFilters, setMaterialFilters, mat)}
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
