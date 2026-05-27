import './Shop.css';
import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Shop = () => {
  const { products, categories } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const activeCat = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = products.filter(p => {
    const matchCat = activeCat === 'All' || p.category === activeCat;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleCatChange = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
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
            <button className="filter-trigger">
               <SlidersHorizontal size={18} />
               Filters
            </button>
          </div>
        </div>

        <div className="grid-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-shop" style={{ textAlign: 'center', padding: '50px 0' }}>
            <h3>No products found {searchQuery ? `for "${searchQuery}"` : 'in this category'}.</h3>
            <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => {
              searchParams.delete('search');
              searchParams.delete('category');
              setSearchParams(searchParams);
            }}>Clear Filters</button>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default Shop;
