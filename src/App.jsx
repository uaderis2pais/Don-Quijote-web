import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { MenuProvider } from './context/MenuContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import WhatsAppButton from './components/WhatsAppButton';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';

export function App() {
  return (
    <BrowserRouter>
      <MenuProvider>
        <CartProvider>
          <div className="min-h-screen bg-[#121212] text-stone-200 flex flex-col font-sans">
          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content Pages */}
          <main className="flex-1">
            <Routes>
              {/* Home Page (without La Carta, as requested) */}
              <Route path="/" element={<HomePage />} />

              {/* Dedicated La Carta Page */}
              <Route path="/carta" element={<MenuPage />} />
              <Route path="/menu" element={<MenuPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer with Developer Credits */}
          <Footer />

          {/* Cart Drawer Offcanvas ("Tu Pedido") */}
          <CartSidebar />

          {/* Floating WhatsApp Action Button */}
          <WhatsAppButton />

          {/* Notification Toast */}
          <Toast />
        </div>
        </CartProvider>
      </MenuProvider>
    </BrowserRouter>
  );
}

export default App;
