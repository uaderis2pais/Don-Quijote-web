import { formatImageUrl } from '../utils/driveImageHelper';
import { extractSpreadsheetId } from '../config/sheetConfig';

/**
 * Robust RFC 4180 compliant CSV parser
 * Handles quoted fields, escaped quotes (""), commas inside quotes, and line breaks.
 */
export function parseCSV(csvText) {
  if (!csvText || typeof csvText !== 'string') return [];

  // Remove UTF-8 BOM if present
  let cleanText = csvText.replace(/^\uFEFF/, '').trim();
  if (!cleanText) return [];

  const rows = [];
  let currentRow = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];
    const nextChar = cleanText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++; // Skip next quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentField.trim());
      if (currentRow.some((field) => field.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((field) => field.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Normalizes Argentine currency amounts (e.g. "$ 12.500", "12500,00", "14.500") into clean numbers
 */
function parsePrice(value) {
  if (value === undefined || value === null) return 0;
  if (typeof value === 'number') return Math.round(value);

  const str = String(value).trim();
  if (!str) return 0;

  const cleanStr = str.replace(/[$\s]/g, '');

  if (cleanStr.includes('.') && !cleanStr.includes(',')) {
    const parts = cleanStr.split('.');
    if (parts.length === 2 && parts[1].length === 3) {
      return parseInt(parts[0] + parts[1], 10) || 0;
    }
  }

  const normalized = cleanStr.replace(/\./g, '').replace(',', '.');
  const num = parseFloat(normalized);
  return isNaN(num) ? 0 : Math.round(num);
}

/**
 * Maps varying category names into standard category IDs
 */
function normalizeCategory(raw) {
  if (!raw) return 'pizzas';
  const lower = String(raw).trim().toLowerCase();

  if (lower.includes('pizza')) return 'pizzas';
  if (lower.includes('calzon')) return 'calzones';
  if (lower.includes('hamburguesa') || lower.includes('lomito') || lower.includes('entre pane') || lower.includes('sandwich')) return 'hamburguesas';
  if (lower.includes('empanada')) return 'empanadas';
  if (lower.includes('principal') || lower.includes('minuta') || lower.includes('carne') || lower.includes('pescado') || lower.includes('pasta') || lower.includes('wok')) return 'principales';
  if (lower.includes('ensalada')) return 'ensaladas';
  if (lower.includes('entrada') || lower.includes('papa') || lower.includes('raba') || lower.includes('batata')) return 'entradas';
  if (lower.includes('bebida') || lower.includes('trago') || lower.includes('cerveza') || lower.includes('bar')) return 'bebidas';

  return lower;
}

/**
 * Transforms raw parsed CSV rows into typed product objects.
 * Supports an optional defaultCategory when rows come from a dedicated tab (e.g. "Pizzas").
 */
export function transformRowsToProducts(rows, defaultCategory = null) {
  if (!rows || rows.length < 2) return [];

  // Normalize header keys
  const headers = rows[0].map((h) =>
    String(h)
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9_]/g, '')
  );

  const getColIndex = (aliases) => {
    return headers.findIndex((h) => aliases.includes(h));
  };

  const idIdx = getColIndex(['id', 'codigo', 'cod', 'sku', 'numero', 'nro']);
  const catIdx = getColIndex(['categoria', 'category', 'rubro', 'seccion']);
  const nameIdx = getColIndex(['nombre', 'name', 'producto', 'titulo', 'item']);
  const descIdx = getColIndex(['descripcion', 'description', 'ingredientes', 'detalle', 'desc']);
  const priceIdx = getColIndex(['precio', 'price', 'preciogrande', 'grande', 'valor']);
  const mediaPriceIdx = getColIndex(['preciomedia', 'mediaprecio', 'media', 'mediapizza', 'porcion']);
  const subCatIdx = getColIndex(['subcategoria', 'subcategory', 'sub_categoria', 'tipo']);
  const imgIdx = getColIndex(['imagen', 'image', 'foto', 'linkfoto', 'drive', 'link']);
  const badgeIdx = getColIndex(['destacado', 'badge', 'etiqueta', 'promo', 'tag']);
  const availIdx = getColIndex(['disponible', 'activo', 'habilitado', 'stock', 'visible']);

  if (nameIdx === -1) {
    return [];
  }

  const products = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const name = nameIdx !== -1 ? row[nameIdx] : '';
    if (!name || !name.trim()) continue; // Skip empty rows

    // Check availability (default SI)
    const rawAvail = availIdx !== -1 && row[availIdx] ? row[availIdx].trim().toUpperCase() : 'SI';
    if (rawAvail === 'NO' || rawAvail === 'FALSE' || rawAvail === '0') {
      continue; // Item deactivated by owner
    }

    const rawCategory = catIdx !== -1 && row[catIdx] ? row[catIdx] : defaultCategory || 'pizzas';
    const category = normalizeCategory(rawCategory);

    const rawImage = imgIdx !== -1 && row[imgIdx] ? row[imgIdx].trim() : '';
    const image = formatImageUrl(rawImage, category);

    const price = priceIdx !== -1 ? parsePrice(row[priceIdx]) : 0;

    // Unique ID generation: if user provided 1, 2, 3 in a category tab, prefix with category (e.g. pz-1)
    const rawId = idIdx !== -1 && row[idIdx] && row[idIdx].trim() ? row[idIdx].trim() : `${r}`;
    const id = defaultCategory
      ? `${defaultCategory.substring(0, 2)}-${rawId}`
      : rawId.startsWith(category.substring(0, 2))
        ? rawId
        : `${category.substring(0, 2)}-${rawId}`;

    const description = descIdx !== -1 && row[descIdx] ? row[descIdx].trim() : '';
    const rawBadge = badgeIdx !== -1 && row[badgeIdx] ? row[badgeIdx].trim() : '';
    const badge = (rawBadge.toUpperCase() === 'SI' || rawBadge.toUpperCase() === 'TRUE')
      ? 'Destacado'
      : (rawBadge.toUpperCase() === 'NO' || rawBadge.toUpperCase() === 'FALSE' ? '' : rawBadge);

    products.push({
      id,
      name: name.trim(),
      category,
      price,
      description,
      image,
      badge,
    });
  }

  return products;
}

