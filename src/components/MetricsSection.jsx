import { useState, useRef, useEffect, useCallback } from 'react';
import { fmtUSD } from '../utils/format';
import { MetricsTooltip } from './MetricsTooltip';
import { MatrixLoader } from './MatrixLoader';
import questionMarkIcon from '../assets/icons/question-mark.svg';

function formatValueParts(value) {
  const formatted = fmtUSD(value);
  const dotIdx = formatted.lastIndexOf('.');
  if (dotIdx === -1) return { integer: formatted, decimal: '' };
  return {
    integer: formatted.slice(0, dotIdx),
    decimal: formatted.slice(dotIdx),
  };
}

function MetricsInfoTooltip({ label, children }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState('below');
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    setPosition(spaceBelow < tooltipRect.height + 12 ? 'above' : 'below');
  }, []);

  useEffect(() => {
    if (open) updatePosition();
  }, [open, updatePosition]);

  return (
    <div
      className="metrics-label metrics-info-trigger"
      ref={triggerRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span>{label}</span>
      <img src={questionMarkIcon} alt="Info" width={12} height={12} />
      {open && (
        <span
          className={`metrics-info-tooltip metrics-info-tooltip--${position}`}
          ref={tooltipRef}
          role="tooltip"
        >
          {children}
        </span>
      )}
    </div>
  );
}

