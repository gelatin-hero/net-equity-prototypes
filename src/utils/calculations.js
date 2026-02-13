/**
 * @param {Record<string, number>} balances
 * @param {Record<string, number>} rates
 * @param {number} creditLimit
 */
export function calculateTotals(balances, rates, creditLimit) {
  let holdings = 0;
  let obligations = 0;
  const holdingsBreakdown = [];
  const obligationsBreakdown = [];
  for (const [c, a] of Object.entries(balances)) {
    const usd = a * (rates[c] ?? 0);
    if (usd >= 0) {
      holdings += usd;
      if (usd > 0) holdingsBreakdown.push({ currency: c, balance: a, usd });
    } else {
      obligations += Math.abs(usd);
      obligationsBreakdown.push({ currency: c, balance: a, usd: Math.abs(usd) });
    }
  }
  holdingsBreakdown.sort((a, b) => b.usd - a.usd);
  obligationsBreakdown.sort((a, b) => b.usd - a.usd);
  const equity = holdings - obligations;

  // ── Model A (Credit & Equity) ──
  const availableCredit = Math.max(0, creditLimit - obligations);
  const availableEquity = Math.max(0, equity - Math.max(0, obligations - creditLimit));

  // ── Model B (Net Equity) ──
  const collateral = Math.max(0, equity);
  const creditUsed = obligations;
  const totalCapacity = creditLimit + collateral;
  const creditRemaining = Math.max(0, totalCapacity - creditUsed);
  const availableToWithdraw = Math.max(0, equity - Math.max(0, obligations - creditLimit));

  return {
    holdings, obligations, equity,
    // Model A
    availableCredit, availableEquity,
    // Model B
    collateral, creditUsed, totalCapacity, creditRemaining, availableToWithdraw,
    // Shared
    creditLimit, holdingsBreakdown, obligationsBreakdown,
  };
}

/**
 * @param {string} currency
 * @param {Record<string, number>} balances
 * @param {Record<string, number>} rates
 * @param {object} totals
 * @param {'A'|'B'} [model='A'] — A = equity cap, B = tighter availableToWithdraw cap
 */
export function getWithdrawable(currency, balances, rates, totals, model = 'A') {
  const balance = balances[currency] ?? 0;
  if (balance <= 0) {
    return { balance: 0, withdrawable: 0, held: 0, heldUSD: 0, balanceUSD: 0, withdrawableUSD: 0 };
  }
  const rate = rates[currency] ?? 0;
  const balanceUSD = balance * rate;
  // Model A: cap at equity. Model B: cap at availableToWithdraw (tighter).
  const maxUSD = model === 'B'
    ? Math.max(0, totals.availableToWithdraw ?? 0)
    : Math.max(0, totals.equity);
  const withdrawableUSD = Math.min(balanceUSD, maxUSD);
  const withdrawable = rate > 0 ? withdrawableUSD / rate : 0;
  const held = balance - withdrawable;
  return {
    balance,
    withdrawable,
    held,
    heldUSD: held * rate,
    balanceUSD,
    withdrawableUSD,
  };
}
