import { useState, useEffect, useMemo } from 'react';
import { Modal } from './Modal';
import { CURRENCIES } from '../constants/currencies';
import { CurrencyFlag } from './CurrencyFlag';
import { CurrencySelect } from './CurrencySelect';
import { fmt, fmtUSD } from '../utils/format';

const ICONS_BASE = '/assets/icons';

export function DepositModal({ open, onClose, balances, rates, onDeposit, disabledCurrencies = {} }) {
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState('');

  const enabledCodes = useMemo(
    () => Object.keys(CURRENCIES).filter((code) => !disabledCurrencies[code]),
    [disabledCurrencies]
  );

  useEffect(() => {
    if (open) {
      setCurrency(enabledCodes.includes('USD') ? 'USD' : enabledCodes[0] ?? 'USD');
      setAmount('');
    }
  }, [open, enabledCodes]);

  // If current currency was disabled (e.g. in another session/tab), switch to first enabled
  useEffect(() => {
    if (open && currency && disabledCurrencies[currency]) {
      setCurrency(enabledCodes[0] ?? 'USD');
    }
  }, [open, currency, disabledCurrencies, enabledCodes]);

  const amountNum = parseFloat(amount) || 0;
  const showPreview = amountNum > 0;
  const usdHint = amountNum > 0 ? `≈ ${fmtUSD(amountNum * (rates[currency] ?? 0))}` : '';
  const newBalance = amountNum > 0 ? (balances[currency] ?? 0) + amountNum : 0;
  const info = CURRENCIES[currency];

  const handleSubmit = () => {
    if (amountNum > 0 && !disabledCurrencies[currency]) {
      onDeposit(currency, amountNum);
      onClose();
    }
  };

  const titleIcon = (
    <>
      <img
        className="modal-title-icon-img"
        src={`${ICONS_BASE}/Deposit.svg`}
        alt=""
        onError={(e) => {
          e.target.style.display = 'none';
          const next = e.target.nextElementSibling;
          if (next) next.style.display = 'flex';
        }}
      />
      <span style={{ display: 'none' }}>⊕</span>
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title="Deposit funds" titleIcon={titleIcon} titleIconVariant="dark">
      <div className="modal-body">
        <div className="form-group">
          <label className="form-label" htmlFor="deposit-currency">Currency</label>
          <CurrencySelect
            id="deposit-currency"
            value={currency}
            onValueChange={setCurrency}
            aria-label="Select currency to deposit"
            disabledCurrencies={disabledCurrencies}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Amount to deposit</label>
          <input
            type="number"
            className="form-input"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="form-hint">{usdHint}</div>
        </div>
        {showPreview && (
          <div className="preview-box preview-box--summary">
            <div className="preview-label">After deposit</div>
            <div className="preview-value preview-value-row">
              <CurrencyFlag code={currency} fallback={info?.flag} size={20} />
              <span>{currency}: {fmt(newBalance)}</span>
            </div>
          </div>
        )}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Deposit funds
        </button>
      </div>
    </Modal>
  );
}
