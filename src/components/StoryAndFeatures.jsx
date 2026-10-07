import React from 'react';
import { Leaf, Heart, Star, Clock, Flame, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const StoryAndFeatures = () => {
  const features = [
    {
      icon: Leaf,
      title: 'Ingredientes Frescos',
      desc: 'Vegetales seleccionados y muzzarella de primera línea.',
    },
    {
      icon: Heart,
      title: 'Elaboración Artesanal',
      desc: 'Fermentación lenta de 48 hs con masa madre tradicional.',
    },
    {
      icon: Star,
      title: 'Calidad Premium',
      desc: 'Insumos de campo seleccionados para cada receta.',
    },
    {
      icon: Clock,
      title: 'Recién Horneado',
      desc: 'Salen del fuego a tus manos, todos los días.',
    },
  ];

  return (
    <div>
      {/* Nuestra Historia Section */}
      <section id="historia" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Photo with Tag */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-800 group">
              <img
                src="/foto pizza.PNG"
                alt="Pizza y calzone artesanal en Don Quijote"
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-black/85 backdrop-blur-md text-stone-200 border border-white/10 shadow-lg">
                <Flame className="w-3.5 h-3.5 text-[#18D2D8]" />
                <span>Recién salida de nuestro horno</span>
              </span>
            </div>
          </motion.div>

          {/* Right Column: Editorial Text with Script Accent */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone-400">
              <Sparkles className="w-3.5 h-3.5 text-[#18D2D8]" />
              <span>TRADICIÓN & PASIÓN</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Amasamos historias, horneamos{' '}
              <span className="font-script text-4xl sm:text-6xl text-[#18D2D8] font-normal normal-case inline-block">
                recuerdos
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              En Don Quijote Pizza Bar respetamos el tiempo que la masa necesita. Nuestro proceso de fermentación lenta de 48 horas con masa madre garantiza una pizza ligera, aireada por dentro y crujiente por fuera.
            </p>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Seleccionamos cada ingrediente: aceite de oliva virgen extra de primera presión, sal marina patagónica y quesos de tambo seleccionados. No es solo comer pizza: es el punto de encuentro donde nacen las mejores anécdotas en Concepción del Uruguay.
            </p>

            {/* Brand Signature */}
            <div className="flex items-center gap-3 pt-4 text-xs font-serif uppercase tracking-[0.2em] text-stone-400">
              <span className="h-px w-10 bg-stone-700" />
              <span className="font-bold text-white">DON QUIJOTE</span>
              <span>— PIZZA BAR ARTESANAL</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 Feature Circles Row */}
      <section className="py-14 border-y border-stone-800/80 bg-stone-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="flex flex-col items-center group"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 group-hover:text-[#18D2D8] group-hover:border-stone-700 transition-colors mb-4 shadow-md group-hover:shadow-[0_0_15px_rgba(24,210,216,0.2)]">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-white mb-1.5">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-stone-400 max-w-[200px] leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Panoramic Banner with Script Quote */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative h-64 sm:h-80 w-full overflow-hidden flex items-center justify-center"
      >
        <img
          src="https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=1920&auto=format&fit=crop"
          alt="Pizza artesanal Don Quijote"
          className="w-full h-full object-cover brightness-[0.35]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-[#121212]" />
        <div className="relative z-10 text-center px-4">
          <p className="font-script text-4xl sm:text-6xl md:text-7xl text-stone-100 drop-shadow-md">
            Compartir risas y buenos sabores
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default StoryAndFeatures;
