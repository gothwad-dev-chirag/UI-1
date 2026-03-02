import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Grid, ShoppingCart, PlusCircle, Search } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function MobileLayout() {
  const { cart, searchQuery, setSearchQuery } = useStore();
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-200">
      {/* Top App Bar */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3 flex-1">
          {isHome ? (
             <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
               D
             </div>
          ) : null}
          
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <input 
               type="text" 
               placeholder="Search products & apps..." 
               className="w-full bg-gray-100 rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
        </div>
        <button className="ml-3 p-2 rounded-full hover:bg-gray-100 active:scale-95 transition-transform">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
             <img src="https://picsum.photos/seed/user/100/100" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="min-h-[calc(100vh-140px)]">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50 max-w-md mx-auto">
        <div className="flex justify-around items-center">
          <NavItem to="/" icon={<Home size={24} />} label="Home" />
          <NavItem to="/shop" icon={<ShoppingBag size={24} />} label="Shop" />
          <NavItem to="/apps" icon={<Grid size={24} />} label="Apps" />
          <NavItem to="/cart" icon={<ShoppingCart size={24} />} label="Cart" badge={cart.length} />
          <NavItem to="/admin" icon={<PlusCircle size={24} />} label="Sell" />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label, badge }: { to: string; icon: React.ReactNode; label: string; badge?: number }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300 relative ${
          isActive ? 'text-emerald-700' : 'text-gray-500 hover:text-gray-900'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className={`relative p-1 rounded-full transition-all duration-300 ${isActive ? 'bg-emerald-100 px-5 py-1' : ''}`}>
            {icon}
            {badge ? (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                {badge}
              </span>
            ) : null}
          </div>
          <span className={`text-[10px] font-medium mt-1 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}
