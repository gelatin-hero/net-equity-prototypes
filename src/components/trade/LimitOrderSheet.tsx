import React, { useState, useEffect, useRef } from 'react';
import { NumericFormat, NumberFormatValues, SourceInfo } from 'react-number-format';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import 'number-flow';
import { Button } from '../ui-tw/button';
import { Input } from '../ui-tw/input';
import { getCurrencyFlag } from './CurrencyFlags';
import { getCurrencyByCode } from '../../constants/currencies';
import { ChevronDown, X, ArrowUpDown } from 'lucide-react';
import SwitchIcon from '../../assets/icons/switch.svg?react';
import PulseIcon from '../../assets/icons/pulse.svg?react';
import { ShimmerText } from './ShimmerText';

// Animated PulseIcon with pulsing fill
const AnimatedPulseIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      className={className} 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M4.78294 7.73474L6.00008 3.88046L9.20541 14.0307C9.45061 14.8073 10.5495 14.8073 10.7947 14.0307L12.4887 8.6666H14.6667C15.0349 8.6666 15.3334 8.36814 15.3334 7.99994C15.3334 7.63174 15.0349 7.33327 14.6667 7.33327H12.4887C11.9069 7.33327 11.3924 7.7104 11.2172 8.26507L10.0001 12.1194L6.79475 1.96911C6.54952 1.19259 5.45065 1.19259 5.20543 1.96911L3.51149 7.33327H1.33341C0.965228 7.33327 0.666748 7.63174 0.666748 7.99994C0.666748 8.36814 0.965228 8.6666 1.33341 8.6666H3.51149C4.09319 8.6666 4.60776 8.28947 4.78294 7.73474Z" 
        className="pulse-icon-fill"
      />
    </svg>
  );
};

interface LimitOrderSheetProps {
  isOpen: boolean;
  onClose: () => void;
  baseCurrency: string;
  quoteCurrency: string;
  currentMarketRate: number;
  buyAmount: string;
  sellAmount: string;
  buyCurrency: string;
  sellCurrency: string;
  balances: Record<string, number>;
  formatBalance: (amount: number, currencyCode: string) => string;
  onConfirm: (order: {
    limitPrice: number;
    buyAmount: string;
    sellAmount: string;
    buyCurrency: string;
    sellCurrency: string;
    expiryHours: number;
  }) => void;
}

type ExpiryOption = 1 | 6 | 12; // 1 hour, 6 hours, 12 hours

