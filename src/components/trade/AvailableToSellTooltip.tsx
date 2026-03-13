import React from 'react';

interface AvailableToSellTooltipProps {
  isVisible: boolean;
  sellCurrency: string;
  balance: number;
  creditInSellCurrency: number;
  availableToSell: number;
  formatBalance: (amount: number, currencyCode: string) => string;
  creditAvailableUSD: number;
}

export function AvailableToSellTooltip({
  isVisible,
  sellCurrency,
  balance,
  creditInSellCurrency,
  availableToSell,
  formatBalance,
  creditAvailableUSD,
}: AvailableToSellTooltipProps) {
  const effectiveBalance = Math.max(0, balance);
  const creditNative = Math.max(0, creditInSellCurrency);
  const totalAvailableNative = Math.max(0, availableToSell);

  return (
    <div
      className={`absolute z-50 bg-[#1c1c1c] rounded-[12px] p-3 w-[320px] shadow-[0px_57px_16px_0px_rgba(0,0,0,0),0px_37px_15px_0px_rgba(0,0,0,0.01),0px_21px_12px_0px_rgba(0,0,0,0.02),0px_9px_9px_0px_rgba(0,0,0,0.04),0px_2px_5px_0px_rgba(0,0,0,0.05)] border border-[rgba(255,255,255,0.15)] top-full right-0 mt-2 transition-all duration-200 ease-out ${
        isVisible
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
      }`}
    >
      <div className="flex flex-col gap-2 w-full">
        {/* Header: label + total available, right aligned */}
        <div className="flex flex-col gap-1 items-end w-full">
          <p className="text-[12px] leading-[16px] text-white/70">
            Available to sell
          </p>
          <p className="text-[20px] leading-[28px] text-white whitespace-nowrap">
            {sellCurrency} {formatBalance(totalAvailableNative, sellCurrency)}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[rgba(255,255,255,0.25)] my-1" />

        {/* Rows: balance + credit */}
        <div className="flex flex-col gap-2 w-full">
          {/* Balance row */}
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold leading-[16px] text-white uppercase">
                  {sellCurrency}
                </span>
                <span className="text-[13px] leading-[20px] text-[#9b9b9b]">
                  Balance
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[13px] leading-[20px] text-white">
                {formatBalance(effectiveBalance, sellCurrency)}
              </p>
            </div>
          </div>

          {/* Credit row: native + USD on the right */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold leading-[16px] text-white uppercase">
                CREDIT
              </span>
            </div>
            <div className="text-right">
              <p className="text-[13px] leading-[20px] text-white whitespace-nowrap">
                {sellCurrency} {formatBalance(creditNative, sellCurrency)}
              </p>
              <p className="text-[12px] leading-[16px] text-white/70 whitespace-nowrap">
                ≈ USD {formatBalance(creditAvailableUSD, "USD")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
