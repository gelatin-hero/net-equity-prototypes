// Exchange rates configuration for currency conversion
// Base currency: USD (all rates are relative to 1 USD)
// Last updated: September 2025 (simulated rates for demo purposes)

import { fetchExchangeRates } from "../network";

export interface ExchangeRate {
  symbol: string;
  name: string;
  rate: number; // Rate relative to 1 USD
  type: "fiat" | "crypto";
  precision: number; // Decimal places for display
}

export const EXCHANGE_RATES: Record<string, ExchangeRate> = {
  // Fiat Currencies
  USD: {
    symbol: "USD",
    name: "United States Dollar",
    rate: 1.0,
    type: "fiat",
    precision: 2,
  },
  EUR: {
    symbol: "EUR",
    name: "Euro",
    rate: 0.8456,
    type: "fiat",
    precision: 2,
  },
  GBP: {
    symbol: "GBP",
    name: "British Pound",
    rate: 0.7312,
    type: "fiat",
    precision: 2,
  },
  AED: {
    symbol: "AED",
    name: "United Arab Emirates Dirham",
    rate: 3.6725,
    type: "fiat",
    precision: 2,
  },
  AUD: {
    symbol: "AUD",
    name: "Australian Dollar",
    rate: 1.4567,
    type: "fiat",
    precision: 2,
  },
  BRL: {
    symbol: "BRL",
    name: "Brazilian Real",
    rate: 5.1234,
    type: "fiat",
    precision: 2,
  },

  // Stablecoins and Cryptocurrencies
  USDC: {
    symbol: "USDC",
    name: "USD Coin",
    rate: 1.0002, // Slight premium for stablecoin
    type: "crypto",
    precision: 4,
  },
  USDT: {
    symbol: "USDT",
    name: "Tether",
    rate: 0.9998, // Slight discount typical for USDT
    type: "crypto",
    precision: 4,
  },
  EURC: {
    symbol: "EURC",
    name: "Euro Coin",
    rate: 0.8458, // Slightly different from EUR due to crypto nature
    type: "crypto",
    precision: 4,
  },

  // Additional Fiat Currencies
  MXN: {
    symbol: "MXN",
    name: "Mexican Peso",
    rate: 17.12,
    type: "fiat",
    precision: 2,
  },
  NOK: {
    symbol: "NOK",
    name: "Norwegian Krone",
    rate: 10.87,
    type: "fiat",
    precision: 2,
  },
  PHP: {
    symbol: "PHP",
    name: "Philippine Peso",
    rate: 56.45,
    type: "fiat",
    precision: 2,
  },
  PLN: {
    symbol: "PLN",
    name: "Polish Zloty",
    rate: 3.95,
    type: "fiat",
    precision: 2,
  },
  SEK: {
    symbol: "SEK",
    name: "Swedish Krona",
    rate: 10.65,
    type: "fiat",
    precision: 2,
  },
  SGD: {
    symbol: "SGD",
    name: "Singapore Dollar",
    rate: 1.34,
    type: "fiat",
    precision: 2,
  },
  IDR: {
    symbol: "IDR",
    name: "Indonesian Rupiah",
    rate: 15678.50,
    type: "fiat",
    precision: 0,
  },
  HKD: {
    symbol: "HKD",
    name: "Hong Kong Dollar",
    rate: 7.82,
    type: "fiat",
    precision: 2,
  },
  COP: {
    symbol: "COP",
    name: "Colombian Peso",
    rate: 4125.30,
    type: "fiat",
    precision: 0,
  },
  ARS: {
    symbol: "ARS",
    name: "Argentine Peso",
    rate: 985.50,
    type: "fiat",
    precision: 2,
  },
};

// Helper function to convert from one currency to another
export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  reference: "buy" | "sell"
): Promise<number> {
  if (fromCurrency === toCurrency) return Promise.resolve(amount);

  try {
    const convertedAmount = await fetchExchangeRates({
      buyCurrency: toCurrency,
      sellCurrency: fromCurrency,
      buyAmount: reference === "buy" ? amount : undefined,
      sellAmount: reference === "sell" ? amount : undefined,
    });
    console.log("Fetched exchange rate from API:", convertedAmount);

    // If API returns 0 or invalid value, fall back to local rates
    if (!convertedAmount || convertedAmount === 0 || isNaN(convertedAmount)) {
      console.log("API returned invalid value, using local exchange rates");
      const rate = getExchangeRate(fromCurrency, toCurrency);
      return amount * rate;
    }

    // Validate that the converted amount is reasonable
    // Calculate expected range using local rates as baseline
    const localRate = getExchangeRate(fromCurrency, toCurrency);
    const expectedAmount = amount * localRate;
    
    // Allow for up to 50% deviation from local rates (reasonable market volatility)
    const minExpected = expectedAmount * 0.5;
    const maxExpected = expectedAmount * 1.5;
    
    if (convertedAmount < minExpected || convertedAmount > maxExpected) {
      console.log(`API returned unreasonable value (${convertedAmount}), expected range: ${minExpected}-${maxExpected}, using local exchange rates`);
      return expectedAmount;
    }

    return convertedAmount;
  } catch (error) {
    // If API fails, use local exchange rates as fallback
    console.log("API error, using local exchange rates:", error);
    const rate = getExchangeRate(fromCurrency, toCurrency);
    return amount * rate;
  }
}

