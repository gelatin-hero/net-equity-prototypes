export const CURRENCIES = {
  AED: { name: 'United Arab Emirates Dirham', flag: '🇦🇪' },
  ARS: { name: 'Argentine Peso', flag: '🇦🇷' },
  AUD: { name: 'Australian Dollar', flag: '🇦🇺' },
  BRL: { name: 'Brazilian Real', flag: '🇧🇷' },
  CHF: { name: 'Swiss Franc', flag: '🇨🇭' },
  COP: { name: 'Colombian Peso', flag: '🇨🇴' },
  DKK: { name: 'Danish Krone', flag: '🇩🇰' },
  EUR: { name: 'Euro', flag: '🇪🇺' },
  EURC: { name: 'Euro Coin', flag: '🪙' },
  GBP: { name: 'British Pound', flag: '🇬🇧' },
  HKD: { name: 'Hong Kong Dollar', flag: '🇭🇰' },
  IDR: { name: 'Indonesian Rupiah', flag: '🇮🇩' },
  MXN: { name: 'Mexican Peso', flag: '🇲🇽' },
  NOK: { name: 'Norwegian Krone', flag: '🇳🇴' },
  PHP: { name: 'Philippine Peso', flag: '🇵🇭' },
  PLN: { name: 'Polish Złoty', flag: '🇵🇱' },
  SEK: { name: 'Swedish Krona', flag: '🇸🇪' },
  SGD: { name: 'Singapore Dollar', flag: '🇸🇬' },
  USD: { name: 'United States Dollar', flag: '🇺🇸' },
  USDC: { name: 'USD Coin', flag: '💵' },
  USDT: { name: 'Tether', flag: '💵' },
};

export const BASE_RATES = {
  USD: 1,
  USDC: 1,
  USDT: 1,
  EUR: 1.08,
  EURC: 1.08,
  GBP: 1.27,
  CHF: 1.12,
  AUD: 0.65,
  SGD: 0.74,
  HKD: 0.13,
  AED: 0.2723,
  PLN: 0.25,
  BRL: 0.17,
  MXN: 0.058,
  NOK: 0.09,
  SEK: 0.095,
  DKK: 0.14,
  PHP: 0.017,
  COP: 0.00024,
  IDR: 0.000063,
  ARS: 0.001,
};

/**
 * Default daily rate fluctuation range in bips (1 bip = 0.01%).
 * Min/max define how far the rate can move from base on refresh/simulate.
 * Stablecoins (USD, USDC, USDT) are 0, 0.
 */
export const DEFAULT_RATE_RANGE_BIPS = {
  AED: { minBips: 0, maxBips: 2 },
  ARS: { minBips: -47, maxBips: 56 },
  AUD: { minBips: -40, maxBips: 38 },
  BRL: { minBips: -47, maxBips: 62 },
  CHF: { minBips: -38, maxBips: 31 },
  COP: { minBips: -45, maxBips: 47 },
  DKK: { minBips: -32, maxBips: 28 },
  EUR: { minBips: -33, maxBips: 28 },
  EURC: { minBips: -33, maxBips: 28 },
  GBP: { minBips: -30, maxBips: 28 },
  HKD: { minBips: -3, maxBips: 3 },
  IDR: { minBips: -40, maxBips: 51 },
  MXN: { minBips: -37, maxBips: 35 },
  NOK: { minBips: -42, maxBips: 44 },
  PHP: { minBips: -109, maxBips: 46 },
  PLN: { minBips: -39, maxBips: 42 },
  SEK: { minBips: -54, maxBips: 44 },
  SGD: { minBips: -21, maxBips: 18 },
  USD: { minBips: 0, maxBips: 0 },
  USDC: { minBips: 0, maxBips: 0 },
  USDT: { minBips: 0, maxBips: 0 },
};

/**
 * Build default per-currency rate range in bips.
 * Returns { [code]: { minBips, maxBips } }. Uses DEFAULT_RATE_RANGE_BIPS; missing codes get 0, 0.
 */
export function getDefaultRateRangeBips() {
  const result = {};
  for (const code of Object.keys(CURRENCIES)) {
    result[code] = DEFAULT_RATE_RANGE_BIPS[code]
      ? { ...DEFAULT_RATE_RANGE_BIPS[code] }
      : { minBips: 0, maxBips: 0 };
  }
  return result;
}

export const CURRENCY_CODES = Object.keys(CURRENCIES);
