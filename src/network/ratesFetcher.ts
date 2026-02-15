import { fetchExchangeRates } from './index';
import { CURRENCY_CODES } from '../constants/currencies';

let cachedRates: Record<string, number> | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 30_000; // 30 seconds

/**
 * Fetches USD-relative rates for all currencies from the API.
 * Sells 1 USD to get the buy amount in each currency, then inverts
 * to get the USD value of 1 unit of that currency.
 *
 * Returns Record<string, number> matching existing `rates` shape:
 *   rates[currency] = how many USD one unit of that currency buys.
 */
export async function fetchRatesFromAPI(): Promise<Record<string, number>> {
  const now = Date.now();
  if (cachedRates && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedRates;
  }

  const rates: Record<string, number> = { USD: 1 };

  // Currencies that don't need API calls (pegged or same as USD)
  const skip = new Set(['USD', 'USDC', 'USDT']);

  const codes = CURRENCY_CODES.filter((c) => !skip.has(c));

  // Fetch in parallel: sell 1 USD → buy X of each currency
  const results = await Promise.allSettled(
    codes.map(async (code) => {
      const buyAmount = await fetchExchangeRates({
        buyCurrency: code,
        sellCurrency: 'USD',
        sellAmount: 1,
      });
      return { code, buyAmount };
    })
  );

  let successCount = 0;
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value.buyAmount > 0) {
      // buyAmount = how many units of `code` you get for 1 USD
      // rate = how many USD 1 unit of `code` is worth = 1 / buyAmount
      rates[result.value.code] = 1 / result.value.buyAmount;
      successCount++;
    }
  }

  // Stablecoins
  rates['USDC'] = 1;
  rates['USDT'] = 1;

  // Only cache if we got a reasonable number of results
  if (successCount >= codes.length * 0.5) {
    cachedRates = rates;
    cacheTimestamp = now;
    return rates;
  }

  throw new Error(`Only ${successCount}/${codes.length} rates fetched successfully`);
}

/**
 * Invalidate the cache so next call fetches fresh rates.
 */
export function invalidateRatesCache(): void {
  cachedRates = null;
  cacheTimestamp = 0;
}
