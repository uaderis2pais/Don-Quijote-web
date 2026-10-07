import React from 'react';
import { Link } from 'react-router-dom';

export const BrandLogo = ({ size = 'normal', showText = true }) => {
  const isLarge = size === 'large';

  return (
    <Link to="/" className="group flex items-center gap-3 select-none text-left">
      {/* Real Brand Logo Container */}
      <div
        className={`relative rounded-full overflow-hidden border border-[#18D2D8]/60 shadow-[0_0_15px_rgba(24,210,216,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:border-[#18D2D8] group-hover:shadow-[0_0_22px_rgba(24,210,216,0.4)] ${
          isLarge ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-10 h-10 sm:w-11 sm:h-11'
        }`}
      >
        <img
          src="/logo.jpg"
          alt="Don Quijote Pizza Bar Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-serif font-bold tracking-wider text-white leading-tight ${
              isLarge ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
            }`}
          >
            DON QUIJOTE
          </span>
          <span
            className={`font-sans font-semibold text-[#18D2D8] uppercase tracking-[0.25em] ${
              isLarge ? 'text-[11px] sm:text-xs tracking-[0.3em]' : 'text-[9px] sm:text-[10px]'
            }`}
          >
            Pizza Bar
          </span>
        </div>
      )}
    </Link>
  );
};

export default BrandLogo;
