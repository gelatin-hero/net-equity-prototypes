import { X, Search } from "lucide-react";
import { createPortal } from "react-dom";
import { getCurrencyFlag } from "./CurrencyFlags";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useCurrenciesStore } from "../../stores/useCurrenciesStore";
import { isSwappable } from "../../constants/swapRestrictions";

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCurrencySelect: (currencyCode: string) => void;
  onNonSwappableClick: (currencyCode: string) => void;
  type: "buy" | "sell";
  oppositeCurrency: string | null;
  balances: Record<string, number>;
  formatBalance: (amount: number, currencyCode: string) => string;
  convertCurrency: (
    amount: number,
    from: string,
    to: string,
    reference: "buy" | "sell"
  ) => Promise<number>;
}

interface Currency {
  code: string;
  name: string;
  balance: string;
  usdValue?: string;
  isNegative?: boolean;
}

// Format USD value in human-readable format (e.g., 1.223M, 500K)
// Matches the formatHumanReadable function in CurrencyConverter
const formatHumanReadableUSD = (amount: number): string => {
  const absAmount = Math.abs(amount);

  // Helper to truncate decimals without rounding
  const truncateToDecimals = (value: number, decimals: number) => {
    const factor = Math.pow(10, decimals);
    return Math.trunc(value * factor) / factor;
  };

  const thresholds = [
    { value: 1_000_000_000_000, suffix: "T" },
    { value: 1_000_000_000, suffix: "B" },
    { value: 1_000_000, suffix: "M" },
    { value: 1_000, suffix: "K" },
  ];

  for (const t of thresholds) {
    if (absAmount >= t.value) {
      const scaled = absAmount / t.value;
      if (t.suffix === "M") {
        // For millions, allow up to 6 decimal places (truncate)
        const truncated = truncateToDecimals(scaled, 6);
        return (
          "$ " +
          truncated.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
          }) +
          " " +
          t.suffix
        );
      }
      if (t.suffix === "K") {
        // For thousands, allow up to 3 decimal places (truncate)
        const truncated = truncateToDecimals(scaled, 3);
        return (
          "$ " +
          truncated.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 3,
          }) +
          " " +
          t.suffix
        );
      }
      // B/T: dynamic decimals with truncation
      const decimals = scaled < 10 ? 3 : scaled < 100 ? 2 : 1;
      const truncated = truncateToDecimals(scaled, decimals);
      return (
        "$ " +
        truncated.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) +
        " " +
        t.suffix
      );
    }
  }

  // For amounts below 1,000, show with higher precision
  const truncated = truncateToDecimals(absAmount, 4);
  return (
    "$ " +
    truncated.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    })
  );
};

