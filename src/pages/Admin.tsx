import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { Plus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const { addProduct, isAdmin, logout } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'product' | 'app'>('product');
  
  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    developer: '',
    size: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: Date.now().toString(),
      type: activeTab,
      name: formData.name,
      price: Number(formData.price),
      rating: 5.0, // New items get 5 stars by default
      image: `https://picsum.photos/seed/${formData.name.replace(/\s/g, '')}/400/400`,
      description: formData.description,
      ...(activeTab === 'product' ? { category: formData.category } : { developer: formData.developer, size: formData.size || '50 MB' })
    };
    
    
    addProduct(newItem);
    alert(`${activeTab === 'product' ? 'Product' : 'App'} listed successfully!`);
    setFormData({ name: '', price: '', description: '', category: '', developer: '', size: '' });
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Seller Dashboard</h2>
        <button 
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
        <button 
          onClick={() => setActiveTab('product')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'product' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
        >
          Sell Product
        </button>
        <button 
          onClick={() => setActiveTab('app')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'app' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
        >
          Upload App
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Item Name</label>
          <input 
            required
            type="text" 
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            placeholder={activeTab === 'product' ? "e.g., Wireless Earbuds" : "e.g., Photo Editor Pro"}
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Price ($)</label>
          <input 
            required
            type="number" 
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            placeholder="0.00"
            value={formData.price}
            onChange={e => setFormData({...formData, price: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea 
            required
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 h-24 resize-none"
            placeholder="Describe your item..."
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        {activeTab === 'product' ? (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
            </select>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Developer Name</label>
              <input 
                required
                type="text" 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Studio Name"
                value={formData.developer}
                onChange={e => setFormData({...formData, developer: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">App Size</label>
              <input 
                type="text" 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="e.g. 45 MB"
                value={formData.size}
                onChange={e => setFormData({...formData, size: e.target.value})}
              />
            </div>
          </>
        )}

        <div className="pt-4">
          <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors">
            <Plus size={20} />
            {activeTab === 'product' ? 'List Product' : 'Publish App'}
          </button>
        </div>
      </form>
    </div>
  );
}
