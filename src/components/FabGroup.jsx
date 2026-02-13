import { EditIcon } from './EditIcon';

const ICONS_BASE = '/assets/icons';

/** Shared color for FAB icons (refresh, auto-refresh, and edit) so they stay in sync. */
const FAB_ICON_COLOR = '#999999';

export function FabGroup({
  onSimulateFx,
  onEdit,
  onRefresh,
  onToggleLogs,
  onToggleAutoRefresh,
  autoRefreshing = false,
  ratesLoading = false,
  logsOpen = false,
}) {
  return (
    <div className="fab-group">
      <button
        type="button"
        className={`fab ${logsOpen ? 'fab--active' : ''}`}
        onClick={onToggleLogs}
        title="Transaction logs"
        aria-expanded={logsOpen}
        aria-controls="logs-drawer"
      >
        <span className="fab-icon-wrap">
          <img
            className="fab-icon-img"
            src={`${ICONS_BASE}/history.svg`}
            alt=""
            onError={(e) => {
              e.target.style.display = 'none';
              const next = e.target.nextElementSibling;
              if (next) next.style.display = 'inline';
            }}
          />
          <span style={{ display: 'none' }}>📋</span>
        </span>
      </button>
      <button type="button" className="fab" onClick={onRefresh || onSimulateFx} title="Refresh FX rates" disabled={ratesLoading}>
        <span className="fab-icon-wrap">
          <img
            className={`fab-icon-img ${ratesLoading ? 'fab-icon-rotating' : ''}`}
            src={`${ICONS_BASE}/refresh.svg`}
            alt=""
            onError={(e) => {
              e.target.style.display = 'none';
              const next = e.target.nextElementSibling;
              if (next) next.style.display = 'inline';
            }}
          />
          <span style={{ display: 'none' }} className={ratesLoading ? 'fab-icon-rotating' : ''}>↻</span>
        </span>
      </button>
      <button
        type="button"
        className={`fab ${autoRefreshing ? 'fab--active' : ''}`}
        onClick={onToggleAutoRefresh}
        title={autoRefreshing ? 'Pause auto-refresh' : 'Start auto-refresh'}
        aria-pressed={autoRefreshing}
      >
        <span className="fab-icon-wrap">
          <img
            className="fab-icon-img"
            src={`${ICONS_BASE}/${autoRefreshing ? 'pause' : 'play'}.svg`}
            alt=""
            onError={(e) => {
              e.target.style.display = 'none';
              const next = e.target.nextElementSibling;
              if (next) next.style.display = 'inline';
            }}
          />
          <span style={{ display: 'none' }} aria-hidden="true">
            {autoRefreshing ? '⏸' : '▶'}
          </span>
        </span>
      </button>
      <button type="button" className="fab" onClick={onEdit} title="Edit Balances & Settings">
        <span className="fab-icon-wrap">
          <EditIcon color={FAB_ICON_COLOR} size={24} className="fab-icon-img" />
        </span>
      </button>
    </div>
  );
}
