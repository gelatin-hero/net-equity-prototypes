import React from 'react';
import { motion } from 'motion/react';

interface LimitOrderNudgeProps {
  onClick?: () => void;
}

/**
 * Limit-order nudge pill that appears next to the conversion rate
 * immediately after a quote is generated.
 * Matches Figma design specs.
 */
export function LimitOrderNudge({ onClick }: LimitOrderNudgeProps) {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.button
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 2 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 2 }}
      transition={
        prefersReducedMotion
          ? { duration: 0.1 }
          : {
              duration: 0.25,
              ease: [0.215, 0.61, 0.355, 1], // ease-out-cubic
            }
      }
      onClick={onClick}
      className="rounded-[8px] px-2 py-1 shadow-[0px_0.5px_1px_0.3px_rgba(32,32,32,0.15)] hover:bg-gray-50 transition-colors cursor-pointer ml-2"
      style={{
        height: '24px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-black)',
        border: 'none',
      }}
      aria-label="Set a limit order"
    >
      <span
        className="text-[13px] font-semibold uppercase leading-[16px]"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          letterSpacing: '0.96px',
          color: 'rgba(255, 255, 255, 1)',
        }}
      >
        LIMIT
      </span>
    </motion.button>
  );
}

