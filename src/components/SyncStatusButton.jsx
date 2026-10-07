import React, { useState } from 'react';
import { FileSpreadsheet, RefreshCw } from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import GoogleSheetSyncModal from './GoogleSheetSyncModal';

export const SyncStatusButton = ({ variant = 'default', className = '' }) => {
  const { isLiveSheet, isSyncing } = useMenu();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (variant === 'pill') {
    return (
      <>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all border ${
            isLiveSheet
              ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/50'
              : 'bg-stone-900 border-stone-800 text-stone-300 hover:text-white hover:border-stone-700'
          } ${className}`}
          title="Configurar sincronización con Google Sheets"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isLiveSheet ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]' : 'bg-amber-400'
            }`}
          />
          <FileSpreadsheet className="w-3.5 h-3.5 text-[#18D2D8]" />
          <span className="font-medium">
            {isLiveSheet ? 'Google Sheets Activo' : 'Conectar Google Sheet'}
          </span>
          {isSyncing && <RefreshCw className="w-3 h-3 animate-spin text-[#18D2D8] ml-0.5" />}
        </button>

        <GoogleSheetSyncModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={`inline-flex items-center gap-2 text-xs text-stone-400 hover:text-stone-200 transition-colors ${className}`}
        title="Configurar sincronización con Google Sheets"
      >
        <FileSpreadsheet className="w-3.5 h-3.5 text-[#18D2D8]" />
        <span>{isLiveSheet ? 'Google Sheets Conectado' : 'Conectar con Google Sheet'}</span>
        {isSyncing && <RefreshCw className="w-3 h-3 animate-spin text-[#18D2D8]" />}
      </button>

      <GoogleSheetSyncModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SyncStatusButton;
