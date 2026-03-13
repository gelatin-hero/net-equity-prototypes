import React from 'react';

interface AvailableToSellTooltipProps {
  isVisible: boolean;
  sellCurrency: string;
  balance: number;
  creditInSellCurrency: number;
  availableToSell: number;
  formatBalance: (amount: number, currencyCode: string) => string;
}

export function AvailableToSellTooltip({
  isVisible,
  sellCurrency,
  balance,
  creditInSellCurrency,
  availableToSell,
  formatBalance,
}: AvailableToSellTooltipProps) {
  const effectiveBalance = Math.max(0, balance);

  return (
    <div
      className={`absolute z-50 bg-[#1c1c1c] rounded-[12px] p-3 w-[274px] shadow-[0px_57px_16px_0px_rgba(0,0,0,0),0px_37px_15px_0px_rgba(0,0,0,0.01),0px_21px_12px_0px_rgba(0,0,0,0.02),0px_9px_9px_0px_rgba(0,0,0,0.04),0px_2px_5px_0px_rgba(0,0,0,0.05)] border border-[rgba(255,255,255,0.15)] top-full right-0 mt-2 transition-all duration-200 ease-out ${
        isVisible
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
      }`}
    >
      <div className="text-white text-[13px] font-medium leading-[16px] mb-2">
        Maximum you can sell
      </div>

      <div className="flex flex-col gap-2">
        {/* Balance row */}
        <div className="flex items-center justify-between">
          <span className="text-[rgba(255,255,255,0.5)] text-[12px] font-medium leading-[16px]">
            {sellCurrency} balance
          </span>
          <span className="text-white text-[12px] font-medium leading-[16px]">
            {formatBalance(effectiveBalance, sellCurrency)}
          </span>
        </div>

        {/* Credit row */}
        <div className="flex items-center justify-between">
          <span className="text-[rgba(255,255,255,0.5)] text-[12px] font-medium leading-[16px]">
            Credit in {sellCurrency}
          </span>
          <span className="text-white text-[12px] font-medium leading-[16px]">
            {formatBalance(creditInSellCurrency, sellCurrency)}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-[rgba(255,255,255,0.15)]" />

        {/* Total row */}
        <div className="flex items-center justify-between">
          <span className="text-white text-[12px] font-semibold leading-[16px]">
            Available to sell
          </span>
          <span className="text-white text-[12px] font-semibold leading-[16px]">
            {sellCurrency} {formatBalance(availableToSell, sellCurrency)}
          </span>
        </div>
      </div>
    </div>
  );
}
