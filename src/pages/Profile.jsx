import React from 'react';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, MapPin, LogOut } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const { user, orders, logout } = useProducts();
  const navigate = useNavigate();

  if (!user || user.role !== 'customer') {
    navigate('/login');
    return null;
  }

  const userOrders = orders.filter(order => order.customer.email === user.email);

  return (
    <div className="profile-page section-padding">
      <div className="container">
        <div className="profile-header">
          <div className="user-welcome">
            <h1>My <span>Account</span></h1>
            <p>Welcome back, {user.name}!</p>
          </div>
          <button className="btn btn-outline logout-btn" onClick={() => { logout(); navigate('/'); }}>
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="profile-grid">
          <div className="profile-sidebar">
            <div className="profile-card user-info-card">
              <h3>Account Details</h3>
              <div className="info-item">
                <label>Name</label>
                <p>{user.name}</p>
              </div>
              <div className="info-item">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
            </div>
          </div>

          <div className="profile-main">
            <h3>My Orders</h3>
            {userOrders.length === 0 ? (
              <div className="no-orders">
                <Package size={48} />
                <p>You haven't placed any orders yet.</p>
                <button className="btn btn-primary" onClick={() => navigate('/shop')}>Start Shopping</button>
              </div>
            ) : (
              <div className="orders-list">
                {userOrders.map(order => (
                  <div key={order.id} className="order-tracking-card">
                    <div className="order-header">
                      <div className="order-meta">
                        <span className="order-id">{order.id}</span>
                        <span className="order-date"><Clock size={14} /> Placed on {order.date}</span>
                      </div>
                      <div className={`order-status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </div>
                    </div>

                    <div className="tracking-timeline">
                      <div className={`timeline-item ${order.date ? 'completed' : ''}`}>
                        <div className="timeline-icon"><CheckCircle size={16} /></div>
                        <div className="timeline-content">
                          <p className="timeline-title">Order Placed</p>
                          <p className="timeline-date">{order.date}</p>
                        </div>
                      </div>
                      <div className={`timeline-item ${order.shippingStarted ? 'completed' : 'pending'}`}>
                        <div className="timeline-icon"><Truck size={16} /></div>
                        <div className="timeline-content">
                          <p className="timeline-title">Shipping Started</p>
                          <p className="timeline-status">{order.shippingStarted ? 'In Transit' : 'Pending'}</p>
                        </div>
                      </div>
                      <div className={`timeline-item ${order.shipped ? 'completed' : 'pending'}`}>
                        <div className="timeline-icon"><Package size={16} /></div>
                        <div className="timeline-content">
                          <p className="timeline-title">Out for Delivery</p>
                          <p className="timeline-location"><MapPin size={12} /> {order.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="order-details-summary">
                      <div className="order-products">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="order-item-mini">
                            <img src={item.images?.[0] || 'https://via.placeholder.com/50'} alt={item.name} />
                            <span>{item.name} (x{item.quantity})</span>
                          </div>
                        ))}
                      </div>
                      <div className="order-total">
                        <span>Total Paid:</span>
                        <strong>Rs.{order.total.toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
