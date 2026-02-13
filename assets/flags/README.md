# NOC Assets

Drop your own images here to customize the Net Equity Calculator (NOC). The app uses these paths and falls back to emoji/Unicode when a file is missing.

## Folder structure

```
assets/
├── flags/     ← Currency flags (one per currency code)
├── icons/     ← Button and UI icons
└── README.md  (this file)
```

---

## Currency flags (`flags/`)

Used next to currency codes in the balances table, dropdowns, withdraw flow, and edit modal.

**Expected filenames:** lowercase currency code, with `.svg` or `.png`.

| File            | Currency              | Used in |
|-----------------|-----------------------|---------|
| `gbp.svg` / `.png` | British Pound        | Table, deposit/withdraw/trade selects, withdraw step 2 header, edit modal |
| `usd.svg` / `.png` | US Dollar            | Same |
| `aed.svg` / `.png` | UAE Dirham           | Same |
| `mxn.svg` / `.png` | Mexican Peso         | Same |
| `sar.svg` / `.png` | Saudi Riyal          | Same |
| `eur.svg` / `.png` | Euro                 | Same |

The app looks for the **.svg** path first; you can add a single format or both.

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

## Paths from the app

The HTML lives in `outputs/`, so it loads assets as:

- Flags: `../assets/flags/<code>.svg` (e.g. `../assets/flags/gbp.svg`)
- Icons: `../assets/icons/<name>.svg` (e.g. `../assets/icons/deposit.svg`)

If a file is missing, the UI falls back to the built-in emoji/Unicode character for that slot.
