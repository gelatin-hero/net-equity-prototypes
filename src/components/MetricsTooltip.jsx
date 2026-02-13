import { useState, useRef, useEffect, useCallback } from 'react';
import { CURRENCIES } from '../constants/currencies';
import { CurrencyFlag } from './CurrencyFlag';
import { fmtUSD, fmtBal } from '../utils/format';

export function MetricsTooltip({ label, children, formula, items }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState('below');
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  const groupedItems = items && !Array.isArray(items) ? items : null;
  const positiveTotalUsd = groupedItems?.positives?.reduce(
    (sum, item) => sum + (item.usd ?? 0),
    0
  );
  const negativeTotalUsd = groupedItems?.negatives?.reduce(
    (sum, item) => sum + (item.usd ?? 0),
    0
  );

  const renderRow = (item) => {
    const info = CURRENCIES[item.currency] || {};
    return (
      <span key={item.currency} className="metrics-tooltip-row">
        <span className="metrics-tooltip-row-left">
          <CurrencyFlag code={item.currency} fallback={info.flag} size={16} />
          <span className="metrics-tooltip-code">{item.currency}</span>
          <span className="metrics-tooltip-bal">{fmtBal(item.balance)}</span>
        </span>
        <span className="metrics-tooltip-usd">{fmtUSD(item.usd)}</span>
      </span>
    );
  };

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
    <span
      className="metrics-tooltip-trigger"
      ref={triggerRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          className={`metrics-tooltip metrics-tooltip--${position}`}
          ref={tooltipRef}
          role="tooltip"
        >
          <span className="metrics-tooltip-title">{label}</span>
          {formula && <span className="metrics-tooltip-formula">{formula}</span>}
          {items && (
            <span className="metrics-tooltip-list">
              {Array.isArray(items) ? (
                items.length > 0 ? (
                  items.map(renderRow)
                ) : (
                  <span className="metrics-tooltip-row metrics-tooltip-row--empty">No currencies</span>
                )
              ) : (
                <>
                  {groupedItems?.positives && groupedItems.positives.length > 0 && (
                    <>
                      <span className="metrics-tooltip-group-label">Net positive balance</span>
                      {positiveTotalUsd != null && (
                        <span className="metrics-tooltip-row metrics-tooltip-row--summary">
                          <span className="metrics-tooltip-row-left">
                            <span className="metrics-tooltip-code">Total</span>
                          </span>
                          <span className="metrics-tooltip-usd">{fmtUSD(positiveTotalUsd)}</span>
                        </span>
                      )}
                      {groupedItems.positives.map(renderRow)}
                    </>
                  )}
                  {groupedItems?.negatives && groupedItems.negatives.length > 0 && (
                    <>
                      <span className="metrics-tooltip-group-label">Net negative balance</span>
                      {negativeTotalUsd != null && (
                        <span className="metrics-tooltip-row metrics-tooltip-row--summary">
                          <span className="metrics-tooltip-row-left">
                            <span className="metrics-tooltip-code">Total</span>
                          </span>
                          <span className="metrics-tooltip-usd">{fmtUSD(negativeTotalUsd)}</span>
                        </span>
                      )}
                      {groupedItems.negatives.map(renderRow)}
                    </>
                  )}
                  {(!groupedItems?.positives || groupedItems.positives.length === 0) &&
                    (!groupedItems?.negatives || groupedItems.negatives.length === 0) && (
                      <span className="metrics-tooltip-row metrics-tooltip-row--empty">No currencies</span>
                    )}
                </>
              )}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
