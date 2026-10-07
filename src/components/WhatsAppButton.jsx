import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { RESTAURANT_INFO } from '../config/restaurantConfig';

export const WhatsAppButton = () => {
  return (
    <motion.aside
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      aria-label="Contacto flotante"
      className="fixed bottom-6 right-6 z-40"
    >
      <motion.a
        href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('¡Hola Don Quijote Pizza Bar! Quiero hacer un pedido.')}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl transition-colors group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-white stroke-none" />
      </motion.a>
    </motion.aside>
  );
};

export default WhatsAppButton;
