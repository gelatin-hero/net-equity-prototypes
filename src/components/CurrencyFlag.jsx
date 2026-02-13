const FLAGS_BASE = '/assets/flags';

export function CurrencyFlag({ code, fallback, size = 24, className = '' }) {
  const src = `${FLAGS_BASE}/${code}.svg`;
  const wrapClass = className || 'currency-flag-wrap';
  const imgClass = size === 24 ? 'currency-flag-img' : size === 28 ? 'currency-flag-img' : 'currency-flag-img';
  const style = size !== 24 ? { width: size, height: size } : undefined;

  return (
    <span className={wrapClass} style={style}>
      <img
        className={imgClass}
        src={src}
        alt=""
        style={style}
        onError={(e) => {
          e.target.style.display = 'none';
          const next = e.target.nextElementSibling;
          if (next) next.style.display = 'inline';
        }}
      />
      <span className="currency-flag" style={{ display: 'none', width: size, fontSize: Math.max(12, size - 4) }}>
        {fallback}
      </span>
    </span>
  );
}