// Get exchange rate between two currencies
export function getExchangeRate(
  fromCurrency: string,
  toCurrency: string
): number {
  if (fromCurrency === toCurrency) return 1;

  const fromRate = EXCHANGE_RATES[fromCurrency]?.rate || 1;
  const toRate = EXCHANGE_RATES[toCurrency]?.rate || 1;

  return toRate / fromRate;
}

// Format currency amount with proper precision
export function formatCurrencyAmount(amount: number, currency: string): string {
  const currencyInfo = EXCHANGE_RATES[currency];
  const precision = currencyInfo?.precision || 2;

  return amount.toLocaleString("en-US", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}

// Get currency type (fiat or crypto)
export function getCurrencyType(
  currency: string
): "fiat" | "crypto" | "unknown" {
  return EXCHANGE_RATES[currency]?.type || "unknown";
}

// Check if currency is supported
export function isSupportedCurrency(currency: string): boolean {
  return currency in EXCHANGE_RATES;
}

// Get all supported currencies
export function getSupportedCurrencies(): string[] {
  return Object.keys(EXCHANGE_RATES);
}

// Get fiat currencies only
export function getFiatCurrencies(): string[] {
  return Object.entries(EXCHANGE_RATES)
    .filter(([_, info]) => info.type === "fiat")
    .map(([symbol]) => symbol);
}

// Get crypto currencies only
export function getCryptoCurrencies(): string[] {
  return Object.entries(EXCHANGE_RATES)
    .filter(([_, info]) => info.type === "crypto")
    .map(([symbol]) => symbol);
}

// Simulate market volatility (for demo purposes)
export function getVolatileRate(
  fromCurrency: string,
  toCurrency: string
): number {
  const baseRate = getExchangeRate(fromCurrency, toCurrency);

  // Add small random volatility (±0.1% for fiat, ±0.5% for crypto)
  const fromType = getCurrencyType(fromCurrency);
  const toType = getCurrencyType(toCurrency);

  const isCryptoInvolved = fromType === "crypto" || toType === "crypto";
  const volatilityRange = isCryptoInvolved ? 0.005 : 0.001; // 0.5% or 0.1%

  const volatility = (Math.random() - 0.5) * 2 * volatilityRange;
  return baseRate * (1 + volatility);
}

// Currency pairs with special handling
export const SPECIAL_PAIRS: Record<string, { rate: number; spread: number }> = {
  USDC_USD: { rate: 1.0002, spread: 0.0002 },
  USD_USDC: { rate: 0.9998, spread: 0.0002 },
  USDT_USD: { rate: 0.9998, spread: 0.0003 },
  USD_USDT: { rate: 1.0002, spread: 0.0003 },
  EURC_EUR: { rate: 1.0001, spread: 0.0001 },
  EUR_EURC: { rate: 0.9999, spread: 0.0001 },
};

// FX industry standard currency hierarchy (highest to lowest priority)
// Used to determine base currency in a pair
// Stablecoins are placed at the same priority level as their fiat counterparts
export const CURRENCY_HIERARCHY: string[] = [
  "EUR",  // Euro (highest priority)
  "EURC", // Euro Coin (same priority as EUR for cross pairs)
  "GBP",  // British Pound Sterling
  "AUD",  // Australian Dollar
  "USD",  // US Dollar
  "USDC", // USD Coin (same priority as USD for cross pairs)
  "USDT", // Tether (same priority as USD for cross pairs)
];

// Stablecoin to fiat mappings - fiat is always the base currency
export const STABLECOIN_PAIRS: Record<string, string> = {
  USDC: "USD",
  USDT: "USD",
  EURC: "EUR",
};

// Interface for currency pair result
export interface CurrencyPair {
  baseCurrency: string;
  quoteCurrency: string;
  rate: number;
  isInverted: boolean; // true if we had to invert the currencies from input order
  isBuyingBase: boolean; // true if buying base currency, false if selling base
}

/**
 * Determines the conventional base/quote currency pair based on FX industry standards
 * and applies bid/ask spread based on trade direction
 * @param sellCurrency - Currency being sold
 * @param buyCurrency - Currency being bought
 * @returns CurrencyPair with base, quote, rate (with spread), and trade direction
 */
export function determinePairConvention(
  sellCurrency: string,
  buyCurrency: string
): CurrencyPair {
  if (sellCurrency === buyCurrency) {
    return {
      baseCurrency: sellCurrency,
      quoteCurrency: buyCurrency,
      rate: 1,
      isInverted: false,
      isBuyingBase: false,
    };
  }

  // First, determine the conventional base/quote order (ignoring trade direction)
  let baseCurrency: string;
  let quoteCurrency: string;
  let isInverted: boolean;

  // Check for stablecoin pairs (fiat is always base)
  const stablecoinSell = STABLECOIN_PAIRS[sellCurrency];
  const stablecoinBuy = STABLECOIN_PAIRS[buyCurrency];

  // If sellCurrency is a stablecoin and buyCurrency is its fiat counterpart
  if (stablecoinSell === buyCurrency) {
    baseCurrency = buyCurrency; // Fiat as base
    quoteCurrency = sellCurrency; // Stablecoin as quote
    isInverted = true;
  }
  // If buyCurrency is a stablecoin and sellCurrency is its fiat counterpart
  else if (stablecoinBuy === sellCurrency) {
    baseCurrency = sellCurrency; // Fiat as base
    quoteCurrency = buyCurrency; // Stablecoin as quote
    isInverted = false;
  }
  else {
    // Check currency hierarchy for standard pairs
    const indexSell = CURRENCY_HIERARCHY.indexOf(sellCurrency);
    const indexBuy = CURRENCY_HIERARCHY.indexOf(buyCurrency);

    // If both currencies are in the hierarchy
    if (indexSell !== -1 && indexBuy !== -1) {
      // Lower index = higher priority = base currency
      if (indexSell < indexBuy) {
        baseCurrency = sellCurrency;
        quoteCurrency = buyCurrency;
        isInverted = false;
      } else {
        baseCurrency = buyCurrency;
        quoteCurrency = sellCurrency;
        isInverted = true;
      }
    }
    // If only sellCurrency is in hierarchy, it becomes base
    else if (indexSell !== -1) {
      baseCurrency = sellCurrency;
      quoteCurrency = buyCurrency;
      isInverted = false;
    }
    // If only buyCurrency is in hierarchy, it becomes base
    else if (indexBuy !== -1) {
      baseCurrency = buyCurrency;
      quoteCurrency = sellCurrency;
      isInverted = true;
    }
    // For non-standard pairs, keep the order as provided (sellCurrency as base)
    else {
      baseCurrency = sellCurrency;
      quoteCurrency = buyCurrency;
      isInverted = false;
    }
  }

  // Determine if we're buying or selling the base currency
  const isBuyingBase = buyCurrency === baseCurrency;

  // Get the mid-market rate (base -> quote)
  let midRate = getExchangeRate(baseCurrency, quoteCurrency);

  // Apply market volatility to mid rate (simulates market movement)
  // ±0.1% for fiat, ±0.5% for crypto
  const fromType = getCurrencyType(sellCurrency);
  const toType = getCurrencyType(buyCurrency);
  const isCryptoInvolved = fromType === "crypto" || toType === "crypto";
  const volatilityRange = isCryptoInvolved ? 0.005 : 0.001; // 0.5% or 0.1%
  const volatility = (Math.random() - 0.5) * 2 * volatilityRange;
  midRate = midRate * (1 + volatility);

  // Apply bid/ask spread on top of volatile mid rate
  // Default spread: 0.05% for fiat pairs, 0.1% for crypto pairs
  const defaultSpread = isCryptoInvolved ? 0.001 : 0.0005; // 0.1% or 0.05%

  // Check for special pair spreads
  const pairKey = `${sellCurrency}_${buyCurrency}`;
  const specialPair = SPECIAL_PAIRS[pairKey];
  const spread = specialPair?.spread || defaultSpread;

  // Calculate bid/ask rate
  // If buying base: pay ASK (higher) = mid * (1 + spread/2)
  // If selling base: get BID (lower) = mid * (1 - spread/2)
  const rate = isBuyingBase
    ? midRate * (1 + spread / 2)  // ASK
    : midRate * (1 - spread / 2); // BID

  return {
    baseCurrency,
    quoteCurrency,
    rate,
    isInverted,
    isBuyingBase,
  };
}

/**
 * Get the exchange rate for a currency pair using standard base/quote conventions
 * @param sellCurrency - Currency being sold
 * @param buyCurrency - Currency being bought
 * @returns The rate in standard base/quote format with bid/ask spread applied
 */
export function getPairRate(sellCurrency: string, buyCurrency: string): CurrencyPair {
  return determinePairConvention(sellCurrency, buyCurrency);
}
