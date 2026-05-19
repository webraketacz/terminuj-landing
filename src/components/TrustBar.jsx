import React from 'react';

export default function TrustBar() {
  const industries = [
    { icon: 'solar:scissors-square-linear', label: 'Kadeřnictví' },
    { icon: 'solar:magic-stick-3-linear', label: 'Kosmetika' },
    { icon: 'solar:hand-heart-linear', label: 'Masáže' },
    { icon: 'solar:dumbbell-linear', label: 'Fitness' },
    { icon: 'solar:heart-pulse-linear', label: 'Fyzioterapie' },
    { icon: 'solar:meditation-linear', label: 'Wellness' },
    { icon: 'solar:health-linear', label: 'Nutriční poradci' },
    { icon: 'solar:graph-up-linear', label: 'Koučové' },
  ];

  return (
    <section style={{ padding: '40px 0 80px', position: 'relative' }}>
      <div className="container">
        <p
          style={{
            textAlign: 'center',
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--ink-tertiary)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          Pro každé podnikání, které pracuje na rezervaci
        </p>

        <div className="marquee">
          <div className="marquee-track">
            {[...industries, ...industries].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: 'var(--ink-secondary)',
                  fontSize: '15px',
                  fontWeight: 500,
                  flexShrink: 0,
                }}
              >
                <iconify-icon icon={item.icon} width="20" height="20" style={{ color: 'var(--violet)' }}></iconify-icon>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
