const ICONS_BASE = '/assets/icons';

function ButtonIcon({ src, fallback }) {
  return (
    <span className="btn-icon-wrap">
      <img
        className="btn-icon-img"
        src={src}
        alt=""
        onError={(e) => {
          e.target.style.display = 'none';
          const next = e.target.nextElementSibling;
          if (next) next.style.display = 'inline';
        }}
      />
      <span className="btn-icon" style={{ display: 'none' }}>{fallback}</span>
    </span>
  );
}

export function ButtonGroup({ onDeposit, onWithdraw }) {
  return (
    <div className="btn-group">
      <button type="button" className="btn btn-primary" onClick={onDeposit}>
        <ButtonIcon src={`${ICONS_BASE}/Deposit.svg`} fallback="⊕" />
        Deposit funds
      </button>
      <button type="button" className="btn btn-secondary" onClick={onWithdraw}>
        <ButtonIcon src={`${ICONS_BASE}/withdraw.svg`} fallback="⊙" />
        Withdraw funds
      </button>
    </div>
  );
}
