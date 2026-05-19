export function Logo({ size = '1em', color = 'currentColor', accent = '#FF5A3C', className }) {
  const height = typeof size === 'number' ? `${size}px` : size;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 140"
      role="img"
      aria-label="termínuj"
      style={{ height, width: 'auto' }}
      className={className}
    >
      <text
        x="0"
        y="108"
        fill={color}
        style={{
          fontFamily: "'Nunito', system-ui, -apple-system, sans-serif",
          fontWeight: 900,
          fontSize: '128px',
          letterSpacing: '-0.045em',
        }}
      >
        termínuj
      </text>
      <text
        x="445"
        y="108"
        fill={accent}
        style={{
          fontFamily: "'Nunito', system-ui, -apple-system, sans-serif",
          fontWeight: 900,
          fontSize: '128px',
        }}
      >
        .
      </text>
    </svg>
  );
}
