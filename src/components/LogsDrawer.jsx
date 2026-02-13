import { useRef, useEffect } from 'react';
import { CurrencyFlag } from './CurrencyFlag';
import { CURRENCIES } from '../constants/currencies';
import { fmt } from '../utils/format';

const TXN_CONFIG = {
  deposit: { label: 'Deposit', color: '#80D5A8', prefix: '', negative: false },
  withdrawal: { label: 'Withdrawal', color: '#F9A7A0', prefix: '\u2013 ', negative: true },
  bought: { label: 'Bought', color: '#60A5FA', prefix: '', negative: false },
  sold: { label: 'Sold', color: '#FFB556', prefix: '\u2013 ', negative: true },
};

export function LogsDrawer({ open, logs, onClose }) {
  const bodyRef = useRef(null);

  // Auto-scroll to top when new logs arrive (newest at top)
  useEffect(() => {
    if (open && bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  }, [logs.length, open]);

  return (
    <aside
      className={`logs-drawer ${open ? 'logs-drawer--open' : ''}`}
      aria-label="Transaction logs"
      aria-hidden={!open}
    >
      <div className="logs-drawer-inner">
        <div className="logs-header">
          <span className="logs-title">Logs</span>
          <button
            type="button"
            className="logs-close"
            onClick={onClose}
            aria-label="Close logs"
            tabIndex={open ? 0 : -1}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="4" y1="4" x2="12" y2="12" />
              <line x1="12" y1="4" x2="4" y2="12" />
            </svg>
          </button>
        </div>

        <div className="logs-columns">
          <span className="logs-col logs-col--amount">Amount</span>
          <span className="logs-col logs-col--currency">Currency</span>
          <span className="logs-col logs-col--closing">Closing Balance</span>
          <span className="logs-col logs-col--type">Txn. type</span>
        </div>

        <div className="logs-body" ref={bodyRef}>
          {logs.length === 0 ? (
            <div className="logs-empty">
              <span className="logs-empty-icon">📋</span>
              <span>No transactions yet</span>
            </div>
          ) : (
            [...logs].reverse().map((log) => {
              const cfg = TXN_CONFIG[log.type];
              const info = CURRENCIES[log.currency];
              return (
                <div className="log-row" key={log.id}>
                  <span className={`log-cell log-cell--amount ${cfg.negative ? 'log-amount--negative' : 'log-amount--positive'}`}>
                    {cfg.prefix}{fmt(log.amount)}
                  </span>
                  <span className="log-cell log-cell--currency" title={log.currency} aria-label={log.currency}>
                    <CurrencyFlag code={log.currency} fallback={info?.flag} size={18} className="log-flag" />
                  </span>
                  <span className="log-cell log-cell--closing">
                    {log.closingBalance < 0 ? `-${fmt(log.closingBalance)}` : `+${fmt(log.closingBalance)}`}
                  </span>
                  <span className="log-cell log-cell--type">
                    <span className="log-txn-dot" style={{ background: cfg.color }} />
                    <span className="log-txn-label">{cfg.label}</span>
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </aside>
  );
}
