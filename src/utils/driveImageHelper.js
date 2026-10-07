/**
 * Utility to parse and format Google Drive links into high-speed embeddable image URLs,
 * and provide appropriate category fallbacks for missing/broken images.
 */

// Fallback images per category (clean high-res assets)
const CATEGORY_FALLBACKS = {
  pizzas: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=800&auto=format&fit=crop',
  calzones: '/foto pizza.PNG',
  hamburguesas: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
  empanadas: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=800&auto=format&fit=crop',
  entradas: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop',
  bebidas: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
  default: '/foto pizza.PNG',
};

/**
 * Extracts Google Drive file ID from various link formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * - https://drive.google.com/thumbnail?id=FILE_ID
 * - Direct ID
 */
export function extractDriveFileId(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();

  // Pattern 1: /file/d/{id}
  const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]{25,})/);
  if (fileDMatch) return fileDMatch[1];

  // Pattern 2: id={id}
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]{25,})/);
  if (idParamMatch) return idParamMatch[1];

  // Pattern 3: /d/{id} (googleusercontent or docs)
  const dMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]{25,})/);
  if (dMatch) return dMatch[1];

  // Pattern 4: Bare ID (typically 33 or more characters)
  if (/^[a-zA-Z0-9_-]{25,45}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Transforms any image URL or Google Drive link into an embeddable image URL.
 * Google Drive thumbnail endpoint `https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000`
 * allows public cross-origin image embedding without CORS blocks.
 */
export function formatImageUrl(url, category = 'default') {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.default;
  }

  const trimmed = url.trim();

  // Check if it's a Google Drive link or bare ID
  const driveId = extractDriveFileId(trimmed);
  if (driveId) {
    // High-resolution thumbnail bypasses Google Drive CORS & viewer restriction
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000`;
  }

  // Already a valid web URL or local path
  return trimmed;
}

/**
 * Fallback image helper for onError event on <img> elements
 */
export function getCategoryFallbackImage(category = 'default') {
  return CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.default;
}
