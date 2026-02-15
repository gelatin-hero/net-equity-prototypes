import React, { useState, useEffect, useRef } from "react";
import { Input } from "../ui-tw/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui-tw/select";
import { Button } from "../ui-tw/button";
import { ArrowUpDown, ChevronDown, Loader2 } from "lucide-react";
import {
  currencies,
  exchangeRates,
  getCurrencyByCode,
} from "../../constants/currencies";
import {
  convertCurrency,
  getExchangeRate,
  formatCurrencyAmount,
  determinePairConvention,
  CurrencyPair,
} from "../../constants/exchangeRates";
import { Trade } from "./TradeHistory";
import { getCurrencyFlag } from "./CurrencyFlags";
import { ShimmerText } from "./ShimmerText";
import { useDebounce } from "../../hooks/useDebounce";
import { CurrencyModal } from "./CurrencyModal";
import { useBookmarks } from "../../hooks/useBookmarks";
import { CreditTooltip } from "./CreditTooltip";
import { AvailableToSellTooltip } from "./AvailableToSellTooltip";
import { BookmarkTabs } from "./BookmarkTabs";
import { BookmarkOutlineIcon, BookmarkFilledIcon } from "./BookmarkIcons";
import { useQuoteTimer } from "../../hooks/useQuoteTimer";
import { useLimitOrderNudge } from "../../hooks/useLimitOrderNudge";
import { ConversionPriceQuoteTimer } from "./ConversionPriceQuoteTimer";
import { RefreshIcon } from "./RefreshIcon";
import { LimitOrderSheet } from "./LimitOrderSheet";
import { motion, AnimatePresence } from "motion/react";

interface TradingWidgetProps {
  onTradeExecuted: (trade: Trade) => void;
  balances?: Record<string, number>;
  rates?: Record<string, number>;
  creditLimit?: number;
  totals?: {
    availableCredit?: number;
    creditRemaining?: number;
    totalCapacity?: number;
    equity?: number;
    [key: string]: any;
  };
  disabledCurrencies?: Record<string, boolean>;
  model?: string;
}

