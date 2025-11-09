/**
 * Format number with K, M, B suffixes
 */
export function formatNumber(num: number): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  }
  return num.toFixed(0);
}

/**
 * Format currency with K, M, B suffixes
 */
export function formatCurrency(num: number): string {
  if (num >= 1e9) {
    return '$' + (num / 1e9).toFixed(1) + 'B';
  }
  if (num >= 1e6) {
    return '$' + (num / 1e6).toFixed(1) + 'M';
  }
  if (num >= 1e3) {
    return '$' + (num / 1e3).toFixed(2) + 'K';
  }
  return '$' + num.toFixed(2);
}

/**
 * Format time ago string
 */
export function formatTimeAgo(age: string): string {
  // Already formatted, just return as is
  return age;
}

