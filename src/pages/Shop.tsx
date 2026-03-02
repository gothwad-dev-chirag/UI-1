import { useStore } from '@/context/StoreContext';
import { Star, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Shop() {
  const { products, searchQuery } = useStore();
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Marketplace</h2>
        <button className="p-2 bg-gray-100 rounded-full">
          <Filter size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredProducts.map((product) => (
          <Link 
            to={`/details/${product.id}`} 
            key={product.id} 
            className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex gap-4 items-center"
          >
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <div className="flex items-center text-yellow-500 text-xs font-medium bg-yellow-50 px-1.5 py-0.5 rounded-md">
                  <Star size={10} fill="currentColor" className="mr-0.5" />
                  {product.rating}
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xl text-gray-900">${product.price}</span>
                <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full font-medium">Free Delivery</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
