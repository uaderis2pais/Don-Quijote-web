/**
 * Configuration for Google Sheets Integration
 */

export const SHEET_CONFIG = {
  // Storage key for custom Sheet ID saved in browser
  STORAGE_KEY_SHEET_ID: 'don_quijote_sheet_id',
  STORAGE_KEY_MENU_CACHE: 'don_quijote_menu_cache',
  STORAGE_KEY_CACHE_TIME: 'don_quijote_menu_cache_time',

  // Cache duration: 10 minutes (in ms)
  CACHE_TTL_MS: 10 * 60 * 1000,

  // Default Sheet ID (can be set via .env or modified live in the web interface)
  DEFAULT_SHEET_ID: import.meta.env.VITE_GOOGLE_SHEET_ID || '',

  // Sheet tab name (leave empty for the default first tab)
  SHEET_NAME: 'Menu',

  // Local template files for user download
  TEMPLATE_XLSX_PATH: '/Don_Quijote_Menu_Oficial.xlsx',
  TEMPLATE_PLANTILLAS_DIR: '/plantillas/',
};

/**
 * Normalizes input: extracts Sheet ID if the user pasted the entire Google Docs URL
 */
export function extractSpreadsheetId(input) {
  if (!input || typeof input !== 'string') return '';
  const trimmed = input.trim();

  // Pattern: https://docs.google.com/spreadsheets/d/{ID}/...
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];

  // Pattern: https://docs.google.com/spreadsheets/d/e/{ID}/...
  const matchPub = trimmed.match(/\/spreadsheets\/d\/e\/([a-zA-Z0-9_-]+)/);
  if (matchPub) return matchPub[1];

  // If input is already just the ID (Google Sheet IDs are typically 33-44 chars)
  if (/^[a-zA-Z0-9_-]{20,70}$/.test(trimmed)) {
    return trimmed;
  }

  return '';
}
