import './Admin.css';
import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Trash2, LayoutGrid, Box, Settings, LogOut, 
  Image as ImageIcon, Video, X, Tag, TrendingUp, CreditCard, ShoppingCart, User, MapPin,
  Truck, CheckCircle
} from 'lucide-react';

const Admin = () => {
  const { products, addProduct, removeProduct, categories, offers, updateOffers, user, logout, orders, updateOrderStatus } = useProducts();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Shirts',
    price: '',
    images: [''],
    videos: [''],
    description: '',
    trending: false
  });

  const [offerData, setOfferData] = useState([]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (offers) setOfferData(offers);
  }, [offers]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    const filteredImages = formData.images.filter(img => img && img.trim() !== '');
    const filteredVideos = formData.videos.filter(vid => vid && vid.trim() !== '');
    
    addProduct({
      ...formData,
      price: parseFloat(formData.price) || 0,
      images: filteredImages.length > 0 ? filteredImages : ['https://via.placeholder.com/400'],
      videos: filteredVideos
    });
    setFormData({ name: '', category: 'Shirts', price: '', images: [''], videos: [''], description: '', trending: false });
    setIsAdding(false);
  };

  const handleUpdateOffers = () => {
    updateOffers(offerData);
    alert('Offers updated successfully!');
  };

  const addImageField = () => setFormData({...formData, images: [...formData.images, '']});
  const addVideoField = () => setFormData({...formData, videos: [...formData.videos, '']});

  const updateMediaField = (type, index, value) => {
    const newMedia = [...formData[type]];
    newMedia[index] = value;
    setFormData({...formData, [type]: newMedia});
  };

  const removeMediaField = (type, index) => {
    const newMedia = formData[type].filter((_, i) => i !== index);
    if (newMedia.length === 0) newMedia.push('');
    setFormData({...formData, [type]: newMedia});
  };

  const handleFileUpload = (e, type) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => {
          const currentMedia = prev[type].filter(item => item.trim() !== '');
          return {
            ...prev,
            [type]: [...currentMedia, reader.result, '']
          };
        });
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <div className="admin-logo">TF Admin</div>
        <nav className="admin-nav">
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            <LayoutGrid size={20} /> Dashboard
          </button>
          <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
            <Box size={20} /> Products
          </button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            <ShoppingCart size={20} /> Orders
          </button>
          <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
            <Settings size={20} /> Settings
          </button>
        </nav>
        <button className="admin-logout" onClick={() => { logout(); navigate('/'); }}>
          <LogOut size={20} /> Sign Out
        </button>
      </div>

      <div className="admin-main">
        <header className="admin-header">
          <h1>{activeTab.toUpperCase()}</h1>
          <div className="admin-user-info">
            <span>Welcome, <strong>{user.name}</strong></span>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="dashboard-view fade-in">
            <div className="stats-grid">
              <div className="stat-card">
                <Box className="stat-icon" />
                <div>
                   <span>Total Products</span>
                   <strong>{products?.length || 0}</strong>
                </div>
              </div>
              <div className="stat-card">
                 <TrendingUp className="stat-icon" />
                 <div>
                    <span>Total Orders</span>
                    <strong>{orders?.length || 0}</strong>
                 </div>
              </div>
              <div className="stat-card">
                 <CreditCard className="stat-icon" />
                 <div>
                    <span>Total Revenue</span>
                    <strong>Rs.{orders?.reduce((acc, order) => acc + order.total, 0).toFixed(2) || '0.00'}</strong>
                 </div>
              </div>
            </div>

            <div className="offers-management">
               <h3>Edit Home Offers</h3>
               <p>Update the special promotions displayed on the home page.</p>
               <div className="offers-grid">
                  {offerData && offerData.map((offer, idx) => (
                    <div key={offer.id || idx} className="offer-edit-card">
                       <label>Offer {idx + 1} Title</label>
                       <input 
                         type="text" 
                         value={offer.title || ''} 
                         onChange={(e) => {
                           const newOffers = [...offerData];
                           newOffers[idx].title = e.target.value;
                           setOfferData(newOffers);
                         }} 
                       />
                       <label>Subtitle</label>
                       <input 
                         type="text" 
                         value={offer.subtitle || ''} 
                         onChange={(e) => {
                           const newOffers = [...offerData];
                           newOffers[idx].subtitle = e.target.value;
                           setOfferData(newOffers);
                         }} 
                       />
                       <label>Image URL</label>
                       <input 
                         type="text" 
                         value={offer.image || ''} 
                         onChange={(e) => {
                           const newOffers = [...offerData];
                           newOffers[idx].image = e.target.value;
                           setOfferData(newOffers);
                         }} 
                       />
                    </div>
                  ))}
               </div>
               <button className="btn btn-primary" onClick={handleUpdateOffers}>Save Offers</button>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="products-view fade-in">
            <div className="products-header">
               <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)}>
                 {isAdding ? 'Cancel' : <><Plus size={18} /> Add New Product</>}
               </button>
            </div>

            {isAdding && (
              <div className="add-product-sections">

                {/* Section 1: Basic Info */}
                <div className="product-section-card">
                  <div className="product-section-header">
                    <div className="section-number">1</div>
                    <div>
                      <h3>Basic Information</h3>
                      <p>Product name, category and price</p>
                    </div>
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Product Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Classic Oxford Shirt"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        {categories && categories.filter(c => c !== 'All').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Price (Rs.)</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 1299"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Images */}
                <div className="product-section-card">
                  <div className="product-section-header">
                    <div className="section-number">2</div>
                    <div>
                      <h3>Product Images</h3>
                      <p>Upload photos or paste image URLs</p>
                    </div>
                  </div>
                  <input type="file" id="image-upload" multiple accept="image/png,image/jpeg,image/jpg" onChange={(e) => handleFileUpload(e, 'images')} style={{display:'none'}} />
                  <label htmlFor="image-upload" className="upload-drop-zone">
                    <ImageIcon size={28} />
                    <span>Click to upload images</span>
                    <small>PNG, JPG supported</small>
                  </label>
                  <div className="media-url-list">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="media-url-row">
                        {img && img.startsWith('data:image') && (
                          <img src={img} alt="preview" className="media-thumb" />
                        )}
                        <input
                          type="text"
                          value={img.startsWith('data:') ? 'Uploaded Image File' : img}
                          onChange={(e) => !img.startsWith('data:') && updateMediaField('images', idx, e.target.value)}
                          placeholder="Or paste image URL (https://...)"
                          readOnly={img.startsWith('data:')}
                        />
                        {formData.images.length > 1 && (
                          <button type="button" onClick={() => removeMediaField('images', idx)} className="remove-media-btn"><X size={15}/></button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addImageField} className="add-field-btn">+ Add another URL</button>
                </div>

                {/* Section 3: Videos */}
                <div className="product-section-card">
                  <div className="product-section-header">
                    <div className="section-number">3</div>
                    <div>
                      <h3>Product Videos</h3>
                      <p>Upload videos or paste video URLs</p>
                    </div>
                  </div>
                  <input type="file" id="video-upload" multiple accept="video/mp4,video/webm,video/ogg" onChange={(e) => handleFileUpload(e, 'videos')} style={{display:'none'}} />
                  <label htmlFor="video-upload" className="upload-drop-zone">
                    <Video size={28} />
                    <span>Click to upload videos</span>
                    <small>MP4, WebM supported</small>
                  </label>
                  <div className="media-url-list">
                    {formData.videos.map((vid, idx) => (
                      <div key={idx} className="media-url-row">
                        <input
                          type="text"
                          value={vid.startsWith('data:') ? 'Uploaded Video File' : vid}
                          onChange={(e) => !vid.startsWith('data:') && updateMediaField('videos', idx, e.target.value)}
                          placeholder="Or paste video URL (https://...)"
                          readOnly={vid.startsWith('data:')}
                        />
                        {formData.videos.length > 1 && (
                          <button type="button" onClick={() => removeMediaField('videos', idx)} className="remove-media-btn"><X size={15}/></button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addVideoField} className="add-field-btn">+ Add another URL</button>
                </div>

                {/* Section 4: Description */}
                <div className="product-section-card">
                  <div className="product-section-header">
                    <div className="section-number">4</div>
                    <div>
                      <h3>Description</h3>
                      <p>Describe the product for customers</p>
                    </div>
                  </div>
                  <textarea
                    rows="4"
                    placeholder="Write a detailed product description..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="description-textarea"
                  ></textarea>
                </div>

                {/* Section 5: Options & Submit */}
                <div className="product-section-card">
                  <div className="product-section-header">
                    <div className="section-number">5</div>
                    <div>
                      <h3>Options</h3>
                      <p>Extra settings for this product</p>
                    </div>
                  </div>
                  <label className="toggle-label">
                    <div className={`toggle-switch ${formData.trending ? 'on' : ''}`} onClick={() => setFormData({...formData, trending: !formData.trending})}>
                      <div className="toggle-knob"></div>
                    </div>
                    <span>Mark as <strong>Trending</strong> — appears in trending section on homepage</span>
                  </label>
                  <div className="form-actions-row">
                    <button type="button" className="btn btn-outline" onClick={() => setIsAdding(false)}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmitProduct}>
                      <Plus size={18} /> Save Product
                    </button>
                  </div>
                </div>

              </div>
            )}

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Media</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.map(product => (
                    <tr key={product.id}>
                      <td>
                        <div className="table-product">
                          <img src={(product.images && product.images.length > 0) ? product.images[0] : 'https://via.placeholder.com/150'} alt="" />
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>${product.price}</td>
                      <td>
                        <span className="media-count">
                          {product.images?.length || 0} Images, {product.videos?.length || 0} Videos
                        </span>
                      </td>
                      <td>
                        <button className="delete-btn" onClick={() => removeProduct(product.id)}>
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-view fade-in">
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Manage Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders && orders.map(order => (
                    <tr key={order.id}>
                      <td>
                        <span className="order-id">{order.id}</span>
                        <div className="order-date">{order.date}</div>
                      </td>
                      <td>
                        <div className="customer-info">
                          <strong>{order.customer.name}</strong>
                          <div>{order.customer.email}</div>
                          <div className="customer-address">
                            <MapPin size={12} /> {order.customer.address}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="order-products-list">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="order-product-item">
                              {item.name} (x{item.quantity})
                            </div>
                          ))}
                        </div>
                      </td>
                      <td><strong>Rs.{order.total.toFixed(2)}</strong></td>
                      <td>
                        <div className="payment-info">
                          <span className={`payment-method-badge ${order.payment.method}`}>
                            {order.payment.method.toUpperCase()}
                          </span>
                          {order.payment.method === 'card' && (
                            <div className="card-hint">
                              {order.payment.details.cardNumber}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                        <div className="shipping-mini-status">
                          {order.shippingStarted && <Truck size={12} title="Shipping Started" />}
                          {order.shipped && <CheckCircle size={12} title="Shipped" />}
                        </div>
                      </td>
                      <td>
                        <div className="status-controls">
                          <select 
                            value={order.status} 
                            onChange={(e) => updateOrderStatus(order.id, { status: e.target.value })}
                            className="status-select"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          
                          <div className="checkbox-controls">
                            <label>
                              <input 
                                type="checkbox" 
                                checked={order.shippingStarted} 
                                onChange={(e) => updateOrderStatus(order.id, { shippingStarted: e.target.checked })}
                              /> Start Ship
                            </label>
                            <label>
                              <input 
                                type="checkbox" 
                                checked={order.shipped} 
                                onChange={(e) => updateOrderStatus(order.id, { shipped: e.target.checked })}
                              /> Delivered
                            </label>
                          </div>

                          <input 
                            type="text" 
                            placeholder="Current Location" 
                            value={order.location || ''} 
                            onChange={(e) => updateOrderStatus(order.id, { location: e.target.value })}
                            className="location-input"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(!orders || orders.length === 0) && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-view fade-in">
             <div className="settings-card">
                <h3>Store Settings</h3>
                <div className="form-group">
                   <label>Store Name</label>
                   <input type="text" defaultValue="True Fit Premium" />
                </div>
                <div className="form-group">
                   <label>Contact Email</label>
                   <input type="email" defaultValue="klkmmuhammed@gmail.com" />
                </div>
                <button className="btn btn-primary">Update Settings</button>
             </div>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default Admin;
