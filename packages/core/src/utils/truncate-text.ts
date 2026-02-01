/**
 * Truncate text to a specified length with ellipsis
 */
export function truncateText(
  text: string,
  maxLength: number,
  suffix = "...",
): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Truncate a URL for display
 */
export function truncateUrl(url: string, maxLength = 60): string {
  if (url.length <= maxLength) return url;
  return `${url.substring(0, maxLength)}...`;
}
