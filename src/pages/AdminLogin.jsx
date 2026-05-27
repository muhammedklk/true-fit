import './AdminLogin.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { Lock, User } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useProducts();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success && result.role === 'admin') {
      navigate('/admin');
    } else {
      setError(result.message || 'Invalid admin credentials');
    }
  };

  return (
    <div className="login-page section-padding flex-center">
      <div className="login-container">
        <div className="login-header">
          <div className="logo">TRUE<span>FIT</span></div>
          <h2>Admin Login</h2>
          <p>Please enter your credentials to access the panel.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          <div className="form-group">
            <label><User size={16} /> Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              placeholder="admin"
            />
          </div>
          <div className="form-group">
            <label><Lock size={16} /> Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="admin123"
            />
          </div>
          <button type="submit" className="btn btn-primary login-btn">Login to Panel</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