export function MetricsSection({ totals, model = 'A', ratesLoading = false }) {
  const {
    holdings, obligations, equity,
    availableCredit, creditRemaining, availableToWithdraw,
    creditLimit, holdingsBreakdown, obligationsBreakdown,
  } = totals;

  const extraOwedAboveLimit = Math.max(0, obligations - creditLimit);

  const isModelB = model === 'B';
  const isModelC = model === 'C';

  const netBalanceValue = isModelB ? availableToWithdraw : equity;

  const creditValue = isModelC
    ? Math.max(0, availableCredit ?? (creditLimit - obligations))
    : creditRemaining;

  const netBalanceParts = formatValueParts(netBalanceValue);
  const creditParts = formatValueParts(creditValue);

  // Credit shorthand (e.g. "10M", "1.5B")
  const creditShorthand = creditLimit >= 1e9
    ? `${(creditLimit / 1e9).toFixed(creditLimit % 1e9 === 0 ? 0 : 1)}B`
    : creditLimit >= 1e6
      ? `${(creditLimit / 1e6).toFixed(creditLimit % 1e6 === 0 ? 0 : 1)}M`
      : creditLimit >= 1e3
        ? `${(creditLimit / 1e3).toFixed(0)}K`
        : `${creditLimit}`;

  return (
    <div className="metrics-wrapper">
      <div className="metrics-card">
        <div className="metrics-columns">
          {/* Left: Net balance */}
          <div className="metrics-col metrics-col--left">
            <MetricsInfoTooltip label="Net balance">
              <span className="metrics-info-body">
                The sum of all your currency positions in USD. Positive balances (bought or deposited) add to it, negative balances (sold using credit) subtract from it. This is how much you can withdraw right now.
              </span>
              <span className="metrics-info-divider" />
              <span className="metrics-info-formula">
                Net balance = (Net positive balance - Net negative balance)
              </span>
            </MetricsInfoTooltip>
            <div
              className="metrics-value"
              style={{ color: netBalanceValue >= 0 ? '#1c1c1c' : '#ef4444' }}
            >
              <span>{netBalanceParts.integer}</span>
              <span className="metrics-value-decimal" style={netBalanceValue < 0 ? { color: 'rgba(239, 68, 68, 0.35)' } : undefined}>{netBalanceParts.decimal}</span>
              {' '}
              <MatrixLoader
                size={14}
                animate={ratesLoading}
                className={ratesLoading ? 'matrix-loader--once' : ''}
                aria-label={ratesLoading ? 'Fetching rates' : ''}
              />
            </div>
            <div className="metrics-subtitle">
              {isModelB ? (
                <>
                  <MetricsTooltip
                    type="positive"
                    totalUsd={equity}
                    description="Your net positive balances minus your net negative balances in USD."
                    footer="Account equity = Net positive balance - Net negative balance"
                  >
                    <span className="metrics-subtitle-item">Account equity</span>
                  </MetricsTooltip>
                  {extraOwedAboveLimit > 0 && (
                    <>
                      <span className="metrics-subtitle-sep">-</span>
                      <MetricsTooltip
                        type="negative"
                        totalUsd={obligations}
                        description="Sum of your negative balances across cash and digital assets."
                        items={obligationsBreakdown}
                        footer="Settle by depositing in these respective currencies or converting from another balance. Settling unlocks more for withdrawal."
                      >
                        <span className="metrics-subtitle-item">Owed above credit line</span>
                      </MetricsTooltip>
                    </>
                  )}
                </>
              ) : (
                <>
                  <MetricsTooltip
                    type="positive"
                    totalUsd={holdings}
                    description="Sum of your positive balances across cash and digital assets."
                    items={holdingsBreakdown}
                    footer="Positive balances can be used to make more trades or settle negative balances"
                  >
                    <span className="metrics-subtitle-item">Net positive balance</span>
                  </MetricsTooltip>
                  <span className="metrics-subtitle-sep">-</span>
                  <MetricsTooltip
                    type="negative"
                    totalUsd={obligations}
                    description="Sum of your negative balances across cash and digital assets."
                    items={obligationsBreakdown}
                    footer="Settle by depositing in these respective currencies or converting from another balance. Settling unlocks more for withdrawal."
                  >
                    <span className="metrics-subtitle-item">{isModelC ? 'Unsettled balance' : 'Net negative balance'}</span>
                  </MetricsTooltip>
                </>
              )}
            </div>
          </div>

          {/* Right: Unsettled balance (Model C) / Available credit (others) */}
          <div className="metrics-col">
            {isModelC ? (
              <MetricsInfoTooltip label="Unsettled balance">
                <span className="metrics-info-body">
                  The total of your negative balances across all positions, shown against your credit line ceiling.
                </span>
                <span className="metrics-info-divider" />
                <span className="metrics-info-body">
                  New trades that utilize credit increase it, settling negative balances reduces it
                </span>
                <span className="metrics-info-formula">
                  Unsettled balance = Net negative balance (capped at Credit line)
                </span>
              </MetricsInfoTooltip>
            ) : (
              <MetricsInfoTooltip label="Available credit">
                <span className="metrics-info-body">
                  Your credit line minus your negative balances in USD. This is how much you can trade using credit.
                </span>
                <span className="metrics-info-divider" />
                <span className="metrics-info-body">
                  New trades that utilize credit reduce it, settling negative balances restores it
                </span>
                <span className="metrics-info-divider" />
                <span className="metrics-info-formula">
                  Available credit = (Credit line - Net Negative balance)
                </span>
              </MetricsInfoTooltip>
            )}
            {isModelC ? (
              <div className="metrics-value">
                <span>{formatValueParts(obligations).integer}</span>
                {obligations % 1 !== 0 && (
                  <span className="metrics-value-decimal">{formatValueParts(obligations).decimal}</span>
                )}
                <span style={{ color: 'rgba(28,28,28,0.35)' }}> / {creditShorthand}</span>
              </div>
            ) : (
              <div className="metrics-value">
                <span>{creditParts.integer}</span>
                <span className="metrics-value-decimal">{creditParts.decimal}</span>
              </div>
            )}
            <div className="metrics-subtitle">
              {isModelC ? (
                <MetricsTooltip
                  type="credit"
                  creditLimit={creditLimit}
                  creditShorthand={creditShorthand}
                  description="Additional trading capacity beyond your deposits, denominated in USD. Can be used to trade in any supported currency"
                >
                  <span className="metrics-subtitle-item">Capped by your credit line</span>
                </MetricsTooltip>
              ) : (
                <>
                  <MetricsTooltip
                    type="positive"
                    totalUsd={holdings}
                    description="Sum of your positive balances across cash and digital assets."
                    items={holdingsBreakdown}
                    footer="Positive balances can be used to make more trades or settle negative balances"
                  >
                    <span className="metrics-subtitle-item">Collateral</span>
                  </MetricsTooltip>
                  <span className="metrics-subtitle-sep">+</span>
                  <MetricsTooltip
                    type="credit"
                    creditLimit={creditLimit}
                    creditShorthand={creditShorthand}
                    description="Additional trading capacity beyond your deposits, denominated in USD. Can be used to trade in any supported currency"
                  >
                    <span className="metrics-subtitle-item">Remaining credit</span>
                  </MetricsTooltip>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* HEADSUP banner */}
      <div className="metrics-headsup">
        <span className="metrics-headsup-tag">HEADSUP</span>
        <span className="metrics-headsup-dot" aria-hidden="true">&bull;</span>
        <span className="metrics-headsup-text">
          {isModelC
            ? 'Your traded amounts are always locked. Clear your unsettled balances to withdraw your entire traded balance'
            : 'Your traded amounts are always locked. Settle your negative balances to withdraw your entire traded balance'}
        </span>
      </div>
    </div>
  );
}
