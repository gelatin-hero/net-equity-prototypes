import { fmtUSD } from '../utils/format';
import { MetricsTooltip } from './MetricsTooltip';
import { MatrixLoader } from './MatrixLoader';

export function MetricsSection({ totals, model = 'A', ratesLoading = false }) {
  const {
    holdings, obligations, equity,
    availableCredit, collateral, creditUsed, creditRemaining, availableToWithdraw,
    creditLimit, holdingsBreakdown, obligationsBreakdown,
  } = totals;

  // For Model B breakdowns: how much of what you owe sits above the credit limit
  const extraOwedAboveLimit = Math.max(0, obligations - creditLimit);
  // Actual calculation (can be negative when net negative balance exceeds credit limit)
  const actualRemainingCredit = creditLimit - creditUsed;

  if (model === 'B') {
    return (
      <div className="metrics-section">
        {/* ── Your Funds ── */}
        <div>
          <div className="label">Net balance</div>
          <div
            id="trade-amount"
            className="value-large"
            style={{ color: availableToWithdraw >= 0 ? '#1c1c1c' : '#ef4444' }}
          >
            {fmtUSD(availableToWithdraw)}{' '}
            <span className="title-loader" aria-hidden="true">
              <MatrixLoader
                size={14}
                animate={ratesLoading}
                className={ratesLoading ? 'matrix-loader--once' : ''}
                aria-label={ratesLoading ? 'Fetching rates' : ''}
              />
            </span>
          </div>
          <div className="value-breakdown">
            <MetricsTooltip
              label="Account equity"
              formula="Net positive balance − Net negative balance"
              items={{ positives: holdingsBreakdown, negatives: obligationsBreakdown }}
            >
              <span>Account equity <span>(<span>{fmtUSD(equity)}</span>)</span></span>
            </MetricsTooltip>
            {extraOwedAboveLimit > 0 && (
              <>
                {' − '}
                <MetricsTooltip
                  label="Owed above credit limit"
                  formula={`Authorized credit limit: ${fmtUSD(creditLimit)}. Sum of net negative balances: ${fmtUSD(obligations)}. The amount by which net negative balance exceeds the limit is owed above the limit (locks equity and cannot be withdrawn).`}
                  items={{ negatives: obligationsBreakdown }}
                >
                  <span>Owed above credit limit <span>(<span>{fmtUSD(extraOwedAboveLimit)}</span>)</span></span>
                </MetricsTooltip>
              </>
            )}
          </div>
        </div>
        {/* ── Your Credit ── */}
        <div>
          <div className="label">Available credit</div>
          <div id="equity-amount" className="value-large">
            {fmtUSD(creditRemaining)}
          </div>
          <div className="value-breakdown">
            <MetricsTooltip
              label="Your collateral"
              formula="max(0, Equity) — Excess deposits that can be used to back additional trading capacity"
              items={{ positives: holdingsBreakdown, negatives: obligationsBreakdown }}
            >
              <span>Collateral <span>(<span>{fmtUSD(collateral)}</span>)</span></span>
            </MetricsTooltip>
            {' + '}
            <MetricsTooltip
              label="Remaining credit"
              formula={`Original credit limit ${fmtUSD(creditLimit)} minus your net negative balances (${fmtUSD(obligations)})`}
              items={{ negatives: obligationsBreakdown }}
            >
              <span>
                Remaining credit{' '}
                <span>
                  (<span style={{ color: actualRemainingCredit < 0 ? '#ef4444' : undefined }}>
                    {fmtUSD(actualRemainingCredit)}
                  </span>)
                </span>
              </span>
            </MetricsTooltip>
          </div>
        </div>
      </div>
    );
  }

  // ── Model C: Fixed credit limit (no collateral counted in available credit) ──
  if (model === 'C') {
    const fixedCreditRemaining = Math.max(0, availableCredit ?? (creditLimit - obligations));
    return (
      <div className="metrics-section">
        {/* Left: Account equity */}
        <div>
          <div className="label">
            Net balance
          </div>
          <div
            id="equity-amount"
            className="value-large"
            style={{ color: equity >= 0 ? '#1c1c1c' : '#ef4444' }}
          >
            {fmtUSD(equity)}{' '}
            <span className="title-loader" aria-hidden="true">
              <MatrixLoader
                size={14}
                animate={ratesLoading}
                className={ratesLoading ? 'matrix-loader--once' : ''}
                aria-label={ratesLoading ? 'Fetching rates' : ''}
              />
            </span>
          </div>
          <div className="value-breakdown">
            <MetricsTooltip
              label="Account equity"
              formula="Net positive balance − Net negative balance"
              items={{ positives: holdingsBreakdown, negatives: obligationsBreakdown }}
            >
              <span>Account equity <span>(<span>{fmtUSD(equity)}</span>)</span></span>
            </MetricsTooltip>
          </div>
        </div>
        {/* Right: Available credit (fixed limit, no collateral) */}
        <div>
          <div className="label">
            Available credit
          </div>
          <div id="trade-amount" className="value-large">
            {fmtUSD(fixedCreditRemaining)}
          </div>
          <div className="value-breakdown">
            <MetricsTooltip
              label="Credit limit"
              formula="Fixed credit line for this account"
              items={[]}
            >
              <span>Credit limit <span>(<span>{fmtUSD(creditLimit)}</span>)</span></span>
            </MetricsTooltip>
            {' − '}
            <MetricsTooltip
              label="Net negative positions (credit used)"
              formula="Sum of all negative currency balances in USD"
              items={{ negatives: obligationsBreakdown }}
            >
              <span>Net negative positions <span>(<span>{fmtUSD(obligations)}</span>)</span></span>
            </MetricsTooltip>
          </div>
        </div>
      </div>
    );
  }

  // ── Model A (default) ──
  return (
    <div className="metrics-section">
      {/* Left: Account equity */}
      <div>
        <div className="label">
          Net balance
        </div>
        <div
          id="equity-amount"
          className="value-large"
          style={{ color: equity >= 0 ? '#1c1c1c' : '#ef4444' }}
        >
          {fmtUSD(equity)}{' '}
          <span className="title-loader" aria-hidden="true">
            <MatrixLoader
              size={14}
              animate={ratesLoading}
              className={ratesLoading ? 'matrix-loader--once' : ''}
              aria-label={ratesLoading ? 'Fetching rates' : ''}
            />
          </span>
        </div>
        <div className="value-breakdown">
          <MetricsTooltip
            label="Account equity"
            formula="Net positive balance − Net negative balance"
            items={{ positives: holdingsBreakdown, negatives: obligationsBreakdown }}
          >
            <span>Account equity <span>(<span>{fmtUSD(equity)}</span>)</span></span>
          </MetricsTooltip>
        </div>
      </div>
      {/* Right: Available credit (includes collateral, same as Model B) */}
      <div>
        <div className="label">
          Available credit
        </div>
        <div id="trade-amount" className="value-large">
          {fmtUSD(creditRemaining)}
        </div>
        <div className="value-breakdown">
          <MetricsTooltip
            label="Your collateral"
            formula="max(0, Equity) — Excess deposits that can be used to back additional trading capacity"
            items={{ positives: holdingsBreakdown, negatives: obligationsBreakdown }}
          >
            <span>Collateral <span>(<span>{fmtUSD(collateral)}</span>)</span></span>
          </MetricsTooltip>
          {' + '}
          <MetricsTooltip
            label="Remaining credit"
            formula={`Original credit limit ${fmtUSD(creditLimit)} minus your net negative balances (${fmtUSD(obligations)})`}
            items={{ negatives: obligationsBreakdown }}
          >
            <span>
              Remaining credit{' '}
              <span>
                (<span style={{ color: actualRemainingCredit < 0 ? '#ef4444' : undefined }}>
                  {fmtUSD(actualRemainingCredit)}
                </span>)
              </span>
            </span>
          </MetricsTooltip>
        </div>
      </div>
    </div>
  );
}
