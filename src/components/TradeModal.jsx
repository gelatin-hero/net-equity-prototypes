import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { CurrencySelect } from './CurrencySelect';
import { CURRENCIES } from '../constants/currencies';
import { fmt, fmtUSD, fmtAmount } from '../utils/format';

const ICONS_BASE = '/assets/icons';

export function TradeModal({ open, onClose, balances, rates, totals, onTrade, disabledCurrencies = {}, model = 'A' }) {
  const [sellCurrency, setSellCurrency] = useState('USD');
  const [buyCurrency, setBuyCurrency] = useState('GBP');
  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');

  useEffect(() => {
    if (open) {
      const enabled = Object.keys(CURRENCIES).filter((code) => !disabledCurrencies[code]);
      const sell = enabled.includes('USD') ? 'USD' : enabled[0];
      const buy = enabled.includes('GBP') ? 'GBP' : enabled[1] ?? enabled[0];
      setSellCurrency(sell ?? 'USD');
      setBuyCurrency(buy ?? 'GBP');
      setSellAmount('');
      setBuyAmount('');
    }
  }, [open, disabledCurrencies]);

  const parseAmount = (s) => parseFloat(String(s).replace(/,/g, '')) || 0;
  useEffect(() => {
    if (!open || sellCurrency === buyCurrency) return;
    const sn = parseAmount(sellAmount);
    const bn = parseAmount(buyAmount);
    const rS = rates[sellCurrency] ?? 0;
    const rB = rates[buyCurrency] ?? 0;
    if (sn > 0 && rB > 0) {
      setBuyAmount(fmtAmount((sn * rS) / rB));
    } else if (bn > 0 && rS > 0) {
      setSellAmount(fmtAmount((bn * rB) / rS));
    }
  }, [sellCurrency, buyCurrency]);

  const samePair = sellCurrency === buyCurrency;
  const sellNum = parseAmount(sellAmount);
  const buyNum = parseAmount(buyAmount);
  const rateSell = rates[sellCurrency] ?? 0;
  const rateBuy = rates[buyCurrency] ?? 0;

  const sellUsd = sellNum * rateSell;
  const buyUsd = buyNum * rateBuy;
  const effectiveSellNum = sellNum || (rateBuy > 0 ? buyUsd / rateSell : 0);
  const effectiveBuyAmt = buyNum || (rateBuy > 0 ? sellUsd / rateBuy : 0);

  // Selling capacity — same math, different labels per model
  const sellBalance = balances[sellCurrency] ?? 0;
  const balanceCapacity = Math.max(0, sellBalance);

  // Model A & B: single "credit remaining" pool (limit + collateral).
  // Model C: fixed credit limit only (deposits don't raise the limit).
  const capacityUsd = (() => {
    if (model === 'C') {
      return Math.max(0, totals.availableCredit ?? 0);
    }
    // Models A & B — collateral is factored into credit remaining
    return Math.max(0, totals.creditRemaining ?? 0);
  })();
  const capacityInCurrency = rateSell > 0 ? capacityUsd / rateSell : 0;
  const maxSell = balanceCapacity + capacityInCurrency;

  const exceedsMax = effectiveSellNum > maxSell && (sellNum > 0 || buyNum > 0);

  // Build per-source breakdown for the error/capacity display
  const balanceUsdPortion = balanceCapacity * rateSell;
  const creditPortion = (() => {
    if (model === 'C') return totals.availableCredit ?? 0;
    // Models A & B — collateral baked into credit remaining
    return totals.creditRemaining ?? 0;
  })();

  const showExceedsError = exceedsMax;

  const showPreview = (sellNum > 0 || buyNum > 0) && !samePair;
  const fxRate = rateBuy > 0 ? rateSell / rateBuy : 0;

  // Show capacity breakdown when user is entering an amount
  const showCapacity = (sellNum > 0 || buyNum > 0) && !samePair && !exceedsMax;
  const usedFromBalance = Math.min(effectiveSellNum, balanceCapacity);
  const uncoveredAmount = Math.max(0, effectiveSellNum - balanceCapacity);
  const uncoveredUsd = uncoveredAmount * rateSell;
  const usedFromCreditUsd = (() => {
    if (model === 'C') {
      const availCredit = Math.max(0, totals.availableCredit ?? 0);
      return Math.min(uncoveredUsd, availCredit);
    }
    const availCredit = Math.max(0, totals.creditRemaining ?? 0);
    return Math.min(uncoveredUsd, availCredit);
  })();

  const handleSellAmountChange = (value) => {
    setSellAmount(value);
    const num = parseAmount(value);
    if (num > 0 && !samePair && rateBuy > 0) {
      const derived = (num * rateSell) / rateBuy;
      setBuyAmount(fmtAmount(derived));
    } else {
      setBuyAmount('');
    }
  };

  const handleBuyAmountChange = (value) => {
    setBuyAmount(value);
    const num = parseAmount(value);
    if (num > 0 && !samePair && rateSell > 0) {
      const derived = (num * rateBuy) / rateSell;
      setSellAmount(fmtAmount(derived));
    } else {
      setSellAmount('');
    }
  };

  const handleSubmit = () => {
    if (effectiveSellNum <= 0 || samePair || exceedsMax) return;
    onTrade(sellCurrency, buyCurrency, effectiveSellNum);
    onClose();
  };

  const titleIcon = (
    <>
      <img
        className="modal-title-icon-img"
        src={`${ICONS_BASE}/trade.svg`}
        alt=""
        onError={(e) => {
          e.target.style.display = 'none';
          const next = e.target.nextElementSibling;
          if (next) next.style.display = 'flex';
        }}
      />
      <span style={{ display: 'none' }}>⇄</span>
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title="Execute trade" titleIcon={titleIcon} titleIconVariant="dark">
      <div className="modal-body">
        <div className="form-group">
          <label className="form-label" htmlFor="trade-sell-currency">Sell currency</label>
          <CurrencySelect
            id="trade-sell-currency"
            value={sellCurrency}
            onValueChange={setSellCurrency}
            excludeValue={buyCurrency}
            aria-label="Select currency to sell"
            disabledCurrencies={disabledCurrencies}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Amount to sell</label>
          <input
            type="number"
            className="form-input"
            placeholder="Enter amount"
            value={sellAmount}
            onChange={(e) => handleSellAmountChange(e.target.value)}
          />
          {(sellNum > 0 || buyNum > 0) && <div className="form-hint">≈ {fmtUSD(sellUsd || buyUsd)}</div>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="trade-buy-currency">Buy currency</label>
          <CurrencySelect
            id="trade-buy-currency"
            value={buyCurrency}
            onValueChange={setBuyCurrency}
            excludeValue={sellCurrency}
            aria-label="Select currency to buy"
            disabledCurrencies={disabledCurrencies}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Amount to buy</label>
          <input
            type="number"
            className="form-input"
            placeholder="Enter amount"
            value={buyAmount}
            onChange={(e) => handleBuyAmountChange(e.target.value)}
          />
        </div>
        {showPreview && (
          <div className="preview-box indigo">
            <div className="preview-label indigo">Trade preview</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <span style={{ color: 'var(--color-grey-900)', fontWeight: 600 }}>-{fmt(effectiveSellNum)} {sellCurrency}</span>
              <span style={{ color: '#9ca3af' }}>→</span>
              <span style={{ color: '#15803d', fontWeight: 600 }}>+{fmt(effectiveBuyAmt)} {buyCurrency}</span>
            </div>
          </div>
        )}
        {showCapacity && uncoveredAmount > 0 && (
          <div className="trade-capacity-breakdown">
            <div className="trade-capacity-row">
              <span className="trade-capacity-label">From {sellCurrency} balance</span>
              <span className="trade-capacity-value">{fmt(usedFromBalance)} {sellCurrency}</span>
            </div>
            <div className="trade-capacity-row">
              <span className="trade-capacity-label">
                {model === 'C' ? 'From remaining credit' : 'From available credit'}
              </span>
              <span className="trade-capacity-value">{fmtUSD(usedFromCreditUsd)}</span>
            </div>
          </div>
        )}
        {!samePair && (
          <div className="form-hint" style={{ marginTop: 8 }}>
            FX rate: 1 {sellCurrency} = {fxRate > 0 ? fxRate.toFixed(6) : '—'} {buyCurrency}
          </div>
        )}
        {showExceedsError && (
          <div className="trade-capacity-breakdown trade-capacity-breakdown--error">
            <div className="trade-capacity-breakdown-header">
              {model === 'C'
                ? 'Exceeds balance and credit.'
                : `Exceeds maximum sell of ≈ ${fmt(maxSell)} ${sellCurrency}`}
            </div>
            <div className="trade-capacity-row">
              <span className="trade-capacity-label">From {sellCurrency} balance</span>
              <span className="trade-capacity-value">{fmtUSD(balanceUsdPortion)}</span>
            </div>
            <div className="trade-capacity-row">
              <span className="trade-capacity-label">
                {model === 'C' ? 'From remaining credit' : 'From available credit'}
              </span>
              <span className="trade-capacity-value">{fmtUSD(creditPortion)}</span>
            </div>
          </div>
        )}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          <span className="btn-icon-wrap">
            <img
              className="btn-icon-img"
              src={`${ICONS_BASE}/trade.svg`}
              alt=""
              onError={(e) => {
                e.target.style.display = 'none';
                const next = e.target.nextElementSibling;
                if (next) next.style.display = 'inline';
              }}
            />
            <span className="btn-icon" style={{ display: 'none' }}>⇄</span>
          </span>
          Execute trade
        </button>
      </div>
    </Modal>
  );
}
