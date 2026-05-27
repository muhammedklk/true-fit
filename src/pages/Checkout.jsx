import React, { useState, useEffect, useRef } from 'react';
import { useProducts } from '../context/ProductContext';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Wallet, Landmark, X, Check } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { cart, placeOrder } = useProducts();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setLocationAddress = (address) => {
    setFormData(prev => ({ ...prev, address }));
  };

  const locationAddress = formData.address;
  
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);
  const geocoderInstance = useRef(null);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const loadGoogleMaps = () => {
    if (!window.google) {
      const script = document.createElement('script');
      // Replace YOUR_API_KEY with actual key for production
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  };

  const initMap = () => {
    if (!mapRef.current || !window.google) return;

    const defaultLocation = { lat: 51.5074, lng: -0.1278 }; // London

    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center: defaultLocation,
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
    });

    markerInstance.current = new window.google.maps.Marker({
      position: defaultLocation,
      map: mapInstance.current,
      draggable: true,
      title: "Drag to your location",
      animation: window.google.maps.Animation.DROP,
    });

    geocoderInstance.current = new window.google.maps.Geocoder();

    window.google.maps.event.addListener(markerInstance.current, 'dragend', () => {
      geocodePosition(markerInstance.current.getPosition());
    });

    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          mapInstance.current.setCenter(pos);
          markerInstance.current.setPosition(pos);
          geocodePosition(pos);
        },
        () => {
          console.log("Geolocation failed or denied.");
        }
      );
    }
  };

  const geocodePosition = (pos) => {
    if (!geocoderInstance.current) return;
    geocoderInstance.current.geocode({ latLng: pos }, (responses, status) => {
      if (status === 'OK' && responses && responses.length > 0) {
        setLocationAddress(responses[0].formatted_address);
      }
    });
  };

  useEffect(() => {
    if (isMapModalOpen) {
      loadGoogleMaps();
    }
  }, [isMapModalOpen]);

  const handleConfirmLocation = () => {
    if (!locationAddress) {
      setLocationAddress('Selected from Map');
    }
    setIsMapModalOpen(false);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    
    const orderData = {
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
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

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" required placeholder="john@example.com" value={formData.email} onChange={handleInputChange} />
              </div>

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
                  <input type="text" name="city" required placeholder="London" value={formData.city} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Postal Code</label>
                  <input type="text" name="postalCode" required placeholder="SW1A 1AA" value={formData.postalCode} onChange={handleInputChange} />
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
        <div className="map-modal-overlay">
          <div className="map-modal">
            <div className="map-modal-header">
              <h3>Select Location</h3>
              <button className="map-modal-close" onClick={() => setIsMapModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <p style={{ marginBottom: '15px', color: 'var(--text-muted)' }}>
              Drag the marker to your exact shipping location.
            </p>
            <div className="map-container" ref={mapRef}>
              <div className="map-loading">
                {!window.google ? 'Google Maps API not loaded. Add your API key.' : 'Loading Map...'}
              </div>
            </div>
            <button className="btn btn-primary w-100" onClick={handleConfirmLocation}>
              <Check size={18} style={{ marginRight: '8px' }} /> Confirm Location
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
