import { useStore } from '@/context/StoreContext';
import { Trash2, ArrowRight, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart } = useStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] p-8 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
          <CreditCard size={40} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
      
      <div className="space-y-4 mb-8">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.type === 'app' ? 'Digital License' : 'Physical Item'}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold">${item.price}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 p-1 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500">Total</span>
          <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>
        <button className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-transform">
          Checkout <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
