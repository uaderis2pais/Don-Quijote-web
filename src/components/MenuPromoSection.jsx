import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Sparkles, Utensils, Pizza, Beer, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { MENU_CATEGORIES } from '../config/restaurantConfig';

export const MenuPromoSection = () => {
  return (
    <section id="carta-promo" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden border border-stone-800 bg-gradient-to-b from-stone-900/90 via-stone-900/60 to-[#0f2334]/40 shadow-2xl p-6 sm:p-12 lg:p-16">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#18D2D8]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-800/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & Editorial Content (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-950/80 border border-stone-800 text-[11px] font-semibold tracking-wider uppercase text-stone-300">
              <Sparkles className="w-3.5 h-3.5 text-[#18D2D8]" />
              <span>CARTA DIGITAL & PEDIDOS ONLINE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              Descubrí Nuestra Carta Completa
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
              Nuestras pizzas caseras tradicionales, calzones rellenos con abundante queso, smash burgers artesanales, minutas de cocina y barra de bebidas. Todo disponible para disfrutar en nuestro local o pedir por WhatsApp.
            </p>

            {/* Category tags preview */}
            <div className="flex flex-wrap gap-2 pt-1 pb-2">
              {MENU_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/carta`}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-stone-950/70 hover:bg-[#18D2D8] hover:text-black text-stone-300 border border-stone-800 hover:border-[#18D2D8] transition-all duration-200"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/carta"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#18D2D8] hover:bg-[#3bf1f7] text-black text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#18D2D8]/20 w-full sm:w-auto"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Ver Carta Completa</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </motion.div>

              <span className="text-xs text-stone-400 text-center sm:text-left">
                Más de 100 opciones con precios y fotos
              </span>
            </div>
          </motion.div>

          {/* Right Column: Visual Teaser Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <Link
              to="/carta"
              className="group block relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-950/80 shadow-2xl transition-all duration-300 hover:border-[#18D2D8]/60 hover:shadow-[0_0_30px_rgba(24,210,216,0.15)]"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src="/fotomenu.PNG"
                  alt="Carta Don Quijote"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold bg-black/80 backdrop-blur-md text-[#18D2D8] border border-[#18D2D8]/30 uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <Flame className="w-3.5 h-3.5 text-[#18D2D8]" />
                  <span>Horneadas al momento</span>
                </span>
              </div>

              <div className="p-5 sm:p-6 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-lg text-white group-hover:text-[#18D2D8] transition-colors">
                    Carta Digital Interactiva
                  </span>
                  <span className="text-xs text-[#18D2D8] font-bold uppercase tracking-wider flex items-center gap-1">
                    Abrir <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Hacé clic en cualquier producto para agregarlo al carrito y armar tu pedido para retirar o delivery.
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MenuPromoSection;
