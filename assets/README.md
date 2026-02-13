# NOC Assets

Drop your own images here to customize the Net Equity Calculator (NOC). The app uses these paths and falls back to emoji/Unicode when a file is missing.

## Folder structure

```
assets/
├── flags/         ← Currency flags (one per currency code)
├── icons/         ← Button and UI icons
├── matrix-loader/ ← Animated loader sequence (numbered SVGs)
└── README.md      (this file)
```

---

## Currency flags (`flags/`)

Used next to currency codes in the balances table, dropdowns, withdraw flow, and edit modal.

**Expected filenames:** uppercase currency code + `.svg` (e.g. `GBP.svg`, `USD.svg`).

Used in: balances table, deposit/withdraw/trade selects, withdraw step 2 header, edit modal, deposit preview.

Currencies currently in the app (any with a file in `flags/` are shown as that image; others use emoji): AED, ARS, AUD, BRL, CHF, COP, DKK, EUR, EURC, GBP, HKD, IDR, MXN, NOK, PHP, PLN, SEK, SGD, USD, USDC, USDT.

---

## Icons (`icons/`)

Used on action buttons and in the search field.

| File              | Purpose                    | Used in |
|-------------------|----------------------------|---------|
| `deposit.svg`     | Deposit funds              | Primary “Deposit funds” button, Deposit modal title |
| `withdraw.svg`    | Withdraw funds             | “Withdraw funds” button, Withdrawal modal title |
| `trade.svg`       | Execute trade              | “Execute trade” button, Trade modal title |
| `search.svg`      | Search                     | Search input (left side, inside the field) |
| `edit.svg`        | Edit balances & settings   | Floating action button (bottom-right) |
| `refresh.svg`     | Refresh FX rates           | “Refresh FX Rates” button |

Recommended size: **24×24** for button icons, **16×16** for search. SVG or PNG; the app references `.svg` paths.

---

## Matrix loader (`matrix-loader/`)

Animated sequence of SVGs used for loading states (e.g., fetching rates). `1.svg` is the static/starting frame; the component cycles through `1.svg` … `15.svg` when animating (e.g. on refresh).

Used in: rate column when fetching rates.

---

## Paths from the app

The HTML lives in `outputs/`, so it loads assets as:

- Flags: `../assets/flags/<CODE>.svg` (e.g. `../assets/flags/GBP.svg`)
- Icons: `../assets/icons/<name>.svg` (e.g. `../assets/icons/deposit.svg`)

If a file is missing, the UI falls back to the built-in emoji/Unicode character for that slot.
