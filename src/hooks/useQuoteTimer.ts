import { useState, useEffect, useRef, useCallback } from 'react';

interface UseQuoteTimerReturn {
  timeLeft: number;
  isExpired: boolean;
  resetTimer: () => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
}

export function useQuoteTimer(initialDuration: number = 15): UseQuoteTimerReturn {
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isExpired, setIsExpired] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    // Clear any existing timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Reset state
    setTimeLeft(initialDuration);
    setIsExpired(false);

    // Start countdown
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [initialDuration]);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimeLeft(initialDuration);
    setIsExpired(false);
  }, [initialDuration]);

  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resumeTimer = useCallback(() => {
    if (intervalRef.current) {
      return; // Already running
    }
    
    if (timeLeft > 0 && !isExpired) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsExpired(true);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [timeLeft, isExpired]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    timeLeft,
    isExpired,
    resetTimer,
    startTimer,
    pauseTimer,
    resumeTimer,
  };
}
