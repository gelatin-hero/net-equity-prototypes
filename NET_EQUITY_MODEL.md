# Net Equity Model — Implementation Spec

## Overview

This document defines the data model and UI structure for the OpenFX Balances Overview page. The design prioritizes **withdrawal intent** — helping customers understand how much they can extract from the platform — while still surfacing credit information so users understand where their obligations come from.

---

## Design Principles

1. **Two key numbers, not ten** — Users should see at most 2 primary metrics with supporting breakdowns
2. **Withdrawal-first** — The primary user intent is "how much can I take out?"
3. **Credit visibility** — Users must understand that their obligations stem from credit usage
4. **Everyday language** — Avoid jargon like "unsettled obligations" or "available equity"
5. **Per-currency detail in context** — Withdrawable amounts per currency belong in the withdrawal flow, not the overview

---

## Page Structure

### Section 1: Your Funds

**Primary metric:** Available to withdraw

| Label | Value | Notes |
|-------|-------|-------|
| **Available to withdraw** | `$4,500,000` | The key number — large, prominent |
| *Breakdown* | Total holdings ($5,000,000) − Owed to platform ($500,000) | Smaller, underneath |

**Purpose:** Answers *"How much can I take out right now?"*

---

### Section 2: Your Credit

**Primary metric:** Credit remaining

| Label | Value | Notes |
|-------|-------|-------|
| **Credit remaining** | `$11,500,000` | The key number — large, prominent |
| *Breakdown* | Credit line ($10,000,000) + Your collateral ($2,000,000) − Credit used ($500,000) | Smaller, underneath |

**Purpose:** Answers *"How much can I still trade with?"*

---

## Formulas

### Section 1: Your Funds

```
Holdings             = sum of all POSITIVE currency balances (converted to USD)
Owed to platform     = abs(sum of all NEGATIVE currency balances) (converted to USD)
Available to withdraw = Holdings − Owed to platform
                     = max(0, Equity)
```

### Section 2: Your Credit

```
Credit line      = platform-defined limit (fixed per customer)
Collateral       = max(0, Holdings − Owed)
                 = max(0, Equity)
                 = Deposits backing additional trading capacity

Total capacity   = Credit line + Collateral
Credit used      = Owed to platform (same as obligations)
Credit remaining = Total capacity − Credit used
                 = Credit line + Collateral − Owed
```

---

## Key Insight: Linked Concepts

**"Owed to platform" (Section 1) = "Credit used" (Section 2)**

These are the same number — the sum of negative balances in USD. This creates a clear narrative:

> *"The $500K you owe is what's locking your funds AND what's consuming your credit."*

---

## Per-Currency Withdrawable Amount

While the overview shows a single **Available to withdraw** number, the actual withdrawable amount is **currency-specific** in the withdrawal flow:

```
Withdrawable in currency X = min(
  balance in currency X,
  Account Equity / exchange rate to X
)
```

**Example:**
- Account equity: $4,500,000
- AED balance: 18,362,495 (≈ $5,000,000)
- AED exchange rate: 0.2723 (1 AED = $0.2723)
- Max withdrawable in AED: $4,500,000 / 0.2723 = 16,526,245 AED

The remaining ~1.8M AED is **held against unsettled obligations**.

---

## Collateral Explained

**What is collateral?**

When a customer deposits funds beyond what's needed to cover their obligations, that excess serves as **collateral** — it backs additional trading capacity beyond the base credit line.

**Example:**
- Credit line: $10,000,000
- Customer deposits: $2,000,000 (pure deposit, no trades)
- Obligations: $0
- Collateral: $2,000,000
- Total available credit: $12,000,000

**After a trade (sell $500K GBP → buy USD):**
- Obligations: $500,000 (the GBP they owe)
- Holdings: $2,500,000 (original deposit + bought USD)
- Equity: $2,000,000 (unchanged — balanced trade)
- Collateral: $2,000,000 (unchanged)
- Credit used: $500,000
- Credit remaining: $11,500,000

---

## Label Glossary

| Internal term | User-facing label | Definition |
|---------------|-------------------|------------|
| Equity | Available to withdraw | Holdings minus obligations |
| Holdings | Total holdings | Sum of positive balances in USD |
| Obligations | Owed to platform | Sum of negative balances in USD |
| Credit limit | Credit line | Platform-extended borrowing limit |
| Available equity | Your collateral | Excess deposits backing trades |
| Available credit | Credit remaining | Unused trading capacity |

---

## UI Mockup (Text)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  YOUR FUNDS                                                             │
│                                                                         │
│  Available to withdraw                                                  │
│  $ 4,500,000.00                                                        │
│  Total holdings ($5,000,000.00) − Owed to platform ($500,000.00)       │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  YOUR CREDIT                                                            │
│                                                                         │
│  Credit remaining                                                       │
│  $ 11,500,000.00                                                       │
│  Credit line ($10,000,000) + Your collateral ($2,000,000)              │
│  − Credit used ($500,000)                                              │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  [Deposit funds]    [Withdraw funds]                                    │
└─────────────────────────────────────────────────────────────────────────┘

┌─ Currency balances ─────────────────────────────────────────────────────┐
│                                                                         │
│  Currency              Balance              Est. market value in USD    │
│  ─────────────────────────────────────────────────────────────────────  │
│  🇬🇧 GBP British Pound    -366,500.00              -$ 500,000.00        │
│  🇺🇸 USD US Dollar       5,000,000.00              $ 5,000,000.00       │
│  🇦🇪 AED UAE Dirham     13,585,100.00              $ 3,700,000.00       │
│  ...                                                                    │
│                                                                         │
│  Viewing 1-6 of 6 rows                                                  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Withdrawal Flow

When user clicks **Withdraw funds** and selects a currency:

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Withdrawal request                                              ✕      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  🇦🇪 AED                                            18,362,495.00      │
│  United Arab Emirates Dirham                              ≈ $5M        │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Withdrawable balance                               16,526,245.00      │
│  ~1.8M AED held against unsettled obligations ⓘ          ≈ $4.5M      │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Enter amount to withdraw                                               │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ☐ Withdraw maximum available balance                         [MAX]    │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  [Back]                                      [Submit withdrawal →]      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Open Questions

1. **Should "Credit used" be shown explicitly?** It equals "Owed to platform" — showing both might be redundant or might reinforce the connection.

2. **Tooltip content for "held against unsettled obligations"** — What level of detail should we show? Options:
   - Simple: "Deposit $500K to unlock your full balance"
   - Detailed: Breakdown by currency owed

3. **Rate fluctuation indicator** — Should we show "as of [timestamp]" or a refresh button to signal that values change with market rates?

---

## Files to Update

| File | Changes |
|------|---------|
| `MetricsSection.jsx` | Replace current metrics with two-section layout |
| `calculations.js` | Add `collateral` and `creditRemaining` calculations |
| `WithdrawModal.jsx` | Show per-currency withdrawable with held amount |
| `labels.js` (new) | Centralize user-facing label strings |

---

## Version History

| Date | Author | Changes |
|------|--------|---------|
| 2026-02-10 | Aditya Garikapati | Initial spec based on design session |
