const MODELS = [
  // Model A: withdrawals capped only by account equity (no extra credit check)
  { id: 'A', label: 'Equity-only withdrawals', dot: 'a' },
  // Model B: withdrawals also respect credit usage (equity + credit check)
  { id: 'B', label: 'Credit-checked withdrawals', dot: 'b' },
  // Model C: fixed credit limit based solely on net negative positions (deposits don't increase credit limit)
  { id: 'C', label: 'Fixed Credit Limit Model', dot: 'c' },
];

export function ModelTabs({ model, onModelChange }) {
  return (
    <div className="model-tabs" role="tablist" aria-label="Calculation model">
      {MODELS.map(({ id, label, dot }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={model === id}
          className={`model-tab${model === id ? ' model-tab--active' : ''}`}
          onClick={() => onModelChange(id)}
        >
          <span className={`model-tab-dot model-tab-dot--${dot}`} aria-hidden="true" />
          {label}
        </button>
      ))}
    </div>
  );
}
