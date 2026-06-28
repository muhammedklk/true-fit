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
  },
  // Pants Additional
  {
    id: 19,
    name: "Relaxed Fit Denim Jeans",
    category: "Pants",
    price: 1499,
    images: ["https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: false,
    description: "Premium washed cotton denim jeans with a relaxed modern fit.",
    brand: "Zara",
    color: "Blue",
    material: "Denim"
  },
  {
    id: 20,
    name: "Utility Linen Pants",
    category: "Pants",
    price: 1699,
    images: ["https://images.pexels.com/photos/1895015/pexels-photo-1895015.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: false,
    description: "Lightweight linen-blend utility pants perfect for warm weather.",
    brand: "H&M",
    color: "Beige",
    material: "Organic Cotton"
  },
  // Shirts Additional
  {
    id: 21,
    name: "Flannel Plaid Shirt",
    category: "Shirts",
    price: 1199,
    images: ["https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: false,
    description: "Soft cotton flannel shirt with a classic plaid pattern.",
    brand: "Uniqlo",
    color: "Red",
    material: "Organic Cotton"
  },
  {
    id: 22,
    name: "Short Sleeve Resort Shirt",
    category: "Shirts",
    price: 1099,
    images: ["https://images.pexels.com/photos/2293883/pexels-photo-2293883.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: true,
    description: "Relaxed fit resort collar shirt in a breathable woven texture.",
    brand: "Zara",
    color: "Beige",
    material: "Organic Cotton"
  },
  // T-Shirts Additional
  {
    id: 23,
    name: "Graphic Vintage T-Shirt",
    category: "T-Shirts",
    price: 599,
    images: ["https://images.pexels.com/photos/1566412/pexels-photo-1566412.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: false,
    description: "Faded vintage graphic tee crafted from heavy organic cotton.",
    brand: "Zara",
    color: "Black",
    material: "Organic Cotton"
  },
  {
    id: 24,
    name: "Heavyweight Pocket Tee",
    category: "T-Shirts",
    price: 549,
    images: ["https://images.pexels.com/photos/1656690/pexels-photo-1656690.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: false,
    description: "Premium thick cotton tee with a clean chest pocket design.",
    brand: "Uniqlo",
    color: "Olive",
    material: "Organic Cotton"
  },
  // Track Pants Additional
  {
    id: 25,
    name: "Slim Fit Sports Joggers",
    category: "Track Pants",
    price: 999,
    images: ["https://images.pexels.com/photos/4853082/pexels-photo-4853082.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: true,
    description: "Streamlined active joggers engineered for absolute movement and comfort.",
    brand: "Nike",
    color: "Black",
    material: "Organic Cotton"
  },
  {
    id: 26,
    name: "Tech Fleece Track Pants",
    category: "Track Pants",
    price: 1299,
    images: ["https://images.pexels.com/photos/1805411/pexels-photo-1805411.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: false,
    description: "Advanced double-sided fleece track pants with modern details.",
    brand: "Nike",
    color: "Grey",
    material: "Organic Cotton"
  },
  // Trousers Additional
  {
    id: 27,
    name: "Pleated Smart Trousers",
    category: "Trousers",
    price: 1799,
    images: ["https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: true,
    description: "Elegant tailored pleated trousers with a contemporary crop.",
    brand: "Zara",
    color: "Black",
    material: "Merino Wool"
  },
  {
    id: 28,
    name: "Classic Checkered Trousers",
    category: "Trousers",
    price: 1699,
    images: ["https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: false,
    description: "Sharp smart-casual checkered trousers in fine stretch blend.",
    brand: "H&M",
    color: "Grey",
    material: "Merino Wool"
  },
  // Caps Additional
  {
    id: 29,
    name: "Sports Corduroy Cap",
    category: "Caps",
    price: 399,
    images: ["https://images.pexels.com/photos/844867/pexels-photo-844867.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: false,
    description: "Vintage structure corduroy cap with an adjustable brass buckle.",
    brand: "True Fit",
    color: "Brown",
    material: "Organic Cotton"
  },
  {
    id: 30,
    name: "Minimalist Knit Beanie",
    category: "Caps",
    price: 299,
    images: ["https://images.pexels.com/photos/1485031/pexels-photo-1485031.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: false,
    description: "Soft ribbed merino wool beanie designed for maximum warmth.",
    brand: "True Fit",
    color: "Grey",
    material: "Merino Wool"
  },
  // Watches Additional
  {
    id: 31,
    name: "Sleek Black Smartwatch",
    category: "Watches",
    price: 3999,
    images: ["https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: true,
    description: "Full-feature minimalist smartwatch with custom active watch faces.",
    brand: "True Fit",
    color: "Black",
    material: "Stainless Steel"
  },
  {
    id: 32,
    name: "Silver Vintage Dress Watch",
    category: "Watches",
    price: 2499,
    images: ["https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: false,
    description: "Timeless stainless steel watch with an elegant silver dial.",
    brand: "Zara",
    color: "Silver",
    material: "Stainless Steel"
  },
  // Socks Additional
  {
    id: 33,
    name: "Patterned Wool Socks Pack",
    category: "Socks",
    price: 249,
    images: ["https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: false,
    description: "Pack of 3 merino wool cozy patterned socks.",
    brand: "Uniqlo",
    color: "Grey",
    material: "Merino Wool"
  },
  {
    id: 34,
    name: "Active Cushion Ankle Socks",
    category: "Socks",
    price: 180,
    images: ["https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: false,
    description: "Engineered breathable ankle socks with extra arch cushioning.",
    brand: "Nike",
    color: "Black",
    material: "Organic Cotton"
  },
  // Coats Additional
  {
    id: 35,
    name: "Double Breasted Trench Coat",
    category: "Coats",
    price: 2999,
    images: ["https://images.pexels.com/photos/7631336/pexels-photo-7631336.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: true,
    description: "Classic double-breasted trench coat tailored in fine merino wool.",
    brand: "Zara",
    color: "Beige",
    material: "Merino Wool"
  },
  {
    id: 36,
    name: "Classic Denim Jacket",
    category: "Coats",
    price: 1899,
    images: ["https://images.pexels.com/photos/1484807/pexels-photo-1484807.jpeg?auto=compress&cs=tinysrgb&w=600"],
    videos: [],
    trending: false,
    description: "Iconic button-up jean jacket in durable heavy-wash denim.",
    brand: "H&M",
    color: "Blue",
    material: "Denim"
  }
];

const initialOffers = [
  { id: 1, title: "Summer Sale", subtitle: "Up to 50% Off", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1000", link: "/shop" },
  { id: 2, title: "New Arrivals", subtitle: "Explore Collection", image: "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1000", link: "/shop" }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('tf_products_v5');
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

  // Helper: get cart key for a specific user
  const cartKey = (u) => u ? `tf_cart_${u.id ?? u.email}` : 'tf_cart_guest';

  const [cart, setCart] = useState(() => {
    // Load cart for the currently logged-in user (or guest)
    const currentUser = (() => {
      try { return JSON.parse(localStorage.getItem('tf_user')); } catch { return null; }
    })();
    const key = cartKey(currentUser);
    const saved = localStorage.getItem(key);
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
    localStorage.setItem('tf_products_v5', JSON.stringify(products));
  }, [products]);

  // Save cart to the CURRENT user's key whenever cart or user changes
  useEffect(() => {
    localStorage.setItem(cartKey(user), JSON.stringify(cart));
  }, [cart, user]);

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
      const adminUser = { role: 'admin', name: 'Store Admin', email: 'admin', id: 'admin' };
      setUser(adminUser);
      // Load admin's cart
      const adminCart = (() => {
        try { return JSON.parse(localStorage.getItem(cartKey(adminUser))) || []; } catch { return []; }
      })();
      setCart(adminCart);
      return { success: true, role: 'admin' };
    }

    // Customer check (case-insensitive email)
    const foundUser = users.find(
      u => u.email.toLowerCase() === normalizedEmail && u.password === password
    );
    if (foundUser) {
      const customerUser = { role: 'customer', ...foundUser };
      setUser(customerUser);
      // Load this user's cart from their own key
      const userCart = (() => {
        try { return JSON.parse(localStorage.getItem(cartKey(customerUser))) || []; } catch { return []; }
      })();
      setCart(userCart);
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
    // New user starts with empty cart
    setCart([]);
    localStorage.setItem(cartKey(customerUser), JSON.stringify([]));
    return { success: true };
  };

  const logout = () => {
    // Save current cart for this user before clearing
    if (user) {
      localStorage.setItem(cartKey(user), JSON.stringify(cart));
    }
    setUser(null);
    setCart([]); // Clear cart from memory on logout
    localStorage.removeItem('tf_user');
  };

  const updateProfile = (profileData) => {
    // Update the logged-in user's profile
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    localStorage.setItem('tf_user', JSON.stringify(updatedUser));
    // Also update in users list — match by id OR email as fallback
    const updatedUsers = users.map(u =>
      (u.id === user.id || u.email === user.email)
        ? { ...u, ...profileData }
        : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('tf_users', JSON.stringify(updatedUsers));
    return { success: true };
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
      updateProfile,
      orders,
      placeOrder,
      updateOrderStatus,
      categories: ["All", "Pants", "Shirts", "T-Shirts", "Track Pants", "Trousers", "Caps", "Watches", "Socks", "Coats"]
    }}>
      {children}
    </ProductContext.Provider>
  );
};
