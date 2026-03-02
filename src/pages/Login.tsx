import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import { Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600">
        <Lock size={32} />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h2>
      <p className="text-gray-500 mb-8 text-center">Enter the administrator password to manage products and apps.</p>

      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="Enter Password"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
          {error && <p className="text-red-500 text-sm mt-2 ml-1">{error}</p>}
        </div>

        <button 
          type="submit" 
          className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          Login <ArrowRight size={20} />
        </button>
      </form>
      
      <p className="mt-8 text-xs text-gray-400">Hint: password is 'admin123'</p>
    </div>
  );
}
