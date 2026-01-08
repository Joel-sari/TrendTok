import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind / className strings safely.
 * - `clsx` conditionally joins class names.
 * - `twMerge` resolves Tailwind conflicts (e.g., `p-2` + `p-4` => `p-4`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert a UNIX timestamp (in seconds) into a human-readable relative time.
 * Example outputs: "5 minutes ago", "2 hours ago", "3 days ago".
 */
export const formatTimeAgo = (timestamp: number) => {
  const now = Date.now();
  const diffInMs = now - timestamp * 1000; // Convert seconds -> milliseconds
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  // If older than a day, show days
  if (diffInHours > 24) {
    const days = Math.floor(diffInHours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  // If at least an hour, show hours
  if (diffInHours >= 1) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  // Otherwise, show minutes
  return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
};

/**
 * Sleep helper for async flows.
 * Usage: `await delay(500)` to wait 500ms.
 */
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Format a market cap number into a compact string.
 * Examples: $3.10T, $900.00B, $25.00M, $1234.56
 */
export function formatMarketCapValue(marketCapUsd: number): string {
  // Guard against invalid or non-positive values
  if (!Number.isFinite(marketCapUsd) || marketCapUsd <= 0) return 'N/A';

  if (marketCapUsd >= 1e12) return `$${(marketCapUsd / 1e12).toFixed(2)}T`; // Trillions
  if (marketCapUsd >= 1e9) return `$${(marketCapUsd / 1e9).toFixed(2)}B`; // Billions
  if (marketCapUsd >= 1e6) return `$${(marketCapUsd / 1e6).toFixed(2)}M`; // Millions

  // Below one million, show the full USD amount
  return `$${marketCapUsd.toFixed(2)}`;
}

/**
 * Return an ISO date range for the last `days` days.
 * Output format: { from: 'YYYY-MM-DD', to: 'YYYY-MM-DD' }
 */
export const getDateRange = (days: number) => {
  const toDate = new Date();
  const fromDate = new Date();

  // Move `fromDate` back by N days
  fromDate.setDate(toDate.getDate() - days);

  return {
    to: toDate.toISOString().split('T')[0],
    from: fromDate.toISOString().split('T')[0],
  };
};

/**
 * Return today's date as a range (from today to today).
 * Useful when an API expects a range even for a single day.
 */
export const getTodayDateRange = () => {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  return {
    to: todayString,
    from: todayString,
  };
};

/**
 * Decide how many news items to fetch per symbol based on watchlist size.
 * Keeps total news around ~6 items so the UI isn't overloaded.
 */
export const calculateNewsDistribution = (symbolsCount: number) => {
  let itemsPerSymbol: number;
  let targetNewsCount = 6;

  if (symbolsCount < 3) {
    // Few symbols => more news per symbol
    itemsPerSymbol = 3;
  } else if (symbolsCount === 3) {
    // Exactly 3 symbols => 2 each = 6 total
    itemsPerSymbol = 2;
  } else {
    // Many symbols => 1 each, but cap total at 6
    itemsPerSymbol = 1;
    targetNewsCount = 6;
  }

  return { itemsPerSymbol, targetNewsCount };
};

/**
 * Basic validation to ensure a raw news article has the minimum fields we need.
 * Prevents rendering empty cards or broken links.
 */
export const validateArticle = (article: RawNewsArticle) =>
  article.headline && article.summary && article.url && article.datetime;

/**
 * Convenience helper to get today's date string in YYYY-MM-DD format.
 */
export const getTodayString = () => new Date().toISOString().split('T')[0];

/**
 * Convert a raw news article into the normalized shape used by the UI.
 * - Trims and truncates summary
 * - Fills in defaults for source/category/related
 * - Generates a stable-ish id for list rendering
 */
export const formatArticle = (
  article: RawNewsArticle,
  isCompanyNews: boolean,
  symbol?: string,
  index: number = 0
) => ({
  // Company news may not have an API id; use a synthetic id
  id: isCompanyNews ? Date.now() + Math.random() : article.id + index,
  headline: article.headline!.trim(),
  summary:
    article.summary!.trim().substring(0, isCompanyNews ? 200 : 150) + '...',
  source: article.source || (isCompanyNews ? 'Company News' : 'Market News'),
  url: article.url!,
  datetime: article.datetime!,
  image: article.image || '',
  category: isCompanyNews ? 'company' : article.category || 'general',
  related: isCompanyNews ? symbol! : article.related || '',
});

/**
 * Format a percent change with sign and 2 decimals.
 * Example: +1.23% or -0.55%
 */
export const formatChangePercent = (changePercent?: number) => {
  // Treat 0 / undefined as "no change" display
  if (!changePercent) return '';

  const sign = changePercent > 0 ? '+' : '';
  return `${sign}${changePercent.toFixed(2)}%`;
};

/**
 * Return a Tailwind text color class based on price movement.
 */
export const getChangeColorClass = (changePercent?: number) => {
  if (!changePercent) return 'text-gray-400';
  return changePercent > 0 ? 'text-green-500' : 'text-red-500';
};

/**
 * Format a number as a USD price string.
 * Example: 123.4 => "$123.40"
 */
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
};

/**
 * Pre-formatted "today" string (UTC) with weekday + full date.
 * Note: this is evaluated once at module load time.
 */
export const formatDateToday = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

/**
 * Convert an Alert into a short, human-friendly text summary.
 * Example: "Price > $150.00" or "Price < $90.00"
 */
export const getAlertText = (alert: Alert) => {
  const condition = alert.alertType === 'upper' ? '>' : '<';
  return `Price ${condition} ${formatPrice(alert.threshold)}`;
};

/**
 * Get today's date formatted with weekday/month/day/year in UTC.
 * This is useful when you want a fresh value each call (unlike `formatDateToday`).
 */
export const getFormattedTodayDate = () =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });