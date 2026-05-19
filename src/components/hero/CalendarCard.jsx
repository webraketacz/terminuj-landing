import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DAYS, HOURS, INITIAL_SLOTS, BOOKING_SEQUENCE, CARD_BASE } from '../../lib/heroMockData';
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

function SlotCell({ booking, isNew, onHover }) {
  if (!booking) {
    return (
      <div
        style={{
          height: '22px',
          background: 'var(--surface-hover)',
          borderRadius: '5px',
        }}
      />
    );
  }
  const { name, color } = booking;
  return (
    <div
      onMouseEnter={() => onHover && onHover(booking)}
      onMouseLeave={() => onHover && onHover(null)}
      style={{
        height: '22px',
        background: `${color}18`,
        border: `1px solid ${color}30`,
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '5px',
        paddingRight: '3px',
        overflow: 'hidden',
        cursor: 'default',
        animation: isNew
          ? `hero-slot-in 0.35s cubic-bezier(.34,1.56,.64,1) both`
          : undefined,
        willChange: isNew ? 'transform' : undefined,
        boxShadow: isNew ? `0 0 0 2px ${color}40` : undefined,
      }}
    >
      <span
        style={{
          fontSize: '10px',
          fontWeight: 600,
          color: color,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: 1,
        }}
      >
        {name}
      </span>
    </div>
  );
}

export default function CalendarCard({ className, style }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef);
  const reduced = usePRM();
  const { dispatch } = useHero();

  const [slots, setSlots] = useState({ ...INITIAL_SLOTS });
  const [newKey, setNewKey] = useState(null);
  const [showBadge, setShowBadge] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const [tooltip, setTooltip] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!inView || reduced) return;

    const timers = [];
    const t = (ms, fn) => timers.push(setTimeout(fn, ms));

    const BASE = 1800;
    const STEP = 6000;

    BOOKING_SEQUENCE.forEach((booking, i) => {
      const offset = BASE + i * STEP;
      const key = `${booking.day}-${booking.hour}`;

      t(offset, () => {
        setSlots((prev) => ({
          ...prev,
          [key]: { name: booking.name, service: booking.service, color: booking.color },
        }));
        setNewKey(key);
        setShowBadge(true);
        dispatch({
          type: 'ADD_BOOKING',
          fullName: booking.fullName,
          time: HOURS[booking.hour],
          amount: booking.amount,
          notifType: booking.notifType,
        });
      });

      t(offset + 700, () => {
        setNewKey((prev) => (prev === key ? null : prev));
      });

      t(offset + 2000, () => {
        setShowBadge(false);
      });
    });

    const lastOffset = BASE + (BOOKING_SEQUENCE.length - 1) * STEP;
    t(lastOffset + 2000 + 2000, () => {
      setSlots({ ...INITIAL_SLOTS });
    });
    t(lastOffset + 2000 + 2300, () => {
      setLoopCount((n) => n + 1);
    });

    return () => timers.forEach(clearTimeout);
  }, [inView, reduced, loopCount, dispatch]);

  const handleHover = useCallback((booking) => {
    setTooltip(booking ? { text: `${booking.service}` } : null);
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...CARD_BASE,
        gridColumn: 'span 2',
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
        setTooltip(null);
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--ink-primary)',
            letterSpacing: '-0.01em',
          }}
        >
          Rezervace tento týden
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {showBadge && (
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: '#fff',
                background: '#6B5BFF',
                borderRadius: '999px',
                padding: '2px 8px',
                animation: 'hero-badge-in 2s ease both',
              }}
            >
              +1 rezervace
            </span>
          )}
          {/* Live dot */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '10px',
              color: 'var(--ink-tertiary)',
            }}
          >
            <span style={{ position: 'relative', display: 'inline-flex', width: '7px', height: '7px' }}>
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#16B364',
                  borderRadius: '50%',
                  animation: 'pulse-ring 1.6s ease-out infinite',
                  opacity: 0.7,
                }}
              />
              <span
                style={{
                  position: 'relative',
                  width: '7px',
                  height: '7px',
                  background: '#16B364',
                  borderRadius: '50%',
                }}
              />
            </span>
            živě
          </span>
        </div>
      </div>

      {/* Calendar grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '34px repeat(5, 1fr)',
          rowGap: '3px',
          columnGap: '4px',
        }}
      >
        {/* Row 0: headers */}
        <div />
        {DAYS.map((day, di) => (
          <div
            key={di}
            style={{
              textAlign: 'center',
              fontSize: '10px',
              fontWeight: day.today ? 700 : 500,
              color: day.today ? '#6B5BFF' : 'var(--ink-tertiary)',
              paddingBottom: '4px',
              position: 'relative',
            }}
          >
            {day.label}
            {day.today && (
              <span
                style={{
                  display: 'inline-block',
                  width: '5px',
                  height: '5px',
                  background: '#FF5A3C',
                  borderRadius: '50%',
                  marginLeft: '3px',
                  verticalAlign: 'middle',
                  animation: 'pulse-ring 1.4s ease-out infinite',
                  opacity: 0.9,
                }}
              />
            )}
          </div>
        ))}

        {/* Rows 1-7: time + cells */}
        {HOURS.map((hour, hi) => (
          <React.Fragment key={hi}>
            <div
              style={{
                fontSize: '10px',
                color: 'var(--ink-tertiary)',
                textAlign: 'right',
                paddingRight: '4px',
                lineHeight: '22px',
                height: '22px',
              }}
            >
              {hour}
            </div>
            {DAYS.map((_, di) => {
              const key = `${di}-${hi}`;
              const booking = slots[key] || null;
              return (
                <SlotCell
                  key={key}
                  booking={booking}
                  isNew={newKey === key}
                  onHover={handleHover}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(26,26,26,0.9)',
            color: '#fff',
            fontSize: '11px',
            fontWeight: 500,
            padding: '4px 10px',
            borderRadius: '999px',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
