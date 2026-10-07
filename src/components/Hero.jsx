import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-20 px-4 overflow-hidden"
    >
      {/* Background Photography of Pizzeria / Bar with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/background hero.jpg"
          alt="Don Quijote Pizza Bar Salón y Horno"
          className="w-full h-full object-cover object-center brightness-[0.38] scale-105 transition-transform duration-1000"
        />
        {/* Soft vignette gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/60" />
      </div>

      {/* Hero Center Editorial Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          {/* Real Brand Logo Badge in Hero */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.08 }}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#18D2D8]/80 shadow-[0_0_30px_rgba(24,210,216,0.35)] mb-4 cursor-pointer"
          >
            <img
              src="/logo.jpg"
              alt="Don Quijote Logo"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Top Ornamental Flourish Curve - Matching Genaro */}
          <svg
            className="w-20 sm:w-28 h-5 text-stone-200/80 mb-3 sm:mb-4 drop-shadow"
            viewBox="0 0 100 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 10 C22 3, 30 17, 44 10 C47 8, 49 8, 50 10 C51 8, 53 8, 56 10 C70 17, 78 3, 90 10"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="50" cy="10" r="2.2" fill="currentColor" />
            <circle cx="20" cy="10" r="1.3" fill="currentColor" />
            <circle cx="80" cy="10" r="1.3" fill="currentColor" />
          </svg>

          {/* Title Flanked by Classical Fork & Knife Cutlery */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-10">
            {/* Fork SVG */}
            <svg
              viewBox="0 0 24 100"
              className="w-4 sm:w-6 md:w-8 h-20 sm:h-32 md:h-40 text-stone-200/80 shrink-0 select-none drop-shadow"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 8 L5 28 C5 34 19 34 19 28 L19 8" />
              <line x1="9" y1="8" x2="9" y2="28" />
              <line x1="15" y1="8" x2="15" y2="28" />
              <path d="M12 34 L12 55 C10 65 10 88 12 96 C14 88 14 65 12 55" />
            </svg>

            {/* Typography */}
            <div className="text-center">
              <h1 className="text-white font-serif font-black uppercase tracking-tight text-shadow-md select-none">
                <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] drop-shadow-md">
                  DON QUIJOTE
                </span>
                <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-stone-200 mt-2 sm:mt-3 tracking-[0.18em] drop-shadow-md font-serif">
                  PIZZA BAR
                </span>
              </h1>
            </div>

            {/* Knife SVG */}
            <svg
              viewBox="0 0 24 100"
              className="w-4 sm:w-6 md:w-8 h-20 sm:h-32 md:h-40 text-stone-200/80 shrink-0 select-none drop-shadow"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 8 C7 18 7 36 13 46 L13 96" />
              <path d="M13 8 L15 8 L15 96 L13 96" />
            </svg>
          </div>

          {/* Subtitle Rule: CONCEPCIÓN DEL URUGUAY */}
          <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base text-stone-100 font-serif select-none">
            <span className="h-px w-8 sm:w-16 bg-white/70" />
            <span className="tracking-[0.25em] uppercase font-semibold text-shadow-sm">
              CONCEPCIÓN DEL URUGUAY
            </span>
            <span className="h-px w-8 sm:w-16 bg-white/70" />
          </div>

          {/* Slogan */}
          <p className="mt-5 text-sm sm:text-lg text-stone-200/90 font-sans tracking-wide max-w-xl mx-auto drop-shadow">
            ¡Compartamos risas y buenos sabores!
          </p>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.a
        href="#bienvenidos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-stone-300 hover:text-white transition-colors duration-200 z-10"
      >
        <span>DESCUBRIR</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.a>
    </section>
  );
};

export default Hero;
