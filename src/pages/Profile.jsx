import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import {
  Package, Truck, CheckCircle, Clock,
  MapPin, LogOut, User, Mail, ShoppingBag,
  ChevronRight, Box, Phone, Edit2, Save, X,
  Home, Navigation, Check
} from 'lucide-react';
import './Profile.css';

/* ── Tiny OpenStreetMap location picker (no API key needed) ── */
const LocationPickerModal = ({ onConfirm, onClose, defaultAddress }) => {
  const [coords, setCoords]     = useState(null);
  const [address, setAddress]   = useState(defaultAddress || '');
  const [loading, setLoading]   = useState(false);
  const [mapUrl, setMapUrl]     = useState('');
  const [error, setError]       = useState('');

  const reverseGeocode = async (lat, lng) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json();
      const addr = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      setAddress(addr);
      setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lng}`);
    } catch {
      setError('Could not fetch address. You can type it manually.');
    }
    setLoading(false);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) { setError('Geolocation not supported.'); return; }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setCoords({ lat, lng });
        reverseGeocode(lat, lng);
      },
      () => { setLoading(false); setError('Location access denied. Please type address manually.'); }
    );
  };

  return (
    <div className="loc-modal-overlay" onClick={onClose}>
      <div className="loc-modal" onClick={e => e.stopPropagation()}>
        <div className="loc-modal-header">
          <h3><MapPin size={18} /> Pick Location</h3>
          <button className="loc-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="loc-modal-body">
          <button className="loc-gps-btn" onClick={getCurrentLocation} disabled={loading}>
            <Navigation size={16} />
            {loading ? 'Getting location…' : 'Use My Current Location'}
          </button>

          {error && <p className="loc-error">{error}</p>}

          {mapUrl && (
            <div className="loc-map-wrap">
              <iframe
                title="location-map"
                src={mapUrl}
                className="loc-map-iframe"
                allowFullScreen
              />
              <p className="loc-map-note">📍 Your location is shown on the map</p>
            </div>
          )}

          <div className="loc-address-group">
            <label>Address</label>
            <textarea
              className="loc-address-input"
              value={address}
              onChange={e => setAddress(e.target.value)}
              rows={3}
              placeholder="Type or use GPS to auto-fill your address…"
            />
          </div>
        </div>

        <div className="loc-modal-footer">
          <button className="loc-cancel-btn" onClick={onClose}>Cancel</button>
          <button
            className="loc-confirm-btn"
            onClick={() => { if (address.trim()) { onConfirm(address.trim(), coords); onClose(); } }}
            disabled={!address.trim()}
          >
            <Check size={16} /> Confirm Address
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────── */
const Profile = () => {
  const { user, orders, logout, updateProfile } = useProducts();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [showLocPicker, setShowLocPicker] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name:       user?.name       || '',
    phone:      user?.phone      || '',
    address:    user?.address    || '',
    city:       user?.city       || '',
    postalCode: user?.postalCode || '',
  });

  if (!user || user.role !== 'customer') {
    navigate('/login');
    return null;
  }

  const userOrders = orders.filter(o => o.customer.email === user.email);

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const handleSave = () => {
    updateProfile(form);
    setSaved(true);
    setEditMode(false);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCancel = () => {
    setForm({
      name:       user.name       || '',
      phone:      user.phone      || '',
      address:    user.address    || '',
      city:       user.city       || '',
      postalCode: user.postalCode || '',
    });
    setEditMode(false);
  };

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return { bg: '#f0fdf4', color: '#16a34a', dot: '#16a34a', label: 'Delivered' };
      case 'shipped':   return { bg: '#eff6ff', color: '#2563eb', dot: '#2563eb', label: 'Shipped'   };
      case 'pending':   return { bg: '#fff7ed', color: '#ea580c', dot: '#ea580c', label: 'Pending'   };
      default:          return { bg: '#f8fafc', color: '#64748b', dot: '#94a3b8', label: status      };
    }
  };

  return (
    <div className="profile-page">
      {/* ── Hero ── */}
      <div className="profile-hero">
        <div className="container">
          <div className="profile-hero-inner">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">{initials}</div>
              <div className="profile-avatar-ring"></div>
            </div>
            <div className="profile-hero-info">
              <p className="profile-greeting">Welcome back 👋</p>
              <h1 className="profile-name">{user.name}</h1>
              <p className="profile-email-display"><Mail size={13} /> {user.email}</p>
            </div>
            <button
              className="profile-logout-btn"
              onClick={() => { logout(); navigate('/'); }}
            >
              <LogOut size={16} /><span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container profile-body">
        {saved && (
          <div className="save-toast">
            <Check size={16} /> Profile saved successfully!
          </div>
        )}

        <div className="profile-layout">
          {/* ── SIDEBAR ── */}
          <aside className="profile-sidebar">

            {/* Account Details / Edit Card */}
            <div className="profile-card account-card">
              <div className="card-heading-row">
                <div className="card-heading"><User size={15} /> Account Details</div>
                {!editMode ? (
                  <button className="edit-btn" onClick={() => setEditMode(true)}>
                    <Edit2 size={14} /> Edit
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button className="cancel-edit-btn" onClick={handleCancel}><X size={14} /></button>
                    <button className="save-edit-btn" onClick={handleSave}><Save size={14} /> Save</button>
                  </div>
                )}
              </div>

              {!editMode ? (
                /* ── View Mode ── */
                <>
                  <div className="account-detail-row">
                    <span className="detail-label"><User size={11}/> Full Name</span>
                    <span className="detail-val">{user.name}</span>
                  </div>
                  <div className="account-detail-row">
                    <span className="detail-label"><Mail size={11}/> Email</span>
                    <span className="detail-val">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="account-detail-row">
                      <span className="detail-label"><Phone size={11}/> Phone</span>
                      <span className="detail-val">{user.phone}</span>
                    </div>
                  )}
                  {user.address && (
                    <div className="account-detail-row">
                      <span className="detail-label"><Home size={11}/> Address</span>
                      <span className="detail-val addr-val">{user.address}{user.city ? `, ${user.city}` : ''}{user.postalCode ? ` - ${user.postalCode}` : ''}</span>
                    </div>
                  )}
                  {!user.phone && !user.address && (
                    <p className="add-details-hint" onClick={() => setEditMode(true)}>
                      <Edit2 size={13}/> Add phone & address for faster checkout
                    </p>
                  )}
                </>
              ) : (
                /* ── Edit Mode ── */
                <div className="edit-form">
                  <div className="edit-field">
                    <label>Full Name</label>
                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" />
                  </div>
                  <div className="edit-field">
                    <label>Phone</label>
                    <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 98765 43210" type="tel" />
                  </div>
                  <div className="edit-field">
                    <label>Address</label>
                    <div className="edit-addr-row">
                      <input
                        value={form.address}
                        onChange={e => setForm({...form, address: e.target.value})}
                        placeholder="Street address"
                      />
                      <button
                        type="button"
                        className="loc-pick-btn"
                        onClick={() => setShowLocPicker(true)}
                        title="Pick from map"
                      >
                        <MapPin size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="edit-field">
                    <label>City</label>
                    <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} placeholder="City" />
                  </div>
                  <div className="edit-field">
                    <label>Postal Code</label>
                    <input value={form.postalCode} onChange={e => setForm({...form, postalCode: e.target.value})} placeholder="686001" />
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="profile-card stats-card">
              <div className="stat-item">
                <div className="stat-num">{userOrders.length}</div>
                <div className="stat-label">Orders</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-num">{userOrders.filter(o => o.status?.toLowerCase() === 'delivered').length}</div>
                <div className="stat-label">Delivered</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-num">{userOrders.filter(o => o.status?.toLowerCase() === 'pending').length}</div>
                <div className="stat-label">Pending</div>
              </div>
            </div>

            <button className="profile-shop-btn" onClick={() => navigate('/shop')}>
              <ShoppingBag size={16} /> Continue Shopping <ChevronRight size={14} />
            </button>
          </aside>

          {/* ── ORDERS ── */}
          <main className="profile-main">
            <div className="orders-heading">
              <h2><Box size={20} /> My Orders</h2>
              <span className="orders-count">{userOrders.length} order{userOrders.length !== 1 ? 's' : ''}</span>
            </div>

            {userOrders.length === 0 ? (
              <div className="no-orders">
                <div className="no-orders-icon"><Package size={40} /></div>
                <h3>No orders yet</h3>
                <p>Looks like you haven't made an order yet. Start shopping!</p>
                <button className="profile-shop-btn inline" onClick={() => navigate('/shop')}>
                  <ShoppingBag size={16} /> Start Shopping
                </button>
              </div>
            ) : (
              <div className="orders-list">
                {userOrders.map(order => {
                  const sc = getStatusConfig(order.status);
                  return (
                    <div key={order.id} className="order-card">
                      <div className="order-card-header">
                        <div className="order-id-block">
                          <span className="order-id-label">ORDER</span>
                          <span className="order-id-val">{order.id}</span>
                        </div>
                        <div className="order-card-right">
                          <span className="order-date-tag"><Clock size={12}/> {order.date}</span>
                          <span className="order-badge" style={{background: sc.bg, color: sc.color}}>
                            <span className="badge-dot" style={{background: sc.dot}}></span>
                            {sc.label}
                          </span>
                        </div>
                      </div>

                      <div className="order-timeline">
                        <div className={`tl-step ${order.date ? 'done' : ''}`}>
                          <div className="tl-icon"><CheckCircle size={15}/></div>
                          <div className="tl-line"></div>
                          <div className="tl-text">
                            <span className="tl-title">Order Placed</span>
                            <span className="tl-sub">{order.date}</span>
                          </div>
                        </div>
                        <div className={`tl-step ${order.shippingStarted ? 'done' : 'grey'}`}>
                          <div className="tl-icon"><Truck size={15}/></div>
                          <div className="tl-line"></div>
                          <div className="tl-text">
                            <span className="tl-title">Shipping Started</span>
                            <span className="tl-sub">{order.shippingStarted ? 'In Transit' : 'Pending'}</span>
                          </div>
                        </div>
                        <div className={`tl-step ${order.shipped ? 'done' : 'grey'}`}>
                          <div className="tl-icon"><Package size={15}/></div>
                          <div className="tl-line last"></div>
                          <div className="tl-text">
                            <span className="tl-title">Out for Delivery</span>
                            <span className="tl-sub"><MapPin size={11}/> {order.location || '—'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="order-items-wrap">
                        <div className="order-items-list">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="order-item-row">
                              <img src={item.images?.[0] || 'https://via.placeholder.com/50'} alt={item.name}
                                   onError={e => { e.target.src = 'https://via.placeholder.com/50'; }} />
                              <div className="order-item-info">
                                <span className="order-item-name">{item.name}</span>
                                <span className="order-item-qty">Qty: {item.quantity}</span>
                              </div>
                              <span className="order-item-price">Rs.{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                        <div className="order-total-row">
                          <span>Total Paid</span>
                          <strong>Rs.{order.total?.toLocaleString('en-IN', {minimumFractionDigits: 2})}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Location Picker Modal */}
      {showLocPicker && (
        <LocationPickerModal
          defaultAddress={form.address}
          onConfirm={(addr, coords) => {
            setForm(prev => ({ ...prev, address: addr }));
          }}
          onClose={() => setShowLocPicker(false)}
        />
      )}
    </div>
  );
};

export default Profile;
