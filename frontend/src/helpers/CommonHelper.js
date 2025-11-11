/**
 * Safely returns a formatted value or "N/A" if it's null/undefined/empty.
 * @param {*} value - The value to check.
 * @param {string} prefix - Optional prefix, e.g. "$"
 * @param {string} suffix - Optional suffix, e.g. "%"
 * @returns {string}
 */
export const safe = (value, prefix = "", suffix = "") => {
    return value !== null && value !== undefined && value !== ""
      ? `${prefix}${value}${suffix}`
      : "N/A";
  };