/**
 * Unified currency model — merges net-equity calculator and Trade Widget definitions.
 */

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  type: 'fiat' | 'crypto';
  precision: number;
  baseRate: number;       // USD-relative
  rateRangeBips: { minBips: number; maxBips: number };
}

const CURRENCY_LIST: Currency[] = [
  { code: 'USD',  name: 'United States Dollar',       symbol: '$',    flag: '🇺🇸', type: 'fiat',   precision: 2, baseRate: 1,        rateRangeBips: { minBips: 0, maxBips: 0 } },
  { code: 'USDC', name: 'USD Coin',                   symbol: 'USDC', flag: '💵',  type: 'crypto', precision: 4, baseRate: 1,        rateRangeBips: { minBips: 0, maxBips: 0 } },
  { code: 'USDT', name: 'Tether',                     symbol: 'USDT', flag: '💵',  type: 'crypto', precision: 4, baseRate: 1,        rateRangeBips: { minBips: 0, maxBips: 0 } },
  { code: 'EUR',  name: 'Euro',                       symbol: '€',    flag: '🇪🇺', type: 'fiat',   precision: 2, baseRate: 1.08,     rateRangeBips: { minBips: -33, maxBips: 28 } },
  { code: 'EURC', name: 'Euro Coin',                  symbol: 'EURC', flag: '🪙',  type: 'crypto', precision: 4, baseRate: 1.08,     rateRangeBips: { minBips: -33, maxBips: 28 } },
  { code: 'GBP',  name: 'British Pound',              symbol: '£',    flag: '🇬🇧', type: 'fiat',   precision: 2, baseRate: 1.27,     rateRangeBips: { minBips: -30, maxBips: 28 } },
  { code: 'CHF',  name: 'Swiss Franc',                symbol: 'CHF',  flag: '🇨🇭', type: 'fiat',   precision: 2, baseRate: 1.12,     rateRangeBips: { minBips: -38, maxBips: 31 } },
  { code: 'AUD',  name: 'Australian Dollar',          symbol: 'A$',   flag: '🇦🇺', type: 'fiat',   precision: 2, baseRate: 0.65,     rateRangeBips: { minBips: -40, maxBips: 38 } },
  { code: 'SGD',  name: 'Singapore Dollar',           symbol: 'S$',   flag: '🇸🇬', type: 'fiat',   precision: 2, baseRate: 0.74,     rateRangeBips: { minBips: -21, maxBips: 18 } },
  { code: 'HKD',  name: 'Hong Kong Dollar',           symbol: 'HK$',  flag: '🇭🇰', type: 'fiat',   precision: 2, baseRate: 0.13,     rateRangeBips: { minBips: -3, maxBips: 3 } },
  { code: 'AED',  name: 'United Arab Emirates Dirham', symbol: 'د.إ', flag: '🇦🇪', type: 'fiat',   precision: 2, baseRate: 0.2723,   rateRangeBips: { minBips: 0, maxBips: 2 } },
  { code: 'PLN',  name: 'Polish Złoty',               symbol: 'zł',   flag: '🇵🇱', type: 'fiat',   precision: 2, baseRate: 0.25,     rateRangeBips: { minBips: -39, maxBips: 42 } },
  { code: 'BRL',  name: 'Brazilian Real',             symbol: 'R$',   flag: '🇧🇷', type: 'fiat',   precision: 2, baseRate: 0.17,     rateRangeBips: { minBips: -47, maxBips: 62 } },
  { code: 'MXN',  name: 'Mexican Peso',               symbol: '$',    flag: '🇲🇽', type: 'fiat',   precision: 2, baseRate: 0.058,    rateRangeBips: { minBips: -37, maxBips: 35 } },
  { code: 'NOK',  name: 'Norwegian Krone',            symbol: 'kr',   flag: '🇳🇴', type: 'fiat',   precision: 2, baseRate: 0.09,     rateRangeBips: { minBips: -42, maxBips: 44 } },
  { code: 'SEK',  name: 'Swedish Krona',              symbol: 'kr',   flag: '🇸🇪', type: 'fiat',   precision: 2, baseRate: 0.095,    rateRangeBips: { minBips: -54, maxBips: 44 } },
  { code: 'DKK',  name: 'Danish Krone',               symbol: 'kr',   flag: '🇩🇰', type: 'fiat',   precision: 2, baseRate: 0.14,     rateRangeBips: { minBips: -32, maxBips: 28 } },
  { code: 'PHP',  name: 'Philippine Peso',            symbol: '₱',    flag: '🇵🇭', type: 'fiat',   precision: 2, baseRate: 0.017,    rateRangeBips: { minBips: -109, maxBips: 46 } },
  { code: 'COP',  name: 'Colombian Peso',             symbol: '$',    flag: '🇨🇴', type: 'fiat',   precision: 0, baseRate: 0.00024,  rateRangeBips: { minBips: -45, maxBips: 47 } },
  { code: 'IDR',  name: 'Indonesian Rupiah',          symbol: 'Rp',   flag: '🇮🇩', type: 'fiat',   precision: 0, baseRate: 0.000063, rateRangeBips: { minBips: -40, maxBips: 51 } },
  { code: 'ARS',  name: 'Argentine Peso',             symbol: '$',    flag: '🇦🇷', type: 'fiat',   precision: 2, baseRate: 0.001,    rateRangeBips: { minBips: -47, maxBips: 56 } },
];