const getCurrencyDisplayData = async (
  balances: Record<string, number>,
  formatBalance: (amount: number, currencyCode: string) => string,
  convertCurrency: (
    amount: number,
    from: string,
    to: string,
    reference: "buy" | "sell"
  ) => Promise<number>
): Promise<Currency[]> => {
  const currencyDefinitions = [
    { code: "USD", name: "United States Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "AED", name: "United Arab Emirates Dhiram" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "EURC", name: "Euro Coin" },
    { code: "USDC", name: "USD Coin" },
    { code: "USDT", name: "Tether" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "PLN", name: "Polish Zloty" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "COP", name: "Colombian Peso" },
    { code: "ARS", name: "Argentine Peso" },
  ];

  return Promise.all(
    currencyDefinitions.map(async (currency) => {
      try {
        const balance = balances[currency.code] || 0;
        const formattedBalance = formatBalance(balance, currency.code);
        const isNegative = balance < 0;

        // Don't show USD value for USD itself
        let usdValue: string | undefined = undefined;
        if (currency.code !== "USD") {
          try {
            const usdAmount = await convertCurrency(
              balance,
              currency.code,
              "USD",
              "buy"
            );
            console.log(`Converted ${currency.code} ${balance} to USD: ${usdAmount}`);
            usdValue = formatHumanReadableUSD(usdAmount);
            if (usdAmount < 0) {
              usdValue = `- ${usdValue}`;
            }
          } catch (error) {
            console.error(`Error converting ${currency.code} to USD:`, error);
            // Fallback to a default value or skip USD conversion
            usdValue = "Error";
          }
        }

        return {
          code: currency.code,
          name: currency.name,
          balance: isNegative
            ? `- ${formattedBalance.replace("-", "")}`
            : formattedBalance,
          usdValue,
          isNegative,
        };
      } catch (error) {
        console.error(`Error processing currency ${currency.code}:`, error);
        // Return a fallback currency object
        return {
          code: currency.code,
          name: currency.name,
          balance: "0.00",
          usdValue: "Error",
          isNegative: false,
        };
      }
    })
  );
};

export function CurrencyModal({
  isOpen,
  onClose,
  onCurrencySelect,
  onNonSwappableClick,
  type,
  oppositeCurrency,
  balances,
  formatBalance,
  convertCurrency,
}: CurrencyModalProps) {
  const currencies = useCurrenciesStore((s) => s.currencies);
  const loading = useCurrenciesStore((s) => s.loading);
  const fetchIfNeeded = useCurrenciesStore((s) => s.fetchIfNeeded);

  useEffect(() => {
    fetchIfNeeded({
      balances,
      formatBalance,
      convertCurrency,
      getCurrencyDisplayData,
      ttlMs: 5 * 60_000, // 5 min cache; tweak or remove
    });
  }, [balances, formatBalance, convertCurrency, fetchIfNeeded]);

  // Split currencies into swappable and non-swappable based on opposite currency
  const swappableCurrencies: Currency[] = [];
  const nonSwappableCurrencies: Currency[] = [];

  currencies.forEach((currency) => {
    if (!oppositeCurrency || isSwappable(currency.code, oppositeCurrency)) {
      swappableCurrencies.push(currency);
    } else {
      nonSwappableCurrencies.push(currency);
    }
  });

  // Recent section: only show swappable currencies
  const recentCurrencies = swappableCurrencies.slice(0, 3);
  const allSwappableCurrencies = swappableCurrencies.slice(3);

  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const matches = (c: Currency) =>
    !normalizedQuery ||
    c.code.toLowerCase().includes(normalizedQuery) ||
    c.name.toLowerCase().includes(normalizedQuery);

  const filteredRecent = recentCurrencies.filter(matches);
  const filteredAllSwappable = allSwappableCurrencies.filter(matches);
  const filteredNonSwappable = nonSwappableCurrencies.filter(matches);
  const hasResults =
    filteredRecent.length > 0 ||
    filteredAllSwappable.length > 0 ||
    filteredNonSwappable.length > 0;

  const handleCurrencyClick = (currencyCode: string, isNonSwappable: boolean) => {
    if (isNonSwappable) {
      onNonSwappableClick(currencyCode);
    } else {
      onCurrencySelect(currencyCode);
      onClose();
    }
  };

  return createPortal(
    <AnimatePresence initial={false} mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.6,
            }}
            className="relative w-full max-w-md mx-4 mb-4 h-[95vh] sm:h-[85vh] overflow-hidden"
          >
            <div className="bg-white rounded-[12px] shadow-2xl border-[#efefef] border-[0.5px] h-full flex flex-col overflow-hidden">
              {/* Fixed Header and Search Section */}
              <div className="flex-shrink-0 px-[16px] pt-[16px]">
                {/* Header */}
                <div className="flex items-center justify-between w-full mb-4">
                  <h2 className="text-[18px] font-normal text-[#1c1c1c] leading-[24px]">
                    Select an asset to {type}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4 text-[#999999]" />
                  </button>
                </div>

                {/* Search */}
                <div className="w-full mb-4">
                  <div className="bg-white rounded-[12px] border border-[#dedede] shadow-[0px_0.5px_1px_0.3px_rgba(32,32,32,0.15)] p-[12px] flex items-center gap-2.5">
                    <Search className="h-4 w-4 text-[#CACACA]" />
                    <input
                      type="text"
                      placeholder="Search for a currency or token"
                      className="flex-1 text-[13px] text-[#7b7b7b] font-medium placeholder:text-[#7b7b7b] border-none outline-none leading-[18px]"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Visual Separator */}
                <div className="w-full border-t border-[#f0f0f0]"></div>
              </div>

              {/* Scrollable Currency List Section */}
              <div className="flex-1 overflow-y-scroll currency-modal-scroll px-[16px] pt-2">
                  {loading && currencies.length === 0 ? (
                    // Shimmer/Skeleton Loader
                    <div className="space-y-0">
                      {[...Array(8)].map((_, index) => (
                        <div key={index}>
                          {index > 0 && (
                            <div className="border-t border-[#F0F0F0]" />
                          )}
                          <div className="w-full px-2 py-3 animate-pulse">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                {/* Flag skeleton */}
                                <div className="w-8 h-8 rounded-full bg-gray-200" />
                                <div className="text-left space-y-2">
                                  {/* Currency code skeleton */}
                                  <div className="h-[18px] w-12 bg-gray-200 rounded" />
                                  {/* Currency name skeleton */}
                                  <div className="h-[18px] w-32 bg-gray-200 rounded" />
                                </div>
                              </div>
                              <div className="text-right space-y-2">
                                {/* Balance skeleton */}
                                <div className="h-[18px] w-24 bg-gray-200 rounded" />
                                {/* USD value skeleton */}
                                <div className="h-[16px] w-16 bg-gray-200 rounded" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : !hasResults ? (
                    <div className="px-2 py-6 text-center text-[13px] text-[#7b7b7b]">
                      No results for "{query}"
                    </div>
                  ) : (
                    <>
                      {/* Recent Section */}
                      {filteredRecent.length > 0 && (
                        <div className="mb-4">
                          <div className="px-2 mb-2">
                            <p className="text-[13px] font-medium text-[#999999] leading-[18px]">
                              Recent
                            </p>
                          </div>
                          <div className="space-y-0">
                            {filteredRecent.map((currency, index) => (
                              <div key={currency.code}>
                                {index > 0 && (
                                  <div className="border-t border-[#F0F0F0]" />
                                )}
                                <button
                                  onClick={() =>
                                    handleCurrencyClick(currency.code, false)
                                  }
                                  className="w-full px-2 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      {getCurrencyFlag(currency.code)}
                                      <div className="text-left">
                                        <div className="text-[13px] font-semibold text-[#202020] uppercase leading-[18px]">
                                          {currency.code}
                                        </div>
                                        <div className="text-[13px] font-normal text-[#676767] leading-[18px]">
                                          {currency.name}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div
                                        className={`text-[13px] font-semibold leading-[18px] ${
                                          currency.isNegative
                                            ? "text-[#e95c5c]"
                                            : "text-[#1c1c1c]"
                                        }`}
                                      >
                                        {currency.balance}
                                      </div>
                                      {currency.usdValue && (
                                        <div
                                          className="text-[13px] font-normal text-[#676767] leading-[16px]"
                                          title="USD Equivalent"
                                        >
                                          {currency.usdValue}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* All Swappable Assets Section */}
                      {filteredAllSwappable.length > 0 && (
                        <div>
                          <div className="px-2 mb-2">
                            <p className="text-[13px] font-medium text-[#999999] leading-[18px]">
                              All assets
                            </p>
                          </div>
                          <div className="space-y-0">
                            {filteredAllSwappable.map((currency, index) => (
                              <div key={currency.code}>
                                {index > 0 && (
                                  <div className="border-t border-[#F0F0F0]" />
                                )}
                                <button
                                  onClick={() =>
                                    handleCurrencyClick(currency.code, false)
                                  }
                                  className="w-full px-2 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      {getCurrencyFlag(currency.code)}
                                      <div className="text-left">
                                        <div className="text-[13px] font-semibold text-[#202020] uppercase leading-[18px]">
                                          {currency.code}
                                        </div>
                                        <div className="text-[13px] font-normal text-[#676767] leading-[18px]">
                                          {currency.name}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-[13px] font-semibold text-[#1c1c1c] leading-[18px]">
                                        {currency.balance}
                                      </div>
                                      {currency.usdValue && (
                                        <div
                                          className="text-[13px] font-normal text-[#676767] leading-[16px]"
                                          title="USD Equivalent"
                                        >
                                          {currency.usdValue}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Non-Swappable Assets Section - Only show if there are non-swappable currencies and opposite currency is selected */}
                      {filteredNonSwappable.length > 0 && oppositeCurrency && (
                        <div className="mt-4">
                          <div className="px-2 mb-2">
                            <p className="text-[13px] font-medium text-[#999999] leading-[18px]">
                              Not swappable against {oppositeCurrency}
                            </p>
                          </div>
                          <div className="space-y-0">
                            {filteredNonSwappable.map((currency, index) => (
                              <div key={currency.code}>
                                {index > 0 && (
                                  <div className="border-t border-[#F0F0F0]" />
                                )}
                                <button
                                  onClick={() =>
                                    handleCurrencyClick(currency.code, true)
                                  }
                                  className="w-full px-2 py-3 hover:bg-gray-50 transition-colors cursor-not-allowed opacity-50"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      {getCurrencyFlag(currency.code)}
                                      <div className="text-left">
                                        <div className="text-[13px] font-semibold text-[#9ca3af] uppercase leading-[18px]">
                                          {currency.code}
                                        </div>
                                        <div className="text-[13px] font-normal text-[#9ca3af] leading-[18px]">
                                          {currency.name}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-[13px] font-semibold text-[#9ca3af] leading-[18px]">
                                        {currency.balance}
                                      </div>
                                      {currency.usdValue && (
                                        <div
                                          className="text-[13px] font-normal text-[#9ca3af] leading-[16px]"
                                          title="USD Equivalent"
                                        >
                                          {currency.usdValue}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
