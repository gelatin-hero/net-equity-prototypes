import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Lock,
  ChevronDown,
  ArrowUpRight,
  CornerDownRight,
  ExternalLink,
} from "lucide-react";
import { getCurrencyFlag } from "./CurrencyFlags";
import { CURRENCIES } from "../../constants/currencies";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "../ui/Sheet";
// @ts-ignore — JS utility
import { getWithdrawable } from "../../utils/calculations";
// @ts-ignore — JS utility
import { fmt } from "../../utils/format";

export interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  balances: Record<string, number>;
  rates: Record<string, number>;
  totals: { equity: number; availableToWithdraw?: number; [key: string]: unknown };
  model?: "A" | "B";
  disabledCurrencies?: Record<string, boolean>;
  onWithdraw: (currency: string, amount: number) => void;
}

const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-30%" : "30%", opacity: 0 }),
};

const stepTransition = { type: "spring" as const, damping: 35, stiffness: 350, mass: 0.8 };

export function WithdrawalModal({
  isOpen,
  onClose,
  balances,
  rates,
  totals,
  model = "A",
  disabledCurrencies = {},
  onWithdraw,
}: WithdrawalModalProps) {
  const [step, setStep] = useState<"currency" | "amount">("currency");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [withdrawMax, setWithdrawMax] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep("currency");
      setDirection(1);
      setSelectedCurrency(null);
      setAmount("");
      setWithdrawMax(false);
      setFaqOpen(false);
    }
  }, [isOpen]);

  const handleCurrencySelect = (code: string) => {
    setDirection(1);
    setSelectedCurrency(code);
    setAmount("");
    setWithdrawMax(false);
    setStep("amount");
  };

  const handleBack = () => {
    setDirection(-1);
    setStep("currency");
  };

  const applyMax = (currency: string) => {
    const { withdrawable } = getWithdrawable(currency, balances, rates, totals, model);
    setAmount(withdrawable.toFixed(2));
    setWithdrawMax(true);
  };

  const handleConfirm = () => {
    if (!selectedCurrency) return;
    const amountNum = parseFloat(amount) || 0;
    if (amountNum <= 0) return;
    onWithdraw(selectedCurrency, amountNum);
    onClose();
  };

  const currencyEntries = Object.entries(
    CURRENCIES as Record<string, { name: string; flag: string }>
  ).filter(([code]) => !disabledCurrencies[code]);

  const selectedInfo = selectedCurrency
    ? (CURRENCIES as Record<string, { name: string }>)[selectedCurrency]
    : null;
  const selectedW = selectedCurrency
    ? getWithdrawable(selectedCurrency, balances, rates, totals, model)
    : null;

  const amountNum = parseFloat(amount) || 0;
  const canConfirm = amountNum > 0 && selectedW && amountNum <= selectedW.withdrawable;

  return (
    <Sheet open={isOpen} onOpenChange={(v) => { if (!v) onClose(); }}>
      {/* @ts-ignore — JSX component from untyped .jsx file */}
      <SheetContent side="right" showCloseButton={false}>
        {/* Accessible title (visually hidden — header below is the visual title) */}
        {/* @ts-ignore */}
        <SheetTitle className="sr-only">Withdrawal request</SheetTitle>

        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-8 h-[66px]">
          <div className="flex items-center gap-2">
            <ArrowUpRight className="h-[18px] w-[18px] text-[#1c1c1c]" />
            <span className="text-[17px] font-semibold text-[#1c1c1c] leading-[24px]">
              Withdrawal request
            </span>
          </div>
          <button
            onClick={onClose}
            className="bg-white border-[0.5px] border-[rgba(28,28,28,0.05)] p-[9px] rounded-[12px] shadow-[0px_0.5px_0px_0.4px_rgba(32,32,32,0.1)] hover:bg-[#f9f9f9] transition-colors cursor-pointer flex items-center justify-center"
          >
            <X className="h-4 w-4 text-[#7b7b7b]" />
          </button>
        </div>

        {/* Step labels + progress indicator */}
        <div className="flex-shrink-0 relative flex items-end gap-2 px-8 pb-[20px]">
          <span
            className={`text-[13px] font-medium leading-[18px] transition-colors duration-200 ${
              step === "currency" ? "text-[#1c1c1c]" : "text-[#999999]"
            }`}
          >
            Currency selection
          </span>
          <span className="text-[13px] text-[#d1d1d1]">→</span>
          <span
            className={`text-[13px] font-medium leading-[18px] transition-colors duration-200 ${
              step === "amount" ? "text-[#1c1c1c]" : "text-[#999999]"
            }`}
          >
            Amount
          </span>
          {/* Grey track */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#f0f0f0]" />
          {/* Green progress fill */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-[#1d895a] rounded-r-[4px]"
            animate={{ width: step === "currency" ? "30%" : "60%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>

        {/* Scrollable body — clips the horizontal slide */}
        <div className="sheet-content-inner overflow-x-hidden">
          <div className="relative min-h-0 flex-1">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              {step === "currency" ? (
                <motion.div
                  key="currency"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={stepTransition}
                  className="w-full"
                >
                  <CurrencyStep
                    currencyEntries={currencyEntries}
                    balances={balances}
                    rates={rates}
                    totals={totals}
                    model={model}
                    selectedCurrency={selectedCurrency}
                    onSelect={handleCurrencySelect}
                  />
                </motion.div>
              ) : selectedW ? (
                <motion.div
                  key="amount"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={stepTransition}
                  className="w-full"
                >
                  <AmountStep
                    currency={selectedCurrency!}
                    currencyName={selectedInfo?.name ?? ""}
                    w={selectedW}
                    amount={amount}
                    onAmountChange={(v) => { setAmount(v); setWithdrawMax(false); }}
                    withdrawMax={withdrawMax}
                    onMaxClick={() => applyMax(selectedCurrency!)}
                    onWithdrawMaxChange={(checked) => {
                      if (checked) applyMax(selectedCurrency!);
                      else setWithdrawMax(false);
                    }}
                    faqOpen={faqOpen}
                    onFaqToggle={() => setFaqOpen((v) => !v)}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer — step 2 only */}
        <AnimatePresence initial={false}>
          {step === "amount" && (
          <motion.div
            key="footer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex-shrink-0 flex items-center justify-between px-8 h-[66px] border-t border-[#f0f0f0]"
          >
            <button
              onClick={handleBack}
              className="text-[13px] font-medium text-[#7b7b7b] hover:text-[#1c1c1c] transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleConfirm}
              disabled={!canConfirm}
              className="flex items-center gap-1.5 bg-[#1a7a45] text-white text-[13px] font-medium px-5 h-[34px] rounded-[10px] hover:bg-[#175f37] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Review and confirm →
            </button>
          </motion.div>
        )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}

// ---------------------------------------------------------------------------
// Step 1: Currency selection
// ---------------------------------------------------------------------------

interface WithdrawableResult {
  balance: number;
  withdrawable: number;
  held: number;
  heldUSD: number;
  balanceUSD: number;
  withdrawableUSD: number;
}

interface CurrencyStepProps {
  currencyEntries: [string, { name: string; flag: string }][];
  balances: Record<string, number>;
  rates: Record<string, number>;
  totals: { equity: number; availableToWithdraw?: number; [key: string]: unknown };
  model: "A" | "B";
  selectedCurrency: string | null;
  onSelect: (code: string) => void;
}

function CurrencyStep({
  currencyEntries,
  balances,
  rates,
  totals,
  model,
  selectedCurrency,
  onSelect,
}: CurrencyStepProps) {
  return (
    <div className="px-8 pt-5 pb-4">
      <p className="text-[13px] text-[#676767] leading-[18px] mb-5">
        Your withdrawable amount in any currency is capped by your net balance
      </p>
      <div>
        {currencyEntries.map(([code, info], index) => {
          const rawBalance = balances[code] ?? 0;
          const { withdrawable }: WithdrawableResult = getWithdrawable(
            code, balances, rates, totals, model
          );
          const isNegative = rawBalance < 0;
          const isLocked = withdrawable <= 0;

          return (
            <div key={code}>
              {index > 0 && <div className="border-t border-[#f0f0f0]" />}
              <button
                disabled={isLocked}
                onClick={() => onSelect(code)}
                className={`w-full flex items-center justify-between py-4 transition-colors text-left ${
                  isLocked
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:bg-[#fafafa] rounded-[8px]"
                }`}
              >
                {/* Left: radio + flag + code/name */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedCurrency === code ? "border-[#1c1c1c]" : "border-[#d1d1d1]"
                    }`}
                  >
                    {selectedCurrency === code && (
                      <div className="w-2 h-2 rounded-full bg-[#1c1c1c]" />
                    )}
                  </div>
                  {getCurrencyFlag(code, true)}
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-[14px] font-semibold text-[#1c1c1c] leading-[18px]">
                        {code}
                      </span>
                      {isLocked && <Lock className="h-[11px] w-[11px] text-[#999999]" />}
                    </div>
                    <div className="text-[12px] text-[#7b7b7b] leading-[18px]">{info.name}</div>
                  </div>
                </div>

                {/* Right: balance + avl */}
                <div className="text-right">
                  <div
                    className={`text-[14px] font-semibold leading-[18px] ${
                      isNegative ? "text-[#e95c5c]" : "text-[#1c1c1c]"
                    }`}
                  >
                    {isNegative ? `- ${fmt(rawBalance)}` : fmt(rawBalance)}
                  </div>
                  <div className="text-[12px] text-[#7b7b7b] leading-[16px]">
                    Avl {fmt(Math.max(withdrawable, 0))}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 2: Amount & destination
// ---------------------------------------------------------------------------

interface AmountStepProps {
  currency: string;
  currencyName: string;
  w: WithdrawableResult;
  amount: string;
  onAmountChange: (value: string) => void;
  withdrawMax: boolean;
  onMaxClick: () => void;
  onWithdrawMaxChange: (checked: boolean) => void;
  faqOpen: boolean;
  onFaqToggle: () => void;
}

function AmountStep({
  currency,
  currencyName,
  w,
  amount,
  onAmountChange,
  withdrawMax,
  onMaxClick,
  onWithdrawMaxChange,
  faqOpen,
  onFaqToggle,
}: AmountStepProps) {
  return (
    <div>
      {/* Selected currency + withdrawable balance */}
      <div className="px-8 pt-5">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            {getCurrencyFlag(currency, true)}
            <div>
              <div className="text-[17px] font-semibold text-[#1c1c1c] leading-[24px]">{currency}</div>
              <div className="text-[13px] text-[#7b7b7b] leading-[18px]">{currencyName}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[12px] text-[#999999] leading-[18px]">Your balance</div>
            <div className="text-[17px] font-semibold text-[#1c1c1c] leading-[24px]">
              {currency} {fmt(w.balance)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 border-t border-[#f0f0f0]">
          <div>
            <div className="text-[15px] font-semibold text-[#1c1c1c] leading-[24px]">
              Withdrawable balance
            </div>
            <div className="text-[12px] text-[#7b7b7b] leading-[18px]">Capped by your net balance</div>
          </div>
          <div className="text-right">
            <div className="text-[17px] font-semibold text-[#1c1c1c] leading-[24px]">
              {currency} {fmt(Math.max(w.withdrawable, 0))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#f0f0f0]" />

      {/* FAQ accordion */}
      <div className="px-8 py-4">
        <button
          onClick={onFaqToggle}
          className="w-full flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div className="w-[18px] h-[18px] rounded-full border border-[#b0b0b0] flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-[#7b7b7b] leading-none">?</span>
            </div>
            <span className="text-[13px] text-[#676767] leading-[18px]">
              Why is my withdrawal amount capped?
            </span>
          </div>
          <motion.div animate={{ rotate: faqOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4 text-[#999999]" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {faqOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="pt-3 flex gap-2">
                <CornerDownRight className="h-4 w-4 text-[#999999] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] text-[#676767] leading-[18px]">
                    The withdrawal amount is capped by the net balance when it is lower than the
                    currency balance. This happens when there are unsettled negative balances. As
                    they move with the market, so does your cap. Settle them to withdraw your
                    entire balance.
                  </p>
                  <button className="mt-2 flex items-center gap-1 text-[13px] text-[#1c1c1c] font-medium underline underline-offset-2 cursor-pointer hover:opacity-70 transition-opacity">
                    View unsettled negative positions
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-[#f0f0f0]" />

      {/* Amount input */}
      <div className="px-8 pt-5 pb-5">
        <p className="text-[13px] font-medium text-[#1c1c1c] leading-[18px] mb-3">
          Enter amount to withdraw
        </p>
        <div className="relative">
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="0.00"
            className="w-full h-[56px] px-4 pr-16 bg-white border border-[#dedede] rounded-[12px] shadow-[0px_0.5px_1px_0.3px_rgba(32,32,32,0.15)] text-[15px] text-[#1c1c1c] font-medium placeholder:text-[#cacaca] outline-none focus:border-[#1c1c1c] transition-colors"
          />
          <button
            onClick={onMaxClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#f0f0f0] text-[#1c1c1c] text-[11px] font-semibold px-2.5 py-1 rounded-[6px] hover:bg-[#e5e5e5] transition-colors cursor-pointer"
          >
            MAX
          </button>
        </div>
        <label className="flex items-center gap-2 mt-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={withdrawMax}
            onChange={(e) => onWithdrawMaxChange(e.target.checked)}
            className="w-4 h-4 rounded border-[#d1d1d1] accent-[#1c1c1c] cursor-pointer"
          />
          <span className="text-[13px] text-[#7b7b7b] leading-[18px]">
            Withdraw maximum available balance
          </span>
        </label>
      </div>

    </div>
  );
}
