import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from '@/context/StoreContext';
import MobileLayout from '@/components/layout/MobileLayout';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import AppStore from '@/pages/AppStore';
import Details from '@/pages/Details';
import Cart from '@/pages/Cart';
import Admin from '@/pages/Admin';
import Login from '@/pages/Login';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MobileLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/apps" element={<AppStore />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/details/:id" element={<Details />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
