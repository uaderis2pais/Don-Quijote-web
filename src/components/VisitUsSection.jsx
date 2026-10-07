import React, { useState } from 'react';
import { MapPin, Clock, Phone, MessageSquare, Send, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { RESTAURANT_INFO } from '../config/restaurantConfig';

export const VisitUsSection = () => {
  const [suggestionType, setSuggestionType] = useState('mesa');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSendSuggestion = (e) => {
    e.preventDefault();
    const typeLabel = {
      mesa: 'Reserva de mesa',
      sabor: 'Sugerencia de nuevo sabor',
      evento: 'Consulta por evento / cumpleaños',
      otro: 'Consulta general',
    }[suggestionType] || 'Consulta';

    const text = `¡Hola Don Quijote Pizza Bar!\n\n*Tipo:* ${typeLabel}\n*Nombre:* ${name || 'Cliente'}\n*Mensaje:* ${message || 'Hola, quería hacer una consulta.'}`;
    const url = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-900/60 border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Ornaments - Exactly like Genaro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-[10px] font-semibold text-stone-300 uppercase tracking-wider mb-3">
            <MapPin className="w-3 h-3 text-[#18D2D8]" />
            <span>VISITANOS EN CONCEPCIÓN DEL URUGUAY</span>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
            <svg
              className="w-8 sm:w-12 h-6 text-stone-500 select-none"
              viewBox="0 0 48 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 12 C14 8, 26 8, 44 12" />
              <path d="M12 9 C16 4, 20 6, 20 10" />
              <path d="M22 8 C26 3, 30 5, 30 9" />
              <path d="M32 7 C36 2, 40 4, 40 8" />
            </svg>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Vení a visitarnos
            </h2>

            <svg
              className="w-8 sm:w-12 h-6 text-stone-500 select-none scale-x-[-1]"
              viewBox="0 0 48 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 12 C14 8, 26 8, 44 12" />
              <path d="M12 9 C16 4, 20 6, 20 10" />
              <path d="M22 8 C26 3, 30 5, 30 9" />
              <path d="M32 7 C36 2, 40 4, 40 8" />
            </svg>
          </div>

          <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
            El aroma a masa madre y muzzarella gratinada te guiará hasta nuestra puerta. Te esperamos para compartir una noche inolvidable.
          </p>
        </motion.div>

        {/* 3 Structured Cards - Replicating Genaro's 3-card layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: Datos de Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-3xl p-6 sm:p-7 bg-stone-900 border border-stone-800 flex flex-col justify-between shadow-xl"
          >
            <div className="space-y-6">
              {/* Dirección */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-stone-800 text-stone-200 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#18D2D8]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                    DIRECCIÓN
                  </span>
                  <h4 className="font-serif font-bold text-lg text-white">
                    Ereño 673
                  </h4>
                  <p className="text-xs text-stone-400">
                    Concepción del Uruguay, Entre Ríos
                  </p>
                </div>
              </div>

              {/* Horarios */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-stone-800 text-stone-200 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#18D2D8]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                    NUESTROS HORARIOS
                  </span>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-white">
                    Lunes a Domingos:
                  </h4>
                  <p className="text-xs text-stone-300 font-medium">
                    11:00 - 15:00 hs | 19:00 - 02:00 hs
                  </p>
                </div>
              </div>

              {/* Teléfono / WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                    PEDIDOS & WHATSAPP
                  </span>
                  <p className="font-bold text-sm sm:text-base text-white">
                    {RESTAURANT_INFO.whatsappDisplay}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <motion.a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('¡Hola Don Quijote! Quiero hacer un pedido.')}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>Hacer pedido por WhatsApp</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Card 2: Dónde Encontrarnos (Map) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-3xl p-6 sm:p-7 bg-stone-900 border border-stone-800 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center gap-2 text-stone-400 text-xs mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#18D2D8]" />
                <span className="text-[10px] uppercase font-bold tracking-wider">
                  UBICACIÓN EN EL MAPA
                </span>
              </div>
              <h4 className="font-serif font-bold text-xl text-white mb-1">
                Dónde encontrarnos
              </h4>
              <p className="text-xs text-stone-400 mb-4">
                Ereño 673, Concepción del Uruguay.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-stone-800 h-56 w-full bg-stone-950">
              <iframe
                title="Ubicación Pizzería Don Quijote"
                src="https://maps.google.com/maps?q=pizzeria+don+quijote+concepcion+del+uruguay&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="pt-4">
              <motion.a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-stone-700/60 shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5 text-[#18D2D8]" />
                <span>Abrir en Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </motion.a>
            </div>
          </motion.div>

          {/* Card 3: Formulario Consulta o Sugerencia */}
          <motion.form
            onSubmit={handleSendSuggestion}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-3xl p-6 sm:p-7 bg-stone-900 border border-stone-800 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center gap-2 text-stone-400 text-xs mb-1">
                <MessageSquare className="w-3.5 h-3.5 text-[#18D2D8]" />
                <span className="text-[10px] uppercase font-bold tracking-wider">
                  TU OPINIÓN NOS IMPORTA
                </span>
              </div>
              <h4 className="font-serif font-bold text-xl text-white mb-2">
                Envianos tu consulta
              </h4>
              <p className="text-xs text-stone-400 mb-4 leading-relaxed">
                ¿Querés reservar una mesa para un grupo, consultar por un evento o dejarnos una sugerencia? Te respondemos al instante.
              </p>

              {/* Type pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {[
                  { id: 'mesa', label: 'Reserva Mesa' },
                  { id: 'sabor', label: 'Nuevo Sabor' },
                  { id: 'evento', label: 'Cumpleaños' },
                  { id: 'otro', label: 'Otro' },
                ].map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setSuggestionType(t.id)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors ${
                      suggestionType === t.id
                        ? 'bg-stone-100 text-stone-950 font-bold'
                        : 'bg-stone-800 text-stone-300 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Inputs */}
              <div className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu Nombre y Apellido"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-stone-600 transition-colors"
                />

                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribí tu mensaje o consulta..."
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-stone-600 resize-none transition-colors"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full py-3 px-4 rounded-full bg-stone-100 hover:bg-white text-stone-950 text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-2"
            >
              <span>Enviar consulta por WhatsApp</span>
              <Send className="w-3.5 h-3.5" />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default VisitUsSection;