/**
 * Tries fetching CSV text from a single tab via GViz or Elk Proxy
 */
async function fetchTabCsv(cleanId, tabName) {
  const url = `https://docs.google.com/spreadsheets/d/${cleanId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'text/csv, text/plain, */*' },
      cache: 'no-cache',
    });
    if (response.ok) {
      const text = await response.text();
      if (text && !text.includes('<!DOCTYPE html>') && text.length > 15) {
        return text;
      }
    }
  } catch (e) {
    // ignore
  }

  // Fallback to Elk open-sheet proxy if GViz fails
  try {
    const proxyUrl = `https://opensheet.elk.sh/${cleanId}/${encodeURIComponent(tabName)}`;
    const jsonRes = await fetch(proxyUrl);
    if (jsonRes.ok) {
      const items = await jsonRes.json();
      if (Array.isArray(items) && items.length > 0) {
        return { isJson: true, items };
      }
    }
  } catch (e) {
    // ignore
  }

  return null;
}

const CATEGORY_TABS = [
  { category: 'pizzas', tabNames: ['Pizzas', 'pizzas', 'Pizzas Artesanales', 'Pizza'] },
  { category: 'calzones', tabNames: ['Calzones', 'calzones', 'Calzones Artesanales', 'Calzon'] },
  { category: 'hamburguesas', tabNames: ['Hamburguesas', 'hamburguesas', 'Hamburguesas & Lomitos', 'Burgers', 'Entre Panes'] },
  { category: 'empanadas', tabNames: ['Empanadas', 'empanadas', 'Empanadas Caseras', 'Empanada'] },
  { category: 'principales', tabNames: ['Principales', 'principales', 'Platos Principales', 'Cocina', 'Minutas'] },
  { category: 'ensaladas', tabNames: ['Ensaladas', 'ensaladas'] },
  { category: 'entradas', tabNames: ['Entradas', 'entradas', 'Entradas & Papas', 'Papas'] },
  { category: 'bebidas', tabNames: ['Bebidas', 'bebidas', 'Bebidas & Bar', 'Bar'] },
];

/**
 * Fetches products from Google Sheet by ID or URL.
 * Automatically detects whether the spreadsheet uses multiple category tabs (Pizzas, Calzones, etc.)
 * or a single combined table (Menu / Hoja 1).
 */
