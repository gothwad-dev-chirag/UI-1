import { useStore } from '@/context/StoreContext';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AppStore() {
  const { apps, searchQuery } = useStore();
  const filteredApps = apps.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">App Store</h2>
      </div>

      <div className="space-y-6">
        {/* Featured App Banner */}
        {filteredApps.length > 0 && (
          <Link to={`/details/${filteredApps[0].id}`} className="block relative h-64 rounded-3xl overflow-hidden shadow-md">
            <img src={filteredApps[0].image} alt={filteredApps[0].name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md p-1">
                   <img src={filteredApps[0].image} className="w-full h-full rounded-lg object-cover" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{filteredApps[0].name}</h3>
                  <p className="text-white/70 text-xs">{filteredApps[0].developer}</p>
                </div>
              </div>
              <p className="text-white/90 text-sm line-clamp-2 mb-3">{filteredApps[0].description}</p>
              <button className="bg-white text-black py-2 rounded-full font-semibold text-sm w-full">
                {filteredApps[0].price > 0 ? `$${filteredApps[0].price}` : 'Install'}
              </button>
            </div>
          </Link>
        )}

        {/* App List */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-800">Recommended for you</h3>
          {filteredApps.slice(1).map((app) => (
            <Link to={`/details/${app.id}`} key={app.id} className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                <img src={app.image} alt={app.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">{app.name}</h4>
                <p className="text-xs text-gray-500 truncate">{app.developer} • {app.size}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500 flex items-center">
                    {app.rating} <Star size={10} className="ml-0.5" fill="currentColor" />
                  </span>
                </div>
              </div>
              <button className="px-4 py-1.5 rounded-full bg-gray-100 text-emerald-700 font-semibold text-sm hover:bg-emerald-50 transition-colors">
                {app.price > 0 ? `$${app.price}` : 'Get'}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
