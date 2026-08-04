import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/Auth';
import { CartProvider } from './contexts/Cart';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { Cart } from './pages/Cart';
import { ProductDetails } from './pages/ProductDetails';

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
