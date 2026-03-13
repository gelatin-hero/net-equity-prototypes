// src/stores/useCurrenciesStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Currency {
  code: string;
  name: string;
  balance: string;
  usdValue?: string;
  isNegative?: boolean;
}

type State = {
  currencies: Currency[];
  lastKey?: string; // cache key for input
  lastUpdated?: number; // Date.now()
  loading: boolean;
  error?: string;
};

type Args = {
  balances: Record<string, number>;
  formatBalance: (amount: number, currencyCode: string) => string; // pass-through to your fetcher
  convertCurrency: (
    amount: number,
    from: string,
    to: string,
    reference: "buy" | "sell"
  ) => Promise<number>; // pass-through to your fetcher
  ttlMs?: number; // optional cache TTL
  force?: boolean;
  getCurrencyDisplayData: (
    balances: Record<string, number>,
    formatBalance: (amount: number, currencyCode: string) => string,
    convertCurrency: (
      amount: number,
      from: string,
      to: string,
      reference: "buy" | "sell"
    ) => Promise<number>
  ) => Promise<Currency[]>;
};

type Actions = {
  clear: () => void;
  fetchIfNeeded: (args: Args) => Promise<void>;
};

function keyFrom(balances: Record<string, number>) {
  // Simple, stable key: adjust if you need more inputs
  try {
    return JSON.stringify(balances);
  } catch {
    return String(balances);
  }
}

export const useCurrenciesStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      currencies: [],
      loading: false,

      clear: () =>
        set({
          currencies: [],
          lastKey: undefined,
          lastUpdated: undefined,
          error: undefined,
        }),

      fetchIfNeeded: async ({
        balances,
        formatBalance,
        convertCurrency,
        getCurrencyDisplayData,
        ttlMs = 5 * 60_000,
        force,
      }) => {
        const k = keyFrom(balances);
        const { currencies, lastKey, lastUpdated, loading } = get();

        const fresh =
          !!currencies.length &&
          lastKey === k &&
          lastUpdated !== undefined &&
          Date.now() - lastUpdated < ttlMs;

        if (!force && (fresh || loading)) return;

        set({ loading: true, error: undefined });

        // Add a timeout to prevent infinite loading
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Currency fetch timeout')), 30000); // 30 second timeout
        });

        try {
          console.log('Starting currency data fetch...');
          const data = await Promise.race([
            getCurrencyDisplayData(balances, formatBalance, convertCurrency),
            timeoutPromise
          ]);
          console.log('Currency data fetch completed:', data.length, 'currencies');
          set({
            currencies: data,
            lastKey: k,
            lastUpdated: Date.now(),
            loading: false,
          });
        } catch (e: any) {
          console.error('Error fetching currency data:', e);
          set({ error: e?.message ?? String(e), loading: false });
        }
      },
    }),
    {
      name: "currencies-store",
      version: 8, // Bumped to invalidate stale cache from standalone Trade Widget
    }
  )
);
