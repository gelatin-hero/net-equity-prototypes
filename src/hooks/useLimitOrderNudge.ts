import { useState, useEffect, useRef, useCallback } from 'react';

interface UseLimitOrderNudgeReturn {
  showNudge: boolean;
  resetNudge: () => void;
  startNudgeTimer: () => void;
}

/**
 * Hook to manage the limit-order nudge visibility.
 * Shows the nudge immediately after a quote is fetched, and keeps it visible
 * until a new quote is fetched, trade is completed, or quote is invalidated.
 */
export function useLimitOrderNudge(hasActiveQuote: boolean): UseLimitOrderNudgeReturn {
  const [showNudge, setShowNudge] = useState(false);
  const hasActiveQuoteRef = useRef(hasActiveQuote);

  // Keep ref in sync with prop
  useEffect(() => {
    hasActiveQuoteRef.current = hasActiveQuote;
  }, [hasActiveQuote]);

  const resetNudge = useCallback(() => {
    setShowNudge(false);
  }, []);

  const startNudgeTimer = useCallback(() => {
    // Clear any existing nudge
    resetNudge();

    // Only show nudge if there's an active quote
    if (hasActiveQuoteRef.current) {
      setShowNudge(true);
    }
  }, [resetNudge]);

  // Reset nudge when quote becomes inactive
  useEffect(() => {
    if (!hasActiveQuote) {
      resetNudge();
    }
  }, [hasActiveQuote, resetNudge]);

  return {
    showNudge,
    resetNudge,
    startNudgeTimer,
  };
}

