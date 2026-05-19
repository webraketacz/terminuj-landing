import React, { useState, useEffect, useRef } from 'react';
import { CARD_BASE } from '../../lib/heroMockData';
import { useHero } from '../../context/HeroContext';

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

const LOCAL_NOTIF_POOL = [
  { text: 'Připomínka odeslána', detail: '9 klientům', notifType: 'reminder' },
  { text: 'Klient potvrdil', detail: 'Michal Starý', notifType: 'confirm' },
  { text: 'Platba přijata', detail: '680 Kč · Zdeňka', notifType: 'payment' },
  { text: 'Připomínka odeslána', detail: '6 klientům', notifType: 'reminder' },
  { text: 'Klient potvrdil', detail: 'Božena Králová', notifType: 'confirm' },
  { text: 'Platba přijata', detail: '1 100 Kč · Václav', notifType: 'payment' },
];

export default function NotificationCard({ className, style }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef);
  const reduced = usePRM();
  const { state, dispatch } = useHero();
  const { notifications } = state;
  const poolIndexRef = useRef(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!inView || reduced) return;

    const interval = setInterval(() => {
      const item = LOCAL_NOTIF_POOL[poolIndexRef.current % LOCAL_NOTIF_POOL.length];
      poolIndexRef.current += 1;
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { text: item.text, detail: item.detail },
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [inView, reduced, dispatch]);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...CARD_BASE,
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
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--ink-primary)',
            letterSpacing: '-0.01em',
          }}
        >
          Live notifikace
        </span>
        {/* Pulsing red dot */}
        <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px' }}>
          <span
            style={{
              position: 'absolute',
              inset: 0,
              background: '#FF5A3C',
              borderRadius: '50%',
              animation: 'pulse-ring 1.6s ease-out infinite',
              opacity: 0.7,
            }}
          />
          <span
            style={{
              position: 'relative',
              width: '8px',
              height: '8px',
              background: '#FF5A3C',
              borderRadius: '50%',
            }}
          />
        </span>
      </div>

      {/* Notifications list */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {notifications.slice(0, 3).map((n, i) => (
          <React.Fragment key={n.id}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 0',
                animation: i === 0 ? 'hero-notif-in 0.4s cubic-bezier(.34,1.56,.64,1) both' : undefined,
              }}
            >
              {/* Dot */}
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: n.unread ? '#FF5A3C' : '#D1D5DB',
                  flexShrink: 0,
                }}
              />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--ink-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {n.text}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--ink-tertiary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {n.detail}
                </div>
              </div>
            </div>
            {i < notifications.slice(0, 3).length - 1 && (
              <div
                style={{
                  height: '1px',
                  background: 'var(--border)',
                  margin: '0',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
