// Centralized Flag System Architecture
// This system provides a consistent, scalable approach to currency flags

import { JSX } from "react";
import USDFlagSvg from "../../assets/flags/usd.svg?react";
import EURFlagSvg from "../../assets/flags/eur.svg?react";
import GBPFlagSvg from "../../assets/flags/gbp.svg?react";
import AEDFlagSvg from "../../assets/flags/aed.svg?react";
import AUDFlagSvg from "../../assets/flags/aud.svg?react";
import BRLFlagSvg from "../../assets/flags/brl.svg?react";
import EURCFlagSvg from "../../assets/flags/eurc.svg?react";
import USDCFlagSvg from "../../assets/flags/usdc.svg?react";
import USDTFlagSvg from "../../assets/flags/usdt.svg?react";
import MXNFlagSvg from "../../assets/flags/MXN.svg?react";
import NOKFlagSvg from "../../assets/flags/NOK.svg?react";
import PHPFlagSvg from "../../assets/flags/PHP.svg?react";
import PLNFlagSvg from "../../assets/flags/PLN.svg?react";
import SEKFlagSvg from "../../assets/flags/SEK.svg?react";
import SGDFlagSvg from "../../assets/flags/SGD.svg?react";
import IDRFlagSvg from "../../assets/flags/IDR.svg?react";
import HKDFlagSvg from "../../assets/flags/HKD.svg?react";
import COPFlagSvg from "../../assets/flags/COP.svg?react";
import ARSFlagSvg from "../../assets/flags/ARS.svg?react";

function UniversalFlagWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative rounded-[10000px] shrink-0 size-8 overflow-hidden ${className}`}>
      <div className="overflow-clip relative size-full">{children}</div>
      <div
        aria-hidden="true"
        className="absolute border border-[rgba(32,32,32,0.2)] border-solid inset-0 pointer-events-none rounded-[10000px]"
      />
    </div>
  );
}

const wrap = (SvgComp: React.ComponentType) => () => (
  <UniversalFlagWrapper>
    <SvgComp />
  </UniversalFlagWrapper>
);

const FLAG_REGISTRY: Record<string, () => JSX.Element> = {
  USD: wrap(USDFlagSvg),
  EUR: wrap(EURFlagSvg),
  GBP: wrap(GBPFlagSvg),
  AED: wrap(AEDFlagSvg),
  AUD: wrap(AUDFlagSvg),
  BRL: wrap(BRLFlagSvg),
  USDC: wrap(USDCFlagSvg),
  USDT: wrap(USDTFlagSvg),
  EURC: wrap(EURCFlagSvg),
  MXN: wrap(MXNFlagSvg),
  NOK: wrap(NOKFlagSvg),
  PHP: wrap(PHPFlagSvg),
  PLN: wrap(PLNFlagSvg),
  SEK: wrap(SEKFlagSvg),
  SGD: wrap(SGDFlagSvg),
  IDR: wrap(IDRFlagSvg),
  HKD: wrap(HKDFlagSvg),
  COP: wrap(COPFlagSvg),
  ARS: wrap(ARSFlagSvg),
};

export function getCurrencyFlag(currencyCode: string, suppressWarning = false) {
  const FlagComponent = FLAG_REGISTRY[currencyCode];
  if (!FlagComponent) {
    if (!suppressWarning) {
      console.warn(`No flag found for currency: ${currencyCode}. Using USD as fallback.`);
    }
    return wrap(USDFlagSvg)();
  }
  return <FlagComponent />;
}

export function getAvailableCurrencies(): string[] {
  return Object.keys(FLAG_REGISTRY);
}

export function hasCurrencyFlag(currencyCode: string): boolean {
  return currencyCode in FLAG_REGISTRY;
}

export const USDFlag = wrap(USDFlagSvg);
export const EURFlag = wrap(EURFlagSvg);
export const GBPFlag = wrap(GBPFlagSvg);
export const AEDFlag = wrap(AEDFlagSvg);
export const AUDFlag = wrap(AUDFlagSvg);
export const BRLFlag = wrap(BRLFlagSvg);
export const USDCFlag = wrap(USDCFlagSvg);
export const USDTFlag = wrap(USDTFlagSvg);
export const EURCFlag = wrap(EURCFlagSvg);
export const MXNFlag = wrap(MXNFlagSvg);
export const NOKFlag = wrap(NOKFlagSvg);
export const PHPFlag = wrap(PHPFlagSvg);
export const PLNFlag = wrap(PLNFlagSvg);
export const SEKFlag = wrap(SEKFlagSvg);
export const SGDFlag = wrap(SGDFlagSvg);
export const IDRFlag = wrap(IDRFlagSvg);
export const HKDFlag = wrap(HKDFlagSvg);
export const COPFlag = wrap(COPFlagSvg);
export const ARSFlag = wrap(ARSFlagSvg);