export async function fetchGoogleSheetProducts(sheetIdentifier, sheetName = 'Menu') {
  const cleanId = extractSpreadsheetId(sheetIdentifier);
  if (!cleanId) {
    throw new Error('ID de Google Sheet no provisto.');
  }

  // 1. First, attempt Multi-Tab Mode (Pizzas, Calzones, Hamburguesas, Empanadas, Entradas, Bebidas)
  try {
    const tabPromises = CATEGORY_TABS.map(async ({ category, tabNames }) => {
      for (const name of tabNames) {
        const result = await fetchTabCsv(cleanId, name);
        if (result) {
          if (typeof result === 'string') {
            const rows = parseCSV(result);
            const prods = transformRowsToProducts(rows, category);
            if (prods.length > 0) return prods;
          } else if (result.isJson) {
            const prods = transformOpenSheetJson(result.items, category);
            if (prods.length > 0) return prods;
          }
        }
      }
      return [];
    });

    const results = await Promise.all(tabPromises);
    const combinedProducts = results.flat();

    if (combinedProducts.length > 0) {
      return combinedProducts;
    }
  } catch (e) {
    console.warn('Multi-tab check failed, trying single-sheet fallback:', e);
  }

  // 2. Single-Sheet Mode Fallback (Sheet named "Menu" or default first sheet)
  const urlsToTry = [];
  if (cleanId.startsWith('2PACX-')) {
    urlsToTry.push(`https://docs.google.com/spreadsheets/d/e/${cleanId}/pub?output=csv`);
  } else {
    if (sheetName) {
      urlsToTry.push(`https://docs.google.com/spreadsheets/d/${cleanId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`);
    }
    urlsToTry.push(`https://docs.google.com/spreadsheets/d/${cleanId}/gviz/tq?tqx=out:csv`);
    urlsToTry.push(`https://docs.google.com/spreadsheets/d/${cleanId}/export?format=csv`);
  }

  let csvContent = null;
  let lastError = null;

  for (const url of urlsToTry) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'text/csv, text/plain, */*' },
        cache: 'no-cache',
      });

      if (response.ok) {
        const text = await response.text();
        if (text && !text.includes('<!DOCTYPE html>') && text.length > 20) {
          csvContent = text;
          break;
        }
      }
    } catch (err) {
      lastError = err;
    }
  }

  if (!csvContent && !cleanId.startsWith('2PACX-')) {
    try {
      const proxyUrl = `https://opensheet.elk.sh/${cleanId}/${encodeURIComponent(sheetName || '1')}`;
      const jsonResponse = await fetch(proxyUrl);
      if (jsonResponse.ok) {
        const items = await jsonResponse.json();
        if (Array.isArray(items) && items.length > 0) {
          return transformOpenSheetJson(items);
        }
      }
    } catch (err) {
      // proxy error
    }
  }

  if (!csvContent) {
    throw new Error(
      lastError?.message ||
      'No se pudo leer la hoja. Asegúrate de que el Google Sheet esté compartido como "Cualquier persona con el enlace puede leer".'
    );
  }

  const rows = parseCSV(csvContent);
  const products = transformRowsToProducts(rows);

  if (products.length === 0) {
    throw new Error('La hoja de cálculo no contiene filas válidas de productos.');
  }

  return products;
}

/**
 * Transforms JSON output from opensheet proxy if CSV was blocked
 */
function transformOpenSheetJson(items, defaultCategory = null) {
  return items.map((item, idx) => {
    const rawCat = item.categoria || item.category || defaultCategory || 'pizzas';
    const category = normalizeCategory(rawCat);
    const rawImage = item.imagen || item.image || item.foto || '';
    const image = formatImageUrl(rawImage, category);
    const price = parsePrice(item.precio || item.price);
    const mediaPrice = parsePrice(item.precio_media || item.mediaPrice || item.media);
    const rawSub = String(item.subcategoria || item.subCategory || '').toLowerCase();
    const subCategory = rawSub.includes('especial') ? 'especial' : 'clasica';

    const rawId = item.id || item.codigo || item.numero || `${idx + 1}`;
    const id = defaultCategory
      ? `${defaultCategory.substring(0, 2)}-${rawId}`
      : `${category.substring(0, 2)}-${rawId}`;

    return {
      id,
      name: (item.nombre || item.name || `Producto ${idx + 1}`).trim(),
      category,
      subCategory,
      price,
      ...(mediaPrice > 0 ? { mediaPrice } : {}),
      description: (item.descripcion || item.description || '').trim(),
      image,
      badge: (item.destacado || item.badge || '').trim(),
    };
  });
}