export function TradingWidget({
  onTradeExecuted,
  balances: externalBalances,
  rates: externalRates,
  creditLimit = 10_000_000,
  totals,
  disabledCurrencies,
  model = 'A',
}: TradingWidgetProps) {
  const [buyAmount, setBuyAmount] = useState<string>("0");
  const [sellAmount, setSellAmount] = useState<string>("0");
  const [buyCurrency, setBuyCurrency] = useState<string>("USD");
  const [sellCurrency, setSellCurrency] = useState<string>("USDC");
  const [isShimmeringBuy, setIsShimmeringBuy] = useState(false);
  const [isShimmeringSell, setIsShimmeringSell] = useState(false);
  const isFetchingQuote = isShimmeringBuy || isShimmeringSell;
  const [lastEditedField, setLastEditedField] = useState<"buy" | "sell" | null>(
    null
  );
  const [lastCurrencyChangedSide, setLastCurrencyChangedSide] = useState<"buy" | "sell" | null>(
    null
  );
  const [isSwapping, setIsSwapping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"buy" | "sell">("sell");
  const [isLimitOrderSheetOpen, setIsLimitOrderSheetOpen] = useState(false);

  // Tooltip state
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isSellTooltipVisible, setIsSellTooltipVisible] = useState(false);

  // Bookmark functionality
  const {
    bookmarks,
    currentPairId,
    isBookmarked,
    toggleBookmark,
    removeBookmark,
    setCurrentPair,
    getCurrentPair,
    clearCurrentPair,
  } = useBookmarks();

  // Quote timer functionality
  const {
    timeLeft,
    isExpired,
    resetTimer,
    startTimer,
    pauseTimer,
    resumeTimer,
  } = useQuoteTimer(15);

  // Whether there is an active quote (both amounts present and non-zero)
  const hasActiveQuote =
    buyAmount !== "0" &&
    sellAmount !== "0" &&
    buyAmount !== "" &&
    sellAmount !== "";

  // Limit-order nudge functionality
  const {
    showNudge: showLimitOrderNudge,
    resetNudge,
    startNudgeTimer,
  } = useLimitOrderNudge(hasActiveQuote);

  // Stable exchange rate (only changes when new quote is generated)
  const [currentExchangeRate, setCurrentExchangeRate] = useState<number>(0);

  // Current currency pair using base/quote convention
  const [currentCurrencyPair, setCurrentCurrencyPair] = useState<CurrencyPair | null>(null);

  // Track which field is currently being edited (focused)
  const [isBuyFocused, setIsBuyFocused] = useState(false);
  const [isSellFocused, setIsSellFocused] = useState(false);

  // Track raw input values for editable display
  const [buyInputValue, setBuyInputValue] = useState<string>("");
  const [sellInputValue, setSellInputValue] = useState<string>("");

  // Temporary cooldown to prevent rapid re-clicks on execute when refreshing quotes
  const [isExecuteCooldownActive, setIsExecuteCooldownActive] = useState(false);
  const executeCooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Track free editing mode (when user deletes commas)
  const [isBuyFreeEditing, setIsBuyFreeEditing] = useState(false);
  const [isSellFreeEditing, setIsSellFreeEditing] = useState(false);

  // Track keyboard focus for visual feedback on hotkeys
  const [isBuyKeyboardFocused, setIsBuyKeyboardFocused] = useState(false);
  const [isSellKeyboardFocused, setIsSellKeyboardFocused] = useState(false);

  // Error states for validation
  const [sellAmountError, setSellAmountError] = useState(false);
  const [tradingLimitError, setTradingLimitError] = useState(false);
  const [buyMinTradeError, setBuyMinTradeError] = useState(false);
  const [sellMinTradeError, setSellMinTradeError] = useState(false);

  // Shake animation state for validation feedback
  const [isBuyFieldShaking, setIsBuyFieldShaking] = useState(false);
  

  // Simple debounced error states - show errors after delay, clear immediately on typing
  const [showBuyMinTradeError, setShowBuyMinTradeError] = useState(false);
  const [showSellMinTradeError, setShowSellMinTradeError] = useState(false);

  // Debounce the error states for showing errors
  const debouncedBuyMinTradeError = useDebounce(buyMinTradeError, 1000);
  const debouncedSellMinTradeError = useDebounce(sellMinTradeError, 1000);

  // Clear errors immediately when user starts typing
  useEffect(() => {
    if (isBuyFocused || isSellFocused) {
      setShowBuyMinTradeError(false);
      setShowSellMinTradeError(false);
    }
  }, [isBuyFocused, isSellFocused]);

  useEffect(() => {
    return () => {
      if (executeCooldownTimerRef.current) {
        clearTimeout(executeCooldownTimerRef.current);
      }
    };
  }, []);

  // Show errors after debounce delay - only on the side that was edited
  useEffect(() => {
    // Show buy error if buy field was last edited
    if (lastEditedField === "buy") {
      setShowBuyMinTradeError(debouncedBuyMinTradeError);
    } else {
      setShowBuyMinTradeError(false);
    }

    // Show sell error if sell field was last edited
    if (lastEditedField === "sell") {
      setShowSellMinTradeError(debouncedSellMinTradeError);
    } else {
      setShowSellMinTradeError(false);
    }
  }, [debouncedBuyMinTradeError, debouncedSellMinTradeError, lastEditedField]);

  // Show errors initially when component loads (before any user interaction)
  useEffect(() => {
    if (lastEditedField === null) {
      setShowBuyMinTradeError(debouncedBuyMinTradeError);
      setShowSellMinTradeError(debouncedSellMinTradeError);
    }
  }, [debouncedBuyMinTradeError, debouncedSellMinTradeError, lastEditedField]);

  // Refs to track cursor position
  const buyInputRef = useRef<HTMLInputElement>(null);
  const sellInputRef = useRef<HTMLInputElement>(null);

  // Track key events for better comma deletion detection
  const [lastKeyPressed, setLastKeyPressed] = useState<string>("");
  const [cursorBeforeKeypress, setCursorBeforeKeypress] = useState<number>(0);

  // Debounce the input values
  const debouncedBuyAmount = useDebounce(buyAmount, 800);
  const debouncedSellAmount = useDebounce(sellAmount, 800);

  // Check trading limits whenever amounts or currencies change
  useEffect(() => {
    const checkCurrentLimits = () => {
      const cleanBuyAmount = buyAmount.replace(/,/g, "");
      const cleanSellAmount = sellAmount.replace(/,/g, "");
      const buyAmountNum = Number(cleanBuyAmount);
      const sellAmountNum = Number(cleanSellAmount);

      if (
        !isNaN(buyAmountNum) &&
        !isNaN(sellAmountNum) &&
        buyAmountNum > 0 &&
        sellAmountNum > 0
      ) {
        // Check trading limit validation
        if (
          !checkTradingLimit(
            cleanSellAmount,
            sellCurrency,
            cleanBuyAmount,
            buyCurrency
          )
        ) {
          setTradingLimitError(true);
        } else {
          setTradingLimitError(false);
        }

        // Check balance validation for sell amount
        if (sellAmountNum > availableToSell) {
          setSellAmountError(true);
        } else {
          setSellAmountError(false);
        }
      }

      // Check minimum trade validation for buy amount
      const buyMinTradeValid = checkMinimumTrade(cleanBuyAmount, buyCurrency);
      setBuyMinTradeError(!buyMinTradeValid);

      // Check minimum trade validation for sell amount
      const sellMinTradeValid = checkMinimumTrade(
        cleanSellAmount,
        sellCurrency
      );
      setSellMinTradeError(!sellMinTradeValid);
    };

    checkCurrentLimits();
  }, [buyAmount, sellAmount, buyCurrency, sellCurrency]);

  // Balances from parent (net-equity calculator) or fallback to empty
  const balances = externalBalances ?? {};

  // Available credit from parent totals or fallback
  const availableCredit = totals?.availableCredit ?? Math.max(0, creditLimit);

  // Trading limit — use credit limit as the ceiling
  const tradingLimitUSD = creditLimit;

  // Available to sell in the selected sell currency
  const sellRate = externalRates?.[sellCurrency] ?? 1;
  const sellBalance = balances[sellCurrency] ?? 0;
  const creditAvailableUSD = model === 'C'
    ? (totals?.availableCredit ?? creditLimit)
    : (totals?.creditRemaining ?? creditLimit);
  const creditInSellCurrency = sellRate > 0 ? creditAvailableUSD / sellRate : 0;
  const availableToSell = sellBalance >= 0
    ? sellBalance + creditInSellCurrency
    : creditInSellCurrency;

  const getCurrencyInfo = (code: string): { flag: React.ReactElement | null; name: string } => {
    // Handle empty currency code - return null flag and "Select asset" text
    if (!code) {
      return {
        flag: null,
        name: "Select asset",
      };
    }

    const currencyInfo: Record<string, { flag: React.ReactElement | null; name: string }> = {
      USD: {
        flag: getCurrencyFlag("USD"),
        name: "United States Dollar",
      },
      USDC: {
        flag: getCurrencyFlag("USDC"),
        name: "USD Coin",
      },
      EUR: { flag: getCurrencyFlag("EUR"), name: "Euro" },
      GBP: { flag: getCurrencyFlag("GBP"), name: "British Pound" },
      AUD: { flag: getCurrencyFlag("AUD"), name: "Australian Dollar" },
      BRL: { flag: getCurrencyFlag("BRL"), name: "Brazilian Real" },
      EURC: { flag: getCurrencyFlag("EURC"), name: "Euro Coin" },
      USDT: { flag: getCurrencyFlag("USDT"), name: "Tether" },
      AED: {
        flag: getCurrencyFlag("AED"),
        name: "United Arab Emirates Dhiram",
      },
      MXN: { flag: getCurrencyFlag("MXN"), name: "Mexican Peso" },
      NOK: { flag: getCurrencyFlag("NOK"), name: "Norwegian Krone" },
      PHP: { flag: getCurrencyFlag("PHP"), name: "Philippine Peso" },
      PLN: { flag: getCurrencyFlag("PLN"), name: "Polish Zloty" },
      SEK: { flag: getCurrencyFlag("SEK"), name: "Swedish Krona" },
      SGD: { flag: getCurrencyFlag("SGD"), name: "Singapore Dollar" },
      IDR: { flag: getCurrencyFlag("IDR"), name: "Indonesian Rupiah" },
      HKD: { flag: getCurrencyFlag("HKD"), name: "Hong Kong Dollar" },
      COP: { flag: getCurrencyFlag("COP"), name: "Colombian Peso" },
      ARS: { flag: getCurrencyFlag("ARS"), name: "Argentine Peso" },
    };
    return (
      currencyInfo[code] || {
        flag: getCurrencyFlag("USD"),
        name: "Unknown Currency",
      }
    );
  };

  const getRate = () => {
    // Return the stable exchange rate (only changes when new quote is generated)
    return currentExchangeRate || getExchangeRate(sellCurrency, buyCurrency);
  };

  // Get the current currency pair using base/quote convention
  const getCurrentCurrencyPair = (): CurrencyPair => {
    if (currentCurrencyPair) {
      return currentCurrencyPair;
    }
    // Fallback if no pair is set
    return determinePairConvention(sellCurrency, buyCurrency);
  };

  // Helper function to update both exchange rate and currency pair
  // This gets a fresh quote with volatility and bid/ask spread applied
  const updateExchangeRateAndPair = () => {
    const pair = determinePairConvention(sellCurrency, buyCurrency);

    // Store the pair's rate as the current exchange rate for trade history
    setCurrentExchangeRate(pair.rate);
    setCurrentCurrencyPair(pair);
  };

  const updatePairFromQuote = (
    buyCurrencyCode: string,
    sellCurrencyCode: string,
    buyAmountValue: number,
    sellAmountValue: number
  ) => {
    if (
      !isFinite(buyAmountValue) ||
      !isFinite(sellAmountValue) ||
      buyAmountValue <= 0 ||
      sellAmountValue <= 0
    ) {
      updateExchangeRateAndPair();
      return;
    }

    const pair = determinePairConvention(sellCurrencyCode, buyCurrencyCode);

    let derivedRate: number;
    if (pair.baseCurrency === buyCurrencyCode) {
      derivedRate = sellAmountValue / buyAmountValue;
    } else if (pair.baseCurrency === sellCurrencyCode) {
      derivedRate = buyAmountValue / sellAmountValue;
    } else {
      derivedRate = pair.rate;
    }

    if (!isFinite(derivedRate) || derivedRate <= 0) {
      derivedRate = pair.rate;
    }

    setCurrentExchangeRate(derivedRate);
    setCurrentCurrencyPair({
      ...pair,
      rate: derivedRate,
    });
  };

  // Check if sell amount exceeds available balance + credit (in USD)
  const checkSellAmountValidity = async (amount: string, currency: string) => {
    const cleanAmount = amount.replace(/,/g, "");
    const sellAmountNum = Number(cleanAmount);

    if (isNaN(sellAmountNum) || sellAmountNum === 0) {
      return true; // Valid if empty or zero
    }

    // Convert sell amount to USD for comparison
    const sellAmountInUSD = await convertCurrency(
      sellAmountNum,
      currency,
      "USD",
      "buy"
    );

    // Get current balance in USD
    const currentBalanceInUSD = await convertCurrency(
      balances[currency] || 0,
      currency,
      "USD",
      "buy"
    );

    // Total available = balance + credit
    const totalAvailableInUSD = currentBalanceInUSD + availableCredit;

    return sellAmountInUSD <= totalAvailableInUSD;
  };

  // Check if trade amount exceeds trading limit (1M USD)
  const checkTradingLimit = async (
    sellAmount: string,
    sellCurrency: string,
    buyAmount: string,
    buyCurrency: string
  ) => {
    const cleanSellAmount = sellAmount.replace(/,/g, "");
    const cleanBuyAmount = buyAmount.replace(/,/g, "");
    const sellAmountNum = Number(cleanSellAmount);
    const buyAmountNum = Number(cleanBuyAmount);

    if (
      isNaN(sellAmountNum) ||
      isNaN(buyAmountNum) ||
      sellAmountNum === 0 ||
      buyAmountNum === 0
    ) {
      return true; // Valid if empty or zero
    }

    // Convert both amounts to USD for comparison
    const sellAmountInUSD = await convertCurrency(
      sellAmountNum,
      sellCurrency,
      "USD",
      "buy"
    );
    const buyAmountInUSD = await convertCurrency(
      buyAmountNum,
      buyCurrency,
      "USD",
      "sell"
    );

    // Check if either amount exceeds the trading limit
    return (
      sellAmountInUSD <= tradingLimitUSD && buyAmountInUSD <= tradingLimitUSD
    );
  };

  // Check if trade amount meets minimum requirement (100 currency units)
  const checkMinimumTrade = (amount: string, currency: string) => {
    const cleanAmount = amount.replace(/,/g, "");
    const amountNum = Number(cleanAmount);

    if (isNaN(amountNum) || amountNum === 0) {
      return true; // Valid if empty or zero
    }

    // Check if amount is at least 100 in the currency units
    return amountNum >= 100;
  };

  // Calculate new cursor position after formatting changes
  const calculateNewCursorPosition = (
    oldValue: string,
    newValue: string,
    oldCursorPos: number
  ) => {
    // If values are the same, keep cursor position
    if (oldValue === newValue) return oldCursorPos;

    // Remove commas from both values to get clean comparison
    const oldClean = oldValue.replace(/,/g, "");
    const newClean = newValue.replace(/,/g, "");

    // Count commas before cursor position in old value
    const commasBeforeCursor = (
      oldValue.substring(0, oldCursorPos).match(/,/g) || []
    ).length;

    // Find position in clean value (without commas)
    const cleanCursorPos = oldCursorPos - commasBeforeCursor;

    // Now find the corresponding position in the new formatted value
    let newCursorPos = 0;
    let cleanCharCount = 0;

    for (let i = 0; i < newValue.length; i++) {
      if (newValue[i] === ",") {
        newCursorPos++;
        continue;
      }

      if (cleanCharCount >= cleanCursorPos) {
        break;
      }

      newCursorPos++;
      cleanCharCount++;
    }

    // Make sure cursor doesn't end up on a comma
    if (newValue[newCursorPos] === ",") {
      newCursorPos++;
    }

    return Math.min(newCursorPos, newValue.length);
  };

  // Format number with commas while preserving editability
  const formatWithCommas = (value: string) => {
    if (!value || value === "") return "";

    // Handle cases where value starts with decimal point
    if (value === ".") return ".";
    if (value.startsWith(".")) return "0" + value;

    // Split into integer and decimal parts
    const parts = value.split(".");
    const integerPart = parts[0] || "";
    const decimalPart = parts[1];

    // Don't add commas to empty integer part
    if (!integerPart) return decimalPart !== undefined ? `.${decimalPart}` : "";

    // Add commas to integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine parts
    return decimalPart !== undefined
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;
  };

  // Get display value with real-time comma formatting
  const getDisplayValue = (
    amount: string,
    currencyCode: string,
    isFocused: boolean,
    inputValue: string,
    isFreeEditing: boolean
  ) => {
    // If amount is empty or zero, return empty string to show placeholder
    if (!amount || amount === "" || amount === "0") {
      return "";
    }

    if (isFocused) {
      if (isFreeEditing && inputValue) {
        // When in free editing mode, show the raw input value to allow comma deletion
        return inputValue;
      } else if (inputValue) {
        // When focused and we have an inputValue, show it (should be formatted)
        return inputValue;
      } else {
        // Fallback to formatted amount
        return formatWithCommas(amount);
      }
    }
    // When not focused, show fully formatted value with proper precision
    return formatAmount(amount, currencyCode);
  };

  const formatBalance = (amount: number, currencyCode: string) => {
    const currency = getCurrencyByCode(currencyCode);
    const precision = currency?.precision || 2;

    return amount.toLocaleString("en-US", {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
  };

  const formatAmount = (amount: string, currencyCode?: string) => {
    if (!amount || amount === "" || amount === "0") return "";
    const num = Number(amount);
    if (isNaN(num) || num === 0) return "";

    // Get currency precision, default to 2 for fiat, 4 for crypto
    const currency = currencyCode ? getCurrencyByCode(currencyCode) : null;
    const precision = currency?.precision || 2;

    // For very small amounts, show more precision
    if (num > 0 && num < 1) {
      return num.toLocaleString("en-US", {
        minimumFractionDigits: Math.min(precision, 4),
        maximumFractionDigits: Math.max(precision, 6),
      });
    }

    // For normal amounts, use currency precision
    return num.toLocaleString("en-US", {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
  };

  const formatHumanReadable = (amount: string, currencyCode?: string) => {
    if (!amount || amount === "" || amount === "0") return "";
    // Clean the amount first to handle both raw and formatted values
    const cleanAmount =
      typeof amount === "string" ? amount.replace(/,/g, "") : String(amount);
    const num = Number(cleanAmount);
    if (isNaN(num) || num === 0) return "";

    // Get currency precision for better formatting defaults
    const currency = currencyCode ? getCurrencyByCode(currencyCode) : null;
    const basePrecision = currency?.precision || 2;

    // Utility: truncate without rounding
    const truncateToDecimals = (value: number, decimals: number) => {
      const factor = Math.pow(10, decimals);
      return Math.trunc(value * factor) / factor;
    };

    // Abbreviation logic: K, M, B, T without approximate marker and with higher precision (truncate, don't round)
    const thresholds = [
      { value: 1_000_000_000_000, suffix: "T" },
      { value: 1_000_000_000, suffix: "B" },
      { value: 1_000_000, suffix: "M" },
      { value: 1_000, suffix: "K" },
    ];

    for (const t of thresholds) {
      if (num >= t.value) {
        const scaled = num / t.value;
        if (t.suffix === "M") {
          // For millions, allow up to 6 decimal places (truncate)
          const truncated = truncateToDecimals(scaled, 6);
          return (
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
          truncated.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) +
          " " +
          t.suffix
        );
      }
    }

    // For amounts below 1,000, show with higher precision respecting currency (truncate)
    const maxSmall = Math.max(4, basePrecision);
    const truncated = truncateToDecimals(num, maxSmall);
    return truncated.toLocaleString("en-US", {
      minimumFractionDigits: Math.max(2, Math.min(basePrecision, 4)),
      maximumFractionDigits: maxSmall,
    });
  };

  // Handle shimmer effects when debounced values change
  useEffect(() => {
    if (lastEditedField !== "buy") {
      return;
    }

    let isCancelled = false;
    setIsShimmeringSell(true);

    const timerId = setTimeout(async () => {
      const cleanBuyAmount = debouncedBuyAmount.replace(/,/g, "");
      const buyAmountNum = Number(cleanBuyAmount);

      if (isCancelled) {
        return;
      }

      if (!isNaN(buyAmountNum) && buyAmountNum > 0) {
        const equivalentSellAmount = await convertCurrency(
          buyAmountNum,
          buyCurrency,
          sellCurrency,
          "sell"
        );

        if (isCancelled) {
          return;
        }

        const sellCurrencyInfo = getCurrencyByCode(sellCurrency);
        const precision = sellCurrencyInfo?.precision || 2;
        const newSellAmount = equivalentSellAmount.toFixed(precision);
        const sellAmountNumeric = Number(newSellAmount);
        setSellAmount(newSellAmount);

        const isSellValid = await checkSellAmountValidity(
          newSellAmount,
          sellCurrency
        );
        if (isCancelled) {
          return;
        }
        setSellAmountError(!isSellValid);

        const isWithinLimit = await checkTradingLimit(
          newSellAmount,
          sellCurrency,
          cleanBuyAmount,
          buyCurrency
        );
        if (isCancelled) {
          return;
        }
        setTradingLimitError(!isWithinLimit);

        if (isCancelled) {
          return;
        }

        updatePairFromQuote(
          buyCurrency,
          sellCurrency,
          buyAmountNum,
          sellAmountNumeric
        );
      } else {
        setSellAmount("0");
        setSellAmountError(false);
        setTradingLimitError(false);

        if (isCancelled) {
          return;
        }

        updateExchangeRateAndPair();
      }

      if (isCancelled) {
        return;
      }

      setIsShimmeringSell(false);
      setIsBuyFreeEditing(false);
      setBuyInputValue("");
      startTimer();
      startNudgeTimer();
    }, 1200);

    return () => {
      isCancelled = true;
      clearTimeout(timerId);
      setIsShimmeringSell(false);
    };
  }, [debouncedBuyAmount, lastEditedField, buyCurrency, sellCurrency]);

  useEffect(() => {
    if (lastEditedField !== "sell") {
      return;``
    }

    let isCancelled = false;
    setIsShimmeringBuy(true);

    const timerId = setTimeout(async () => {
      const cleanSellAmount = debouncedSellAmount.replace(/,/g, "");
      const sellAmountNum = Number(cleanSellAmount);

      if (isCancelled) {
        return;
      }

      if (!isNaN(sellAmountNum) && sellAmountNum > 0) {
        const equivalentBuyAmount = await convertCurrency(
          sellAmountNum,
          sellCurrency,
          buyCurrency,
          "buy"
        );

        if (isCancelled) {
          return;
        }

        const buyCurrencyInfo = getCurrencyByCode(buyCurrency);
        const precision = buyCurrencyInfo?.precision || 2;
        const newBuyAmount = equivalentBuyAmount.toFixed(precision);
        const buyAmountNumeric = Number(newBuyAmount);
        setBuyAmount(newBuyAmount);

        const isSellValid = await checkSellAmountValidity(
          cleanSellAmount,
          sellCurrency
        );
        if (isCancelled) {
          return;
        }
        setSellAmountError(!isSellValid);

        const isWithinLimit = await checkTradingLimit(
          cleanSellAmount,
          sellCurrency,
          newBuyAmount,
          buyCurrency
        );
        if (isCancelled) {
          return;
        }
        setTradingLimitError(!isWithinLimit);

        if (isCancelled) {
          return;
        }

        updatePairFromQuote(
          buyCurrency,
          sellCurrency,
          buyAmountNumeric,
          sellAmountNum
        );
      } else {
        setBuyAmount("0");
        setSellAmountError(false);
        setTradingLimitError(false);

        if (isCancelled) {
          return;
        }

        updateExchangeRateAndPair();
      }

      if (isCancelled) {
        return;
      }

      setIsShimmeringBuy(false);
      setIsSellFreeEditing(false);
      setSellInputValue("");
      startTimer();
      startNudgeTimer();
    }, 1200);

    return () => {
      isCancelled = true;
      clearTimeout(timerId);
      setIsShimmeringBuy(false);
    };
  }, [debouncedSellAmount, lastEditedField, buyCurrency, sellCurrency]);

  const handleBuyAmountChange = (value: string) => {
    // Pause timer while user is editing
    pauseTimer();

    // Get cursor position before processing
    const input = buyInputRef.current;
    const cursorPosition = input?.selectionStart || 0;
    const oldValue = input?.value || "";

    // Remove commas for processing first
    let cleanValue = value.replace(/,/g, "");

    // Only allow valid number input (digits and one decimal point)
    if (cleanValue !== "" && !/^\d*\.?\d*$/.test(cleanValue)) {
      return; // Invalid input, don't process
    }

    // Enhanced comma deletion detection
    const oldCommaCount = (oldValue.match(/,/g) || []).length;
    const newCommaCount = (value.match(/,/g) || []).length;
    const oldDigits = oldValue.replace(/[^0-9.]/g, "");
    const newDigits = value.replace(/[^0-9.]/g, "");

    // Check if user pressed backspace/delete on a comma
    const isBackspaceOnComma =
      (lastKeyPressed === "Backspace" || lastKeyPressed === "Delete") &&
      oldValue.length > 0 &&
      oldValue === value;
    console.log(
      "=======>",
      oldValue[cursorBeforeKeypress - 1],
      oldValue[cursorBeforeKeypress + 1],
      oldValue[cursorBeforeKeypress - 2],
      oldValue
    );

    // Check if commas were deleted while digits remain the same
    const isCommaDeleted =
      oldCommaCount > newCommaCount &&
      oldDigits === newDigits &&
      oldDigits.length > 0;

    // Check if user manually removed formatting (typed over commas)
    const shouldEnterFreeEdit = isBackspaceOnComma || isCommaDeleted;

    if (shouldEnterFreeEdit) {
      console.log(
        "🎯 Free editing mode activated - comma manipulation detected"
      );
      console.log("Details:", {
        isBackspaceOnComma,
        isCommaDeleted,
        lastKeyPressed,
        cursorBeforeKeypress,
      });
      setIsBuyFreeEditing(true);
      setBuyInputValue(value);
      setBuyAmount(cleanValue);
      setLastEditedField("buy");

      // Check trading limit validation immediately
      if (cleanValue && !isNaN(Number(cleanValue)) && Number(cleanValue) > 0) {
        if (
          !checkTradingLimit(sellAmount, sellCurrency, cleanValue, buyCurrency)
        ) {
          setTradingLimitError(true);
        } else {
          setTradingLimitError(false);
        }
      }
      return;
    }

    // Update the amount state
    setBuyAmount(cleanValue);
    setLastEditedField("buy");

    // Check trading limit validation immediately
    if (cleanValue && !isNaN(Number(cleanValue)) && Number(cleanValue) > 0) {
      if (
        !checkTradingLimit(sellAmount, sellCurrency, cleanValue, buyCurrency)
      ) {
        setTradingLimitError(true);
      } else {
        setTradingLimitError(false);
      }
    } else {
      setTradingLimitError(false);
    }

    if (isBuyFreeEditing) {
      // In free editing mode, store raw input
      setBuyInputValue(value);
    } else {
      // Normal mode - format with commas and preserve cursor position
      const formattedValue = formatWithCommas(cleanValue);
      setBuyInputValue(formattedValue);

      setTimeout(() => {
        if (input && isBuyFocused) {
          const newCursorPos = calculateNewCursorPosition(
            oldValue,
            formattedValue,
            cursorPosition
          );
          input.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);
    }
  };

  const handleSellAmountChange = (value: string) => {
    // Pause timer while user is editing
    pauseTimer();

    // Get cursor position before processing
    const input = sellInputRef.current;
    const cursorPosition = input?.selectionStart || 0;
    const oldValue = input?.value || "";

    // Remove commas for processing first
    let cleanValue = value.replace(/,/g, "");

    // Only allow valid number input (digits and one decimal point)
    if (cleanValue !== "" && !/^\d*\.?\d*$/.test(cleanValue)) {
      return; // Invalid input, don't process
    }

    // Enhanced comma deletion detection
    const oldCommaCount = (oldValue.match(/,/g) || []).length;
    const newCommaCount = (value.match(/,/g) || []).length;
    const oldDigits = oldValue.replace(/[^0-9.]/g, "");
    const newDigits = value.replace(/[^0-9.]/g, "");

    // Check if user pressed backspace/delete on a comma
    const isBackspaceOnComma =
      (lastKeyPressed === "Backspace" || lastKeyPressed === "Delete") &&
      oldValue.length > 0 &&
      oldValue === value;
    console.log(
      "=======>",
      oldValue[cursorBeforeKeypress - 1],
      oldValue[cursorBeforeKeypress + 1],
      oldValue[cursorBeforeKeypress - 2],
      oldValue
    );

    // Check if commas were deleted while digits remain the same
    const isCommaDeleted =
      oldCommaCount > newCommaCount &&
      oldDigits === newDigits &&
      oldDigits.length > 0;

    // Check if user manually removed formatting (typed over commas)
    const shouldEnterFreeEdit = isBackspaceOnComma || isCommaDeleted;

    if (shouldEnterFreeEdit) {
      console.log(
        "🎯 Free editing mode activated - comma manipulation detected"
      );
      console.log("Details:", {
        isBackspaceOnComma,
        isCommaDeleted,
        lastKeyPressed,
        cursorBeforeKeypress,
      });
      setIsSellFreeEditing(true);
      setSellInputValue(value);
      setSellAmount(cleanValue);
      setLastEditedField("sell");

      // Check validations immediately for free editing
      if (cleanValue && !isNaN(Number(cleanValue)) && Number(cleanValue) > 0) {
        // Check balance validation
        if (!checkSellAmountValidity(cleanValue, sellCurrency)) {
          setSellAmountError(true);
        } else {
          setSellAmountError(false);
        }

        // Check trading limit validation
        if (
          !checkTradingLimit(cleanValue, sellCurrency, buyAmount, buyCurrency)
        ) {
          setTradingLimitError(true);
        } else {
          setTradingLimitError(false);
        }
      } else {
        setSellAmountError(false);
        setTradingLimitError(false);
      }
      return;
    }

    // Update the amount state
    setSellAmount(cleanValue);
    setLastEditedField("sell");

    // Check validations immediately on sell amount change
    if (cleanValue && !isNaN(Number(cleanValue)) && Number(cleanValue) > 0) {
      // Check balance validation
      if (!checkSellAmountValidity(cleanValue, sellCurrency)) {
        setSellAmountError(true);
      } else {
        setSellAmountError(false);
      }

      // Check trading limit validation
      if (
        !checkTradingLimit(cleanValue, sellCurrency, buyAmount, buyCurrency)
      ) {
        setTradingLimitError(true);
      } else {
        setTradingLimitError(false);
      }
    } else {
      setSellAmountError(false);
      setTradingLimitError(false);
    }

    if (isSellFreeEditing) {
      // In free editing mode, store raw input
      setSellInputValue(value);
    } else {
      // Normal mode - format with commas and preserve cursor position
      const formattedValue = formatWithCommas(cleanValue);
      setSellInputValue(formattedValue);

      setTimeout(() => {
        if (input && isSellFocused) {
          const newCursorPos = calculateNewCursorPosition(
            oldValue,
            formattedValue,
            cursorPosition
          );
          input.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);
    }
  };

  const handleBuyFocus = () => {
    setIsBuyFocused(true);
    // Clear keyboard focus when manually focusing
    setIsBuyKeyboardFocused(false);
    // Set input value to formatted value with commas when focusing (if not already set)
    if (!buyInputValue && buyAmount && buyAmount !== "0") {
      setBuyInputValue(formatWithCommas(buyAmount));
    }
  };

  const handleBuyBlur = () => {
    setIsBuyFocused(false);
    setIsBuyKeyboardFocused(false);
    // Exit free editing mode and clear input value
    setIsBuyFreeEditing(false);
    setBuyInputValue("");
    // Clean up the value when focus is lost, but only if the numeric value changes
    const num = Number(buyAmount);
    if (!isNaN(num) && num >= 0) {
      const currency = getCurrencyByCode(buyCurrency);
      const precision = currency?.precision || 2;
      const formattedValue = num.toFixed(precision);

      // Only update state if the formatted value is different from current value
      // This prevents unnecessary quote refetches when just adding decimal places
      if (Number(formattedValue) !== Number(buyAmount)) {
        setBuyAmount(formattedValue);
      }
    }
  };

  const handleSellFocus = () => {
    setIsSellFocused(true);
    // Clear keyboard focus when manually focusing
    setIsSellKeyboardFocused(false);
    // Set input value to formatted value with commas when focusing (if not already set)
    if (!sellInputValue && sellAmount && sellAmount !== "0") {
      setSellInputValue(formatWithCommas(sellAmount));
    }
  };

  const handleSellBlur = () => {
    setIsSellFocused(false);
    setIsSellKeyboardFocused(false);
    // Exit free editing mode and clear input value
    setIsSellFreeEditing(false);
    setSellInputValue("");
    // Clean up the value when focus is lost, but only if the numeric value changes
    const num = Number(sellAmount);
    if (!isNaN(num) && num >= 0) {
      const currency = getCurrencyByCode(sellCurrency);
      const precision = currency?.precision || 2;
      const formattedValue = num.toFixed(precision);

      // Only update state if the formatted value is different from current value
      // This prevents unnecessary quote refetches when just adding decimal places
      if (Number(formattedValue) !== Number(sellAmount)) {
        setSellAmount(formattedValue);
      }

      // Check balance validation when user finishes editing
      if (!checkSellAmountValidity(sellAmount, sellCurrency)) {
        setSellAmountError(true);
      }
    }
  };

  const swapCurrencies = async () => {
    // Set flag to prevent useEffect from interfering
    setIsSwapping(true);

    // Remember which side was last edited before swap
    const previousLastEditedField = lastEditedField;

    // Swap currencies
    const tempBuyCurrency = buyCurrency;
    const tempSellCurrency = sellCurrency;

    setIsBuyFocused(false);
    setIsSellFocused(false);
    setSellAmountError(false);
    setTradingLimitError(false);

    // Keep the last edited amount, recalculate the other
    if (previousLastEditedField === "buy") {
      // User edited buy amount, so that amount stays (moves to sell side after swap)
      const amountToKeep = buyAmount;

      // Recalculate the other side FIRST (before swapping currencies)
      const cleanAmount = amountToKeep.replace(/,/g, "");
      const amountNum = Number(cleanAmount);

      if (!isNaN(amountNum) && amountNum > 0) {
        setIsShimmeringBuy(true);
        const equivalentBuyAmount = await convertCurrency(
          amountNum,
          tempBuyCurrency, // Current buy (will become sell)
          tempSellCurrency, // Current sell (will become buy)
          "buy"
        );
        const buyCurrency_info = getCurrencyByCode(tempSellCurrency);
        const precision = buyCurrency_info?.precision || 2;
        const newBuyAmount = equivalentBuyAmount.toFixed(precision);

        // Now swap everything
        setBuyCurrency(tempSellCurrency);
        setSellCurrency(tempBuyCurrency);
        setSellAmount(amountToKeep);
        setBuyAmount(newBuyAmount);
        setIsShimmeringBuy(false);

        updatePairFromQuote(
          tempSellCurrency,
          tempBuyCurrency,
          Number(newBuyAmount),
          amountNum
        );
      } else {
        // Just swap currencies and amounts
        setBuyCurrency(tempSellCurrency);
        setSellCurrency(tempBuyCurrency);
        setSellAmount(amountToKeep);
        setBuyAmount("0");

        updateExchangeRateAndPair();
      }
      setLastEditedField("sell"); // The edited amount is now on the sell side
    } else if (previousLastEditedField === "sell") {
      // User edited sell amount, so that amount stays (moves to buy side after swap)
      const amountToKeep = sellAmount;

      // Recalculate the other side FIRST (before swapping currencies)
      const cleanAmount = amountToKeep.replace(/,/g, "");
      const amountNum = Number(cleanAmount);

      if (!isNaN(amountNum) && amountNum > 0) {
        setIsShimmeringSell(true);
        const equivalentSellAmount = await convertCurrency(
          amountNum,
          tempSellCurrency, // Current sell (will become buy)
          tempBuyCurrency, // Current buy (will become sell)
          "sell"
        );
        const sellCurrency_info = getCurrencyByCode(tempBuyCurrency);
        const precision = sellCurrency_info?.precision || 2;
        const newSellAmount = equivalentSellAmount.toFixed(precision);

        // Now swap everything
        setBuyCurrency(tempSellCurrency);
        setSellCurrency(tempBuyCurrency);
        setBuyAmount(amountToKeep);
        setSellAmount(newSellAmount);
        setIsShimmeringSell(false);

        updatePairFromQuote(
          tempSellCurrency,
          tempBuyCurrency,
          amountNum,
          Number(newSellAmount)
        );
      } else {
        // Just swap currencies and amounts
        setBuyCurrency(tempSellCurrency);
        setSellCurrency(tempBuyCurrency);
        setBuyAmount(amountToKeep);
        setSellAmount("0");

        updateExchangeRateAndPair();
      }
      setLastEditedField("buy"); // The edited amount is now on the buy side
    } else {
      // No previous edit, just swap mechanically
      setBuyCurrency(tempSellCurrency);
      setSellCurrency(tempBuyCurrency);
      setBuyAmount(sellAmount);
      setSellAmount(buyAmount);
      const cleanNewBuy = sellAmount.replace(/,/g, "");
      const cleanNewSell = buyAmount.replace(/,/g, "");
      const newBuyNum = Number(cleanNewBuy);
      const newSellNum = Number(cleanNewSell);

      if (
        !isNaN(newBuyNum) &&
        !isNaN(newSellNum) &&
        newBuyNum > 0 &&
        newSellNum > 0
      ) {
        updatePairFromQuote(
          tempSellCurrency,
          tempBuyCurrency,
          newBuyNum,
          newSellNum
        );
      } else {
        updateExchangeRateAndPair();
      }
      setLastEditedField(null);
    }

    // Clear the swap flag after a short delay
    setTimeout(() => {
      setIsSwapping(false);
    }, 100);
  };

  // Keyboard shortcuts for field selection
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Shift+B (focus buy field)
      if (event.shiftKey && event.key.toLowerCase() === "b") {
        event.preventDefault();

        // Activate visual feedback
        setIsBuyKeyboardFocused(true);
        setIsSellKeyboardFocused(false);

        // Focus the input
        buyInputRef.current?.focus();

        // Clear visual feedback after a short duration
        setTimeout(() => {
          setIsBuyKeyboardFocused(false);
        }, 1000);

        return;
      }

      // Check for Shift+S (focus sell field)
      if (event.shiftKey && event.key.toLowerCase() === "s") {
        event.preventDefault();

        // Activate visual feedback
        setIsSellKeyboardFocused(true);
        setIsBuyKeyboardFocused(false);

        // Focus the input
        sellInputRef.current?.focus();

        // Clear visual feedback after a short duration
        setTimeout(() => {
          setIsSellKeyboardFocused(false);
        }, 1000);

        return;
      }
    };

    // Add event listener
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array since we don't need to re-add the listener

  const executeTrade = () => {
    const cleanBuyAmount = buyAmount.replace(/,/g, "");
    const cleanSellAmount = sellAmount.replace(/,/g, "");

    // Check validations before executing trade
    if (!checkSellAmountValidity(cleanSellAmount, sellCurrency)) {
      setSellAmountError(true);
      return;
    }

    if (
      !checkTradingLimit(
        cleanSellAmount,
        sellCurrency,
        cleanBuyAmount,
        buyCurrency
      )
    ) {
      setTradingLimitError(true);
      return;
    }

    const trade: Trade = {
      id: Date.now().toString(),
      purchasedCurrency: buyCurrency,
      purchasedAmount: Number(cleanBuyAmount),
      soldCurrency: sellCurrency,
      soldAmount: Number(cleanSellAmount),
      exchangeRate: getRate(),
      timestamp: new Date(),
      placedBy: "Current User",
    };

    onTradeExecuted(trade);

    // Reset nudge when trade is executed
    resetNudge();

    // Reset to new values for next trade
    setBuyAmount("0");
    setSellAmount("0");
    setBuyInputValue("");
    setSellInputValue("");
    setIsBuyFocused(false);
    setIsSellFocused(false);
    setIsBuyFreeEditing(false);
    setIsSellFreeEditing(false);
    setLastEditedField(null);
    setSellAmountError(false);
    setTradingLimitError(false);
  };

  const openCurrencyModal = (type: "buy" | "sell") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeCurrencyModal = () => {
    setIsModalOpen(false);
  };

  // Bookmark handlers
  const handleBookmarkToggle = () => {
    toggleBookmark(sellCurrency, buyCurrency);
  };

  const startExecuteCooldown = () => {
    if (executeCooldownTimerRef.current) {
      clearTimeout(executeCooldownTimerRef.current);
    }

    setIsExecuteCooldownActive(true);

    executeCooldownTimerRef.current = setTimeout(() => {
      setIsExecuteCooldownActive(false);
      executeCooldownTimerRef.current = null;
    }, 3000);
  };

  // Main button click handler
  const handleButtonClick = () => {
    // If no active quote, trigger shake animation on buy field
    if (!hasActiveQuote) {
      buyInputRef.current?.focus();
      setIsBuyFieldShaking(true);
      setTimeout(() => setIsBuyFieldShaking(false), 400);
      return;
    }

    // Has active quote - proceed with execute or refresh
    if (isExpired) {
      handleRefreshQuote();
    } else {
      executeTrade();
    }
  };

  // Quote handlers
  const handleRefreshQuote = () => {
    startExecuteCooldown();
    // Reset nudge when refreshing quote
    resetNudge();

    // Determine which field to recalculate based on last edited field
    if (lastEditedField === "buy") {
      // User last edited buy field, so recalculate sell amount
      setIsShimmeringSell(true);
      setTimeout(async () => {
        const cleanBuyAmount = buyAmount.replace(/,/g, "");
        const buyAmountNum = Number(cleanBuyAmount);

        if (!isNaN(buyAmountNum) && buyAmountNum > 0) {
          // Calculate equivalent sell amount with new rate
          const equivalentSellAmount = await convertCurrency(
            buyAmountNum,
            buyCurrency,
            sellCurrency,
            "sell"
          );
          const sellCurrency_info = getCurrencyByCode(sellCurrency);
          const precision = sellCurrency_info?.precision || 2;
          const newSellAmount = equivalentSellAmount.toFixed(precision);
          const sellAmountNumeric = Number(newSellAmount);
          setSellAmount(newSellAmount);

          // Check balance validation
          const isSellValid = await checkSellAmountValidity(
            newSellAmount,
            sellCurrency
          );
          setSellAmountError(!isSellValid);

          // Check trading limit validation
          const isWithinLimit = await checkTradingLimit(
            newSellAmount,
            sellCurrency,
            cleanBuyAmount,
            buyCurrency
          );
          setTradingLimitError(!isWithinLimit);
          updatePairFromQuote(
            buyCurrency,
            sellCurrency,
            buyAmountNum,
            sellAmountNumeric
          );
        } else {
          updateExchangeRateAndPair();
        }
        setIsShimmeringSell(false);
        // Exit free edit mode after quote refresh
        setIsBuyFreeEditing(false);
        setBuyInputValue("");
        // Reset quote timer after new quote is presented to user
        startTimer();
        startNudgeTimer();
      }, 1200);
    } else if (lastEditedField === "sell") {
      // User last edited sell field, so recalculate buy amount
      setIsShimmeringBuy(true);
      setTimeout(async () => {
        const cleanSellAmount = sellAmount.replace(/,/g, "");
        const sellAmountNum = Number(cleanSellAmount);

        if (!isNaN(sellAmountNum) && sellAmountNum > 0) {
          // Calculate equivalent buy amount with new rate
          const equivalentBuyAmount = await convertCurrency(
            sellAmountNum,
            sellCurrency,
            buyCurrency,
            "buy"
          );
          const buyCurrency_info = getCurrencyByCode(buyCurrency);
          const precision = buyCurrency_info?.precision || 2;
          const newBuyAmount = equivalentBuyAmount.toFixed(precision);
          const buyAmountNumeric = Number(newBuyAmount);
          setBuyAmount(newBuyAmount);

          // Check balance validation
          const isSellValid = await checkSellAmountValidity(
            cleanSellAmount,
            sellCurrency
          );
          setSellAmountError(!isSellValid);

          // Check trading limit validation
          const isWithinLimit = await checkTradingLimit(
            cleanSellAmount,
            sellCurrency,
            equivalentBuyAmount.toFixed(precision),
            buyCurrency
          );
          setTradingLimitError(!isWithinLimit);
          updatePairFromQuote(
            buyCurrency,
            sellCurrency,
            buyAmountNumeric,
            sellAmountNum
          );
        } else {
          updateExchangeRateAndPair();
        }
        setIsShimmeringBuy(false);
        // Exit free edit mode after quote refresh
        setIsSellFreeEditing(false);
        setSellInputValue("");
        // Reset quote timer after new quote is presented to user
        startTimer();
        startNudgeTimer();
      }, 1200);
    } else {
      // No last edited field, just reset timer with new rate
      updateExchangeRateAndPair();
      startTimer();
      startNudgeTimer();
    }
  };

  const handleSelectBookmarkedPair = (pair: any) => {
    setSellCurrency(pair.fromCurrency);
    setBuyCurrency(pair.toCurrency);
    setCurrentPair(pair.id);
    // Reset amounts when switching pairs
    setBuyAmount("0");
    setSellAmount("0");
  };

  // Sync current pair with bookmark system when currencies change
  useEffect(() => {
    const currentPair = getCurrentPair();
    const currentPairId = `${sellCurrency}-${buyCurrency}`;

    if (currentPair) {
      // If we have a current bookmark pair, check if it still matches
      if (
        currentPair.fromCurrency !== sellCurrency ||
        currentPair.toCurrency !== buyCurrency
      ) {
        // User changed currencies manually - exit bookmark state
        clearCurrentPair();
      }
    } else {
      // If no current bookmark, check if current pair should be bookmarked
      const isCurrentPairBookmarked = bookmarks.some(
        (b) => b.id === currentPairId
      );
      if (isCurrentPairBookmarked) {
        setCurrentPair(currentPairId);
      }
    }
  }, [sellCurrency, buyCurrency, bookmarks, getCurrentPair]);

  // Set initial exchange rate on component mount
  useEffect(() => {
    updateExchangeRateAndPair();
  }, []);

  // Start quote timer when currencies change
  useEffect(() => {
    // Skip if we're in the middle of a swap - swap handles everything itself
    if (isSwapping) {
      return;
    }

    // Set stable exchange rate when currencies change
    updateExchangeRateAndPair();
    startTimer();
    startNudgeTimer();

    const sideToPreserve = lastEditedField ?? lastCurrencyChangedSide;
    if (!sideToPreserve) {
      // Nothing to preserve (e.g., initial load)
      setLastCurrencyChangedSide(null);
      return;
    }

    let isCancelled = false;

    const recalculateAmounts = async () => {
      if (
        sideToPreserve === "buy" &&
        buyAmount !== "0" &&
        buyAmount !== ""
      ) {
        // User last interacted with buy side → keep buy amount, recalc sell
        const cleanBuyAmount = buyAmount.replace(/,/g, "");
        const buyAmountNum = Number(cleanBuyAmount);

        if (!isNaN(buyAmountNum) && buyAmountNum > 0) {
          setIsShimmeringSell(true);
          const equivalentSellAmount = await convertCurrency(
            buyAmountNum,
            buyCurrency,
            sellCurrency,
            "sell"
          );

          if (isCancelled) {
            return;
          }

          const sellCurrencyInfo = getCurrencyByCode(sellCurrency);
          const precision = sellCurrencyInfo?.precision || 2;
          const newSellAmount = equivalentSellAmount.toFixed(precision);
          const sellAmountNumeric = Number(newSellAmount);
          setSellAmount(newSellAmount);
          setIsShimmeringSell(false);

          updatePairFromQuote(
            buyCurrency,
            sellCurrency,
            buyAmountNum,
            sellAmountNumeric
          );
        }
      } else if (
        sideToPreserve === "sell" &&
        sellAmount !== "0" &&
        sellAmount !== ""
      ) {
        // User last interacted with sell side → keep sell amount, recalc buy
        const cleanSellAmount = sellAmount.replace(/,/g, "");
        const sellAmountNum = Number(cleanSellAmount);

        if (!isNaN(sellAmountNum) && sellAmountNum > 0) {
          setIsShimmeringBuy(true);
          const equivalentBuyAmount = await convertCurrency(
            sellAmountNum,
            sellCurrency,
            buyCurrency,
            "buy"
          );

          if (isCancelled) {
            return;
          }

          const buyCurrencyInfo = getCurrencyByCode(buyCurrency);
          const precision = buyCurrencyInfo?.precision || 2;
          const newBuyAmount = equivalentBuyAmount.toFixed(precision);
          const buyAmountNumeric = Number(newBuyAmount);
          setBuyAmount(newBuyAmount);
          setIsShimmeringBuy(false);

          updatePairFromQuote(
            buyCurrency,
            sellCurrency,
            buyAmountNumeric,
            sellAmountNum
          );
        }
      }

      if (!isCancelled) {
        setLastCurrencyChangedSide(null);
      }
    };

    recalculateAmounts();

    return () => {
      isCancelled = true;
      setIsShimmeringBuy(false);
      setIsShimmeringSell(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // Note: Intentionally not including amounts - we want current values when currencies change
  }, [sellCurrency, buyCurrency, isSwapping]);

  const handleCurrencySelection = (currencyCode: string) => {
    // Check if selected currency matches opposite side
    const oppositeCurrency = modalType === "buy" ? sellCurrency : buyCurrency;

    // If selecting same currency as opposite side AND opposite side is not empty, swap
    if (currencyCode === oppositeCurrency && oppositeCurrency !== "") {
      swapCurrencies();
      setLastCurrencyChangedSide(null); // Swap is a special case
    } else {
      // Normal selection - track which side changed
      if (modalType === "buy") {
        setBuyCurrency(currencyCode);
        setLastCurrencyChangedSide("buy");
      } else {
        setSellCurrency(currencyCode);
        setLastCurrencyChangedSide("sell");
      }
    }

    closeCurrencyModal();
  };

  const handleNonSwappableClick = (currencyCode: string) => {
    // Handle click on non-swappable currency
    // For now, just log - could show a toast/error message in future
    console.log(`Cannot swap with ${currencyCode} - pair not supported`);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-[32px] sm:mt-[64px]">
      {/* Bookmark Tabs */}
      <BookmarkTabs
        bookmarks={bookmarks}
        currentPairId={currentPairId}
        onSelectPair={handleSelectBookmarkedPair}
      />

      {/* Main Widget Container - wraps all trade widget content */}
      <div
        className={`relative space-y-1 transition-all duration-500 ease-in-out ${
          bookmarks.length > 0 ? "mt-0" : "mt-[-60px]"
        }`}
      >

        <div className={`relative space-y-1`}>
          {/* BUY Section */}
          <div
            className={`relative rounded-[12px] p-4 sm:p-6 shadow-lg cursor-text before:absolute before:inset-0 before:rounded-[12px] before:bg-white before:opacity-0 before:transition-opacity before:duration-200 before:pointer-events-none transition-all duration-100 ease-in-out ${
              isBuyKeyboardFocused
                ? "before:!opacity-[0.03]"
                : "hover:before:opacity-[0.03]"
            } ${isBuyFieldShaking ? "mac-shake" : ""}`}
            style={{
              background: `radial-gradient(ellipse at bottom, 
              rgba(25,119,80,1) -55%, 
              rgba(26,73,54,1) 5.8%, 
              rgba(27,51,41,1) 28%, 
              rgba(28,28,28,1) 40%)`,
            }}
            onClick={() => buyInputRef.current?.focus()}
          >
            {/* Expired Overlay - only when a quote exists and is expired */}
            <div
              className={`absolute inset-0 rounded-[12px] bg-[rgba(28,28,28,1)] transition-opacity duration-500 ease-in-out pointer-events-none z-10 ${
                hasActiveQuote && isExpired ? "opacity-100" : "opacity-0"
              }`}
            />
            {/* Bookmark Button - positioned relative to buy section */}
            <div className="absolute top-[62px] right-[-52px] z-10 group">
              <button
                onClick={
                  bookmarks.length >= 4 &&
                  !isBookmarked(sellCurrency, buyCurrency)
                    ? undefined
                    : handleBookmarkToggle
                }
                disabled={
                  bookmarks.length >= 4 &&
                  !isBookmarked(sellCurrency, buyCurrency)
                }
                className={`
                p-2 rounded-lg transition-all duration-100 relative
                ${
                  bookmarks.length >= 4 &&
                  !isBookmarked(sellCurrency, buyCurrency)
                    ? "bg-gray-100 cursor-not-allowed opacity-60"
                    : "bg-white hover:bg-gray-100 cursor-pointer"
                }
              `}
              >
                {isBookmarked(sellCurrency, buyCurrency) ? (
                  <BookmarkFilledIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                ) : (
                  <BookmarkOutlineIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
                )}
              </button>

              {/* Tooltip for disabled state */}
              {bookmarks.length >= 4 &&
                !isBookmarked(sellCurrency, buyCurrency) && (
                  <div className="absolute right-[-120px] mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    <p className="text-[13px] font-medium leading-[18px] text-[var(--color-gray-700)]">
                      You can bookmark <br />
                      upto 4 buy and sell pairs
                    </p>
                  </div>
                )}
            </div>

            <div className="space-y-1 sm:space-y-2 relative z-20">
              <div className="text-[14px] text-[#00ffdc] font-[600] uppercase tracking-widest">
                BUY
              </div>

              <div className="flex items-center justify-between">
                <ShimmerText
                  isShimmering={isShimmeringBuy}
                  className="flex-1"
                  textValue={getDisplayValue(
                    buyAmount,
                    buyCurrency,
                    isBuyFocused,
                    buyInputValue,
                    isBuyFreeEditing
                  )}
                  placeholderText="Fetching quote..."
                >
                  <Input
                    ref={buyInputRef}
                    value={getDisplayValue(
                      buyAmount,
                      buyCurrency,
                      isBuyFocused,
                      buyInputValue,
                      isBuyFreeEditing
                    )}
                    onChange={(e) => handleBuyAmountChange(e.target.value)}
                    onKeyDown={(e) => {
                      setLastKeyPressed(e.key);
                      setCursorBeforeKeypress(
                        e.currentTarget.selectionStart || 0
                      );
                      console.log(
                        "🔑 Key pressed on buy field:",
                        e.key,
                        "cursor at:",
                        e.currentTarget.selectionStart
                      );
                    }}
                    onFocus={handleBuyFocus}
                    onBlur={handleBuyBlur}
                    inputMode="decimal"
                    className="!text-[32px] border-none bg-transparent px-0 text-white !font-normal !leading-[36px] flex-1 h-auto py-2 !outline-none !ring-0 focus:!outline-none focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0 placeholder:text-[#7b7b7b]"
                    placeholder="100-10,000,000"
                  />
                </ShimmerText>

                {/* Currency Selector - Hidden on mobile, positioned absolutely on desktop */}
                <div className="hidden sm:block absolute right-0 top-[calc(40%+4px)] -translate-y-1/2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openCurrencyModal("buy");
                    }}
                    className="backdrop-blur-sm bg-white/[0.08] border border-white/10 rounded-[12px] px-2 py-3 flex items-center gap-1 w-[225px] justify-end hover:bg-white/[0.12] transition-colors cursor-pointer bg-[rgba(255,255,255,0.05)] mt-[0px] mr-[-8px] mb-[0px] ml-[0px]"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="text-right min-w-0 flex-1">
                        {buyCurrency ? (
                          <>
                            <div className="text-[13px] text-white font-[600] uppercase leading-[16px]">
                              {buyCurrency}
                            </div>
                            <div className="text-[13px] text-[#bbbbbb] font-normal leading-[16px] truncate max-w-[140px] overflow-hidden">
                              {getCurrencyInfo(buyCurrency).name}
                            </div>
                          </>
                        ) : (
                          <div className="text-[13px] text-[#bbbbbb] font-normal leading-[16px]">
                            {getCurrencyInfo(buyCurrency).name}
                          </div>
                        )}
                      </div>
                      {getCurrencyInfo(buyCurrency).flag ? getCurrencyInfo(buyCurrency).flag : <div className="size-8 shrink-0" />}
                    </div>
                    <ChevronDown className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Mobile Currency Selector - Positioned between input and balance info */}
              <div className="block sm:hidden pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openCurrencyModal("buy");
                  }}
                  className="backdrop-blur-sm bg-white/[0.08] border border-white/10 rounded-[12px] px-3 py-2.5 flex items-center gap-3 w-full hover:bg-white/[0.12] transition-colors cursor-pointer bg-[rgba(255,255,255,0.05)]"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {getCurrencyInfo(buyCurrency).flag ? getCurrencyInfo(buyCurrency).flag : <div className="size-8 shrink-0" />}
                    <div className="text-left min-w-0 flex-1">
                      {buyCurrency ? (
                        <>
                          <div className="text-[13px] text-white font-[600] uppercase leading-[16px]">
                            {buyCurrency}
                          </div>
                          <div className="text-[13px] text-[#bbbbbb] font-normal leading-[16px] truncate overflow-hidden">
                            {getCurrencyInfo(buyCurrency).name}
                          </div>
                        </>
                      ) : (
                        <div className="text-[13px] text-[#bbbbbb] font-normal leading-[16px]">
                          {getCurrencyInfo(buyCurrency).name}
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-white" />
                </button>
              </div>

              <div className="pt-1 sm:pt-4">
                <div className="flex items-center tracking-normal justify-between text-[13px] font-medium text-[#bbbbbb]">
                  <span className="flex items-center gap-2">
                    {formatHumanReadable(buyAmount, buyCurrency) || "You buy"}
                    {showBuyMinTradeError && (
                      <span className="text-[rgba(242,120,119,1)] text-[11px] font-medium">
                        Trades below 100 {buyCurrency} are not allowed
                      </span>
                    )}
                  </span>
                  <span className="text-right">
                    {buyCurrency} balance:{" "}
                    <span className="text-[#fcfcfc] font-normal">
                      {formatBalance(balances[buyCurrency] || 0, buyCurrency)}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SELL Section */}
          <div
            className={`relative rounded-[12px] p-4 sm:p-6 shadow-lg cursor-text before:absolute before:inset-0 before:rounded-[12px] before:bg-white before:opacity-0 before:transition-opacity before:duration-200 before:pointer-events-none transition-all duration-100 ease-in-out ${
              isSellKeyboardFocused
                ? "before:!opacity-[0.03]"
                : "hover:before:opacity-[0.03]"
            }`}
            style={{
              background: `radial-gradient(ellipse at top, 
              rgba(29,51,125,1) -25%, 
              rgba(29,40,76,1) 16.8%, 
              rgba(28,34,52,1) 37.7%, 
              rgba(28,28,28,1) 58.6%)`,
            }}
            onClick={() => sellInputRef.current?.focus()}
          >
            {/* Expired Overlay - only when a quote exists and is expired */}
            <div
              className={`absolute inset-0 rounded-[12px] bg-[rgba(28,28,28,1)] transition-opacity duration-500 ease-in-out pointer-events-none z-10 ${
                hasActiveQuote && isExpired ? "opacity-100" : "opacity-0"
              }`}
            />
            <div className="space-y-1 sm:space-y-2 relative z-20">
              <div className="text-[14px] text-[#a1c6ff] font-[600] uppercase tracking-widest">
                SELL
              </div>

              <div className="flex items-center justify-between">
                <ShimmerText
                  isShimmering={isShimmeringSell}
                  className="flex-1"
                  textValue={getDisplayValue(
                    sellAmount,
                    sellCurrency,
                    isSellFocused,
                    sellInputValue,
                    isSellFreeEditing
                  )}
                  placeholderText="Fetching quote..."
                >
                  <Input
                    ref={sellInputRef}
                    value={getDisplayValue(
                      sellAmount,
                      sellCurrency,
                      isSellFocused,
                      sellInputValue,
                      isSellFreeEditing
                    )}
                    onChange={(e) => handleSellAmountChange(e.target.value)}
                    onKeyDown={(e) => {
                      setLastKeyPressed(e.key);
                      setCursorBeforeKeypress(
                        e.currentTarget.selectionStart || 0
                      );
                      console.log(
                        "🔑 Key pressed on sell field:",
                        e.key,
                        "cursor at:",
                        e.currentTarget.selectionStart
                      );
                    }}
                    onFocus={handleSellFocus}
                    onBlur={handleSellBlur}
                    inputMode="decimal"
                    className={`!text-[32px] border-none bg-transparent px-0 !font-normal !leading-[36px] flex-1 h-auto py-2 !outline-none !ring-0 focus:!outline-none focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0 placeholder:text-[#7b7b7b] ${
                      sellAmountError ? "text-destructive" : "text-white"
                    }`}
                    placeholder="100-10,000,000"
                  />
                </ShimmerText>

                {/* Currency Selector - Hidden on mobile, positioned absolutely on desktop */}
                <div className="hidden sm:block absolute right-0 top-[calc(40%+4px)] -translate-y-1/2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openCurrencyModal("sell");
                    }}
                    className="backdrop-blur-sm bg-white/[0.08] border border-white/10 rounded-[12px] px-2 py-3 flex items-center gap-1 w-[225px] justify-end hover:bg-white/[0.12] transition-colors cursor-pointer bg-[rgba(255,255,255,0.05)] mt-[0px] mr-[-8px] mb-[0px] ml-[0px]"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="text-right min-w-0 flex-1">
                        {sellCurrency ? (
                          <>
                            <div className="text-[13px] text-white font-[600] uppercase leading-[16px]">
                              {sellCurrency}
                            </div>
                            <div className="text-[13px] text-[#bbbbbb] font-normal leading-[16px] truncate max-w-[140px] overflow-hidden">
                              {getCurrencyInfo(sellCurrency).name}
                            </div>
                          </>
                        ) : (
                          <div className="text-[13px] text-[#bbbbbb] font-normal leading-[16px]">
                            {getCurrencyInfo(sellCurrency).name}
                          </div>
                        )}
                      </div>
                      {getCurrencyInfo(sellCurrency).flag ? getCurrencyInfo(sellCurrency).flag : <div className="size-8 shrink-0" />}
                    </div>
                    <ChevronDown className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Mobile Currency Selector - Positioned between input and balance info */}
              <div className="block sm:hidden pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openCurrencyModal("sell");
                  }}
                  className="backdrop-blur-sm bg-white/[0.08] border border-white/10 rounded-[12px] px-3 py-2.5 flex items-center gap-3 w-full hover:bg-white/[0.12] transition-colors cursor-pointer bg-[rgba(255,255,255,0.05)]"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {getCurrencyInfo(sellCurrency).flag ? getCurrencyInfo(sellCurrency).flag : <div className="size-8 shrink-0" />}
                    <div className="text-left min-w-0 flex-1">
                      {sellCurrency ? (
                        <>
                          <div className="text-[13px] text-white font-[600] uppercase leading-[16px]">
                            {sellCurrency}
                          </div>
                          <div className="text-[13px] text-[#bbbbbb] font-normal leading-[16px] truncate overflow-hidden">
                            {getCurrencyInfo(sellCurrency).name}
                          </div>
                        </>
                      ) : (
                        <div className="text-[13px] text-[#bbbbbb] font-normal leading-[16px]">
                          {getCurrencyInfo(sellCurrency).name}
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-white" />
                </button>
              </div>

              <div className="pt-1 sm:pt-4">
                <div className="flex items-center tracking-normal justify-between text-[13px] font-medium text-[#bbbbbb]">
                  <span className="flex items-center gap-2">
                    {formatHumanReadable(sellAmount, sellCurrency) ||
                      "You sell"}
                    {sellAmountError && (
                      <span className="text-[rgba(242,120,119,1)] text-[13px] font-medium">
                        Exceeds your {sellCurrency} balance and credit
                      </span>
                    )}
                    {showSellMinTradeError && (
                      <span className="text-[rgba(242,120,119,1)] text-[11px] font-medium">
                        Trades below 100 {sellCurrency} are not allowed
                      </span>
                    )}
                  </span>
                  <span className="text-right">
                    {sellCurrency} balance:{" "}
                    <span className="text-[#fcfcfc] font-medium">
                      {formatBalance(balances[sellCurrency] || 0, sellCurrency)}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Swap Button - positioned between BUY and SELL widgets */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <Button
              variant="outline"
              size="sm"
              onClick={swapCurrencies}
              className="rounded-full p-4 !px-4 h-9 w-9 bg-white border-[3px] border-[#d7d7d7] shadow-lg hover:bg-gray-100"
            >
              <ArrowUpDown className="h-4.5 w-4.5 text-[#202020]" />
            </Button>
          </div>
        </div>

        {/* Available Credit + Available to Sell Section */}
        <div className="bg-[rgba(237,237,237,0.5)] border border-[#f0f0f0] rounded-bl-[12px] rounded-br-[12px] px-3 sm:px-4 pt-3 pb-3 sm:pt-5 sm:pb-4 -mt-3">
          <div className="flex items-start justify-between">
            {/* Left column — Available credit */}
            {(() => {
              const chinCreditAvailable = model === 'C'
                ? (totals?.availableCredit ?? creditLimit)
                : (totals?.creditRemaining ?? creditLimit);
              const chinCreditCapacity = model === 'C'
                ? creditLimit
                : (totals?.totalCapacity ?? creditLimit);

              const formatCompact = (v: number) => {
                if (v >= 1_000_000_000) return `${(v / 1_000_000_000).toFixed(v % 1_000_000_000 === 0 ? 0 : 1)}B`;
                if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(v % 1_000_000 === 0 ? 0 : 1)}M`;
                if (v >= 1_000) return `${(v / 1_000).toFixed(v % 1_000 === 0 ? 0 : 1)}K`;
                return v.toLocaleString();
              };

              return (
                <div>
                  <div
                    className="flex items-center gap-1 group cursor-pointer relative"
                    onMouseEnter={() => {
                      setIsTooltipVisible(true);
                    }}
                    onMouseLeave={() => {
                      setIsTooltipVisible(false);
                    }}
                  >
                    <span className="text-[13px] text-[#7b7b7b] font-medium leading-[16px] underline decoration-2 decoration-dotted decoration-[#adadad] [text-underline-offset:25%] group-hover:text-black group-hover:decoration-black transition-colors duration-200">
                      Available credit
                    </span>
                    <CreditTooltip
                      isVisible={isTooltipVisible}
                      creditLimit={creditLimit}
                      creditAvailable={chinCreditAvailable}
                      creditCapacity={chinCreditCapacity}
                    />
                  </div>
                  <div className="text-[13px] text-[#999999] mt-1">
                    <span className="text-[#1c1c1c] !font-semibold">
                      $ {chinCreditAvailable >= 1000 ? formatCompact(Math.round(chinCreditAvailable)) : chinCreditAvailable.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span className="!font-medium"> / {formatCompact(Math.round(chinCreditCapacity))}</span>
                  </div>
                </div>
              );
            })()}

            {/* Right column — Available to sell */}
            <div className="text-right">
              <div
                className="flex items-center justify-end gap-1 group cursor-pointer relative"
                onMouseEnter={() => setIsSellTooltipVisible(true)}
                onMouseLeave={() => setIsSellTooltipVisible(false)}
              >
                <span className="text-[13px] text-[#7b7b7b] font-medium leading-[16px] underline decoration-2 decoration-dotted decoration-[#adadad] [text-underline-offset:25%] group-hover:text-black group-hover:decoration-black transition-colors duration-200">
                  Available to sell
                </span>
                <AvailableToSellTooltip
                  isVisible={isSellTooltipVisible}
                  sellCurrency={sellCurrency}
                  balance={balances[sellCurrency] ?? 0}
                  creditInSellCurrency={creditInSellCurrency}
                  availableToSell={availableToSell}
                  formatBalance={formatBalance}
                />
              </div>
              <div className="text-[13px] mt-1">
                <span className="text-[#1c1c1c] font-semibold">{sellCurrency} </span>
                {(() => {
                  const formatted = formatBalance(availableToSell, sellCurrency);
                  const dotIndex = formatted.indexOf('.');
                  if (dotIndex === -1) {
                    return <span className="text-[#1c1c1c] font-semibold">{formatted}</span>;
                  }
                  return (
                    <>
                      <span className="text-[#1c1c1c] font-semibold">{formatted.slice(0, dotIndex)}</span>
                      <span className="text-[#999999] font-medium">{formatted.slice(dotIndex)}</span>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Rate and Execute Button */}
        <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
          <ConversionPriceQuoteTimer
            baseCurrency={getCurrentCurrencyPair().baseCurrency}
            quoteCurrency={getCurrentCurrencyPair().quoteCurrency}
            rate={getCurrentCurrencyPair().rate
              .toFixed(6)
              .replace(/\.?0+$/, "")}
            timeLeft={timeLeft}
            isExpired={isExpired}
            hasActiveQuote={hasActiveQuote}
            showLimitOrderNudge={showLimitOrderNudge}
            onLimitOrderClick={() => {
              setIsLimitOrderSheetOpen(true);
            }}
            initialDuration={15}
          />

          <Button
            onClick={handleButtonClick}
            disabled={
              isShimmeringBuy ||
              isShimmeringSell ||
              sellAmountError ||
              showBuyMinTradeError ||
              showSellMinTradeError ||
              isExecuteCooldownActive
            }
            className={`w-full text-[#f9f9f9] text-[13px] rounded-full px-[16px] py-[20px] flex items-center justify-center gap-2 transition duration-200 ${
              isFetchingQuote || isExecuteCooldownActive ? "shadow-none" : "shadow-sm"
            } ${
              isFetchingQuote
                ? "bg-[#D7F4E1] hover:bg-[#c5ebd3] border-none"
                : hasActiveQuote && isExpired
                ? "bg-[#3b82f6] hover:bg-[#2563eb] border border-[rgba(32,32,32,0.25)]"
                : "bg-[#1d895a] hover:bg-[#166547] border border-[rgba(32,32,32,0.25)]"
            } ${
              isExecuteCooldownActive
                ? "opacity-50 pointer-events-none border-none"
                : "disabled:bg-[#D7F4E1] disabled:cursor-not-allowed disabled:text-[#4CBB84] disabled:border-none disabled:shadow-none"
            }`}
            style={{ fontWeight: 600, minHeight: "48px" }}
          >
            <div
              className="flex items-center justify-center gap-2 relative"
              style={{ height: "20px" }}
            >
              <AnimatePresence mode="wait">
                {isShimmeringBuy || isShimmeringSell ? (
                  <motion.div
                    key="loading"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Loader2 className="h-4 w-4 animate-spin text-[#4CBB84] flex-shrink-0" />
                    <span className="text-[#4CBB84]" style={{ fontWeight: 600 }}>
                      Fetching quote...
                    </span>
                  </motion.div>
                ) : !hasActiveQuote ? (
                  <motion.div
                    key="get-quote"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex items-center justify-center gap-2"
                  >
                    <span style={{ fontWeight: 600 }}>Get quote</span>
                  </motion.div>
                ) : isExpired ? (
                  <motion.div
                    key="refresh"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex items-center justify-center gap-2"
                  >
                    <RefreshIcon className="h-4 w-4 text-[#4CBB84] flex-shrink-0" />
                    <span style={{ fontWeight: 600 }}>Refresh quote</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="execute"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex items-center justify-center gap-2"
                  >
                    <span style={{ fontWeight: 600 }}>Execute trade</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Button>
        </div>
      </div>

      <CurrencyModal
        isOpen={isModalOpen}
        onClose={closeCurrencyModal}
        onCurrencySelect={handleCurrencySelection}
        onNonSwappableClick={handleNonSwappableClick}
        type={modalType}
        oppositeCurrency={modalType === "buy" ? sellCurrency : buyCurrency}
        balances={balances}
        formatBalance={formatBalance}
        convertCurrency={convertCurrency}
      />

      <LimitOrderSheet
        isOpen={isLimitOrderSheetOpen}
        onClose={() => setIsLimitOrderSheetOpen(false)}
        baseCurrency={getCurrentCurrencyPair().baseCurrency}
        quoteCurrency={getCurrentCurrencyPair().quoteCurrency}
        currentMarketRate={getCurrentCurrencyPair().rate}
        buyAmount={buyAmount}
        sellAmount={sellAmount}
        buyCurrency={buyCurrency}
        sellCurrency={sellCurrency}
        balances={balances}
        formatBalance={formatBalance}
        onConfirm={(order) => {
          // TODO: Implement limit order placement logic
          console.log('Limit order confirmed:', order);
          setIsLimitOrderSheetOpen(false);
          // Reset nudge after placing order
          resetNudge();
        }}
      />
    </div>
  );
}
