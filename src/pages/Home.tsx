import { useStore } from '@/context/StoreContext';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { products, apps, searchQuery } = useStore();

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredApps = apps.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-4 space-y-8">
      {/* Hero Section */}
      {!searchQuery && (
        <section className="relative h-48 rounded-3xl overflow-hidden shadow-lg">
          <img 
            src="https://picsum.photos/seed/techhero/800/400" 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-white text-2xl font-bold mb-1">Summer Sale</h2>
            <p className="text-white/80 text-sm mb-3">Up to 50% off on electronics</p>
            <Link to="/shop" className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold w-fit">
              Shop Now
            </Link>
          </div>
        </section>
      )}

      {/* Featured Apps */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Top Apps</h3>
          <Link to="/apps" className="text-emerald-600 text-sm font-medium flex items-center">
            See all <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
          {filteredApps.slice(0, 5).map((app) => (
            <Link to={`/details/${app.id}`} key={app.id} className="flex-shrink-0 w-32 group">
              <div className="w-32 h-32 rounded-2xl overflow-hidden mb-2 shadow-sm border border-gray-100 relative">
                <img src={app.image} alt={app.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h4 className="font-medium text-sm truncate text-gray-900">{app.name}</h4>
              <p className="text-xs text-gray-500 truncate">{app.developer}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Popular Products</h3>
          <Link to="/shop" className="text-emerald-600 text-sm font-medium flex items-center">
            See all <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.slice(0, 4).map((product) => (
            <Link to={`/details/${product.id}`} key={product.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-gray-50">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              <h4 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1 flex-1">{product.name}</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-lg">${product.price}</span>
                <div className="flex items-center text-yellow-500 text-xs font-medium">
                  <Star size={12} fill="currentColor" className="mr-0.5" />
                  {product.rating}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
