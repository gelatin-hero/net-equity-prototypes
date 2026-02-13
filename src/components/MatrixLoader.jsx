import { useState, useEffect, useRef } from 'react';

// Frame order: 1.svg (static/start), 2.svg … 15.svg. Resolved via Vite so URLs work in dev and build.
const FRAME_NAMES = [
  '1.svg', '2.svg', '3.svg', '4.svg', '5.svg', '6.svg', '7.svg', '8.svg',
  '9.svg', '10.svg', '11.svg', '12.svg', '13.svg', '14.svg', '15.svg',
];

const FRAME_URLS = FRAME_NAMES.map((name) =>
  new URL(`../../assets/matrix-loader/${name}`, import.meta.url).href
);

const FRAME_SIZE_PX = 16;

/** Frames 0–9: 100ms each; frames 10–14: 200ms each. Total = 2000ms. */
const FRAME_DELAYS_MS = [
  ...Array(10).fill(100),
  ...Array(5).fill(200),
];

/** Start time (ms) for each frame index: 0, 100, 200, … 900, 1000, 1200, 1400, 1600, 1800. */
const FRAME_START_MS = FRAME_DELAYS_MS.slice(0, -1).reduce(
  (acc, d, i) => [...acc, acc[i] + d],
  [0]
);

/** Total cycle duration (2s). */
export const MATRIX_LOADER_ONE_CYCLE_MS = 10 * 100 + 5 * 200;

/**
 * Loader: all frames stacked; when animating, JS advances the visible frame on a fixed schedule
 * (frames 1–10: 100ms each, 11–15: 200ms each = 2s total). No CSS animation.
 * Always visible (shows frame 1 when not animating).
 */
export function MatrixLoader({
  size = 14,
  className = '',
  'aria-label': ariaLabel = 'Loading',
  animate = false,
}) {
  const [frameIndex, setFrameIndex] = useState(0);
  const timeoutIdsRef = useRef([]);

  useEffect(() => {
    if (!animate) {
      // Only reset if we're not already at frame 0 to avoid unnecessary re-renders
      setFrameIndex((prev) => (prev === 0 ? prev : 0));
      return;
    }
    // When animate becomes true, start the animation sequence
    const ids = [];
    FRAME_START_MS.forEach((ms, i) => {
      const id = setTimeout(() => setFrameIndex(i), ms);
      ids.push(id);
    });
    timeoutIdsRef.current = ids;
    return () => {
      timeoutIdsRef.current.forEach(clearTimeout);
      timeoutIdsRef.current = [];
    };
  }, [animate]);

  const outerStyle = { width: size, height: size };
  const resolvedClass = `matrix-loader ${animate ? 'matrix-loader--animating' : ''} ${className || ''}`.trim();

  return (
    <span
      className={resolvedClass}
      role="img"
      aria-label={ariaLabel}
      style={outerStyle}
    >
      <span className="matrix-loader__stack">
        {FRAME_URLS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={`matrix-loader__frame matrix-loader__frame--${i}`}
            style={{
              width: size,
              height: size,
              opacity: i === frameIndex ? 1 : 0,
            }}
          />
        ))}
      </span>
    </span>
  );
}
