import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export const ProductModal = ({ product, isOpen, onClose }) => {
  const { addItem, formatPrice } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Small Compact Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-sm sm:max-w-md bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-white hover:bg-black flex items-center justify-center transition-colors border border-white/10"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Product Photo */}
          <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-black/60">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/foto pizza.PNG';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30" />

            {/* Badge */}
            {product.badge && (
              <span className="absolute bottom-3 left-4 px-3 py-1 rounded-full text-[11px] font-bold bg-[#18D2D8] text-black shadow-md uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-black" />
                <span>{product.badge}</span>
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 space-y-4">
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                  {product.name}
                </h3>
              </div>
              <p className="font-sans font-bold text-lg text-[#18D2D8] mt-1">
                {formatPrice(product.price)}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Controls & Add to Cart */}
            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 px-3 py-2 rounded-full">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-stone-400 hover:text-white p-1"
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold text-white min-w-[20px] text-center text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-stone-400 hover:text-white p-1"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-full font-sans font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#18D2D8] hover:bg-[#3bf1f7] text-black'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>¡Agregado al pedido!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Añadir • {formatPrice(product.price * quantity)}</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;