export function LimitOrderSheet({
  isOpen,
  onClose,
  baseCurrency,
  quoteCurrency,
  currentMarketRate,
  buyAmount: initialBuyAmount,
  sellAmount: initialSellAmount,
  buyCurrency: initialBuyCurrency,
  sellCurrency: initialSellCurrency,
  balances,
  formatBalance,
  onConfirm,
}: LimitOrderSheetProps) {
  // Limit price state (starts at current market rate)
  const [limitPrice, setLimitPrice] = useState<string>(currentMarketRate.toFixed(6).replace(/\.?0+$/, ''));
  
  // Amounts state
  const [buyAmount, setBuyAmount] = useState<string>(initialBuyAmount);
  const [sellAmount, setSellAmount] = useState<string>(initialSellAmount);
  
  // Currency state
  const [buyCurrency, setBuyCurrency] = useState<string>(initialBuyCurrency);
  const [sellCurrency, setSellCurrency] = useState<string>(initialSellCurrency);
  
  // Expiry state (required, defaults to 1 hour)
  const [selectedExpiry, setSelectedExpiry] = useState<ExpiryOption>(1);

  // Track which field was last edited to preserve it when limit price changes
  const [lastEditedField, setLastEditedField] = useState<'buy' | 'sell'>('buy');

  // Track which field is currently being edited (focused)
  const [isBuyFocused, setIsBuyFocused] = useState(false);
  const [isSellFocused, setIsSellFocused] = useState(false);

  // Refs to track cursor position
  const buyInputRef = useRef<HTMLInputElement>(null);
  const sellInputRef = useRef<HTMLInputElement>(null);
  
  // Ref for number-flow animation
  const limitPriceFlowRef = useRef<HTMLElement | null>(null);
  
  // Track if limit price input is focused (for showing input vs number-flow)
  const [isLimitPriceFocused, setIsLimitPriceFocused] = useState(false);
  
  // Track if update came from button click (for animation)
  const isButtonUpdateRef = useRef(false);

  // Track if rate is flipped (showing inverse rate)
  const [isRateFlipped, setIsRateFlipped] = useState(false);
  // Track the original rate before flipping (for unflipping)
  const originalRateRef = useRef<number>(currentMarketRate);

  // Update amounts when initial values change
  useEffect(() => {
    setBuyAmount(initialBuyAmount);
    setSellAmount(initialSellAmount);
  }, [initialBuyAmount, initialSellAmount]);

  // Update currencies when initial values change
  useEffect(() => {
    setBuyCurrency(initialBuyCurrency);
    setSellCurrency(initialSellCurrency);
  }, [initialBuyCurrency, initialSellCurrency]);

  // Update limit price when market rate changes
  useEffect(() => {
    setLimitPrice(currentMarketRate.toFixed(6).replace(/\.?0+$/, ''));
    setIsRateFlipped(false); // Reset flip state when market rate changes
    originalRateRef.current = currentMarketRate; // Update stored original rate
  }, [currentMarketRate]);

  // Configure number-flow format when sheet opens
  useEffect(() => {
    if (isOpen && limitPriceFlowRef.current) {
      // @ts-expect-error - custom element API
      limitPriceFlowRef.current.locales = 'en-US';
      // @ts-expect-error - custom element API
      limitPriceFlowRef.current.format = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 6,
        useGrouping: false,
      };
      // Initialize with current limitPrice or market rate
      const numValue = limitPrice && !isNaN(Number(limitPrice)) && Number(limitPrice) > 0
        ? Number(limitPrice)
        : currentMarketRate;
      // @ts-expect-error - custom element API
      limitPriceFlowRef.current.update(numValue);
    }
  }, [isOpen, limitPrice, currentMarketRate]);

  // Update number-flow when limitPrice changes (but only when not focused to avoid conflicts)
  useEffect(() => {
    if (limitPriceFlowRef.current && !isLimitPriceFocused) {
      // Always use a valid number - if limitPrice is empty/invalid, use market rate
      const numValue = limitPrice && !isNaN(Number(limitPrice)) && Number(limitPrice) > 0 
        ? Number(limitPrice) 
        : currentMarketRate;
      // @ts-expect-error - custom element API
      limitPriceFlowRef.current.update(numValue);
    }
  }, [limitPrice, isLimitPriceFocused, currentMarketRate]);

  // Handle blur - sync number-flow with current value
  const handleLimitPriceBlur = () => {
    setIsLimitPriceFocused(false);
    // Sync number-flow with the typed value, using market rate as fallback if empty/invalid
    if (limitPriceFlowRef.current) {
      const numValue = limitPrice && !isNaN(Number(limitPrice)) && Number(limitPrice) > 0 
        ? Number(limitPrice) 
        : currentMarketRate;
      // @ts-expect-error - custom element API
      limitPriceFlowRef.current.update(numValue);
    }
    // If limitPrice is empty/invalid, reset it to market rate
    if (!limitPrice || isNaN(Number(limitPrice)) || Number(limitPrice) <= 0) {
      const marketRateStr = currentMarketRate.toFixed(6).replace(/\.?0+$/, '');
      setLimitPrice(marketRateStr);
      recalculateAmounts(marketRateStr);
    }
  };

  // Handle reset to market rate
  const handleResetToMarketRate = () => {
    const marketRateStr = currentMarketRate.toFixed(6).replace(/\.?0+$/, '');
    setLimitPrice(marketRateStr);
    setIsRateFlipped(false); // Reset flip state
    originalRateRef.current = currentMarketRate; // Reset stored original rate
    recalculateAmounts(marketRateStr);
    
    // Update number-flow with animation
    if (limitPriceFlowRef.current) {
      // @ts-expect-error - custom element API
      limitPriceFlowRef.current.update(currentMarketRate);
    }
  };

  // Recalculate amounts based on new limit price and last edited field
  const recalculateAmounts = (newLimitPrice: string) => {
    const limitPriceNum = Number(newLimitPrice);
    if (!newLimitPrice || isNaN(limitPriceNum) || limitPriceNum <= 0) {
      return;
    }

    // When flipped, limitPrice represents the inverse rate (quote/base)
    // When not flipped, limitPrice represents the normal rate (base/quote)
    const effectiveRate = isRateFlipped ? limitPriceNum : limitPriceNum;

    if (lastEditedField === 'buy') {
      // Keep buy amount, recalculate sell amount
      const buyAmountNum = Number(buyAmount.replace(/,/g, ''));
      if (!isNaN(buyAmountNum) && buyAmountNum > 0) {
        // If flipped: sellAmount = buyAmount / limitPrice (because limitPrice is inverse)
        // If not flipped: sellAmount = buyAmount * limitPrice
        const sellAmountNum = isRateFlipped 
          ? buyAmountNum / effectiveRate 
          : buyAmountNum * effectiveRate;
        const sellCurrencyInfo = getCurrencyByCode(sellCurrency);
        const precision = sellCurrencyInfo?.precision || 2;
        setSellAmount(sellAmountNum.toFixed(precision));
      }
    } else {
      // Keep sell amount, recalculate buy amount
      const sellAmountNum = Number(sellAmount.replace(/,/g, ''));
      if (!isNaN(sellAmountNum) && sellAmountNum > 0) {
        // If flipped: buyAmount = sellAmount * limitPrice (because limitPrice is inverse)
        // If not flipped: buyAmount = sellAmount / limitPrice
        const buyAmountNum = isRateFlipped 
          ? sellAmountNum * effectiveRate 
          : sellAmountNum / effectiveRate;
        const buyCurrencyInfo = getCurrencyByCode(buyCurrency);
        const precision = buyCurrencyInfo?.precision || 2;
        setBuyAmount(buyAmountNum.toFixed(precision));
      }
    }
  };

  // Handle percentage adjustment chips (with number-flow animation)
  const handlePercentageAdjust = (percentage: number) => {
    // Get the current displayed rate
    const currentDisplayedRate = Number(limitPrice) || currentMarketRate;
    
    // Calculate adjustment based on current direction
    let adjustedPrice: number;
    if (isRateFlipped) {
      // If flipped, adjust the inverse rate
      const adjustment = currentDisplayedRate * (percentage / 100);
      adjustedPrice = currentDisplayedRate + adjustment;
    } else {
      // If not flipped, adjust the normal rate
      const adjustment = currentDisplayedRate * (percentage / 100);
      adjustedPrice = currentDisplayedRate + adjustment;
      // Update stored original rate
      originalRateRef.current = adjustedPrice;
    }
    
    const newPriceStr = adjustedPrice.toFixed(6).replace(/\.?0+$/, '');
    
    // Mark as button update for animation
    isButtonUpdateRef.current = true;
    
    // Update via number-flow ref for animation
    if (limitPriceFlowRef.current) {
      // @ts-expect-error - custom element API
      limitPriceFlowRef.current.update(adjustedPrice);
    }
    
    setLimitPrice(newPriceStr);
    recalculateAmounts(newPriceStr);
    
    // Reset flag after a short delay
    setTimeout(() => {
      isButtonUpdateRef.current = false;
    }, 100);
  };

  // Handle swap direction (flip the rate display only, don't change BUY/SELL amounts)
  const handleSwapDirection = () => {
    const currentDisplayedRate = Number(limitPrice) || currentMarketRate;
    
    if (!isRateFlipped) {
      // Flip: store original rate and show inverse
      originalRateRef.current = currentDisplayedRate;
      const inverseRate = 1 / currentDisplayedRate;
      const newPriceStr = inverseRate.toFixed(6).replace(/\.?0+$/, '');
      setIsRateFlipped(true);
      setLimitPrice(newPriceStr);
      
      // Update number-flow with animation
      if (limitPriceFlowRef.current) {
        // @ts-expect-error - custom element API
        limitPriceFlowRef.current.update(inverseRate);
      }
      
      // Don't recalculate amounts - keep BUY/SELL values the same
    } else {
      // Unflip: go back to original rate
      const originalRate = originalRateRef.current || (1 / currentDisplayedRate);
      const newPriceStr = originalRate.toFixed(6).replace(/\.?0+$/, '');
      setIsRateFlipped(false);
      setLimitPrice(newPriceStr);
      
      // Update number-flow with animation
      if (limitPriceFlowRef.current) {
        // @ts-expect-error - custom element API
        limitPriceFlowRef.current.update(originalRate);
      }
      
      // Don't recalculate amounts - keep BUY/SELL values the same
    }
  };

  // Handle limit price direct input
  const handleLimitPriceChange = (value: string) => {
    // Only allow valid number input
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setLimitPrice(value);
      recalculateAmounts(value);
    }
  };

  // Handle buy amount change
  const handleBuyAmountChange = ({ value }: NumberFormatValues, sourceInfo: SourceInfo) => {
    if (sourceInfo.source !== "event") return;
    setBuyAmount(value);
    setLastEditedField("buy");
    if (value && !isNaN(Number(value)) && Number(value) > 0 && Number(limitPrice) > 0) {
      const sellAmountNum = isRateFlipped
        ? Number(value) / Number(limitPrice)
        : Number(value) * Number(limitPrice);
      const sellCurrencyInfo = getCurrencyByCode(sellCurrency);
      const precision = sellCurrencyInfo?.precision || 2;
      setSellAmount(sellAmountNum.toFixed(precision));
    } else {
      setSellAmount("0");
    }
  };

  // Handle sell amount change
  const handleSellAmountChange = ({ value }: NumberFormatValues, sourceInfo: SourceInfo) => {
    if (sourceInfo.source !== "event") return;
    setSellAmount(value);
    setLastEditedField("sell");
    if (value && !isNaN(Number(value)) && Number(value) > 0 && Number(limitPrice) > 0) {
      const buyAmountNum = isRateFlipped
        ? Number(value) * Number(limitPrice)
        : Number(value) / Number(limitPrice);
      const buyCurrencyInfo = getCurrencyByCode(buyCurrency);
      const precision = buyCurrencyInfo?.precision || 2;
      setBuyAmount(buyAmountNum.toFixed(precision));
    } else {
      setBuyAmount("0");
    }
  };

  // Handle buy focus
  const handleBuyFocus = () => {
    setIsBuyFocused(true);
  };

  // Handle buy blur
  const handleBuyBlur = () => {
    setIsBuyFocused(false);
    const num = Number(buyAmount);
    if (!isNaN(num) && num >= 0) {
      const currency = getCurrencyByCode(buyCurrency);
      const precision = currency?.precision || 2;
      const formattedValue = num.toFixed(precision);

      // Only update state if the formatted value is different from current value
      if (Number(formattedValue) !== Number(buyAmount)) {
        setBuyAmount(formattedValue);
      }
    }
  };

  // Handle sell focus
  const handleSellFocus = () => {
    setIsSellFocused(true);
  };

  // Handle sell blur
  const handleSellBlur = () => {
    setIsSellFocused(false);
    const num = Number(sellAmount);
    if (!isNaN(num) && num >= 0) {
      const currency = getCurrencyByCode(sellCurrency);
      const precision = currency?.precision || 2;
      const formattedValue = num.toFixed(precision);

      // Only update state if the formatted value is different from current value
      if (Number(formattedValue) !== Number(sellAmount)) {
        setSellAmount(formattedValue);
      }
    }
  };

  // Format human-readable amount (matching CurrencyConverter implementation)
  const formatHumanReadable = (amount: string, currencyCode?: string) => {
    if (!amount || amount === "" || amount === "0") return "";
    const cleanAmount = typeof amount === "string" ? amount.replace(/,/g, "") : String(amount);
    const num = Number(cleanAmount);
    if (isNaN(num) || num === 0) return "";

    const currency = currencyCode ? getCurrencyByCode(currencyCode) : null;
    const basePrecision = currency?.precision || 2;

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
      if (num >= t.value) {
        const scaled = num / t.value;
        if (t.suffix === "M") {
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

    const truncated = truncateToDecimals(num, 4);
    return truncated.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });
  };

  // Get currency info (matching CurrencyConverter implementation)
  const getCurrencyInfo = (code: string): { flag: React.ReactElement | null; name: string } => {
    if (!code) {
      return {
        flag: null,
        name: "Select asset",
      };
    }

    const currency = getCurrencyByCode(code);
    return {
      flag: getCurrencyFlag(code),
      name: currency?.name || code,
    };
  };

  // Format amount with commas for display
  const formatAmount = (amount: string, currencyCode: string) => {
    if (!amount || amount === "" || amount === "0") return "";
    const num = Number(amount);
    if (isNaN(num) || num === 0) return "";

    const currency = getCurrencyByCode(currencyCode);
    const precision = currency?.precision || 2;

    return num.toLocaleString("en-US", {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
  };

  // Handle confirm
  const handleConfirm = () => {
    const limitPriceNum = Number(limitPrice);
    if (isNaN(limitPriceNum) || limitPriceNum <= 0) {
      return; // Invalid limit price
    }

    const buyAmountNum = Number(buyAmount.replace(/,/g, ''));
    const sellAmountNum = Number(sellAmount.replace(/,/g, ''));
    
    if (isNaN(buyAmountNum) || buyAmountNum <= 0 || isNaN(sellAmountNum) || sellAmountNum <= 0) {
      return; // Invalid amounts
    }

    onConfirm({
      limitPrice: limitPriceNum,
      buyAmount: buyAmount.replace(/,/g, ''),
      sellAmount: sellAmount.replace(/,/g, ''),
      buyCurrency,
      sellCurrency,
      expiryHours: selectedExpiry,
    });
  };

  const buyCurrencyInfo = getCurrencyInfo(buyCurrency);
  const sellCurrencyInfo = getCurrencyInfo(sellCurrency);
  const baseCurrencyInfo = getCurrencyInfo(baseCurrency);
  const quoteCurrencyInfo = getCurrencyInfo(quoteCurrency);

  // Determine displayed currencies based on flip state
  const displayedBaseCurrency = isRateFlipped ? quoteCurrency : baseCurrency;
  const displayedQuoteCurrency = isRateFlipped ? baseCurrency : quoteCurrency;
  const displayedBaseCurrencyInfo = getCurrencyInfo(displayedBaseCurrency);
  const displayedQuoteCurrencyInfo = getCurrencyInfo(displayedQuoteCurrency);

  return createPortal(
    <AnimatePresence initial={false} mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center overscroll-none"
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

          {/* Modal */}
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
            className="relative w-full max-w-[650px] mx-4 mb-4 h-[95vh] sm:h-[90vh] overflow-hidden"
          >
            <div className="bg-white rounded-[12px] shadow-2xl border-[#efefef] border-[0.5px] h-full flex flex-col overflow-hidden">
              {/* Header */}
              <div className="h-[66px] flex items-center justify-center relative shrink-0">
                <h2 className="!text-[20px] !font-medium text-[#1c1c1c]">
                  Setting up a limit order
                </h2>
                <button
                  onClick={onClose}
                  className="absolute right-[32px] top-1/2 -translate-y-1/2 bg-white border-[0.5px] border-[rgba(28,28,28,0.05)] p-[9px] rounded-[12px] shadow-[0px_0.5px_0px_0.4px_rgba(32,32,32,0.1)] hover:bg-[#f9f9f9] transition-colors cursor-pointer flex items-center justify-center"
                >
                  <X className="h-4 w-4 text-[#7b7b7b]" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col gap-3 px-8 pb-8 pt-0">
          {/* Limit Price Configuration Section */}
          <div className="bg-[rgba(244,244,244,0.25)] border-[0.3px] border-[rgba(28,28,28,0.15)] rounded-[12px] p-4 flex flex-col gap-2 items-center relative">
            {/* Percentage adjustment chips - positioned absolutely at center */}
            <div className="absolute left-1/2 top-[calc(50%-21px)] -translate-x-1/2 -translate-y-1/2 flex gap-[200px] items-center z-30 pointer-events-none">
              <button
                onClick={() => handlePercentageAdjust(-0.0025)}
                className="bg-white border-[0.5px] border-[rgba(28,28,28,0.15)] px-[8px] py-[6px] rounded-[20px] shadow-[0px_0.5px_1px_0.3px_rgba(32,32,32,0.15)] text-[12px] font-semibold text-grey-900 hover:bg-[#f5f5f5] transition-colors whitespace-nowrap pointer-events-auto"
              >
                - 0.25 bips
              </button>
              <button
                onClick={() => handlePercentageAdjust(0.0025)}
                className="bg-white border-[0.5px] border-[rgba(28,28,28,0.15)] px-[8px] py-[6px] rounded-[20px] shadow-[0px_0.5px_1px_0.3px_rgba(32,32,32,0.15)] text-[12px] font-semibold text-grey-900 hover:bg-[#f5f5f5] transition-colors whitespace-nowrap pointer-events-auto"
              >
                + 0.25 bips
              </button>
            </div>

            {/* Swap icon - positioned on the right */}
            <button
              onClick={handleSwapDirection}
              className="absolute right-[18.7px] top-[calc(50%-21px)] -translate-y-1/2 flex items-center justify-center w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity z-30 text-white"
            >
              <div className="rotate-[270deg] flex-none">
                <div className="relative w-7 h-7 text-white">
                  <div className="absolute inset-[0_-1.43%_-3.21%_-1.43%] bg-[#fcfcfc] border border-[#f2f2f2] rounded-full shadow-[0px_0.5px_1px_0.3px_rgba(32,32,32,0.15)] flex items-center justify-center">
                    <SwitchIcon className="w-[14px] h-[10px]" />
                  </div>
                </div>
              </div>
            </button>

            {/* "When 1 [base] is worth" */}
            <div className="flex items-center gap-2">
              <span className="!text-[16px] font-normal text-[#7b7b7b] leading-[24px]">When 1</span>
              <div className="flex items-center gap-1.5">
                {displayedBaseCurrencyInfo.flag && (
                  <div className="w-4 h-4 shrink-0 flex items-center justify-center overflow-hidden [&>*]:scale-[0.5] [&>*]:origin-center">
                    {displayedBaseCurrencyInfo.flag}
                  </div>
                )}
                <span className="!text-[16px] font-semibold text-[#1c1c1c] leading-[24px]">{displayedBaseCurrency}</span>
              </div>
              <span className="!text-[16px] font-normal text-[#7b7b7b] leading-[24px]">is worth</span>
            </div>

            {/* Large editable rate - full width, centered */}
            <div className="w-full relative z-10 h-[52px]">
              {/* Number-flow display (always rendered, shown when not focused) */}
              <div 
                className={`absolute inset-0 !text-[32px] text-[#1c1c1c] !font-normal !leading-[36px] !tracking-normal text-center py-2 w-full cursor-text flex items-center justify-center ${isLimitPriceFocused ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                onClick={() => {
                  // Focus the input when clicking on number-flow
                  const input = document.querySelector('[data-limit-price-input]') as HTMLInputElement;
                  input?.focus();
                }}
              >
                {React.createElement('number-flow' as any, {
                  ref: limitPriceFlowRef as unknown as React.Ref<any>,
                  style: {
                    ['--number-flow-mask-height' as any]: '.10em',
                    ['--number-flow-mask-width' as any]: '.10em',
                  },
                })}
              </div>
              {/* Input overlay (always present, shown when focused) */}
              <Input
                data-limit-price-input
                value={limitPrice}
                onChange={(e) => handleLimitPriceChange(e.target.value)}
                onFocus={() => setIsLimitPriceFocused(true)}
                onBlur={handleLimitPriceBlur}
                className={`absolute inset-0 !text-[32px] text-[#1c1c1c] !font-normal !leading-[36px] !tracking-normal text-center !py-2 !px-0 !h-full !w-full cursor-text !border-none !bg-transparent !outline-none !ring-0 !rounded-none focus:!outline-none focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0 focus-visible:!border-none placeholder:text-[#d0d0d0] z-10 !flex !items-center !justify-center ${isLimitPriceFocused ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                inputMode="decimal"
                placeholder="Enter target price"
              />
            </div>

            {/* Quote currency chip */}
            <div className="flex items-center gap-1.5">
              {displayedQuoteCurrencyInfo.flag && (
                <div className="w-4 h-4 shrink-0 flex items-center justify-center overflow-hidden [&>*]:scale-[0.5] [&>*]:origin-center">
                  {displayedQuoteCurrencyInfo.flag}
                </div>
              )}
              <span className="!text-[16px] font-semibold text-[#1c1c1c] leading-[24px]">{displayedQuoteCurrency}</span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#f0f0f0]" />

            {/* Current market rate */}
            <div 
              className="flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-opacity pt-2"
              onClick={handleResetToMarketRate}
            >
              <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                <AnimatedPulseIcon className="w-full h-full flex-shrink-0" />
              </div>
              <span className="text-[15px] font-medium leading-[18px] text-[var(--color-gray-700)]">
                Current market rate 1 {displayedBaseCurrency} = {isRateFlipped ? (1 / currentMarketRate).toFixed(6).replace(/\.?0+$/, '') : currentMarketRate.toFixed(6).replace(/\.?0+$/, '')} {displayedQuoteCurrency}
              </span>
            </div>
          </div>

          {/* Buy/Sell Sections */}
          <div className="relative space-y-1">
            {/* BUY Section */}
            <div
              className="relative rounded-[12px] p-4 sm:p-6 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),0px_10px_15px_-3px_rgba(0,0,0,0.1)] cursor-text before:absolute before:inset-0 before:rounded-[12px] before:bg-white before:opacity-0 before:transition-opacity before:duration-200 before:pointer-events-none transition-all duration-100 ease-in-out hover:before:opacity-[0.03]"
              style={{
                background: `radial-gradient(ellipse at bottom,
                rgba(25,119,80,1) -55%,
                rgba(26,73,54,1) 5.8%,
                rgba(27,51,41,1) 28%,
                rgba(28,28,28,1) 40%)`,
              }}
              onClick={() => buyInputRef.current?.focus()}
            >
              <div className="space-y-1 sm:space-y-2 relative z-20">
                <div className="text-[14px] text-[#00ffdc] font-[600] uppercase tracking-widest">
                  BUY
                </div>

                <div className="flex items-center justify-between">
                  <NumericFormat
                    getInputRef={buyInputRef}
                    customInput={Input}
                    value={buyAmount !== "0" && buyAmount !== "" ? buyAmount : ""}
                    onValueChange={handleBuyAmountChange}
                    thousandSeparator=","
                    decimalSeparator="."
                    allowNegative={false}
                    onFocus={handleBuyFocus}
                    onBlur={handleBuyBlur}
                    inputMode="decimal"
                    className="!text-[32px] border-none bg-transparent px-0 text-white !font-normal !leading-[36px] flex-1 h-auto py-2 !outline-none !ring-0 focus:!outline-none focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0 placeholder:text-[#7b7b7b]"
                    placeholder="100-10,000,000"
                  />

                  {/* Currency Selector */}
                  <div className="hidden sm:block absolute right-0 top-[calc(40%+4px)] -translate-y-1/2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Open currency modal for buy
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

                {/* Mobile Currency Selector */}
                <div className="block sm:hidden pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Open currency modal for buy
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

                <div className="pt-2 sm:pt-2">
                  <div className="flex items-center tracking-normal justify-between text-[13px] font-medium text-[#bbbbbb]">
                    <span className="flex items-center gap-2">
                      {formatHumanReadable(buyAmount, buyCurrency) || "You buy"}
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
              className="relative rounded-[12px] p-4 sm:p-6 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),0px_10px_15px_-3px_rgba(0,0,0,0.1)] cursor-text before:absolute before:inset-0 before:rounded-[12px] before:bg-white before:opacity-0 before:transition-opacity before:duration-200 before:pointer-events-none transition-all duration-100 ease-in-out hover:before:opacity-[0.03]"
              style={{
                background: `radial-gradient(ellipse at top,
                rgba(29,51,125,1) -25%,
                rgba(29,40,76,1) 16.8%,
                rgba(28,34,52,1) 37.7%,
                rgba(28,28,28,1) 58.6%)`,
              }}
              onClick={() => sellInputRef.current?.focus()}
            >
              <div className="space-y-1 sm:space-y-2 relative z-20">
                <div className="text-[14px] text-[#a1c6ff] font-[600] uppercase tracking-widest">
                  SELL
                </div>

                <div className="flex items-center justify-between">
                  <NumericFormat
                    getInputRef={sellInputRef}
                    customInput={Input}
                    value={sellAmount !== "0" && sellAmount !== "" ? sellAmount : ""}
                    onValueChange={handleSellAmountChange}
                    thousandSeparator=","
                    decimalSeparator="."
                    allowNegative={false}
                    onFocus={handleSellFocus}
                    onBlur={handleSellBlur}
                    inputMode="decimal"
                    className="!text-[32px] border-none bg-transparent px-0 text-white !font-normal !leading-[36px] flex-1 h-auto py-2 !outline-none !ring-0 focus:!outline-none focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0 placeholder:text-[#7b7b7b]"
                    placeholder="100-10,000,000"
                  />

                  {/* Currency Selector */}
                  <div className="hidden sm:block absolute right-0 top-[calc(40%+4px)] -translate-y-1/2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Open currency modal for sell
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

                {/* Mobile Currency Selector */}
                <div className="block sm:hidden pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Open currency modal for sell
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

                <div className="pt-2 sm:pt-2">
                  <div className="flex items-center tracking-normal justify-between text-[13px] font-medium text-[#bbbbbb]">
                    <span className="flex items-center gap-2">
                      {formatHumanReadable(sellAmount, sellCurrency) || "You sell"}
                    </span>
                    <span className="text-right">
                      {sellCurrency} balance:{" "}
                      <span className="text-[#fcfcfc] font-normal">
                        {formatBalance(balances[sellCurrency] || 0, sellCurrency)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="absolute bg-white border-[#d7d7d7] border-[3px] border-solid left-1/2 rounded-[37.5px] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] size-[36px] top-1/2 translate-x-[-50%] translate-y-[-50%] z-20">
              <button className="w-full h-full flex items-center justify-center hover:bg-gray-50 transition-colors rounded-full">
                <ArrowUpDown className="h-4.5 w-4.5 text-[#202020]" />
              </button>
            </div>
          </div>

          {/* Expiry Selection */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-[13px] font-medium text-[var(--color-gray-700)]">Expires in</span>
            <div className="flex gap-1">
              {([1, 6, 12] as ExpiryOption[]).map((hours) => {
                const isSelected = selectedExpiry === hours;
                const label = hours === 1 ? '1 hour' : hours === 6 ? '6 hours' : '12 hours';
                return (
                  <button
                    key={hours}
                    onClick={() => setSelectedExpiry(hours)}
                    className={`px-2 py-1.5 rounded-[6px] text-[12px] font-semibold transition-colors border shadow-[0px_0.5px_1px_0.3px_rgba(32,32,32,0.15)] ${
                      isSelected
                        ? 'bg-[#d7f4e1] border-[#4cbb84] text-[#1c1c1c]'
                        : 'bg-white border-[rgba(28,28,28,0.05)] text-[#1c1c1c] hover:bg-gray-50'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#f0f0f0]" />

          {/* Confirm Button and Disclaimer */}
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleConfirm}
              className="w-full bg-[#1d895a] hover:bg-[#166547] text-[#f9f9f9] text-[13px] font-semibold rounded-[12px] px-4 py-5 border border-[rgba(32,32,32,0.25)] shadow-[0px_0.5px_1px_0.3px_rgba(32,32,32,0.15)]"
            >
              Confirm order
            </Button>
            <p className="text-[13px] font-medium text-center leading-[18px] text-[var(--color-gray-700)]">
              This order will only be executed if there is sufficient balance or credit to cover the{' '}
              <br />
              full order amount when the conditions are met
            </p>
          </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

