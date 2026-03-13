import React from 'react';
import { ConversionRate } from './ConversionRate';
import { QuoteTimer } from './QuoteTimer';
import { LimitOrderNudge } from './LimitOrderNudge';
import { AnimatePresence } from 'motion/react';

interface ConversionPriceQuoteTimerProps {
  baseCurrency: string;
  quoteCurrency: string;
  rate: string;
  timeLeft: number;
  isExpired: boolean;
  hasActiveQuote: boolean;
  showLimitOrderNudge?: boolean;
  onLimitOrderClick?: () => void;
  initialDuration?: number;
}

export function ConversionPriceQuoteTimer({
  baseCurrency,
  quoteCurrency,
  rate,
  timeLeft,
  isExpired,
  hasActiveQuote,
  showLimitOrderNudge = false,
  onLimitOrderClick,
  initialDuration
}: ConversionPriceQuoteTimerProps) {
  return (
    <div className="flex items-center justify-between px-4 py-0 w-full h-5">
      {/* Conversion Rate Container - only show when there's an active quote */}
      {hasActiveQuote && (
        <div className="flex items-center justify-start gap-1.5">
          <div className={isExpired ? 'opacity-50' : ''}>
            <ConversionRate
              baseCurrency={baseCurrency}
              quoteCurrency={quoteCurrency}
              rate={rate}
            />
          </div>
          <AnimatePresence>
            {showLimitOrderNudge && (
              <LimitOrderNudge onClick={onLimitOrderClick} />
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Quote Timer Container - only show when there's an active quote */}
      {hasActiveQuote && (
        <div className="flex items-center justify-end">
          <QuoteTimer 
            timeLeft={timeLeft}
            isExpired={isExpired}
            initialDuration={initialDuration}
          />
        </div>
      )}
    </div>
  );
}
