import { useState, useEffect } from 'react';

export interface BookmarkedPair {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  timestamp: number;
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkedPair[]>([]);
  const [currentPairId, setCurrentPairId] = useState<string | null>(null);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('currency-bookmarks');
    const savedCurrent = localStorage.getItem('current-bookmark-pair');
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse saved bookmarks:', error);
      }
    }
    if (savedCurrent) {
      setCurrentPairId(savedCurrent);
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('currency-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Save current pair to localStorage whenever it changes
  useEffect(() => {
    if (currentPairId) {
      localStorage.setItem('current-bookmark-pair', currentPairId);
    } else {
      localStorage.removeItem('current-bookmark-pair');
    }
  }, [currentPairId]);

  const addBookmark = (fromCurrency: string, toCurrency: string) => {
    const id = `${fromCurrency}-${toCurrency}`;
    
    // Check if already exists
    const exists = bookmarks.some(b => b.id === id);
    if (exists) return;

    const newBookmark: BookmarkedPair = {
      id,
      fromCurrency,
      toCurrency,
      timestamp: Date.now(),
    };

    setBookmarks(prev => {
      // Limit to 4 bookmarks, remove oldest if at limit
      const updated = [newBookmark, ...prev];
      if (updated.length > 4) {
        return updated.slice(0, 4);
      }
      return updated;
    });

    // Set as current pair when added
    setCurrentPairId(id);
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => {
      const updated = prev.filter(b => b.id !== id);
      // If we removed the current pair, clear current selection
      if (currentPairId === id) {
        setCurrentPairId(updated.length > 0 ? updated[0].id : null);
      }
      return updated;
    });
  };

  const isBookmarked = (fromCurrency: string, toCurrency: string) => {
    const id = `${fromCurrency}-${toCurrency}`;
    return bookmarks.some(b => b.id === id);
  };

  const toggleBookmark = (fromCurrency: string, toCurrency: string) => {
    const id = `${fromCurrency}-${toCurrency}`;
    if (isBookmarked(fromCurrency, toCurrency)) {
      removeBookmark(id);
    } else {
      addBookmark(fromCurrency, toCurrency);
    }
  };

  const setCurrentPair = (id: string) => {
    setCurrentPairId(id);
  };

  const getCurrentPair = (): BookmarkedPair | null => {
    if (!currentPairId) return null;
    return bookmarks.find(b => b.id === currentPairId) || null;
  };

  const clearCurrentPair = () => {
    setCurrentPairId(null);
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
    setCurrentPairId(null);
  };

  return {
    bookmarks,
    currentPairId,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
    setCurrentPair,
    getCurrentPair,
    clearCurrentPair,
    clearAllBookmarks,
  };
}