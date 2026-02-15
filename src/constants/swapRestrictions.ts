/**
 * Swap Restrictions Configuration
 * Defines which currency pairs are not swappable on the platform
 */

interface SwapRestrictions {
  // One-way restrictions: from currency cannot be swapped to the to currency
  oneWay: Array<{ from: string; to: string }>;
  // Bidirectional restrictions: neither currency can be swapped to the other
  bidirectional: Array<[string, string]>;
}

export const SWAP_RESTRICTIONS: SwapRestrictions = {
  oneWay: [
    { from: 'BRL', to: 'USDC' },
    { from: 'BRL', to: 'USDT' },
    { from: 'MXN', to: 'USDT' },
    { from: 'MXN', to: 'USDC' },
  ],
  bidirectional: [
    ['USDC', 'EUR'],
    ['USDT', 'GBP'],
    ['DAI', 'JPY'],
    ['AED', 'GBP'],
  ],
};

/**
 * Check if a currency pair can be swapped
 * @param fromCurrency - The currency being swapped from
 * @param toCurrency - The currency being swapped to
 * @returns true if the swap is allowed, false otherwise
 */
export function isSwappable(fromCurrency: string, toCurrency: string): boolean {
  // Check one-way restrictions
  const hasOneWayRestriction = SWAP_RESTRICTIONS.oneWay.some(
    (restriction) =>
      restriction.from === fromCurrency && restriction.to === toCurrency
  );

  if (hasOneWayRestriction) {
    return false;
  }

  // Check bidirectional restrictions
  const hasBidirectionalRestriction = SWAP_RESTRICTIONS.bidirectional.some(
    (pair) =>
      (pair[0] === fromCurrency && pair[1] === toCurrency) ||
      (pair[0] === toCurrency && pair[1] === fromCurrency)
  );

  if (hasBidirectionalRestriction) {
    return false;
  }

  return true;
}

/**
 * Get the type of restriction between two currencies
 * @param fromCurrency - The currency being swapped from
 * @param toCurrency - The currency being swapped to
 * @returns 'one-way', 'bidirectional', or null if no restriction
 */
export function getRestrictionType(
  fromCurrency: string,
  toCurrency: string
): 'one-way' | 'bidirectional' | null {
  // Check one-way restrictions
  const hasOneWayRestriction = SWAP_RESTRICTIONS.oneWay.some(
    (restriction) =>
      restriction.from === fromCurrency && restriction.to === toCurrency
  );

  if (hasOneWayRestriction) {
    return 'one-way';
  }

  // Check bidirectional restrictions
  const hasBidirectionalRestriction = SWAP_RESTRICTIONS.bidirectional.some(
    (pair) =>
      (pair[0] === fromCurrency && pair[1] === toCurrency) ||
      (pair[0] === toCurrency && pair[1] === fromCurrency)
  );

  if (hasBidirectionalRestriction) {
    return 'bidirectional';
  }

  return null;
}
