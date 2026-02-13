# Net Equity Calculator — Problem Statement & Open Issues

## What we're building

A dashboard that shows FX trading customers their financial position (what they own, what they owe) and lets them trade currencies using a credit facility. The core challenge is calculating and displaying **how much a user can sell** of any given currency.

---

## The formulas we landed on

**Available credit** = `max(0, creditLimit - obligations)`

- Obligations = sum of all negative currency balances in USD
- Simple, never negative, never exceeds credit limit

**Available equity** = `max(0, equity - max(0, obligations - creditLimit))`

- Equity = holdings - obligations
- Represents equity not already backing obligations that exceed credit

**Per-currency max sell** = `balance in that currency + (availableCredit + availableEquity) / rate`

- Balance portion is free (selling what you own)
- Credit + equity portion covers uncovered/short sells

---

## Technical issues encountered

### 1. Balanced trades don't change equity

Selling $10M USD and buying $10M GBP creates equal holdings and obligations — equity is unchanged. This means equity-based limits don't "consume" capacity the way users expect.

### 2. Trade-purchased assets inflate equity

The GBP you bought with credit shows up as a holding, which increases equity, which makes it look like you have more capacity than you should. This was the root cause of most formula revisions.

### 3. Obligations can exceed the credit limit

Via rate fluctuations or large trades. When this happens, equity must back the excess. This created the "available equity vs account equity" distinction.

### 4. The production `getCreditUsed` formula is confusing

The formula (`obligations - equity` when equity > 0, else `obligations`) is mathematically sound but produces confusing artifacts: negative credit usage, available credit exceeding the credit limit, and hard-to-explain causality.

### 5. "Available to trade" as a single number is meaningless

Selling capacity depends on which currency you're selling (your balance in that currency matters). We removed it in favor of contextual per-currency limits in the trade modal.

---

## Customer experience issues

### 1. Too many concepts

Account equity, available equity, available credit, credit limit, holdings, obligations, unsettled obligations — users can't be expected to understand the relationships between all of these.

### 2. Available equity vs account equity is confusing

A user sees "equity: $1.27M" but can only sell $270K. The $1M encumbered by credit excess is invisible and unexplained.

### 3. No intuitive mental model

Users think: "I deposited $X, I traded $Y, I should have $Z left." But equity doesn't decrease from balanced trades, which breaks this mental model.

### 4. Labels are jargon-heavy

"Unsettled obligations," "available equity," "credit overage" — these are internal accounting terms, not customer-friendly language.

---

## Proposed simplification (not yet implemented)

### Overview shows only two numbers

- **Net worth** (equity): What you own minus what you owe. Universally understood.
- **Credit remaining** (available credit): Credit limit minus obligations. Like a credit card.

### Trade modal handles the complexity contextually

- Shows "You can sell up to X of this currency"
- Optional breakdown: from your balance / from credit / backed by net worth
- Users never need to understand "available equity" as a concept

### Key design principles going forward

- Users should never see more than 2–3 top-level numbers
- Per-currency capacity belongs in the trade flow, not the overview
- The _why_ behind limits should be available but not mandatory to understand
- Labels should use everyday language (net worth, credit remaining) not financial jargon

---

## Files changed in this session

| File | What changed |
| --- | --- |
| `src/utils/calculations.js` | Core formulas: availableCredit, availableEquity, per-currency breakdowns, dropped availableToTrade |
| `src/components/MetricsSection.jsx` | Overview cards: now shows Available credit + Account equity with hover tooltips |
| `src/components/MetricsTooltip.jsx` | New component: black popover showing formula + currency breakdown on hover |
| `src/components/TradeModal.jsx` | Three-source validation (balance + credit + equity), capacity breakdown display |
| `src/components/EditModal.jsx` | Label update: "preview available credit" |
| `src/index.css` | Styles for tooltips and trade capacity breakdown |
