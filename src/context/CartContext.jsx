import React, { createContext, useContext, useState, useEffect } from 'react';
import { RESTAURANT_INFO } from '../config/restaurantConfig';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('don_quijote_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' | 'takeaway' | 'dine_in'
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('don_quijote_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }, [items]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const addItem = (product, quantity = 1) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    showToast(`¡${product.name} agregado al pedido!`);
  };

  const removeItem = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Generate WhatsApp Direct Order URL
  const getWhatsAppCheckoutUrl = () => {
    if (items.length === 0) return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}`;

    const orderTypeLabel = {
      delivery: 'Envío a domicilio',
      takeaway: 'Retiro por el local (Ereño 673)',
      dine_in: 'Consumo en el local / Mesa',
    }[orderType] || 'Pedido';

    let message = `*¡Hola Don Quijote Pizza Bar! Quiero hacer un pedido:*\n\n`;
    message += `*Detalle del Pedido:*\n`;

    items.forEach((item) => {
      message += `• ${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}\n`;
    });

    message += `\n*Total: ${formatPrice(subtotal)}*\n`;
    message += `*Modalidad:* ${orderTypeLabel}\n`;

    if (customerName.trim()) {
      message += `*Nombre:* ${customerName.trim()}\n`;
    }
    if (orderType === 'delivery' && customerAddress.trim()) {
      message += `*Dirección:* ${customerAddress.trim()}\n`;
    }
    if (customerNotes.trim()) {
      message += `*Aclaraciones:* ${customerNotes.trim()}\n`;
    }

    message += `\n¡Muchas gracias! Aguardo confirmación y tiempo estimado.`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        formatPrice,
        isCartOpen,
        setIsCartOpen,
        orderType,
        setOrderType,
        customerName,
        setCustomerName,
        customerAddress,
        setCustomerAddress,
        customerNotes,
        setCustomerNotes,
        getWhatsAppCheckoutUrl,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
