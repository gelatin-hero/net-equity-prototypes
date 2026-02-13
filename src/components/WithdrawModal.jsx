import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { CURRENCIES } from '../constants/currencies';
import { CurrencyFlag } from './CurrencyFlag';
import { getWithdrawable } from '../utils/calculations';
import { fmt, fmtBal, fmtUSD } from '../utils/format';

const ICONS_BASE = '/assets/icons';

export function WithdrawModal({ open, onClose, balances, rates, totals, onWithdraw, disabledCurrencies = {}, model = 'A' }) {
  const [step, setStep] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [amount, setAmount] = useState('');
  const [maxChecked, setMaxChecked] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(1);
      setSelectedCurrency(null);
      setAmount('');
      setMaxChecked(false);
    }
  }, [open]);

  // If selected currency was disabled, clear selection (e.g. stale state)
  useEffect(() => {
    if (open && selectedCurrency && disabledCurrencies[selectedCurrency]) {
      setStep(1);
      setSelectedCurrency(null);
      setAmount('');
      setMaxChecked(false);
    }
  }, [open, selectedCurrency, disabledCurrencies]);

  const w = selectedCurrency
    ? getWithdrawable(selectedCurrency, balances, rates, totals, model)
    : null;
  const withdrawable = w?.withdrawable ?? 0;
  const amountNum = parseFloat(amount) || 0;
  const error = amountNum > withdrawable && selectedCurrency
    ? `Amount exceeds withdrawable balance. Maximum: ${fmt(withdrawable)} ${selectedCurrency}`
    : null;

  const handleSelectCurrency = (code) => {
    const { balance } = getWithdrawable(code, balances, rates, totals, model);
    if (balance > 0) {
      setSelectedCurrency(code);
      setStep(2);
      setAmount('');
      setMaxChecked(false);
    }
  };

  const handleMaxToggle = () => {
    setMaxChecked((prev) => {
      if (!prev && selectedCurrency) {
        const w2 = getWithdrawable(selectedCurrency, balances, rates, totals, model);
        setAmount(w2.withdrawable.toFixed(2));
      }
      return !prev;
    });
  };

  const handleSubmit = () => {
    if (!selectedCurrency || disabledCurrencies[selectedCurrency] || amountNum <= 0 || amountNum > withdrawable) return;
    onWithdraw(selectedCurrency, amountNum);
    onClose();
  };

  const titleIcon = (
    <>
      <img
        className="modal-title-icon-img"
        src={`${ICONS_BASE}/withdraw.svg`}
        alt=""
        onError={(e) => {
          e.target.style.display = 'none';
          const next = e.target.nextElementSibling;
          if (next) next.style.display = 'flex';
        }}
      />
      <span style={{ display: 'none' }}>⊙</span>
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title="Withdrawal request" titleIcon={titleIcon} titleIconVariant="dark">
      {step === 1 && (
        <div className="modal-body">
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>Select currency to withdraw</p>
          <div>
            {Object.entries(CURRENCIES)
              .filter(([code]) => !disabledCurrencies[code])
              .map(([code, info]) => {
              const rawBalance = balances[code] ?? 0;
              const { withdrawable: wAmt } = getWithdrawable(code, balances, rates, totals, model);
              const disabled = rawBalance <= 0;
              return (
                <div
                  key={code}
                  className={`currency-option ${disabled ? 'disabled' : ''}`}
                  onClick={() => !disabled && handleSelectCurrency(code)}
                  onKeyDown={(e) => !disabled && (e.key === 'Enter' || e.key === ' ') && handleSelectCurrency(code)}
                  role="button"
                  tabIndex={disabled ? -1 : 0}
                >
                  <div className="currency-option-left">
                    <span className="currency-option-flag">
                      <CurrencyFlag code={code} fallback={info.flag} size={28} />
                    </span>
                    <div>
                      <div style={{ fontWeight: 600 }}>{code}</div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>{info.name}</div>
                    </div>
                  </div>
                  <div className="currency-option-right">
                    <div className={`currency-option-balance ${rawBalance < 0 ? 'balance-negative' : ''}`}>{fmtBal(rawBalance)}</div>
                    <div className="currency-option-avail">Avail: {fmt(wAmt)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {step === 2 && w && (
        <>
          <div className="withdraw-summary" style={{ borderRadius: 0, margin: 0 }}>
            <div className="withdraw-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="ws-flag-wrap">
                  <CurrencyFlag code={selectedCurrency} fallback={CURRENCIES[selectedCurrency].flag} size={28} />
                </span>
                <div>
                  <div style={{ fontWeight: 600 }}>{selectedCurrency}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{CURRENCIES[selectedCurrency].name}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600 }}>{fmt(w.balance)}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>≈ {fmtUSD(w.balanceUSD)}</div>
              </div>
            </div>
          </div>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb' }}>
            <div className="withdraw-row">
              <div>
                <div className="withdraw-label">Withdrawable balance</div>
                <div className="withdraw-sublabel">
                  {w.held > 0
                    ? `~${fmt(w.held)} ${selectedCurrency} held against unsettled obligations`
                    : 'Full balance available'}
                </div>
              </div>
              <div>
                <div className="withdraw-value">{fmt(w.withdrawable)}</div>
                <div className="withdraw-value-sub">≈ {fmtUSD(w.withdrawableUSD)}</div>
              </div>
            </div>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Enter amount to withdraw</label>
              <input
                type="number"
                className="form-input"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <label className="max-toggle">
              <div className="max-toggle-left">
                <input
                  type="checkbox"
                  checked={maxChecked}
                  onChange={handleMaxToggle}
                />
                <span style={{ fontSize: 13, color: '#374151' }}>Withdraw maximum available balance</span>
              </div>
              <span className="max-badge">MAX</span>
            </label>
            {error && <div className="alert alert-error">{error}</div>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" style={{ background: '#f3f4f6', color: '#374151' }} onClick={() => setStep(1)}>
              Back
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Submit withdrawal
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
