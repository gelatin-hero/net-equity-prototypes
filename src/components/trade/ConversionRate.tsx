import React, { useState } from 'react';
import SwitchIcon from '../../assets/icons/switch.svg?react';

interface ConversionRateProps {
  baseCurrency: string;
  quoteCurrency: string;
  rate: string;
}

export function ConversionRate({ baseCurrency, quoteCurrency, rate }: ConversionRateProps) {
  const [isReversed, setIsReversed] = useState(false);

  const handleToggle = () => {
    setIsReversed(!isReversed);
  };

  // Calculate the reverse rate (1 / rate)
  const reverseRate = (1 / parseFloat(rate)).toFixed(6).replace(/\.?0+$/, "");

  return (
    <div className="flex items-center gap-2">
      {/* First Currency (Base by default) */}
      <span className="text-[13px] w-[48px] text-center font-semibold text-[#1c1c1c] leading-[20px]">
        1 {isReversed ? quoteCurrency : baseCurrency}
      </span>

      {/* Clickable Toggle Button */}
      <button
        onClick={handleToggle}
        className="bg-white h-5 w-[22px] rounded-[4px] flex items-center justify-center border border-[#dedede] border-[0.5px] shadow-[0px_0.5px_1px_0.3px_rgba(32,32,32,0.15)] hover:bg-gray-50 transition-colors cursor-pointer"
        aria-label="Toggle conversion rate direction"
      >
        <SwitchIcon className="w-[14px] h-[10px]" />
      </button>

      {/* Second Currency with Rate */}
      <span className="text-[13px] font-semibold text-[#1c1c1c] leading-[20px]">
        {isReversed ? reverseRate : rate} {isReversed ? baseCurrency : quoteCurrency}
      </span>
    </div>
  );
}