// ── Lookup map ──
const CURRENCY_MAP = new Map(CURRENCY_LIST.map((c) => [c.code, c]));

// ── Exports matching the OLD currencies.js interface (used by net-equity code) ──

export const CURRENCIES: Record<string, { name: string; flag: string }> = Object.fromEntries(
  CURRENCY_LIST.map((c) => [c.code, { name: c.name, flag: c.flag }])
);

export const BASE_RATES: Record<string, number> = Object.fromEntries(
  CURRENCY_LIST.map((c) => [c.code, c.baseRate])
);

export const DEFAULT_RATE_RANGE_BIPS: Record<string, { minBips: number; maxBips: number }> = Object.fromEntries(
  CURRENCY_LIST.map((c) => [c.code, { ...c.rateRangeBips }])
);

export function getDefaultRateRangeBips(): Record<string, { minBips: number; maxBips: number }> {
  const result: Record<string, { minBips: number; maxBips: number }> = {};
  for (const c of CURRENCY_LIST) {
    result[c.code] = { ...c.rateRangeBips };
  }
  return result;
}

export const CURRENCY_CODES: string[] = CURRENCY_LIST.map((c) => c.code);

// ── Exports for Trade Widget ──

export const currencies = CURRENCY_LIST;
export const fiatCurrencies = CURRENCY_LIST.filter((c) => c.type === 'fiat');
export const cryptoCurrencies = CURRENCY_LIST.filter((c) => c.type === 'crypto');
export const popularCurrencies = ['USD', 'EUR', 'GBP', 'USDC', 'USDT'].map((code) => CURRENCY_MAP.get(code)!);

export function getCurrencyByCode(code: string): Currency | undefined {
  return CURRENCY_MAP.get(code);
}

export function formatCurrencySymbol(code: string, amount: number): string {
  const currency = getCurrencyByCode(code);
  if (!currency) return `${amount} ${code}`;
  if (currency.type === 'crypto') {
    return `${amount.toFixed(currency.precision)} ${currency.symbol}`;
  }
  return `${currency.symbol}${amount.toFixed(currency.precision)}`;
}

// Cross-rate matrix used by Trade Widget's CurrencyConverter
import { getExchangeRate } from './exchangeRates';

export const exchangeRates: Record<string, Record<string, number>> = {};
CURRENCY_LIST.forEach((from) => {
  exchangeRates[from.code] = {};
  CURRENCY_LIST.forEach((to) => {
    if (from.code !== to.code) {
      exchangeRates[from.code][to.code] = getExchangeRate(from.code, to.code);
    }
  });
});
