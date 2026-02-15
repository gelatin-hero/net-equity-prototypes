import { motion, AnimatePresence } from "framer-motion";
import { BookmarkedPair } from "../../hooks/useBookmarks";

interface BookmarkTabsProps {
  bookmarks: BookmarkedPair[];
  currentPairId: string | null;
  onSelectPair: (pair: BookmarkedPair) => void;
}

export function BookmarkTabs({ 
  bookmarks, 
  currentPairId, 
  onSelectPair
}: BookmarkTabsProps) {
  // Check if this is the last bookmark being removed
  const isLastBookmark = bookmarks.length === 1;

  return (
    <div className="flex gap-2 mb-4 justify-center h-[36px]">
      <AnimatePresence mode="popLayout">
        {bookmarks.map((bookmark, index) => {
          const isSelected = currentPairId === bookmark.id;
          
          return (
            <motion.button
              key={bookmark.id}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: isLastBookmark ? 0.5 : 0, 
                ease: "easeOut" 
              }}
              onClick={() => onSelectPair(bookmark)}
              className={`
                relative flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200
                ${isSelected 
                  ? 'bg-gray-900 text-gray-100' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }
              `}
            >
              {/* Currency pair display */}
              <div className="flex items-center gap-1">
                <span className="text-[13px] leading-[18px]" style={{ fontWeight: 600 }}>
                  {bookmark.toCurrency}
                </span>
                <span className="text-[13px] leading-[18px] opacity-70" style={{ fontWeight: 900 }}>
                  /
                </span>
                <span className="text-[13px] leading-[18px]" style={{ fontWeight: 600 }}>
                  {bookmark.fromCurrency}
                </span>
              </div>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
