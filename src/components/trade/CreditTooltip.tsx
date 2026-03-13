import React from 'react';

interface CreditTooltipProps {
  isVisible: boolean;
  creditLimit: number;
  creditAvailable: number;
  creditCapacity: number;
}

function formatAmount(v: number): { integer: string; decimal: string } {
  const formatted = v.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const dotIndex = formatted.indexOf('.');
  return {
    integer: dotIndex === -1 ? formatted : formatted.slice(0, dotIndex),
    decimal: dotIndex === -1 ? '.00' : formatted.slice(dotIndex),
  };
}

function formatCreditLine(v: number): string {
  if (v >= 1_000_000_000) {
    const n = v / 1_000_000_000;
    return `$ ${n % 1 === 0 ? n.toFixed(0) : n.toFixed(1)} billion`;
  }
  if (v >= 1_000_000) {
    const n = v / 1_000_000;
    return `$ ${n % 1 === 0 ? n.toFixed(0) : n.toFixed(1)} million`;
  }
  return `$ ${v.toLocaleString()}`;
}

export function CreditTooltip({ isVisible, creditLimit, creditAvailable, creditCapacity }: CreditTooltipProps) {
  const utilized = Math.max(0, creditCapacity - creditAvailable);
  const utilizedPct = creditCapacity > 0 ? Math.min(100, Math.max(0, (utilized / creditCapacity) * 100)) : 0;
  const remainingPct = 100 - utilizedPct;

  const utilizedFmt = formatAmount(utilized);
  const remainingFmt = formatAmount(creditAvailable);

  return (
    <div
      className={`absolute z-50 bg-[#1c1c1c] rounded-[12px] p-3 w-[274px] shadow-[0px_57px_16px_0px_rgba(0,0,0,0),0px_37px_15px_0px_rgba(0,0,0,0.01),0px_21px_12px_0px_rgba(0,0,0,0.02),0px_9px_9px_0px_rgba(0,0,0,0.04),0px_2px_5px_0px_rgba(0,0,0,0.05)] border border-[rgba(255,255,255,0.15)] top-full left-0 mt-2 transition-all duration-200 ease-out ${
        isVisible
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
      }`}
    >
      {/* Header Text */}
      <div className="text-white text-[13px] font-medium leading-[16px] mb-0.5">
        Authorized credit line
      </div>

      {/* Credit Info Section */}
      <div className="flex flex-col gap-3">
        {/* Credit Amount */}
        <div className="text-white text-[20px] leading-[28px]">
          {formatCreditLine(creditLimit)}
        </div>

        {/* Progress Bar */}
        <div className="bg-[#676767] rounded-full h-1 w-full overflow-hidden flex">
          <div className="bg-[#ffb556] h-full" style={{ width: `${utilizedPct}%` }} />
          <div className="bg-[#4cbb84] h-full" style={{ width: `${remainingPct}%` }} />
        </div>

        {/* Credit Details */}
        <div className="flex gap-2 w-full">
          {/* Utilized Info */}
          <div className="flex flex-col gap-0.5 w-[120px]">
            <div className="flex items-center gap-1">
              <div className="bg-[#ffb556] rounded-full w-[9px] h-[9px]" />
              <span className="text-white text-[12px] font-medium leading-[16px]">Utilized</span>
            </div>
            <div className="text-white text-[12px] font-medium leading-[16px]">
              <span>$ {utilizedFmt.integer}</span>
              <span className="text-[rgba(255,255,255,0.5)]">{utilizedFmt.decimal}</span>
            </div>
          </div>

          {/* Remaining Info */}
          <div className="flex flex-col gap-0.5 w-[120px]">
            <div className="flex items-center gap-1">
              <div className="bg-[#4cbb84] rounded-full w-[9px] h-[9px]" />
              <span className="text-white text-[12px] font-medium leading-[16px]">Remaining</span>
            </div>
            <div className="text-white text-[12px] font-medium leading-[16px]">
              <span>$ {remainingFmt.integer}</span>
              <span className="text-[rgba(255,255,255,0.5)]">{remainingFmt.decimal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
