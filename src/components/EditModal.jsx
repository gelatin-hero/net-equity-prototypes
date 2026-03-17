import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { CURRENCIES, BASE_RATES, getDefaultRateRangeBips } from '../constants/currencies';
import { CurrencyFlag } from './CurrencyFlag';
import { calculateTotals } from '../utils/calculations';
import { fmtUSD } from '../utils/format';

const STABLECOINS = new Set(['USD', 'USDC', 'USDT']);

/** Map from our currency codes to common API codes (most are identical). */
const API_CODE_MAP = { USDC: null, USDT: null, EURC: null };
const toApiCode = (code) => (code in API_CODE_MAP ? API_CODE_MAP[code] : code);

const TABS = [
  { id: 'balances', label: 'Balances & credit' },
  { id: 'fluctuation', label: 'Rates & fluctuation (bips)' },
];

export function EditModal({ open, onClose, balances, rates, creditLimit, rateRangeBips, baseRates: baseRatesProp, disabledCurrencies = {}, onSave }) {
  const [activeTab, setActiveTab] = useState('balances');
  const [editCreditLimit, setEditCreditLimit] = useState(String(creditLimit));
  const [editBalances, setEditBalances] = useState({ ...balances });
  const [editDisabledCurrencies, setEditDisabledCurrencies] = useState({});
  const [editBaseRates, setEditBaseRates] = useState(() => ({ ...BASE_RATES, ...(baseRatesProp || {}) }));
  const [editRateRangeBips, setEditRateRangeBips] = useState(() => ({
    ...getDefaultRateRangeBips(),
    ...(rateRangeBips || {}),
  }));
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState(null);

  useEffect(() => {
    if (open) {
      setEditCreditLimit(String(creditLimit));
      setEditBalances({ ...balances });
      setEditDisabledCurrencies({ ...disabledCurrencies });
      setEditBaseRates({ ...BASE_RATES, ...(baseRatesProp || {}) });
      const source = { ...getDefaultRateRangeBips(), ...(rateRangeBips || {}) };
      setEditRateRangeBips(
        Object.fromEntries(
          Object.entries(source).map(([k, v]) => [
            k,
            { minBips: v?.minBips ?? 0, maxBips: v?.maxBips ?? 0 },
          ])
        )
      );
      setSyncError(null);
      setSyncSuccess(false);
    }
  }, [open, creditLimit, balances, disabledCurrencies, rateRangeBips, baseRatesProp]);

  const cl = parseFloat(editCreditLimit) || 0;
  const previewTotals = calculateTotals(editBalances, rates, cl);
  const equity = previewTotals.equity;
  const available = previewTotals.creditRemaining;

  const handleBalanceChange = (code, value) => {
    setEditBalances((prev) => ({ ...prev, [code]: parseFloat(value) || 0 }));
  };

  const handleRateRangeChange = (code, field, value) => {
    const n = value === '' ? 0 : parseInt(value, 10);
    if (Number.isNaN(n)) return;
    setEditRateRangeBips((prev) => ({
      ...prev,
      [code]: { ...(prev[code] ?? {}), [field]: n },
    }));
  };

  const handleBaseRateChange = (code, value) => {
    const n = value === '' ? 0 : parseFloat(value);
    if (Number.isNaN(n)) return;
    setEditBaseRates((prev) => ({ ...prev, [code]: n }));
  };

  const handleCurrencyEnabledChange = (code, enabled) => {
    setEditDisabledCurrencies((prev) => {
      const next = { ...prev };
      if (enabled) delete next[code];
      else next[code] = true;
      return next;
    });
  };

  const handleSyncLiveRates = async () => {
    setSyncing(true);
    setSyncError(null);
    setSyncSuccess(false);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.result !== 'success') throw new Error(data['error-type'] || 'Unknown error');
      const apiRates = data.rates;
      setEditBaseRates((prev) => {
        const next = { ...prev };
        for (const code of Object.keys(CURRENCIES)) {
          const apiCode = toApiCode(code);
          if (apiCode == null) continue; // skip stablecoins with no API equivalent
          if (apiRates[apiCode] != null) {
            // API returns units-per-USD; we store USD-per-unit
            next[code] = +(1 / apiRates[apiCode]).toPrecision(6);
          }
        }
        return next;
      });
      setSyncSuccess(true);
      setLastSyncedAt(new Date());
      setTimeout(() => setSyncSuccess(false), 3000);
    } catch (err) {
      setSyncError(err.message || 'Failed to fetch live rates');
    } finally {
      setSyncing(false);
    }
  };

  const handleSave = () => {
    const nextBalances = { ...editBalances };
    const nextCreditLimit = cl;
    const nextRateRangeBips = { ...editRateRangeBips };
    const nextDisabledCurrencies = { ...editDisabledCurrencies };
    const nextBaseRates = { ...editBaseRates };
    onSave(nextBalances, nextCreditLimit, nextRateRangeBips, nextDisabledCurrencies, nextBaseRates);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Balances & Settings">
      <div className="edit-tabs" role="tablist" aria-label="Edit sections">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeTab === id}
            aria-controls={`edit-panel-${id}`}
            id={`edit-tab-${id}`}
            className={`edit-tab ${activeTab === id ? 'edit-tab--active' : ''}`}
            onClick={() => setActiveTab(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="modal-body">
        {activeTab === 'balances' && (
          <div id="edit-panel-balances" role="tabpanel" aria-labelledby="edit-tab-balances" className="edit-tab-panel">
            <div className="edit-section">
              <div className="edit-section-title">Credit Line (USD)</div>
              <input
                type="number"
                className="form-input"
                style={{ textAlign: 'right' }}
                placeholder="Enter credit line"
                value={editCreditLimit}
                onChange={(e) => setEditCreditLimit(e.target.value)}
              />
              <div className="form-hint">The credit line extended to this customer</div>
            </div>

            <div className="edit-section">
              <div className="edit-section-title">Currency Balances</div>
              <p className="form-hint" style={{ marginBottom: 12 }}>
                Negative values = credit used (sold currency you didn't have). Toggle off to hide a currency from the table and from deposit/withdraw/trade.
              </p>
              <div className="edit-balance-list">
                {Object.entries(CURRENCIES).map(([code, info]) => {
                  const val = editBalances[code] ?? 0;
                  const usd = val * (rates[code] ?? 0);
                  const isEnabled = !editDisabledCurrencies[code];
                  return (
                    <div key={code} className="edit-row edit-balance-row">
                      <span className="edit-flag">
                        <CurrencyFlag code={code} fallback={info.flag} size={24} />
                      </span>
                      <span className="edit-code">{code}</span>
                      <input
                        type="number"
                        className="form-input edit-input"
                        value={val}
                        onChange={(e) => handleBalanceChange(code, e.target.value)}
                      />
                      <span className={`edit-usd ${usd < 0 ? 'negative' : ''}`}>
                        {fmtUSD(usd)}
                      </span>
                      <label className="currency-toggle" title={isEnabled ? 'Hide currency from table and flows' : 'Show currency'}>
                        <input
                          type="checkbox"
                          role="switch"
                          aria-label={`${isEnabled ? 'Disable' : 'Enable'} ${code}`}
                          checked={isEnabled}
                          onChange={(e) => handleCurrencyEnabledChange(code, e.target.checked)}
                        />
                        <span className="currency-toggle-slider" aria-hidden="true" />
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="edit-preview">
              <div className="edit-preview-row">
                <span className="edit-preview-label">Preview equity</span>
                <span className={`edit-preview-value ${equity < 0 ? 'negative' : ''}`}>
                  {fmtUSD(equity)}
                </span>
              </div>
              <div className="edit-preview-row">
                <span className="edit-preview-label">Preview available credit</span>
                <span className="edit-preview-value">{fmtUSD(available)}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fluctuation' && (
          <div id="edit-panel-fluctuation" role="tabpanel" aria-labelledby="edit-tab-fluctuation" className="edit-tab-panel">
            <div className="edit-section">
              <div className="edit-section-title-row">
                <div>
                  <div className="edit-section-title">Base rates & daily fluctuation</div>
                  <p className="form-hint" style={{ marginBottom: 0 }}>
                    1 bip = 0.01 %. Min/max define how far the rate can move from the base. Stablecoins are locked.
                  </p>
                </div>
              </div>
              {syncError && <div className="alert alert-error" style={{ marginBottom: 12 }}>{syncError}</div>}

              <div className="btn-sync-row" style={{ marginBottom: 12 }}>
                <button
                  type="button"
                  className={`btn btn-outline btn-sync ${syncing ? 'btn-sync--loading' : ''} ${syncSuccess ? 'btn-sync--success' : ''}`}
                  disabled={syncing}
                  onClick={handleSyncLiveRates}
                >
                  {syncing ? (
                    <>
                      <span className="btn-sync-spinner" aria-hidden="true" />
                      Syncing…
                    </>
                  ) : syncSuccess ? (
                    <>
                      <span className="btn-sync-check" aria-hidden="true">✓</span>
                      Synced
                    </>
                  ) : (
                    <>
                      <span className="btn-icon-wrap" aria-hidden="true">
                        <img src="/assets/icons/refresh.svg" alt="" className="btn-icon-img" style={{ width: 14, height: 14 }} />
                      </span>
                      Sync live rates
                    </>
                  )}
                </button>
                {lastSyncedAt && (
                  <span className="last-synced-text">
                    Last synced {lastSyncedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>

              {/* Column labels */}
              <div className="edit-rate-range-header">
                <span className="edit-rate-range-header-spacer" />
                <span className="edit-rate-range-col-label">Min bips</span>
                <span className="edit-rate-range-col-label edit-rate-range-col-label--base">Base rate (USD)</span>
                <span className="edit-rate-range-col-label">Max bips</span>
              </div>

              <div className="edit-rate-range-list">
                {Object.entries(CURRENCIES).map(([code, info]) => {
                  const range = editRateRangeBips[code] ?? { minBips: 0, maxBips: 0 };
                  const baseRate = editBaseRates[code] ?? 0;
                  const isStable = STABLECOINS.has(code);
                  return (
                    <div key={code} className={`edit-row edit-rate-range-row ${isStable ? 'edit-rate-range-row--stable' : ''}`}>
                      <span className="edit-flag">
                        <CurrencyFlag code={code} fallback={info.flag} size={24} />
                      </span>
                      <span className="edit-code">{code}</span>
                      <input
                        type="number"
                        className="form-input edit-input edit-input-bips"
                        placeholder="Min"
                        value={range.minBips}
                        disabled={isStable}
                        onChange={(e) => handleRateRangeChange(code, 'minBips', e.target.value)}
                      />
                      <input
                        type="number"
                        className="form-input edit-input edit-input-base-rate"
                        placeholder="Base"
                        step="any"
                        value={baseRate}
                        disabled={isStable}
                        onChange={(e) => handleBaseRateChange(code, e.target.value)}
                      />
                      <input
                        type="number"
                        className="form-input edit-input edit-input-bips"
                        placeholder="Max"
                        value={range.maxBips}
                        disabled={isStable}
                        onChange={(e) => handleRateRangeChange(code, 'maxBips', e.target.value)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" style={{ background: '#f3f4f6', color: '#374151' }} onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save changes
        </button>
      </div>
    </Modal>
  );
}
