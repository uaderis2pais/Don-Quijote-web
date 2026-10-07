import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { MENU_CATEGORIES, RESTAURANT_INFO } from '../config/restaurantConfig';
import { SHEET_CONFIG, extractSpreadsheetId } from '../config/sheetConfig';
import { fetchGoogleSheetProducts } from '../services/googleSheetsService';

const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
  // Load sheet ID from localStorage or environment
  const [sheetId, setSheetIdState] = useState(() => {
    return localStorage.getItem(SHEET_CONFIG.STORAGE_KEY_SHEET_ID) || SHEET_CONFIG.DEFAULT_SHEET_ID || '';
  });

  const [items, setItems] = useState(() => {
    try {
      const cached = localStorage.getItem(SHEET_CONFIG.STORAGE_KEY_MENU_CACHE);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      // cache read error
    }
    return [];
  });

  const [isLiveSheet, setIsLiveSheet] = useState(() => {
    return !!localStorage.getItem(SHEET_CONFIG.STORAGE_KEY_MENU_CACHE) && !!localStorage.getItem(SHEET_CONFIG.STORAGE_KEY_SHEET_ID);
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const [lastSyncTime, setLastSyncTime] = useState(() => {
    return localStorage.getItem(SHEET_CONFIG.STORAGE_KEY_CACHE_TIME) || null;
  });

  // Fetch from Google Sheet
  const loadFromSheet = useCallback(async (targetSheetId = sheetId, force = false) => {
    const cleanId = extractSpreadsheetId(targetSheetId);
    if (!cleanId) {
      setIsLiveSheet(false);
      return;
    }

    setIsSyncing(true);
    setSyncError(null);

    try {
      const products = await fetchGoogleSheetProducts(cleanId, SHEET_CONFIG.SHEET_NAME);

      if (products && products.length > 0) {
        setItems(products);
        setIsLiveSheet(true);
        const now = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
        setLastSyncTime(now);

        // Save cache
        localStorage.setItem(SHEET_CONFIG.STORAGE_KEY_MENU_CACHE, JSON.stringify(products));
        localStorage.setItem(SHEET_CONFIG.STORAGE_KEY_CACHE_TIME, now);
      }
    } catch (err) {
      console.warn('Google Sheet Sync Error:', err.message);
      setSyncError(err.message);
    } finally {
      setIsSyncing(false);
    }
  }, [sheetId]);

  // Initial load: if items is empty and no sheet synced yet, load default menu.json
  useEffect(() => {
    if (items.length === 0) {
      fetch('/menu.json')
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setItems(data);
          }
        })
        .catch(() => {});
    }
  }, [items.length]);

  // Initial sheet sync if sheetId exists
  useEffect(() => {
    if (sheetId) {
      loadFromSheet(sheetId);
    }
  }, [sheetId, loadFromSheet]);

  // Update sheet ID
  const saveSheetId = (newInput) => {
    const cleanId = extractSpreadsheetId(newInput);
    setSheetIdState(cleanId);
    if (cleanId) {
      localStorage.setItem(SHEET_CONFIG.STORAGE_KEY_SHEET_ID, cleanId);
      loadFromSheet(cleanId, true);
    } else {
      localStorage.removeItem(SHEET_CONFIG.STORAGE_KEY_SHEET_ID);
      localStorage.removeItem(SHEET_CONFIG.STORAGE_KEY_MENU_CACHE);
      localStorage.removeItem(SHEET_CONFIG.STORAGE_KEY_CACHE_TIME);
      setIsLiveSheet(false);
      setLastSyncTime(null);
      // Reload initial menu.json
      fetch('/menu.json')
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => {
          if (Array.isArray(data)) setItems(data);
        })
        .catch(() => {});
    }
  };

  const refreshMenu = () => {
    if (sheetId) {
      loadFromSheet(sheetId, true);
    }
  };

  // Build sheetData structured for InteractiveMenuSheet: all items in category split in 2 columns
  const sheetData = useMemo(() => {
    const result = {};

    MENU_CATEGORIES.forEach((cat) => {
      const catItems = items.filter((i) => i.category === cat.id);
      const mid = Math.ceil(catItems.length / 2);
      const leftItems = catItems.slice(0, mid);
      const rightItems = catItems.slice(mid);

      result[cat.id] = {
        title: cat.title,
        subtitle: cat.subtitle,
        leftCol: {
          items: leftItems,
        },
        rightCol: {
          items: rightItems,
        },
      };
    });

    return result;
  }, [items]);

  return (
    <MenuContext.Provider
      value={{
        items,
        categories: MENU_CATEGORIES,
        sheetData,
        sheetId,
        saveSheetId,
        refreshMenu,
        isSyncing,
        isLiveSheet,
        syncError,
        lastSyncTime,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu debe ser utilizado dentro de un MenuProvider');
  }
  return context;
};

export default MenuContext;
