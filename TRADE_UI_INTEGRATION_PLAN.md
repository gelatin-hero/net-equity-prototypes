# Trade UI Integration Plan

## Overview
Merge the Trade Widget (from `/Users/adityagarikapati/Desktop/Experiments/Trade-Widget`) into the net-equity-calculator as the content for the "Trade" tab.

## Tech Stack Delta

| Aspect | Net Equity Calculator | Trade Widget | Action |
|--------|----------------------|--------------|--------|
| React | 18.3.1 (JSX) | 19.1.1 (TSX) | Upgrade to React 19 |
| Vite | 6.0.3 | 7.1.4 | Upgrade to Vite 7 |
| Styling | Pure CSS | Tailwind CSS v4 | Add Tailwind alongside existing CSS |
| State | useState (lifted in App) | Zustand | Add Zustand for shared state |
| Types | Plain JS | TypeScript strict | Add TS support to Vite config |
| UI Lib | Radix UI (2 components) | Radix UI (25+) + HeroUI | Install additional Radix packages |
| API | er-api.com (optional) | Axios → demo.openfx.dev | Keep both; pricing API for quotes |

## Currencies Merge

### Overlap (15 currencies)
USD, USDC, USDT, EUR, EURC, GBP, AUD, SGD, HKD, AED, PLN, BRL, MXN, NOK, SEK

### Only in net-equity (6)
CHF, DKK, PHP, COP, IDR, ARS

### Unified Currency Model
Merge into a single TypeScript module combining:
- From net-equity: `name`, `emoji`, `BASE_RATES`, `DEFAULT_RATE_RANGE_BIPS` (min/max bips)
- From Trade Widget: `symbol`, `type` (fiat/crypto), `precision` (decimal places)

## Integration Steps

### Phase 1: Upgrade net-equity-calculator foundations
1. Upgrade React 18 → 19, React DOM 18 → 19
2. Upgrade Vite 6 → 7, @vitejs/plugin-react accordingly
3. Add TypeScript support (tsconfig.json, allow .tsx files alongside .jsx)
4. Add Tailwind CSS v4 with @tailwindcss/vite plugin
5. Install Zustand for shared state

### Phase 2: Unified currencies module
1. Create `src/constants/currencies.ts` (TypeScript) merging both currency definitions
2. Include: code, name, symbol, emoji, type, precision, baseRate, rateRangeBips
3. Update all existing imports to use the new module

### Phase 3: Shared state with Zustand
1. Create a Zustand store for balances, rates, credit limit, disabled currencies
2. Migrate App.jsx state into the store
3. The Trade Widget will read balances/credit from this store for validation

### Phase 4: Extract and embed Trade Widget
1. Copy Trade Widget components into `src/components/trade/`
   - CurrencyConverter.tsx (main widget — 2,330 lines)
   - CurrencyModal.tsx
   - LimitOrderSheet.tsx
   - TradeHistory.tsx
   - BookmarkTabs.tsx
   - ShimmerText.tsx
   - ConversionPriceQuoteTimer.tsx
2. Copy hooks: useQuoteTimer, useDebounce, useBookmarks, useLimitOrderNudge
3. Copy network layer (Axios client for demo.openfx.dev)
4. Copy constants: exchangeRates.ts, swapRestrictions.ts
5. Copy required Radix UI components from `components/ui/`
6. Install missing dependencies: axios, framer-motion, lucide-react, number-flow, zustand, clsx, tailwind-merge, class-variance-authority, etc.

### Phase 5: Wire pricing and validation
1. Trade Widget uses demo.openfx.dev API for quotes — keep as-is
2. Feed balances and available credit from Zustand store into widget's validation
3. Wire trade execution: on trade complete, update balances in Zustand store and add to logs
4. Replace widget's mock credit ($750K / $5M) with real calculator credit state

### Phase 6: Testing and polish
1. Verify quote flow works (API call → shimmer → result → 15s timer)
2. Verify balance updates propagate: trade on Trade tab → balances update on Balances tab
3. Verify credit validation uses real calculator values
4. Test rate refresh affects both tabs consistently
5. Check Tailwind styles don't conflict with existing pure CSS
6. Responsive layout testing

## Effort Estimate
- Phase 1 (upgrades): ~1 day
- Phase 2 (currencies): ~1 day
- Phase 3 (Zustand): ~1 day
- Phase 4 (extract widget): ~2 days
- Phase 5 (wire state): ~2 days
- Phase 6 (testing): ~2 days
- **Total: ~8-10 days**

## Key Risks
- React 18 → 19 breaking changes (ref forwarding, new hooks)
- Tailwind v4 class collisions with existing pure CSS
- CurrencyConverter.tsx is 2,330 lines — may need splitting for maintainability
- Trade Widget's mock data (balances, credit) is deeply embedded in component state
