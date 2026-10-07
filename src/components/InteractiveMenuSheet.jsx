import React, { useState, useRef, useEffect } from 'react';
import { Camera, Plus, Sparkles, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMenu } from '../context/MenuContext';
import ProductModal from './ProductModal';

export const InteractiveMenuSheet = () => {
  const { sheetData, categories } = useMenu();
  const { formatPrice } = useCart();
  const [activeTab, setActiveTab] = useState('pizzas');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Horizontal scroll tabs logic
  const tabsContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = tabsContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleScrollTabs = (direction) => {
    const el = tabsContainerRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -220 : 220;
    el.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(checkScroll, 250);
  };

  const handleSelectTab = (tabId, e) => {
    setActiveTab(tabId);
    if (e && e.currentTarget) {
      e.currentTarget.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  };

  const currentData = sheetData[activeTab] || {
    title: activeTab.toUpperCase(),
    subtitle: 'Especialidades caseras',
    leftCol: { items: [] },
    rightCol: { items: [] },
  };

  const totalItemsInTab = (currentData.leftCol.items?.length || 0) + (currentData.rightCol.items?.length || 0);

  const handleOpenProduct = (item) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  return (
    <section id="carta" className="py-8 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Introduction */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#18D2D8] block mb-2 font-sans">
          CARTA DIGITAL INTERACTIVA
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wider">
          Menú Tradicional
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-2 font-sans">
          Hacé clic en cualquier plato para ver sus detalles y sumarlo a tu orden.
        </p>
      </div>

      {/* Top Interactive Tabs with Smooth Horizontal Scroll & Chevrons */}
      <div className="relative max-w-5xl mx-auto mb-8 sm:mb-12">
        {/* Left Scroll Chevron Button */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScrollTabs('left')}
            className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-stone-900/95 text-stone-200 hover:text-white hover:bg-stone-800 border border-stone-700 shadow-xl flex items-center justify-center transition-all"
            aria-label="Desplazar categorías hacia la izquierda"
          >
            <ChevronLeft className="w-4 h-4 text-[#18D2D8]" />
          </button>
        )}

        {/* Left Gradient Fade Mask */}
        <div
          className={`pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#121212] to-transparent z-10 transition-opacity duration-200 ${
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Scrollable Container with All Category Pills */}
        <div
          ref={tabsContainerRef}
          onScroll={checkScroll}
          className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar scroll-smooth px-8 sm:px-12 py-2 border-b border-stone-800/80"
        >
          {categories.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={(e) => handleSelectTab(tab.id, e)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold tracking-wider transition-all whitespace-nowrap shrink-0 relative ${
                  isActive
                    ? 'bg-[#18D2D8] text-black shadow-md shadow-[#18D2D8]/20 scale-[1.02]'
                    : 'text-stone-300 hover:text-white hover:bg-stone-900 border border-stone-800/70 bg-stone-950/60'
                }`}
              >
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right Gradient Fade Mask */}
        <div
          className={`pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#121212] to-transparent z-10 transition-opacity duration-200 ${
            canScrollRight ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Right Scroll Chevron Button */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScrollTabs('right')}
            className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-stone-900/95 text-stone-200 hover:text-white hover:bg-stone-800 border border-stone-700 shadow-xl flex items-center justify-center transition-all"
            aria-label="Desplazar categorías hacia la derecha"
          >
            <ChevronRight className="w-4 h-4 text-[#18D2D8]" />
          </button>
        )}
      </div>

      {/* The Menu Sheet Card */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-800 bg-[#f4f7f9] text-stone-900 relative">
        {/* Subtle Watermark Drawings Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035] flex items-center justify-between px-10">
          <svg viewBox="0 0 100 100" className="w-96 h-96 text-stone-900" fill="currentColor">
            <path d="M50 5 L90 85 C90 85 70 95 50 95 C30 95 10 85 10 85 Z" />
          </svg>
          <svg viewBox="0 0 100 100" className="w-96 h-96 text-stone-900" fill="currentColor">
            <circle cx="50" cy="50" r="45" />
          </svg>
        </div>

        {/* Top Header Banner - Don Quijote Serif Typography on "DON QUIJOTE" and "MENÚ" */}
        <div className="bg-[#0f2334] text-white px-4 sm:px-10 py-4 sm:py-6 flex items-center justify-between border-b border-[#0a1824] relative z-10">
          {/* Left Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#18D2D8]/60 shrink-0 shadow-md">
              <img
                src="/logo.jpg"
                alt="Don Quijote Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-serif font-bold text-lg sm:text-2xl text-white block leading-tight tracking-wider">
                DON QUIJOTE
              </span>
              <span className="text-[9px] sm:text-xs font-sans uppercase tracking-[0.25em] text-[#18D2D8] block font-semibold">
                PIZZA BAR
              </span>
            </div>
          </div>

          {/* Right Boxed Frame [ M E N U ] in the same Serif font as Don Quijote */}
          <div className="border border-[#18D2D8]/80 px-3.5 sm:px-6 py-1 sm:py-1.5 tracking-[0.25em] font-serif font-bold text-xs sm:text-sm text-white bg-[#0f2334]/80 shadow-sm shrink-0">
            MENÚ
          </div>
        </div>

        {/* Inner Sheet Content */}
        <div className="p-4 sm:p-8 lg:p-10 relative z-10">
          {/* Active Category Display Title */}
          <div className="text-center mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-stone-300/80">
            <h3 className="font-serif font-bold text-xl sm:text-3xl uppercase tracking-wider text-[#0f2334]">
              {currentData.title}
            </h3>
            <p className="text-xs text-stone-600 mt-1 italic font-serif">
              {currentData.subtitle}
            </p>
          </div>

          {/* If Category is Empty */}
          {totalItemsInTab === 0 ? (
            <div className="py-16 text-center text-stone-500">
              <p className="font-serif text-base mb-1">Cargando productos de esta categoría...</p>
              <p className="text-xs text-stone-400">Verificando disponibilidad en la carta oficial.</p>
            </div>
          ) : (
            /* Two-Column Grid Separated by Vertical Divider (Unified category split across 2 columns) */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
              {/* Center Vertical Divider (Desktop) */}
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-stone-300" />

              {/* Left Column */}
              <div className="space-y-4 sm:space-y-5">
                {currentData.leftCol.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleOpenProduct(item)}
                    className="group cursor-pointer p-2 sm:p-2.5 -mx-1 sm:-mx-2.5 rounded-xl hover:bg-stone-200/60 active:bg-stone-200 transition-all duration-200"
                    title="Click para ver foto y agregar al carrito"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-serif font-bold text-sm sm:text-base text-[#0f2334] group-hover:text-[#18D2D8] transition-colors leading-snug">
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] uppercase font-bold text-[#0f2334] bg-stone-200/90 px-1.5 py-0.5 rounded tracking-wide shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 pt-0.5">
                        <span className="font-sans font-bold text-xs sm:text-base text-[#0f2334] whitespace-nowrap">
                          {formatPrice(item.price)}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-stone-300 group-hover:bg-[#18D2D8] text-stone-800 group-hover:text-black flex items-center justify-center transition-colors shrink-0">
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-stone-600 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-4 sm:space-y-5">
                {currentData.rightCol.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleOpenProduct(item)}
                    className="group cursor-pointer p-2 sm:p-2.5 -mx-1 sm:-mx-2.5 rounded-xl hover:bg-stone-200/60 active:bg-stone-200 transition-all duration-200"
                    title="Click para ver foto y agregar al carrito"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-serif font-bold text-sm sm:text-base text-[#0f2334] group-hover:text-[#18D2D8] transition-colors leading-snug">
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] uppercase font-bold text-[#0f2334] bg-stone-200/90 px-1.5 py-0.5 rounded tracking-wide shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 pt-0.5">
                        <span className="font-sans font-bold text-xs sm:text-base text-[#0f2334] whitespace-nowrap">
                          {formatPrice(item.price)}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-stone-300 group-hover:bg-[#18D2D8] text-stone-800 group-hover:text-black flex items-center justify-center transition-colors shrink-0">
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-stone-600 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hint note at bottom */}
          <div className="mt-8 pt-4 border-t border-stone-200 text-center text-xs text-stone-500">
            <span className="inline-flex items-center justify-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#0f2334]" />
              <span>Hacé clic en cualquier plato para abrir su ficha con foto y sumarlo a tu orden.</span>
            </span>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default InteractiveMenuSheet;
