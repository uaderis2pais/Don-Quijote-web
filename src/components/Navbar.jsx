import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, BookOpen, MapPin } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../config/restaurantConfig';

export const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCarta = location.pathname === '/carta' || location.pathname === '/menu';

  const navLinks = [
    { name: 'Inicio', path: '/', isHash: false },
    { name: 'La Carta', path: '/carta', icon: BookOpen, isCarta: true },
    { name: 'Nuestra Historia', path: '/#historia', isHash: true },
    { name: 'Visitanos & Contacto', path: '/#contacto', icon: MapPin, isHash: true },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Top 3-Color Subtle Accent Stripe */}
      <div className="h-[3px] w-full flex">
        <div className="flex-1 bg-[#18D2D8]" />
        <div className="flex-1 bg-[#f4f5f0]" />
        <div className="flex-1 bg-[#18D2D8]" />
      </div>

      {/* Main Nav Bar */}
      <nav
        className={`w-full transition-all duration-300 bg-stone-950/95 backdrop-blur-md py-3 shadow-lg border-b border-stone-800/60 ${
          isScrolled ? 'py-2.5 shadow-xl' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <BrandLogo />

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.isCarta ? isCarta : (!isCarta && link.path === '/');

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 relative py-1 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#18D2D8]' : 'text-stone-400'}`} />}
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#18D2D8] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: Cart Button & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* "Tu Pedido" Pill Button - Exactly like Genaro */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-stone-900/90 hover:bg-stone-800 border border-stone-700/60 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-stone-200 text-xs sm:text-sm font-medium transition-all duration-200 hover:border-[#18D2D8]/50 shadow-sm shrink-0"
              aria-label="Abrir carrito"
              id="cart-trigger-button"
            >
              <ShoppingBag className="w-4 h-4 text-stone-300 shrink-0" />
              <span>Tu Pedido</span>
              <span className="ml-0.5 sm:ml-1 min-w-[18px] sm:min-w-[20px] h-4.5 sm:h-5 px-1.5 flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-black bg-[#18D2D8] rounded-full shrink-0">
                {totalItems}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800/80 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 px-4 pt-3 pb-5 border-t border-stone-800 space-y-2 bg-stone-950/98 animate-in fade-in">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-stone-200 hover:text-[#18D2D8] hover:bg-stone-900"
                >
                  {Icon && <Icon className="w-4 h-4 text-[#18D2D8]" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}

            <div className="pt-2 border-t border-stone-800/80">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('¡Hola Don Quijote! Quiero hacer una consulta o pedido.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full text-xs font-bold bg-[#25D366] text-white flex items-center justify-center gap-2"
              >
                <span>Hacer pedido por WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
