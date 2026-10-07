import React from 'react';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  User,
  Store,
  Bike,
  FileText,
  MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../config/restaurantConfig';

export const CartSidebar = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    formatPrice,
    orderType,
    setOrderType,
    customerName,
    setCustomerName,
    customerAddress,
    setCustomerAddress,
    customerNotes,
    setCustomerNotes,
    getWhatsAppCheckoutUrl,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Offcanvas Drawer Panel - Exactly like Genaro */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-stone-900 border-l border-stone-800 flex flex-col justify-between shadow-2xl text-stone-200"
            >
              {/* Header */}
              <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-[#25D366] flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white">
                      Tu Pedido
                    </h3>
                    <p className="text-xs text-stone-400">
                      {items.length === 0
                        ? '0 productos seleccionados'
                        : `${items.reduce((sum, i) => sum + i.quantity, 0)} productos seleccionados`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                  aria-label="Cerrar pedido"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {items.length === 0 ? (
                  /* Empty Cart State - Exactly like Genaro */
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-stone-800/80 flex items-center justify-center text-stone-500 mb-4">
                      <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h4 className="font-serif font-bold text-lg text-white mb-2">
                      El carrito está vacío
                    </h4>
                    <p className="text-xs text-stone-400 max-w-xs mb-6 leading-relaxed">
                      Agregá pizzas artesanales, hamburguesas o bebidas para armar tu pedido personalizado.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-950 hover:bg-stone-800 text-white border border-stone-700 transition-colors"
                    >
                      VER EL MENÚ
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Items List */}
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 flex items-center gap-3.5"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 rounded-xl object-cover bg-black/50 shrink-0"
                          />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <h5 className="font-serif font-bold text-sm text-white truncate">
                                {item.name}
                              </h5>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-stone-500 hover:text-rose-400 p-0.5"
                                title="Eliminar producto"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <p className="text-[11px] text-stone-400 mt-0.5">
                              {formatPrice(item.price)} c/u
                            </p>

                            <div className="flex items-center justify-between mt-2">
                              {/* Quantity pill: - 1 + */}
                              <div className="inline-flex items-center gap-2 bg-stone-900 border border-stone-800 px-2 py-0.5 rounded-full text-xs">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="text-stone-400 hover:text-white p-0.5"
                                  aria-label="Disminuir"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-bold text-white min-w-[14px] text-center text-xs">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="text-stone-400 hover:text-white p-0.5"
                                  aria-label="Aumentar"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="font-bold text-sm text-[#18D2D8]">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Form: Datos para el pedido */}
                    <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-4">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-white">
                          Datos para el pedido
                        </h4>
                        <p className="text-[11px] text-stone-400">
                          Completá tus datos para que el local prepare tu orden
                        </p>
                      </div>

                      {/* Nombre y Apellido */}
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                          NOMBRE Y APELLIDO *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                          <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="Tu nombre y apellido"
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-stone-700 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Modalidad de entrega */}
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                          MODALIDAD DE ENTREGA *
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setOrderType('takeaway')}
                            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                              orderType === 'takeaway'
                                ? 'bg-stone-100 text-stone-950 font-bold'
                                : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                            }`}
                          >
                            <Store className="w-3.5 h-3.5" />
                            <span>Retiro en local</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setOrderType('delivery')}
                            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                              orderType === 'delivery'
                                ? 'bg-stone-100 text-stone-950 font-bold'
                                : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                            }`}
                          >
                            <Bike className="w-3.5 h-3.5" />
                            <span>Envío a domicilio</span>
                          </button>
                        </div>
                      </div>

                      {/* Retiro vs Delivery info */}
                      {orderType === 'takeaway' ? (
                        <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800/80 text-xs">
                          <p className="font-semibold text-stone-200">Punto de retiro:</p>
                          <p className="text-stone-400 mt-0.5">{RESTAURANT_INFO.address}</p>
                        </div>
                      ) : (
                        <div>
                          <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                            DIRECCIÓN DE ENTREGA *
                          </label>
                          <input
                            type="text"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            placeholder="Calle, número, piso / dpto"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-stone-700 transition-colors"
                          />
                        </div>
                      )}

                      {/* Aclaraciones */}
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                          ACLARACIONES DEL PEDIDO (OPCIONAL)
                        </label>
                        <div className="relative">
                          <FileText className="w-4 h-4 absolute left-3 top-3 text-stone-500" />
                          <textarea
                            rows={2}
                            value={customerNotes}
                            onChange={(e) => setCustomerNotes(e.target.value)}
                            placeholder="Ej: Horario estimado de retiro, indicaciones especiales..."
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-stone-700 resize-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer & WhatsApp Checkout */}
              {items.length > 0 && (
                <div className="p-5 border-t border-stone-800 bg-stone-950 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold tracking-wider text-stone-400">
                      TOTAL ESTIMADO
                    </span>
                    <span className="font-serif font-bold text-2xl text-white">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {/* Green WhatsApp Action Button - Matching Genaro */}
                  <motion.a
                    href={getWhatsAppCheckoutUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 px-4 rounded-xl font-sans font-bold text-sm bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center gap-2 shadow-lg transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                    <span>Enviar Pedido por WhatsApp</span>
                  </motion.a>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                    <span>El pago se acuerda con el local</span>
                    <button
                      onClick={clearCart}
                      className="hover:text-rose-400 underline transition-colors"
                    >
                      Vaciar lista
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
