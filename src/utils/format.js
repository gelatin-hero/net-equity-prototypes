export function fmt(n) {
  return Math.abs(n).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function fmtUSD(n) {
  return n < 0 ? `- $ ${fmt(n)}` : `$ ${fmt(n)}`;
}

export function fmtBal(n) {
  return n < 0 ? `- ${fmt(n)}` : fmt(n);
}

/** Format amount for FX conversion display (no commas - must parse cleanly) */
export function fmtAmount(n) {
  if (n === 0 || !Number.isFinite(n)) return '0';
  const abs = Math.abs(n);
  const decimals = abs >= 100 ? 2 : abs >= 1 ? 4 : 6;
  return abs.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
    useGrouping: false,
  });
}
