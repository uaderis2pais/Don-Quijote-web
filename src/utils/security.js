/**
 * Security & Anti-Spam Utility
 * Provides input sanitization, honeypot validation, rate limiting, and safe URL checks.
 */

/**
 * Sanitizes user text input:
 * - Trims whitespace
 * - Strips dangerous HTML tags and script-like tokens
 * - Strips null bytes and invisible control characters
 * - Enforces max length
 */
export function sanitizeInputText(input, maxLength = 200) {
  if (input === null || input === undefined) return '';
  let str = String(input).trim();

  // Remove null bytes and non-printable control characters (except common newlines)
  str = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Strip HTML / XML tags: <script>, <iframe>, etc.
  str = str.replace(/<[^>]*>?/gm, '');

  // Normalize excessive spaces and newlines
  str = str.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n');

  // Enforce max length
  if (str.length > maxLength) {
    str = str.substring(0, maxLength);
  }

  return str;
}

/**
 * Validates honeypot field:
 * Legitimate human users will not see or fill out the honeypot field.
 * If this field contains any value, it was submitted by an automated bot.
 */
export function isBotHoneypotFilled(honeypotValue) {
  return typeof honeypotValue === 'string' && honeypotValue.trim().length > 0;
}

/**
 * Client-side rate limiting / cooldown protection to prevent spam submissions:
 * Stores submission timestamp in sessionStorage.
 */
export function checkRateLimit(actionKey, cooldownSeconds = 12) {
  const storageKey = `rate_limit_${actionKey}`;
  const now = Date.now();
  const cooldownMs = cooldownSeconds * 1000;

  try {
    const lastTimestamp = window.sessionStorage.getItem(storageKey);
    if (lastTimestamp) {
      const elapsed = now - parseInt(lastTimestamp, 10);
      if (elapsed < cooldownMs) {
        const remainingSeconds = Math.ceil((cooldownMs - elapsed) / 1000);
        return {
          allowed: false,
          remainingSeconds,
          message: `Por favor esperá ${remainingSeconds} segundo${remainingSeconds > 1 ? 's' : ''} antes de enviar otro mensaje.`,
        };
      }
    }

    // Record new timestamp
    window.sessionStorage.setItem(storageKey, String(now));
    return { allowed: true };
  } catch {
    // If sessionStorage is unavailable, allow the action
    return { allowed: true };
  }
}

/**
 * Validates that an image or resource URL is safe (https://, http://, or local /).
 * Prevents javascript:, data:, or other harmful protocols.
 */
export function isSafeHttpUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();

  // Local static paths are safe
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return true;
  }

  // Only allow standard http and https protocols
  if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) {
    return true;
  }

  return false;
}

/**
 * Strictly validates Google Sheet identifier or URL
 */
export function isValidGoogleSheetInput(input) {
  if (!input || typeof input !== 'string') return false;
  const trimmed = input.trim();

  // Pattern: docs.google.com/spreadsheets/d/...
  if (trimmed.includes('docs.google.com/spreadsheets')) {
    return /\/spreadsheets\/(?:d|e)\/([a-zA-Z0-9_-]+)/.test(trimmed);
  }

  // Bare ID format: 20-60 alphanumeric characters
  return /^[a-zA-Z0-9_-]{20,70}$/.test(trimmed);
}
