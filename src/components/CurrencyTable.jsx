import { useState, useMemo, useCallback } from 'react';
import { CURRENCIES } from '../constants/currencies';
import { CurrencyFlag } from './CurrencyFlag';
import { MatrixLoader } from './MatrixLoader';
import { fmtUSD, fmtBal } from '../utils/format';

const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

export function CurrencyTable({ balances, rates, ratesLoading = false, disabledCurrencies = {} }) {
  const [search, setSearch] = useState('');
  const [sortDir, setSortDir] = useState(SORT_DESC);

  const toggleSort = useCallback(() => {
    setSortDir((d) => (d === SORT_DESC ? SORT_ASC : SORT_DESC));
  }, []);

  const enabledEntries = useMemo(
    () => Object.entries(CURRENCIES).filter(([code]) => !disabledCurrencies[code]),
    [disabledCurrencies]
  );

  const filteredEntries = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return enabledEntries;
    return enabledEntries.filter(
      ([code, info]) =>
        code.toLowerCase().includes(q) || info.name.toLowerCase().includes(q)
    );
  }, [search, enabledEntries]);

  const sortedEntries = useMemo(() => {
    const withValues = filteredEntries.map(([code, info]) => {
      const bal = balances[code] ?? 0;
      const usd = bal * (rates[code] ?? 0);
      return { code, info, bal, usd };
    });
    const zeroAtBottom = (a, b) => {
      const aZero = a.bal === 0;
      const bZero = b.bal === 0;
      if (aZero && bZero) return a.code.localeCompare(b.code);
      if (aZero) return 1;
      if (bZero) return -1;
      return 0;
    };
    return [...withValues].sort((a, b) => {
      const byZero = zeroAtBottom(a, b);
      if (byZero !== 0) return byZero;
      const cmp = a.usd - b.usd;
      return sortDir === SORT_ASC ? cmp : -cmp;
    });
  }, [filteredEntries, balances, rates, sortDir]);

  return (
    <>
      <div className="table-header">
        <h2 className="section-title">Currency balances</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-container" role="table" aria-label="Currency balances">
        <div className="table-header-row" role="row">
          <div className="table-header-cell" role="columnheader">Currency</div>
          <div className="table-header-cell" role="columnheader">Balance</div>
          <div className="table-header-cell" role="columnheader">
            <button
              type="button"
              className="sortable-th"
              onClick={toggleSort}
              aria-sort={sortDir === SORT_ASC ? 'ascending' : 'descending'}
              aria-label={`Sort by estimated market value in USD, ${sortDir === SORT_DESC ? 'high to low' : 'low to high'}. Zero balances appear at bottom.`}
            >
              Est. market value in USD
              <span className="sort-icon" aria-hidden="true">
                {sortDir === SORT_DESC ? '↓' : '↑'}
              </span>
            </button>
          </div>
          <div className="table-header-cell" role="columnheader">Rate (to USD)</div>
        </div>
        <div className="table-rows">
          {sortedEntries.map(({ code, info, bal, usd }) => {
            const isNeg = bal < 0;
            return (
              <div key={code} className="table-row" role="row">
                <div className="table-cell" role="cell">
                  <div className="currency-cell">
                    <CurrencyFlag code={code} fallback={info.flag} />
                    <div className="currency-info">
                      <span className="currency-code">{code}</span>
                      <span className="currency-name">{info.name}</span>
                    </div>
                  </div>
                </div>
                <div className={`table-cell ${isNeg ? 'balance-negative' : 'balance-positive'}`} role="cell">
                  {fmtBal(bal)}
                </div>
                <div className="table-cell" role="cell">
                  <div className="usd-cell">
                    <span className={isNeg ? 'usd-negative' : 'usd-positive'}>
                      {fmtUSD(usd)}
                    </span>
                    <MatrixLoader
                      size={14}
                      animate={ratesLoading}
                      className={ratesLoading ? 'matrix-loader--once' : ''}
                      aria-label={ratesLoading ? 'Fetching rate' : 'Rate'}
                    />
                  </div>
                </div>
                <div className="table-cell rate-cell" role="cell">
                  <div className="rate-cell-inner">
                    {(rates[code] ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                    <MatrixLoader
                      size={14}
                      animate={ratesLoading}
                      className={ratesLoading ? 'matrix-loader--once' : ''}
                      aria-label={ratesLoading ? 'Fetching rate' : 'Rate'}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="table-footer">
          Viewing 1–<span id="table-row-count">{sortedEntries.length}</span> of{' '}
          <span id="table-row-total">{enabledEntries.length}</span> rows
        </div>
      </div>
    </>
  );
}
