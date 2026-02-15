import React from 'react';
import 'number-flow';
import { CircularProgress } from '@heroui/react';

interface QuoteTimerProps {
  timeLeft: number;
  isExpired: boolean;
  initialDuration?: number;
}

export function QuoteTimer({ timeLeft, isExpired, initialDuration = 15 }: QuoteTimerProps) {
  const flowRef = React.useRef<HTMLElement | null>(null);

  // Configure NumberFlow to zero-pad to two digits (e.g., 09 instead of 9)
  React.useEffect(() => {
    if (flowRef.current) {
      // @ts-expect-error - custom element API
      flowRef.current.locales = 'en-US';
      // @ts-expect-error - custom element API
      flowRef.current.format = {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 0,
        useGrouping: false,
      };
      // Update with current value after setting format
      // @ts-expect-error - custom element API
      flowRef.current.update(Math.max(0, timeLeft));
    }
  }, [timeLeft]);

  React.useEffect(() => {
    if (flowRef.current && !Number.isNaN(timeLeft)) {
      // @ts-expect-error - custom element API
      flowRef.current.update(Math.max(0, timeLeft));
    }
  }, [timeLeft]);

  // Calculate progress percentage (100-0, decreasing as timer counts down)
  const progressPercentage = React.useMemo(() => {
    if (isExpired) return 0;
    return Math.max(0, (timeLeft / initialDuration) * 100);
  }, [timeLeft, initialDuration, isExpired]);
  console.log(progressPercentage);
  return (
    <div className="flex items-center gap-1">
      {/* Circular Progress Timer */}
      <div className="w-4 h-4 flex items-center justify-center">
        <CircularProgress
          size="sm"
          value={(100 - progressPercentage)}
          maxValue={100}
          color="primary"
          strokeWidth={11}
          showValueLabel={false}
          disableAnimation={isExpired}
          classNames={{
            svg: "w-5 h-5 [transform:rotate(0deg)]",
            track: "stroke-[#1D895A] [stroke-linecap:butt]",
            indicator: "stroke-gray-200 [stroke-linecap:butt]"
          }}
        />
      </div>

      {/* Timer Text with fixed-width animated digits */}
      <span className="text-[13px] font-semibold text-[#1c1c1c] leading-[20px] flex items-center gap-0.5">
        {isExpired ? (
          'Quote expired'
        ) : (
          <>
            <span>Quote expires in</span>
            <span className="inline-flex items-center [font-variant-numeric:tabular-nums] text-[13px]">
              <span
                className="w-[2ch] text-right"
                aria-live="off"
              >
                {React.createElement('number-flow' as any, {
                  ref: flowRef as unknown as React.Ref<any>,
                  style: {
                    ['--number-flow-mask-height' as any]: '.10em',
                    ['--number-flow-mask-width' as any]: '.10em',
                  },
                })}
              </span>
              <span>s</span>
            </span>
          </>
        )}
      </span>
    </div>
  );
}
