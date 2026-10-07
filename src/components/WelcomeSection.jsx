import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, MapPin, Phone, Clock, ArrowRight, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { RESTAURANT_INFO } from '../config/restaurantConfig';

export const WelcomeSection = () => {
  return (
    <section id="bienvenidos" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Text & Editorial Presentation (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-5 flex flex-col justify-center space-y-5"
        >
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-[11px] font-semibold tracking-wider uppercase text-stone-300">
            <Flame className="w-3.5 h-3.5 text-[#18D2D8]" />
            <span>PIZZA ARTESANAL & BUENOS MOMENTOS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15]">
            Bienvenido a Don Quijote Pizza Bar
          </h2>

          <p className="text-sm sm:text-base font-medium text-[#18D2D8]">
            Pizzas caseras & noches de bar en Concepción del Uruguay
          </p>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            En Don Quijote celebramos la tradición de reunirnos a compartir sabores auténticos. Nuestras pizzas 
            se elaboran a partir de recetas tradicionales, logrando una textura 
            aireada por dentro y un piso perfectamente dorado.
          </p>

          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            Cada creación combina salsas caseras de tomate maduro, muzzarella de primer nivel, smash burgers 
            artesanales con costra crocante y una barra con pintas heladas y coctelería clásica.
          </p>

          <div className="flex items-center gap-5 pt-3">
            <Link
              to="/carta"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-bold tracking-wider uppercase transition-colors border border-stone-700/80 shadow-md hover:border-[#18D2D8]/50"
            >
              <span>VER LA CARTA</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#18D2D8]" />
            </Link>

            <a
              href="#historia"
              className="text-xs font-semibold text-stone-300 hover:text-white underline underline-offset-4 transition-colors"
            >
              Nuestra historia
            </a>
          </div>
        </motion.div>

        {/* Center Card: Especialidad de la Casa (4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          className="lg:col-span-4 relative rounded-3xl overflow-hidden min-h-[380px] lg:min-h-full border border-stone-800 shadow-xl group"
        >
          <img
            src="/foto de bienvenida.PNG"
            alt="Fachada Don Quijote Cocina de Autor"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-[11px] font-bold text-[#18D2D8] uppercase tracking-widest block mb-1">
              COCINA DE AUTOR
            </span>
            <h3 className="font-serif font-bold text-2xl text-white mb-2">
              Nuestro Local
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Te esperamos en nuestra esquina de Ereño 673 para disfrutar de auténticas pizzas artesanales, tragos y el mejor ambiente de Concepción del Uruguay.
            </p>
          </div>
        </motion.div>

        {/* Right Card: Horarios de Atención (3 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          className="lg:col-span-3 rounded-3xl p-6 bg-stone-900/90 border border-stone-800 flex flex-col justify-between shadow-xl relative overflow-hidden"
        >
          {/* Subtle background decoration */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#18D2D8]/5 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/80 text-[10px] font-semibold text-stone-300 mb-4">
              <Clock className="w-3 h-3 text-[#18D2D8]" />
              <span>Atención al público</span>
            </div>

            <h3 className="font-serif font-bold text-2xl text-white mb-6">
              Horarios de Atención
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-2.5 text-stone-300">
                <MapPin className="w-4 h-4 text-[#18D2D8] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Ereño 673</p>
                  <p className="text-stone-400">Concepción del Uruguay, Entre Ríos</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-stone-300">
                <Phone className="w-4 h-4 text-[#18D2D8] shrink-0" />
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="font-semibold text-stone-200 hover:text-white transition-colors"
                >
                  {RESTAURANT_INFO.whatsappDisplay}
                </a>
              </div>

              <div className="pt-2">
                <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-1.5">
                  <p className="text-stone-400 font-medium">Todos los días:</p>
                  <p className="font-bold text-white text-[13px]">
                    11:00 - 15:00 y 19:00 - 02:00 hs
                  </p>
                  <p className="text-[11px] text-[#18D2D8] font-medium pt-1">
                    ¡Salón, take away & delivery!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 w-full py-3 px-4 rounded-full bg-white text-stone-900 hover:bg-stone-100 text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <span>Ver mapa y contacto</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeSection;
