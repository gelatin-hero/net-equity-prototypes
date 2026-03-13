import { useState, useRef, useEffect, useCallback } from 'react';
import { CURRENCIES } from '../constants/currencies';
import { CurrencyFlag } from './CurrencyFlag';
import { fmtUSD, fmtBal } from '../utils/format';

function formatValueParts(value) {
  const formatted = fmtUSD(value);
  const dotIdx = formatted.lastIndexOf('.');
  if (dotIdx === -1) return { integer: formatted, decimal: '' };
  return { integer: formatted.slice(0, dotIdx), decimal: formatted.slice(dotIdx) };
}

function Divider() {
  return <span className="mtt-divider" />;
}

function CurrencyRow({ item, variant }) {
  const info = CURRENCIES[item.currency] || {};
  const isNeg = item.balance < 0;
  return (
    <span className="mtt-currency-row">
      <span className="mtt-currency-left">
        <CurrencyFlag code={item.currency} fallback={info.flag} size={20} />
        <span className="mtt-currency-code">{item.currency}</span>
        <span className="mtt-currency-bal">
          {fmtBal(item.balance)}
        </span>
      </span>
      <span className={`mtt-currency-usd ${variant === 'negative' || isNeg ? 'mtt-currency-usd--neg' : 'mtt-currency-usd--pos'}`}>
        {isNeg ? `- ${fmtUSD(Math.abs(item.usd))}` : fmtUSD(item.usd)}
      </span>
    </span>
  );
}

/**
 * Tooltip for the subtitle items in MetricsSection.
 *
 * Props:
 * - type: 'positive' | 'negative' | 'credit'
 * - totalUsd: the total USD amount to display as the header value
 * - description: descriptive text below the value
 * - footer: text at the bottom
 * - items: array of { currency, balance, usd }
 * - creditLimit: (credit type only) the credit line number
 * - creditShorthand: (credit type only) e.g. "10M"
 */
export function MetricsTooltip({ type, totalUsd, description, footer, items, creditLimit, creditShorthand, children }) {
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

  const renderCreditContent = () => {
    const parts = creditLimit != null ? formatValueParts(creditLimit) : null;
    return (
      <>
        <span className="mtt-credit-label">Credit line available for trading</span>
        {parts && (
          <span className="mtt-value">
            <span>{parts.integer}</span>
            <span className="mtt-value-decimal">{parts.decimal}</span>
          </span>
        )}
        {creditShorthand && <span className="mtt-credit-shorthand">{creditShorthand}</span>}
        <Divider />
        <span className="mtt-desc">{description}</span>
      </>
    );
  };

  const renderBalanceContent = () => {
    const parts = totalUsd != null ? formatValueParts(Math.abs(totalUsd)) : null;
    const variant = type === 'negative' ? 'negative' : 'positive';
    return (
      <>
        {parts && <span className="mtt-value">{fmtUSD(Math.abs(totalUsd))}</span>}
        <Divider />
        <span className="mtt-desc">{description}</span>
        {items && items.length > 0 && (
          <>
            <Divider />
            {items.map((item) => (
              <CurrencyRow key={item.currency} item={item} variant={variant} />
            ))}
          </>
        )}
        {footer && (
          <>
            <Divider />
            <span className="mtt-footer">{footer}</span>
          </>
        )}
      </>
    );
  };

  return (
    <span
      className="metrics-tooltip-trigger"
      ref={triggerRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          className={`mtt mtt--${position}`}
          ref={tooltipRef}
          role="tooltip"
        >
          {type === 'credit' ? renderCreditContent() : renderBalanceContent()}
        </span>
      )}
    </span>
  );
}
