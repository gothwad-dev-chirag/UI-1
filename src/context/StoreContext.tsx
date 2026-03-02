import React, { createContext, useContext, useState } from 'react';
import { PRODUCTS, APPS } from '@/lib/utils';

type Review = {
  id: string;
  user: string;
  rating: number;
  text: string;
  date: string;
};

type Item = {
  id: string;
  type: 'product' | 'app';
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  category?: string;
  developer?: string;
  size?: string;
  downloads?: number;
  reviews?: Review[];
};

type CartItem = Item & { quantity: number };

interface StoreContextType {
  products: Item[];
  apps: Item[];
  cart: CartItem[];
  addToCart: (item: Item) => void;
  removeFromCart: (id: string) => void;
  addProduct: (item: Item) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  addReview: (itemId: string, review: Omit<Review, 'id' | 'date'>) => void;
  incrementDownloads: (appId: string) => void;
  installedApps: string[];
  installApp: (appId: string) => void;
  uninstallApp: (appId: string) => void;
  isAppInstalled: (appId: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Item[]>(PRODUCTS.map(p => ({ ...p, reviews: [] })));
  const [apps, setApps] = useState<Item[]>(APPS.map(a => ({ ...a, downloads: Math.floor(Math.random() * 10000), reviews: [] })));
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Load installed apps from localStorage
  const [installedApps, setInstalledApps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('installed_apps');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load installed apps", e);
      return [];
    }
  });

  const login = (password: string) => {
    if (password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  const addReview = (itemId: string, review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString()
    };

    const updateItem = (items: Item[]) => items.map(item => {
      if (item.id === itemId) {
        const reviews = [...(item.reviews || []), newReview];
        const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
        return { ...item, reviews, rating: Number(avgRating.toFixed(1)) };
      }
      return item;
    });

    setProducts(prev => updateItem(prev));
    setApps(prev => updateItem(prev));
  };

  const incrementDownloads = (appId: string) => {
    setApps(prev => prev.map(app => 
      app.id === appId 
        ? { ...app, downloads: (app.downloads || 0) + 1 } 
        : app
    ));
  };

  const installApp = (appId: string) => {
    if (!installedApps.includes(appId)) {
      const newInstalled = [...installedApps, appId];
      setInstalledApps(newInstalled);
      localStorage.setItem('installed_apps', JSON.stringify(newInstalled));
      incrementDownloads(appId);
    }
  };

  const uninstallApp = (appId: string) => {
    const newInstalled = installedApps.filter(id => id !== appId);
    setInstalledApps(newInstalled);
    localStorage.setItem('installed_apps', JSON.stringify(newInstalled));
  };

  const isAppInstalled = (appId: string) => installedApps.includes(appId);

  const addToCart = (item: Item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const addProduct = (item: Item) => {
    if (item.type === 'app') {
      setApps((prev) => [item, ...prev]);
    } else {
      setProducts((prev) => [item, ...prev]);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        apps,
        cart,
        addToCart,
        removeFromCart,
        addProduct,
        searchQuery,
        setSearchQuery,
        isAdmin,
        login,
        logout,
        addReview,
        incrementDownloads,
        installedApps,
        installApp,
        uninstallApp,
        isAppInstalled
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
