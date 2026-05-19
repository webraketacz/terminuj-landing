import React, { useState, useEffect, useRef } from 'react';
import { CLIENTS, CARD_BASE } from '../../lib/heroMockData';

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function usePRM() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

function animateCounter(from, to, duration, setter) {
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const e = 1 - Math.pow(1 - p, 3);
    setter(Math.round(from + (to - from) * e));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export default function ClientsCard({ className, style }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef);
  const reduced = usePRM();

  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      if (!reduced) {
        animateCounter(0, 247, 1400, setCount);
      } else {
        setCount(247);
      }
    }
  }, [inView, reduced]);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...CARD_BASE,
        gridColumn: 'span 2',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        ...(hovered
          ? {
              transform: 'translateY(-3px)',
              boxShadow:
                '0 8px 24px rgba(14,14,16,.10), 0 20px 48px rgba(14,14,16,.08)',
            }
          : {}),
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setHoveredIdx(null);
      }}
    >
      {/* Avatars row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Avatar strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          {CLIENTS.map((client, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                marginLeft: i === 0 ? 0 : '-12px',
                zIndex: CLIENTS.length - i,
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: client.color,
                  border: '2.5px solid #fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'default',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  {client.initials}
                </span>
              </div>
              {/* Tooltip */}
              {hoveredIdx === i && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '110%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(26,26,26,0.92)',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 500,
                    padding: '4px 10px',
                    borderRadius: '999px',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    zIndex: 100,
                  }}
                >
                  {client.name} · {client.bookings} rezervací
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: show all button */}
        <button
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#6B5BFF',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 0',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            marginLeft: '12px',
          }}
        >
          Zobrazit všechny →
        </button>
      </div>

      {/* Count label */}
      <div style={{ fontSize: '13px', color: 'var(--ink-secondary)' }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '16px',
            color: 'var(--ink-primary)',
          }}
        >
          {count}
        </span>{' '}
        klientů tento měsíc
      </div>
    </div>
  );
}
