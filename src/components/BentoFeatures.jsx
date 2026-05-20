import React, { useState, useRef, useEffect } from 'react';

/* ── Shared hooks ───────────────────────────────────────────────────────── */
function useInView(ref, threshold = 0.25) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function usePRM() {
  const [r, setR] = useState(
    () => typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const h = e => setR(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return r;
}

/* ── CSS injection ──────────────────────────────────────────────────────── */
const BENTO_CSS = `
  @keyframes bento-cell-flash {
    0%   { background: rgba(107,91,255,0.65); }
    50%  { background: rgba(91,79,233,0.4);  }
    100% { background: rgba(255,255,255,0.08); }
  }
  @keyframes bento-toast {
    0%,100% { opacity:0; transform:translateY(6px) scale(0.96); }
    12%,80% { opacity:1; transform:translateY(0)   scale(1);    }
  }
  @keyframes bento-pulse-dot {
    0%,100% { opacity:1; transform:scale(1);    }
    50%     { opacity:.4; transform:scale(0.82); }
  }
  @keyframes bento-slide-row {
    from { opacity:0; transform:translateX(-10px); }
    to   { opacity:1; transform:translateX(0);     }
  }
  @keyframes bento-plan-in {
    from { opacity:0; transform:translateY(5px); }
    to   { opacity:1; transform:translateY(0);   }
  }
  @media (prefers-reduced-motion: reduce) {
    .bento-anim { animation:none !important; }
  }
`;
function injectBentoCss() {
  if (document.getElementById('bento-css')) return;
  const s = document.createElement('style');
  s.id = 'bento-css';
  s.textContent = BENTO_CSS;
  document.head.appendChild(s);
}

/* ── Card hover handlers ────────────────────────────────────────────────── */
const onCardEnter = e => {
  e.currentTarget.style.transform = 'translateY(-4px)';
  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)';
};
const onCardLeave = e => {
  e.currentTarget.style.transform = '';
  e.currentTarget.style.boxShadow = '';
};

/* ════════════════════════════════════════════════════════════════════════════
   CARD 1 — Balíčky
   ════════════════════════════════════════════════════════════════════════════ */
const PKG_CODES = ['YOGA-A3F2K', 'YOGA-X9M1P', 'YOGA-R7T4Q', 'YOGA-C6N8W', 'YOGA-K2L5J'];

function PackagesCard() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const reduced = usePRM();
  const [showCodes, setShowCodes] = useState(false);
  const [visibleCodes, setVisibleCodes] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastKey, setToastKey] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const timeouts = [];
    const t = (ms, fn) => timeouts.push(setTimeout(fn, ms));

    const runCycle = () => {
      setShowCodes(false);
      setVisibleCodes(0);
      setToastVisible(false);
      t(2400, () => setShowCodes(true));
      PKG_CODES.forEach((_, i) => t(2400 + (i + 1) * 260, () => setVisibleCodes(v => v + 1)));
      t(4000, () => { setToastKey(k => k + 1); setToastVisible(true); });
      t(6800, () => setToastVisible(false));
    };

    runCycle();
    const id = setInterval(runCycle, 9000);
    return () => { timeouts.forEach(clearTimeout); clearInterval(id); };
  }, [inView, reduced]);

  return (
    <div
      ref={ref}
      className="card-premium"
      style={{
        padding: '32px 28px', borderRadius: '28px', minHeight: '480px',
        display: 'flex', flexDirection: 'column',
        transition: 'transform 300ms cubic-bezier(.4,0,.2,1), box-shadow 300ms cubic-bezier(.4,0,.2,1)',
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={onCardEnter}
      onMouseLeave={onCardLeave}
    >
      {/* Email toast */}
      {toastVisible && (
        <div
          key={toastKey}
          style={{
            position: 'absolute', top: 14, right: 14,
            background: '#fff', border: '1px solid var(--border)',
            borderRadius: 12, padding: '8px 12px',
            fontSize: 12, fontWeight: 500, color: 'var(--ink-primary)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            display: 'flex', alignItems: 'center', gap: 6,
            animation: 'bento-toast 2.7s ease-in-out both',
            zIndex: 2, whiteSpace: 'nowrap',
          }}
        >
          <iconify-icon icon="solar:letter-linear" width="14" height="14" style={{ color: 'var(--violet)' }} />
          Kódy odeslány zákazníkovi
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(91,79,233,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--violet)' }}>
            <iconify-icon icon="solar:ticket-sale-linear" width="18" height="18" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-primary)' }}>Balíčky</span>
        </div>
        <h3 style={{ fontSize: '19px', lineHeight: 1.22, marginBottom: 6, fontWeight: 700 }}>
          Prodávejte předplacené vstupy přímo z webu.
        </h3>
        <p style={{ fontSize: 12, color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
          Zákazník zaplatí, okamžitě dostane vouchery a při rezervaci je jednoduše uplatní.
        </p>
      </div>

      {/* Package preview tile */}
      <div style={{
        background: 'var(--surface-hover)', borderRadius: 14, padding: '14px 16px',
        marginBottom: 14, border: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-primary)', marginBottom: 2 }}>10 lekcí jógy</div>
            <div style={{ fontSize: 11, color: 'var(--ink-tertiary)' }}>Jóga pro začátečníky · 365 dní</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'var(--ink-tertiary)', textDecoration: 'line-through' }}>1 500 Kč</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--violet)', fontFamily: 'var(--font-display)', letterSpacing: '-0.04em', lineHeight: 1 }}>990 Kč</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, background: 'rgba(22,179,100,0.1)', color: '#16B364', padding: '3px 8px', borderRadius: 6, fontWeight: 600 }}>
            Ušetříte 510 Kč
          </span>
          <span style={{ fontSize: 11, color: 'var(--ink-tertiary)' }}>· 10 vstupů</span>
        </div>
      </div>

      {/* Dynamic section: hints → generated codes */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {!showCodes ? (
          <>
            <div style={{ fontSize: 10, color: 'var(--ink-tertiary)', marginBottom: 2, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Jak funguje prodej</div>
            {[
              { icon: 'solar:link-circle-linear', text: 'Veřejná stránka s platbou kartou (Stripe)' },
              { icon: 'solar:code-square-linear',  text: 'Iframe embed přímo na váš web' },
              { icon: 'solar:ticket-linear',        text: 'Kódy YOGA-XXXXX vygenerovány automaticky' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-primary)', padding: '6px 0' }}>
                <iconify-icon icon={icon} width="14" height="14" style={{ color: 'var(--violet)', flexShrink: 0 }} />
                {text}
              </div>
            ))}
          </>
        ) : (
          <>
            <div style={{ fontSize: 10, color: 'var(--ink-tertiary)', marginBottom: 2, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Vygenerované kódy</div>
            {PKG_CODES.slice(0, visibleCodes).map(code => (
              <div
                key={code}
                className="bento-anim"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '6px 10px', background: 'var(--surface-hover)',
                  borderRadius: 8, border: '1px solid var(--border)',
                  animation: 'bento-plan-in 0.2s cubic-bezier(.4,0,.2,1) both',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <iconify-icon icon="solar:ticket-linear" width="12" height="12" style={{ color: 'var(--violet)' }} />
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--ink-primary)', fontSize: 11 }}>{code}</span>
                </div>
                <span style={{ fontSize: 10, color: '#16B364', fontWeight: 600 }}>Aktivní</span>
              </div>
            ))}
            {visibleCodes < PKG_CODES.length && (
              <div style={{ height: 30, borderRadius: 8, background: 'var(--surface-hover)', opacity: 0.35, border: '1px dashed var(--border)' }} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   CARD 2 — Kalendář / 24-7
   ════════════════════════════════════════════════════════════════════════════ */
const BOOKED_CELLS = new Set([4, 9, 12, 18, 22, 27]);
const EMPTY_CELLS  = Array.from({ length: 35 }, (_, i) => i).filter(i => !BOOKED_CELLS.has(i));

function CalendarBentoCard() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const reduced = usePRM();
  const [flashCell, setFlashCell] = useState(null);
  const [count, setCount] = useState(0);
  const availRef = useRef([...EMPTY_CELLS]);

  /* Flash a random empty cell every 5 s */
  useEffect(() => {
    if (!inView || reduced) return;
    const flash = () => {
      if (!availRef.current.length) availRef.current = [...EMPTY_CELLS];
      const idx = Math.floor(Math.random() * availRef.current.length);
      const cell = availRef.current.splice(idx, 1)[0];
      setFlashCell(cell);
      setTimeout(() => setFlashCell(null), 1100);
    };
    flash();
    const id = setInterval(flash, 5000);
    return () => clearInterval(id);
  }, [inView, reduced]);

  /* Count up +47 % on scroll into view */
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1300, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(47 * e));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="dark-card-grain"
      style={{
        position: 'relative', borderRadius: '28px', overflow: 'hidden', minHeight: '480px',
        background: 'linear-gradient(160deg, #2a1a5c 0%, #1A1A1A 100%)',
        padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        color: '#fff',
        transition: 'transform 300ms cubic-bezier(.4,0,.2,1), box-shadow 300ms cubic-bezier(.4,0,.2,1)',
      }}
      onMouseEnter={onCardEnter}
      onMouseLeave={onCardLeave}
    >
      {/* Decorative calendar grid */}
      <div aria-hidden style={{ position: 'absolute', top: 0, right: '-40px', width: '320px', height: '320px', opacity: 0.2, pointerEvents: 'none' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '4px', padding: '20px' }}>
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className={flashCell === i && !reduced ? 'bento-anim' : ''}
              style={{
                aspectRatio: '1', borderRadius: '4px',
                background: BOOKED_CELLS.has(i) ? 'var(--violet-light)' : 'rgba(255,255,255,0.08)',
                animation: flashCell === i && !reduced ? 'bento-cell-flash 1.1s ease-out both' : 'none',
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <span style={{ display: 'inline-block', padding: '4px 10px', background: 'var(--violet)', borderRadius: '999px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '24px' }}>
          Rezervace 24/7
        </span>
        <p style={{ fontSize: '24px', lineHeight: 1.2, fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '-0.025em', maxWidth: '280px' }}>
          Zákazníci rezervují sami. Vy se probudíte s plným diářem.
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ fontSize: '40px', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>
          +{count}%
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', maxWidth: '120px', lineHeight: 1.4 }}>
          průměrný nárůst rezervací po nasazení widgetu
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   CARD 3 — Online platby
   ════════════════════════════════════════════════════════════════════════════ */
const GATEWAYS = [
  { id: 'stripe',  label: 'Stripe',  color: '#635BFF' },
  { id: 'gopay',   label: 'GoPay',   color: '#0099E6' },
  { id: 'comgate', label: 'Comgate', color: '#D94040' },
];

const ALL_TX = [
  { gw: 'Stripe',  color: '#635BFF', amount: '850 Kč',   name: 'Petra S.' },
  { gw: 'GoPay',   color: '#0099E6', amount: '1 200 Kč', name: 'Jana N.'  },
  { gw: 'Comgate', color: '#D94040', amount: '650 Kč',   name: 'Tomáš H.' },
  { gw: 'Stripe',  color: '#635BFF', amount: '990 Kč',   name: 'Marta K.' },
  { gw: 'GoPay',   color: '#0099E6', amount: '750 Kč',   name: 'Karel B.' },
];

const PAY_AMOUNTS = ['850 Kč', '1 200 Kč', '650 Kč'];

function PaymentsCard() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const reduced = usePRM();
  const [activeGW, setActiveGW] = useState(0);
  const [userPicked, setUserPicked] = useState(false);
  const [phase, setPhase] = useState('idle');
  const [txCount, setTxCount] = useState(0);

  useEffect(() => {
    if (userPicked || reduced || !inView) return;
    const id = setInterval(() => setActiveGW(a => (a + 1) % GATEWAYS.length), 3200);
    return () => clearInterval(id);
  }, [userPicked, reduced, inView]);

  useEffect(() => {
    if (!inView || reduced) return;
    const timeouts = [];
    const t = (ms, fn) => timeouts.push(setTimeout(fn, ms));

    const runCycle = () => {
      setPhase('idle');
      t(1400, () => setPhase('processing'));
      t(3000, () => { setPhase('success'); setTxCount(c => c + 1); });
      t(5800, () => setPhase('idle'));
    };

    runCycle();
    const id = setInterval(runCycle, 7500);
    return () => { timeouts.forEach(clearTimeout); clearInterval(id); };
  }, [inView, reduced]);

  const gw = GATEWAYS[activeGW];
  const currentAmount = PAY_AMOUNTS[txCount % PAY_AMOUNTS.length];
  const visibleTx = Array.from({ length: Math.min(txCount, 3) }, (_, i) => ({
    ...ALL_TX[(txCount - 1 - i + ALL_TX.length * 10) % ALL_TX.length],
    uid: txCount - i,
  }));

  return (
    <div
      ref={ref}
      className="card-premium"
      style={{
        padding: '32px 28px', borderRadius: '28px', minHeight: '480px',
        display: 'flex', flexDirection: 'column', gap: 14,
        transition: 'transform 300ms cubic-bezier(.4,0,.2,1), box-shadow 300ms cubic-bezier(.4,0,.2,1)',
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={onCardEnter}
      onMouseLeave={onCardLeave}
    >
      {/* Header */}
      <div>
        <span className="eyebrow" style={{ color: 'var(--accent-warm)', display: 'block', marginBottom: 6 }}>Online platby</span>
        <h3 style={{ fontSize: '19px', fontWeight: 700, lineHeight: 1.22 }}>Zákazníci platí, jak chtějí.</h3>
      </div>

      {/* Gateway tabs */}
      <div style={{ display: 'flex', gap: 4, background: 'var(--surface-hover)', borderRadius: 12, padding: '4px' }}>
        {GATEWAYS.map((g, i) => (
          <button
            key={g.id}
            onClick={() => { setActiveGW(i); setUserPicked(true); }}
            style={{
              flex: 1, padding: '7px 4px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: i === activeGW ? 700 : 500,
              color: i === activeGW ? '#fff' : 'var(--ink-secondary)',
              background: i === activeGW ? g.color : 'transparent',
              transition: 'all 0.22s',
            }}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Payment terminal */}
      <div style={{ background: 'var(--surface-hover)', borderRadius: 14, padding: '14px 16px', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--ink-tertiary)', marginBottom: 3 }}>Masáž · 60 min</div>
            <div
              key={currentAmount}
              className="bento-anim"
              style={{ fontSize: 22, fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--ink-primary)', letterSpacing: '-0.04em', lineHeight: 1, animation: 'bento-plan-in 0.22s ease both' }}
            >
              {currentAmount}
            </div>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: gw.color + '18', transition: 'background 0.3s', flexShrink: 0 }}>
            {gw.id === 'stripe'
              ? <iconify-icon icon="logos:stripe" width="30" height="12" />
              : <span style={{ fontSize: 8, fontWeight: 900, color: gw.color, letterSpacing: '-0.01em', textAlign: 'center', lineHeight: 1.1 }}>{gw.label.toUpperCase()}</span>
            }
          </div>
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--ink-tertiary)', letterSpacing: '0.12em', marginBottom: 12 }}>
          **** **** **** 4242
        </div>
        <div style={{
          background: phase === 'success' ? '#16B364' : gw.color,
          color: '#fff', borderRadius: 9, padding: '10px 14px',
          fontSize: 12, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
          transition: 'background 0.35s cubic-bezier(.4,0,.2,1)',
          cursor: 'default', userSelect: 'none',
        }}>
          {phase === 'idle' && <>Zaplatit přes {gw.label} <iconify-icon icon="solar:arrow-right-linear" width="13" /></>}
          {phase === 'processing' && <><span className="bento-anim" style={{ animation: 'bento-pulse-dot 0.7s ease-in-out infinite' }}>●</span> Zpracovávám...</>}
          {phase === 'success' && <><iconify-icon icon="solar:check-circle-linear" width="14" /> Platba přijata!</>}
        </div>
      </div>

      {/* Transaction feed */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
        {visibleTx.length > 0 && (
          <div style={{ fontSize: 10, color: 'var(--ink-tertiary)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>
            Poslední platby
          </div>
        )}
        {visibleTx.map((tx, i) => (
          <div
            key={tx.uid}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 10px', background: 'var(--surface-hover)', borderRadius: 8,
              border: '1px solid var(--border)',
              animation: i === 0 ? 'bento-plan-in 0.2s cubic-bezier(.4,0,.2,1) both' : 'none',
              opacity: 1 - i * 0.22,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: tx.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: 'var(--ink-primary)', flex: 1 }}>{tx.name}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-primary)' }}>{tx.amount}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: tx.color }}>{tx.gw}</span>
          </div>
        ))}
      </div>

      {/* 0 % footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
          <span style={{ fontSize: 26, fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--ink-primary)', letterSpacing: '-0.04em', lineHeight: 1 }}>0%</span>
          <span style={{ fontSize: 11, color: 'var(--ink-tertiary)', lineHeight: 1.3 }}>provize<br />z plateb</span>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {GATEWAYS.map(g => (
            <div key={g.id} style={{ padding: '3px 8px', background: g.color + '12', borderRadius: 6, border: `1px solid ${g.color}35`, fontSize: 10, fontWeight: 700, color: g.color }}>
              {g.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   CARD 4 — Tým & pobočky
   ════════════════════════════════════════════════════════════════════════════ */
const TEAM = [
  { name: 'Jana K.',  role: 'Kadeřnice', status: 'Online',    color: 'var(--accent-success)'  },
  { name: 'Petra M.', role: 'Masérka',   status: 'Dovolená',  color: 'var(--accent-warning)'  },
  { name: 'Tomáš H.', role: 'Trenér',    status: 'Online',    color: 'var(--accent-success)'  },
];
const NOTIF_TEXTS = ['Jana K. · Střih 14:30', 'Tomáš H. · Trénink 16:00', 'Petra M. · Masáž 10:00'];

function TeamCard() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const reduced = usePRM();
  const [revealed, setRevealed]         = useState(false);
  const [notifKey, setNotifKey]         = useState(0);
  const [notifVisible, setNotifVisible] = useState(false);
  const [hoveredRow, setHoveredRow]     = useState(null);

  useEffect(() => {
    if (inView && !revealed) setRevealed(true);
  }, [inView]);

  useEffect(() => {
    if (!inView || reduced) return;
    const timeouts = [];
    const t = (ms, fn) => timeouts.push(setTimeout(fn, ms));
    let intervalId;

    const show = () => {
      setNotifKey(k => k + 1);
      setNotifVisible(true);
      t(2700, () => setNotifVisible(false));
    };

    t(2500, show);
    intervalId = setInterval(show, 7000);
    return () => { timeouts.forEach(clearTimeout); clearInterval(intervalId); };
  }, [inView, reduced]);

  const notifText = NOTIF_TEXTS[(notifKey - 1) % NOTIF_TEXTS.length];

  return (
    <div
      ref={ref}
      className="dark-card-grain"
      style={{
        padding: '36px 32px', borderRadius: '28px', minHeight: '480px',
        background: 'linear-gradient(155deg, #1A1A1A 0%, #2a1a3c 100%)',
        color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative',
        transition: 'transform 300ms cubic-bezier(.4,0,.2,1), box-shadow 300ms cubic-bezier(.4,0,.2,1)',
      }}
      onMouseEnter={onCardEnter}
      onMouseLeave={onCardLeave}
    >
      {/* New booking notification */}
      {notifVisible && (
        <div
          key={notifKey}
          style={{
            position: 'absolute', top: 14, right: 14,
            background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12,
            padding: '8px 12px', fontSize: 11, fontWeight: 500, color: '#fff',
            display: 'flex', alignItems: 'center', gap: 6,
            animation: 'bento-toast 2.7s ease-in-out both',
            zIndex: 2, whiteSpace: 'nowrap',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16B364', flexShrink: 0 }} />
          Nová rezervace · {notifText}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--accent-warm)' }}>Tým & pobočky</span>
        <div style={{ padding: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px' }}>
          <iconify-icon icon="solar:users-group-rounded-linear" width="18" height="18" />
        </div>
      </div>

      <p style={{ fontSize: '22px', lineHeight: 1.22, fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '-0.025em' }}>
        Každý zaměstnanec, každá pobočka — vlastní kalendář, vlastní pravidla.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {TEAM.map((p, i) => (
          <div
            key={p.name}
            onMouseEnter={() => setHoveredRow(i)}
            onMouseLeave={() => setHoveredRow(null)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 14px',
              background: hoveredRow === i ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
              borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)',
              transition: 'background 0.15s',
              animation: revealed && !reduced ? `bento-slide-row 0.4s cubic-bezier(.4,0,.2,1) ${i * 80}ms both` : 'none',
            }}
          >
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--violet-light), var(--accent-warm))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '11px', fontWeight: 700, flexShrink: 0,
            }}>
              {p.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>{p.name}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{p.role}</div>
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: p.color }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%', background: p.color,
                animation: p.status === 'Online' && !reduced ? 'bento-pulse-dot 2s ease-in-out infinite' : 'none',
              }} />
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   EXPORT
   ════════════════════════════════════════════════════════════════════════════ */
export default function BentoFeatures() {
  useEffect(() => { injectBentoCss(); }, []);

  return (
    <section id="funkce" className="section" style={{ position: 'relative', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        {/* Section header */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--violet)' }} />
            <span className="eyebrow" style={{ color: 'var(--violet)' }}>Proč Terminuj.cz</span>
          </div>
          <div className="dotted-line" style={{ marginBottom: '32px' }} />
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '32px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.08, fontWeight: 700, letterSpacing: '-0.028em', maxWidth: '720px', flex: '1 1 480px' }}>
              Vše, co potřebuje moderní salon nebo studio.
            </h2>
            <p style={{ maxWidth: '380px', fontSize: '16px', lineHeight: 1.6, color: 'var(--ink-secondary)', flex: '0 1 380px' }}>
              Žádné nekonečné funkce, které nikdo nepoužívá. Jen ty, díky kterým budete mít plný diář a víc času na svou práci.
            </p>
          </div>
        </div>

        {/* Bento grid */}
        <div
          className="bento-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}
        >
          <PackagesCard />
          <CalendarBentoCard />
          <PaymentsCard />
          <TeamCard />
        </div>
      </div>
    </section>
  );
}
