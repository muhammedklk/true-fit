import React, { useState, useEffect, useRef } from 'react';
import { useProducts } from '../context/ProductContext';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Wallet, Landmark, X, Check, Navigation } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { cart, placeOrder, user } = useProducts();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);
  const [mapError, setMapError] = useState('');
  const [mapUrl, setMapUrl] = useState('');
  const [tempAddress, setTempAddress] = useState('');

  const [formData, setFormData] = useState(() => {
    // Auto-fill from saved profile if user is logged in
    if (user && user.role === 'customer') {
      const nameParts = (user.name || '').trim().split(' ');
      return {
        firstName:  nameParts[0] || '',
        lastName:   nameParts.slice(1).join(' ') || '',
        email:      user.email      || '',
        phone:      user.phone      || '',
        address:    user.address    || '',
        city:       user.city       || '',
        postalCode: user.postalCode || '',
        cardName: '', cardNumber: '', expiry: '', cvv: ''
      };
    }
    return {
      firstName: '', lastName: '', email: '', phone: '',
      address: '', city: '', postalCode: '',
      cardName: '', cardNumber: '', expiry: '', cvv: ''
    };
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setLocationAddress = (address) => {
    setFormData(prev => ({ ...prev, address }));
  };

  const locationAddress = formData.address;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  useEffect(() => {
    if (user && user.role === 'customer') {
      const nameParts = (user.name || '').trim().split(' ');
      setFormData(prev => ({
        ...prev,
        firstName: prev.firstName || nameParts[0] || '',
        lastName: prev.lastName || nameParts.slice(1).join(' ') || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
        address: prev.address || user.address || '',
        city: prev.city || user.city || '',
        postalCode: prev.postalCode || user.postalCode || ''
      }));
    }
  }, [user]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setMapError('Geolocation not supported.');
      return;
    }
    setMapLoading(true);
    setMapError('');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            { headers: { 'Accept-Language': 'en' } }
          );
          const data = await res.json();
          const addr = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
          setTempAddress(addr);
          setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lng}`);
        } catch {
          setMapError('Could not fetch address. You can type it manually.');
        }
        setMapLoading(false);
      },
      () => {
        setMapLoading(false);
        setMapError('Location access denied. Please type address manually.');
      }
    );
  };

  useEffect(() => {
    if (isMapModalOpen) {
      setTempAddress(formData.address || '');
      setMapUrl('');
      setMapError('');
    }
  }, [isMapModalOpen, formData.address]);

  const handleConfirmLocation = () => {
    if (tempAddress.trim()) {
      setLocationAddress(tempAddress.trim());
    }
    setIsMapModalOpen(false);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    
    const orderData = {
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.postalCode}`
      },
      items: cart,
      total: total,
      payment: {
        method: paymentMethod,
        details: paymentMethod === 'card' ? {
          cardName: formData.cardName,
          cardNumber: formData.cardNumber.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim() // Mask or format
        } : {}
      }
    };

    placeOrder(orderData);
    alert('Order placed successfully!');
    navigate('/');
  };

  if (cart.length === 0) return null;

  return (
    <div className="checkout-page section-padding">
      <div className="container">
        <h1 className="hero-title">Secure <span>Checkout</span></h1>
        
        <div className="checkout-grid">
          <div className="checkout-form-container">
            <form onSubmit={handleCheckoutSubmit}>
              <h3 className="checkout-section-title"><MapPin size={24} /> Shipping Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" name="firstName" required placeholder="John" value={formData.firstName} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" name="lastName" required placeholder="Doe" value={formData.lastName} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" required placeholder="john@example.com" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleInputChange} />
                </div>
              </div>

              {user && user.address && (
                <div className="autofill-notice">
                  ✓ Address auto-filled from your profile. You can edit below.
                </div>
              )}

              <div className="form-group">
                <label>Current Location / Address</label>
                <div className="location-input-group">
                  <input 
                    type="text" 
                    name="address"
                    required 
                    placeholder="Enter your address or pick from map" 
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  <button type="button" className="btn-map" onClick={() => setIsMapModalOpen(true)}>
                    <MapPin size={18} /> Map
                  </button>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input type="text" name="city" required placeholder="Kochi" value={formData.city} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Postal Code</label>
                  <input type="text" name="postalCode" required placeholder="686001" value={formData.postalCode} onChange={handleInputChange} />
                </div>
              </div>

              <h3 className="checkout-section-title" style={{ marginTop: '40px' }}>
                <Wallet size={24} /> Payment Method
              </h3>
              
              <div className="payment-methods">
                <div 
                  className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={32} />
                  <span>Credit Card</span>
                </div>
                <div 
                  className={`payment-method ${paymentMethod === 'paypal' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <Wallet size={32} />
                  <span>PayPal</span>
                </div>
                <div 
                  className={`payment-method ${paymentMethod === 'cod' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <Landmark size={32} />
                  <span>Cash on Delivery</span>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="card-details">
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input type="text" name="cardName" required placeholder="John Doe" value={formData.cardName} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Card Number</label>
                    <input type="text" name="cardNumber" required placeholder="XXXX XXXX XXXX XXXX" maxLength="19" value={formData.cardNumber} onChange={handleInputChange} />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input type="text" name="expiry" required placeholder="MM/YY" maxLength="5" value={formData.expiry} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input type="text" name="cvv" required placeholder="123" maxLength="4" value={formData.cvv} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100" style={{ marginTop: '20px', padding: '15px' }}>
                Place Order — Rs.{total.toFixed(2)}
              </button>
            </form>
          </div>

          <div className="checkout-summary-wrapper">
            <div className="checkout-summary">
              <h3 className="checkout-section-title">Order Summary</h3>
              
              <div className="checkout-summary-items">
                {cart.map(item => (
                  <div key={item.id} className="checkout-summary-item">
                    <img src={(item.images && item.images.length > 0) ? item.images[0] : (item.image || 'https://via.placeholder.com/100')} alt={item.name} />
                    <div className="checkout-summary-item-info">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity} × Rs.{item.price}</p>
                    </div>
                    <div style={{ marginLeft: 'auto', fontWeight: '600' }}>
                      Rs.{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="checkout-summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>Rs.{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Rs.{shipping.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>Rs.{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMapModalOpen && (
        <div className="map-modal-overlay" onClick={() => setIsMapModalOpen(false)}>
          <div className="map-modal" onClick={e => e.stopPropagation()}>
            <div className="map-modal-header">
              <h3><MapPin size={18} /> Pick Location</h3>
              <button type="button" className="map-modal-close" onClick={() => setIsMapModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="map-modal-body" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button
                type="button"
                className="loc-gps-btn"
                onClick={getCurrentLocation}
                disabled={mapLoading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '2px solid var(--accent-color)',
                  background: 'rgba(121,163,33,0.07)',
                  color: 'var(--accent-color)',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                <Navigation size={16} />
                {mapLoading ? 'Getting location…' : 'Use My Current Location'}
              </button>

              {mapError && (
                <div style={{ color: '#ef4444', background: '#fef2f2', border: '1px solid #fecaca', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem' }}>
                  {mapError}
                </div>
              )}

              {mapUrl && (
                <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <iframe
                    title="checkout-map"
                    src={mapUrl}
                    style={{ width: '100%', height: '200px', border: 'none', display: 'block' }}
                    allowFullScreen
                  />
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', color: '#aaa' }}>Address</label>
                <textarea
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid var(--border-color)', fontSize: '0.88rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }}
                  value={tempAddress}
                  onChange={e => setTempAddress(e.target.value)}
                  rows={3}
                  placeholder="Type or use GPS to auto-fill your address…"
                />
              </div>
            </div>
            <div className="map-modal-footer" style={{ display: 'flex', gap: '10px', padding: '16px 20px', borderTop: '1px solid var(--border-color)' }}>
              <button type="button" className="btn btn-secondary" style={{ flex: 1, padding: '11px', borderRadius: '100px' }} onClick={() => setIsMapModalOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ flex: 2, padding: '11px', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                onClick={handleConfirmLocation}
                disabled={!tempAddress.trim()}
              >
                <Check size={16} /> Confirm Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
