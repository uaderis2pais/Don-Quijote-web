import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import InteractiveMenuSheet from '../components/InteractiveMenuSheet';
import { RESTAURANT_INFO } from '../config/restaurantConfig';

export const MenuPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 sm:pt-28 pb-16 min-h-screen">
      {/* Top Breadcrumb Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6"
      >
        <div className="py-4 border-b border-stone-800/80 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-[#18D2D8] transition-transform group-hover:-translate-x-1" />
            <span>Volver a la página principal</span>
          </Link>
        </div>
      </motion.div>

      {/* Main Interactive Menu Sheet */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <InteractiveMenuSheet />
      </motion.div>

      {/* Bottom Direct WhatsApp Order Callout */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center space-y-6"
      >
        <motion.a
          href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('¡Hola Don Quijote! Quisiera consultar la disponibilidad y hacer un pedido.')}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold rounded-full text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>Hacer pedido directo al WhatsApp ({RESTAURANT_INFO.whatsappDisplay})</span>
        </motion.a>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-stone-400 pt-4 border-t border-stone-800/80">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#18D2D8]" />
            <span>{RESTAURANT_INFO.address}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#18D2D8]" />
            <span>Lun a Dom: 11:00-15:00 y 19:00-02:00 hs</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MenuPage;
