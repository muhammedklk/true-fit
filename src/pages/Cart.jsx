import './Cart.css';
import React from 'react';
import { useProducts } from '../context/ProductContext';
import { Trash2, Plus, Minus, ArrowLeft, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useProducts();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="cart-page section-padding flex-center">
        <div className="container text-center">
          <h2 className="section-title">Your Cart is <span>Empty</span></h2>
          <p className="section-subtitle">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" className="btn btn-primary" style={{ margin: '30px auto', display: 'inline-flex' }}>
            Go Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page section-padding">
      <div className="container">
        <h1 className="hero-title">Shopping <span>Cart</span></h1>

        <div className="cart-grid">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={(item.images && item.images.length > 0) ? item.images[0] : (item.image || 'https://via.placeholder.com/100')} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <div className="cart-item-price">${item.price}</div>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)}><Minus size={16} /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}><Plus size={16} /></button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <Link to="/shop" className="continue-shopping">
              <ArrowLeft size={18} /> Continue Shopping
            </Link>
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rs.{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Rs.{shipping.toFixed(2)}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>Rs.{total.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary checkout-btn" onClick={() => navigate('/checkout')}>
              Checkout <CreditCard size={18} />
            </button>
            <div className="payment-icons">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="Paypal" />
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Cart;
