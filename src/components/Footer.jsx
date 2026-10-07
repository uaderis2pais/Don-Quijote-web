import React from 'react';
import { MessageCircle, MapPin, ArrowUp } from 'lucide-react';
import BrandLogo from './BrandLogo';
import SyncStatusButton from './SyncStatusButton';
import { RESTAURANT_INFO } from '../config/restaurantConfig';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800/80 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <BrandLogo size="large" />

            <p className="text-stone-400 leading-relaxed max-w-xs">
              ¡Compartamos risas y buenos sabores! Pizzas caseras con fermentación lenta, smash burgers y noches de amigos en Concepción del Uruguay.
            </p>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-white">
              Navegación
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/carta" className="hover:text-white transition-colors">
                  La Carta Completa
                </a>
              </li>
              <li>
                <a href="#historia" className="hover:text-white transition-colors">
                  Nuestra Historia
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-white transition-colors">
                  Visitanos & Contacto
                </a>
              </li>
              <li className="pt-1">
                <SyncStatusButton className="hover:text-white" />
              </li>
            </ul>
          </div>

          {/* Horarios & Local */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-white">
              Horarios & Local
            </h4>
            <div className="space-y-2 text-stone-400">
              <p>
                <strong className="text-white block font-sans">LUNES A DOMINGOS:</strong>
                11:00 a 15:00 hs | 19:00 a 02:00 hs
              </p>
              <p className="pt-1">
                <strong className="text-white block font-sans">DIRECCIÓN:</strong>
                {RESTAURANT_INFO.address}
              </p>
              <p className="pt-1">
                <strong className="text-white block font-sans">WHATSAPP:</strong>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="text-stone-300 hover:text-white"
                >
                  {RESTAURANT_INFO.whatsappDisplay}
                </a>
              </p>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-white">
              Redes & Contacto
            </h4>
            <p className="text-stone-400 leading-relaxed">
              Seguinos en Instagram para enterarte de promos semanales y novedades.
            </p>

            <div className="flex items-center gap-3 pt-1">
              {/* Instagram */}
              <a
                href={RESTAURANT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-stone-600 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-[#25D366] hover:border-stone-600 flex items-center justify-center transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Maps */}
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-[#18D2D8] hover:border-stone-600 flex items-center justify-center transition-all"
                aria-label="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>

            <p className="text-[11px] text-stone-400 pt-1">
              Instagram: <span className="text-stone-200">{RESTAURANT_INFO.instagramHandle}</span>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-stone-500 text-center md:text-left">
          <p>© {new Date().getFullYear()} Don Quijote Pizza Bar. Concepción del Uruguay.</p>

          <p className="text-xs text-stone-400">
            Diseño y desarrollo web por{' '}
            <a
              href="https://www.instagram.com/facupaiss_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-300 hover:text-[#18D2D8] font-medium transition-colors underline underline-offset-2"
            >
              Facundo Paiz
            </a>{' '}
            e{' '}
            <a
              href="https://www.instagram.com/nacho.etcheto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-300 hover:text-[#18D2D8] font-medium transition-colors underline underline-offset-2"
            >
              Ignacio Cheto
            </a>
          </p>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Tradición artesanal & amigos</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800 transition-colors"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
