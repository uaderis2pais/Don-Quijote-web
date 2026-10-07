import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileSpreadsheet,
  Download,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
  HelpCircle,
  Database,
  Image as ImageIcon
} from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import { SHEET_CONFIG } from '../config/sheetConfig';
import { isValidGoogleSheetInput } from '../utils/security';

export const GoogleSheetSyncModal = ({ isOpen, onClose }) => {
  const {
    sheetId,
    saveSheetId,
    refreshMenu,
    isSyncing,
    isLiveSheet,
    syncError,
    lastSyncTime,
    items,
  } = useMenu();

  const [inputUrl, setInputUrl] = useState(sheetId || '');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [inputError, setInputError] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    setInputError(null);

    const trimmed = inputUrl.trim();
    if (trimmed && !isValidGoogleSheetInput(trimmed)) {
      setInputError('El enlace o ID no es válido. Debe ser una URL de Google Sheets o un ID alfanumérico.');
      return;
    }

    saveSheetId(trimmed);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetToDefault = () => {
    setInputUrl('');
    setInputError(null);
    saveSheetId('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-[#18D2D8]/10 border border-[#18D2D8]/30 flex items-center justify-center text-[#18D2D8]">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                  Conexión con Google Sheets
                </h3>
                <p className="text-xs sm:text-sm text-stone-400">
                  Controla los productos, precios y fotos de Google Drive en tiempo real.
                </p>
              </div>
            </div>

            {/* Status Card */}
            <div className="mb-6 p-4 rounded-2xl bg-stone-950/80 border border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isLiveSheet ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'bg-amber-400'
                  }`}
                />
                <div>
                  <div className="text-sm font-semibold text-white flex items-center gap-2">
                    <span>{isLiveSheet ? 'Sincronizado con Google Sheet' : 'Modo datos locales (Por defecto)'}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-stone-800 text-stone-300">
                      {items.length} productos
                    </span>
                  </div>
                  {lastSyncTime && (
                    <div className="text-xs text-stone-400">
                      Última sincronización: {lastSyncTime} hs
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={refreshMenu}
                disabled={isSyncing}
                className="px-3.5 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-xs text-stone-200 font-medium transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#18D2D8]' : ''}`} />
                <span>{isSyncing ? 'Actualizando...' : 'Actualizar ahora'}</span>
              </button>
            </div>

            {/* Error Banner */}
            {syncError && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-950/50 border border-red-800/50 text-red-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Error al sincronizar:</strong>
                  <span>{syncError}</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                  Enlace o ID de tu Google Sheet
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="Ej: https://docs.google.com/spreadsheets/d/1BxiMVs0.../edit"
                    className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#18D2D8] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSyncing}
                    className="px-5 py-2.5 rounded-xl bg-[#18D2D8] hover:bg-[#15b8bd] text-black font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
                  >
                    {isSyncing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Database className="w-4 h-4" />
                    )}
                    <span>Guardar y Conectar</span>
                  </button>
                </div>
                {inputError && (
                  <p className="text-xs text-amber-400 mt-2 p-2 bg-amber-950/40 border border-amber-800/60 rounded-lg">
                    {inputError}
                  </p>
                )}
                {saveSuccess && (
                  <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>¡ID guardado y sincronización iniciada!</span>
                  </p>
                )}
              </div>

              {sheetId && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="text-xs text-stone-400 hover:text-stone-200 underline transition-colors"
                  >
                    Desconectar y volver a la carta local por defecto
                  </button>
                </div>
              )}
            </form>

            {/* Instructions Guide Accordion / Steps */}
            <div className="border-t border-stone-800 pt-6 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#18D2D8]" />
                <span>¿Cómo crear y vincular tu Google Sheet en 3 pasos?</span>
              </h4>

              {/* Step 1: Download & Import */}
              <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#18D2D8] uppercase tracking-wide">
                    Paso 1. Descarga la plantilla Excel con pestañas separadas
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={SHEET_CONFIG.TEMPLATE_XLSX_PATH}
                      download="Don_Quijote_Menu_Oficial.xlsx"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#18D2D8] hover:bg-[#15b8bd] text-black text-xs font-bold rounded-full transition-colors shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar Excel (.xlsx)</span>
                    </a>
                  </div>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Ya tiene las 6 pestañas separadas (<strong className="text-stone-300">Pizzas, Calzones, Hamburguesas, Empanadas, Entradas, Bebidas</strong>), anchos de columna ajustados y los IDs numerados del 1 al 10. Solo tenés que subirlo a tu Google Drive y abrirlo con Google Sheets.
                </p>
              </div>

              {/* Step 2: Share Sheet */}
              <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80 space-y-2">
                <span className="text-xs font-bold text-[#18D2D8] uppercase tracking-wide block">
                  Paso 2. Comparte la hoja de Google Sheets
                </span>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Haz clic en el botón verde <strong className="text-stone-300">Compartir</strong> (arriba a la derecha en Google Sheets), cambia el acceso general a{' '}
                  <strong className="text-stone-300">"Cualquier persona con el enlace puede ver"</strong>, copia el enlace y pégalo en el campo superior.
                </p>
              </div>

              {/* Step 3: Google Drive Photos */}
              <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80 space-y-2">
                <span className="text-xs font-bold text-[#18D2D8] uppercase tracking-wide flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Paso 3. Subir fotos a Google Drive</span>
                </span>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Sube tus fotos a Google Drive. Haz clic derecho en cada foto → <strong className="text-stone-300">Compartir</strong> → asegúrate de que esté en <strong className="text-stone-300">"Cualquier persona con el enlace puede ver"</strong>. Copia el enlace de la foto y pégalo en la columna <code className="bg-stone-800 px-1 py-0.5 rounded text-stone-200">imagen</code> del Google Sheet.
                </p>
                <p className="text-[11px] text-[#18D2D8]/90">
                  La web detectará automáticamente los enlaces de Google Drive y los convertirá en imágenes directas optimizadas sin demoras.
                </p>
              </div>
            </div>

            {/* Bottom Dismiss */}
            <div className="mt-6 pt-4 border-t border-stone-800 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GoogleSheetSyncModal;
