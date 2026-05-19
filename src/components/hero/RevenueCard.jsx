import React, { useState, useEffect, useRef } from 'react';
import { SPARKLINE_DATA, CARD_BASE } from '../../lib/heroMockData';
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

function sparkPath(data, W = 100, H = 34) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = W / (data.length - 1);
  const pts = data.map((v, i) => ({
    x: i * step,
    y: H - ((v - min) / range) * H * 0.88 + H * 0.04,
  }));
  return pts.reduce((d, p, i) => {
    if (i === 0) return `M${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    const pr = pts[i - 1];
    const cx = (pr.x + p.x) / 2;
    return `${d} C${cx.toFixed(1)},${pr.y.toFixed(1)} ${cx.toFixed(1)},${p.y.toFixed(1)} ${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }, '');
}

export default function RevenueCard({ className, style }) {
  const cardRef = useRef(null);
  const pathRef = useRef(null);
  const inView = useInView(cardRef);
  const reduced = usePRM();
  const { state } = useHero();
  const { revenue } = state;

  const [display, setDisplay] = useState(0);
  const prevRevenue = useRef(0);
  const hasAnimatedIn = useRef(false);
  const [animated, setAnimated] = useState(false);
  const [pathLength, setPathLength] = useState(300);
  const [counterKey, setCounterKey] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Measure path length once rendered
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      if (len > 0) setPathLength(len);
    }
  }, []);

  // Animate in on first inView
  useEffect(() => {
    if (inView && !hasAnimatedIn.current) {
      hasAnimatedIn.current = true;
      if (!reduced) {
        animateCounter(0, revenue, 1200, setDisplay);
        setAnimated(true);
      } else {
        setDisplay(revenue);
        setAnimated(true);
      }
      prevRevenue.current = revenue;
    }
  }, [inView, reduced, revenue]);

  // Animate counter on revenue change (after first inView)
  useEffect(() => {
    if (!hasAnimatedIn.current) return;
    const from = prevRevenue.current;
    if (from === revenue) return;
    if (!reduced) {
      animateCounter(from, revenue, 500, setDisplay);
    } else {
      setDisplay(revenue);
    }
    prevRevenue.current = revenue;
    setCounterKey((k) => k + 1);
  }, [revenue, reduced]);

  const path = sparkPath(SPARKLINE_DATA);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...CARD_BASE,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
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
      <span
        style={{
          fontSize: '11px',
          fontWeight: 500,
          color: 'var(--ink-tertiary)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        Tržby dnes
      </span>

      <div
        key={counterKey}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(22px, 3vw, 28px)',
          fontWeight: 900,
          color: '#1A1A1A',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          animation: counterKey > 0 && !reduced ? 'hero-count-up 0.3s ease both' : undefined,
        }}
      >
        {display.toLocaleString('cs-CZ')} Kč
      </div>

      {/* Sparkline */}
      <svg
        viewBox="0 0 100 36"
        width="100%"
        height="36"
        style={{ display: 'block', overflow: 'visible' }}
        aria-hidden
      >
        <defs>
          <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16B364" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#16B364" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Fill area */}
        <path
          d={`${path} L100,36 L0,36 Z`}
          fill="url(#spark-fill)"
        />
        {/* Line */}
        <path
          ref={pathRef}
          d={path}
          fill="none"
          stroke="#16B364"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: animated ? 0 : pathLength,
            transition: animated && !reduced ? 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)' : undefined,
          }}
        />
      </svg>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#16B364',
          }}
        >
          ↑ +18 %
        </span>
        <span style={{ fontSize: '12px', color: 'var(--ink-tertiary)' }}>od včerejška</span>
      </div>
    </div>
  );
}
