export function RateBar({ lastRefresh }) {
  return (
    <div className="rate-info">
      <span className="rate-text">
        Last rate update: <strong id="last-refresh">{lastRefresh}</strong>
      </span>
    </div>
  );
}
