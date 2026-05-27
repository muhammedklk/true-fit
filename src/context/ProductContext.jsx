import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const initialProducts = [
  {
    id: 1,
    name: "Wool Blend Blazer",
    category: "Coats",
    price: 249,
    images: ["https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=1000"],
    videos: [],
    trending: true,
    description: "A premium wool blend blazer for a sophisticated look."
  },
  {
    id: 2,
    name: "Classic Oxford Shirt",
    category: "Shirts",
    price: 89,
    images: ["https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1000"],
    videos: [],
    trending: true,
    description: "Timeless classic Oxford shirt in crisp white."
  }
];

const initialOffers = [
  { id: 1, title: "Summer Sale", subtitle: "Up to 50% Off", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1000", link: "/shop" },
  { id: 2, title: "New Arrivals", subtitle: "Explore Collection", image: "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1000", link: "/shop" }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('tf_products');
    try {
      let data = saved ? JSON.parse(saved) : initialProducts;
      if (!Array.isArray(data)) data = initialProducts;
      return data.map(p => {
        let imgs = Array.isArray(p.images) ? p.images.filter(img => img) : (p.image ? [p.image] : []);
        // Clean up known broken Unsplash URLs from localstorage
        imgs = imgs.map(img => img.includes('images.unsplash.com') ? 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1000' : img);
        
        return {
          ...p,
          images: imgs,
          videos: Array.isArray(p.videos) ? p.videos.filter(v => v) : []
        };
      });
    } catch (e) {
      return initialProducts;
    }
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('tf_cart');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [offers, setOffers] = useState(() => {
    const saved = localStorage.getItem('tf_offers');
    try {
      let data = saved ? JSON.parse(saved) : initialOffers;
      if (!Array.isArray(data)) return initialOffers;
      // Clean up known broken Unsplash URLs for offers
      return data.map(offer => ({
        ...offer,
        image: offer.image?.includes('images.unsplash.com') ? (offer.id === 1 ? initialOffers[0].image : initialOffers[1].image) : offer.image
      }));
    } catch (e) {
      return initialOffers;
    }
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tf_user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('tf_users');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('tf_orders');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('tf_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('tf_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tf_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('tf_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tf_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('tf_orders', JSON.stringify(orders));
  }, [orders]);

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    // Admin check
    if (normalizedEmail === 'admin' && password === 'admin123') {
      const adminUser = { role: 'admin', name: 'Store Admin', email: 'admin' };
      setUser(adminUser);
      return { success: true, role: 'admin' };
    }

    // Customer check (case-insensitive email)
    const foundUser = users.find(
      u => u.email.toLowerCase() === normalizedEmail && u.password === password
    );
    if (foundUser) {
      const customerUser = { role: 'customer', ...foundUser };
      setUser(customerUser);
      return { success: true, role: 'customer' };
    }

    return { success: false, message: 'Invalid email or password' };
  };

  const register = (userData) => {
    const normalizedEmail = userData.email.trim().toLowerCase();
    if (users.find(u => u.email.toLowerCase() === normalizedEmail)) {
      return { success: false, message: 'This email is already registered. Please login.' };
    }
    const newUser = { ...userData, email: normalizedEmail, id: Date.now() };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    // Save to localStorage immediately (don't wait for useEffect)
    localStorage.setItem('tf_users', JSON.stringify(updatedUsers));
    // Auto-login the new user
    const customerUser = { role: 'customer', ...newUser };
    setUser(customerUser);
    localStorage.setItem('tf_user', JSON.stringify(customerUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tf_user');
  };

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateOffers = (newOffers) => {
    setOffers(newOffers);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id, quantity) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleString(),
      status: 'Pending',
      shippingStarted: false,
      shipped: false,
      location: 'Order Placed',
      estimatedDelivery: '5-7 Days'
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, updates) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, ...updates } : order
    ));
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      addProduct, 
      removeProduct, 
      cart, 
      addToCart, 
      removeFromCart,
      updateCartQuantity,
      clearCart,
      offers,
      updateOffers,
      user,
      users,
      login,
      logout,
      register,
      orders,
      placeOrder,
      updateOrderStatus,
      categories: ["All", "Pants", "Shirts", "T-Shirts", "Track Pants", "Trousers", "Caps", "Watches", "Socks", "Coats"]
    }}>
      {children}
    </ProductContext.Provider>
  );
};
