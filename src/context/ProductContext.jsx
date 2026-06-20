import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const initialProducts = [
  // Pants
  {
    id: 1,
    name: "Slim Fit Cargo Pants",
    category: "Pants",
    price: 1299,
    images: ["/images/black_pants.png"],
    videos: [],
    trending: true,
    description: "Versatile slim fit cargo pants with utility pockets.",
    brand: "Zara",
    color: "Black",
    material: "Organic Cotton"
  },
  {
    id: 2,
    name: "Stretch Chino Pants",
    category: "Pants",
    price: 1199,
    images: ["/images/olive_chino_pants.png"],
    videos: [],
    trending: false,
    description: "Comfortable stretch cotton chinos for everyday wear.",
    brand: "H&M",
    color: "Olive",
    material: "Organic Cotton"
  },
  // Shirts
  {
    id: 3,
    name: "Classic Oxford Shirt",
    category: "Shirts",
    price: 899,
    images: ["/images/white_oxford_shirt.png"],
    videos: [],
    trending: true,
    description: "Timeless classic Oxford shirt in crisp white.",
    brand: "Uniqlo",
    color: "White",
    material: "Organic Cotton"
  },
  {
    id: 4,
    name: "Casual Denim Shirt",
    category: "Shirts",
    price: 999,
    images: ["/images/denim_shirt.png"],
    videos: [],
    trending: false,
    description: "Rugged denim shirt with a modern slim fit.",
    brand: "Zara",
    color: "Blue",
    material: "Denim"
  },
  // T-Shirts
  {
    id: 5,
    name: "White Crewneck T-Shirt",
    category: "T-Shirts",
    price: 399,
    images: ["/images/white_tshirt.png"],
    videos: [],
    trending: true,
    description: "Super-soft organic cotton t-shirt in classic crew neck.",
    brand: "True Fit",
    color: "White",
    material: "Organic Cotton"
  },
  {
    id: 6,
    name: "Sand Oversize T-Shirt",
    category: "T-Shirts",
    price: 498,
    images: ["/images/sand_tshirt.png"],
    videos: [],
    trending: false,
    description: "Premium oversized cotton t-shirt in a beautiful sand/beige tone.",
    brand: "True Fit",
    color: "Beige",
    material: "Organic Cotton"
  },
  // Track Pants
  {
    id: 7,
    name: "Athletic Jogger Track Pants",
    category: "Track Pants",
    price: 799,
    images: ["/images/grey_joggers.png"],
    videos: [],
    trending: false,
    description: "Premium fleece joggers designed for comfort and performance.",
    brand: "Nike",
    color: "Grey",
    material: "Organic Cotton"
  },
  {
    id: 8,
    name: "Performance Tech Track Pants",
    category: "Track Pants",
    price: 859,
    images: ["/images/navy_joggers.png"],
    videos: [],
    trending: false,
    description: "Lightweight, moisture-wicking track pants with zippered pockets.",
    brand: "Nike",
    color: "Blue",
    material: "Organic Cotton"
  },
  // Trousers
  {
    id: 9,
    name: "Tailored Wool Trousers",
    category: "Trousers",
    price: 1599,
    images: ["/images/grey_wool_trousers.png"],
    videos: [],
    trending: false,
    description: "Elegant tailored trousers for formal occasions.",
    brand: "Zara",
    color: "Grey",
    material: "Merino Wool"
  },
  {
    id: 10,
    name: "Smart Casual Slim Trousers",
    category: "Trousers",
    price: 1399,
    images: ["/images/brown_trousers.png"],
    videos: [],
    trending: false,
    description: "Modern slim fit trousers suitable for office to dinner.",
    brand: "H&M",
    color: "Brown",
    material: "Organic Cotton"
  },
  // Caps
  {
    id: 11,
    name: "Classic Baseball Cap",
    category: "Caps",
    price: 299,
    images: ["/images/black_baseball_cap.png"],
    videos: [],
    trending: false,
    description: "Adjustable cotton baseball cap with embroidered detail.",
    brand: "True Fit",
    color: "Black",
    material: "Organic Cotton"
  },
  {
    id: 12,
    name: "Beige Dad Cap",
    category: "Caps",
    price: 349,
    images: ["/images/beige_cap.png"],
    videos: [],
    trending: false,
    description: "Modern flat-brim snapback cap for a streetwear vibe.",
    brand: "True Fit",
    color: "Beige",
    material: "Organic Cotton"
  },
  // Watches
  {
    id: 13,
    name: "Ocean Leather Watch",
    category: "Watches",
    price: 1999,
    images: ["/images/blue_watch.png"],
    videos: [],
    trending: true,
    description: "Sleek minimalist analog watch with a genuine leather strap.",
    brand: "True Fit",
    color: "Blue",
    material: "Genuine Leather"
  },
  {
    id: 14,
    name: "Gold Chronograph Watch",
    category: "Watches",
    price: 2999,
    images: ["/images/gold_watch.png"],
    videos: [],
    trending: false,
    description: "Premium stainless steel chronograph watch with quartz movement.",
    brand: "Zara",
    color: "Gold",
    material: "Stainless Steel"
  },
  // Socks
  {
    id: 15,
    name: "Organic Cotton Crew Socks",
    category: "Socks",
    price: 150,
    images: ["/images/white_cotton_socks.png"],
    videos: [],
    trending: false,
    description: "Breathable and cushioned organic cotton socks for daily comfort.",
    brand: "Uniqlo",
    color: "White",
    material: "Organic Cotton"
  },
  {
    id: 16,
    name: "Classic Cotton Socks",
    category: "Socks",
    price: 199,
    images: ["/images/white_cotton_socks.png"],
    videos: [],
    trending: false,
    description: "Warm and cozy patterned socks knit from premium cotton.",
    brand: "H&M",
    color: "White",
    material: "Organic Cotton"
  },
  // Coats
  {
    id: 17,
    name: "Black Hoodie",
    category: "Coats",
    price: 499,
    images: ["/images/black_hoodie.png"],
    videos: [],
    trending: true,
    description: "Premium black hoodie designed for maximum comfort and style.",
    brand: "True Fit",
    color: "Black",
    material: "Organic Cotton"
  },
  {
    id: 18,
    name: "Ocean Hoodie",
    category: "Coats",
    price: 489,
    images: ["/images/ocean_hoodie.png"],
    videos: [],
    trending: false,
    description: "Beautiful ocean-blue hoodie with a comfortable, oversized fit.",
    brand: "True Fit",
    color: "Blue",
    material: "Organic Cotton"
  }
];

const initialOffers = [
  { id: 1, title: "Summer Sale", subtitle: "Up to 50% Off", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1000", link: "/shop" },
  { id: 2, title: "New Arrivals", subtitle: "Explore Collection", image: "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1000", link: "/shop" }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('tf_products_v4');
    try {
      let data = saved ? JSON.parse(saved) : initialProducts;
      if (!Array.isArray(data) || data.length < 10) data = initialProducts;
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
    localStorage.setItem('tf_products_v4', JSON.stringify(products));
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
