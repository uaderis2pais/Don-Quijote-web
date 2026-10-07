import React from 'react';
import { Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast = () => {
  const { toastMessage, setIsCartOpen } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-24 right-6 z-40 max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#1E1E1E] border border-[#18D2D8]/40 shadow-[0_10px_25px_rgba(0,0,0,0.6),0_0_20px_rgba(24,210,216,0.25)] text-white">
        <div className="w-8 h-8 rounded-xl bg-[#18D2D8] text-black flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="flex-1 pr-2">
          <p className="text-xs sm:text-sm font-semibold text-white">{toastMessage}</p>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-[11px] font-bold text-[#18D2D8] hover:underline"
          >
            Ver carrito ahora →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
