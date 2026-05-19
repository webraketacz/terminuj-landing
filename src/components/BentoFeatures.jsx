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
const PLANS = [
  {
    id: 'basic', name: 'Basic', price: '490', desc: 'Pro jednotlivce a malé salony',
    features: ['Až 3 zaměstnanci', 'Až 5 služeb', 'Online rezervace 24/7', 'E-mailové notifikace'],
    cta: 'Vybrat Basic', highlight: false,
  },
  {
    id: 'pro', name: 'Pro', badge: '★', price: '990', desc: 'Pro rostoucí salony a studia',
    features: ['Neomezení zaměstnanci', 'Online platby (Stripe & GoPay)', 'Pokročilé statistiky', 'Vlastní e-mailové šablony', 'Vouchery & balíčky'],
    cta: 'Vybrat Pro', highlight: true,
  },
  {
    id: 'enterprise', name: 'Enterprise', price: '2 490', desc: 'Pro řetězce a více poboček',
    features: ['Vše z Pro', 'Více poboček', 'Vlastní doména', 'SLA & dedikovaná podpora'],
    cta: 'Kontaktovat tým', highlight: false,
  },
];

function PackagesCard() {
  const [active, setActive] = useState(1);
  const [userPicked, setUserPicked] = useState(false);
  const reduced = usePRM();

  useEffect(() => {
    if (userPicked || reduced) return;
    const id = setInterval(() => setActive(a => (a + 1) % PLANS.length), 3800);
    return () => clearInterval(id);
  }, [userPicked, reduced]);

  const plan = PLANS[active];

  return (
    <div
      className="card-premium"
      style={{
        padding: '32px 28px', borderRadius: '28px', minHeight: '480px',
        display: 'flex', flexDirection: 'column',
        transition: 'transform 300ms cubic-bezier(.4,0,.2,1), box-shadow 300ms cubic-bezier(.4,0,.2,1)',
      }}
      onMouseEnter={onCardEnter}
      onMouseLeave={onCardLeave}
    >
      {/* Header */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(91,79,233,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--violet)' }}>
            <iconify-icon icon="solar:box-minimalistic-linear" width="18" height="18" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-primary)' }}>Balíčky</span>
        </div>
        <h3 style={{ fontSize: '20px', lineHeight: 1.22, marginBottom: 4, fontWeight: 700 }}>
          Cena, která roste s vámi.
        </h3>
        <p style={{ fontSize: 13, color: 'var(--ink-secondary)' }}>14 dní zdarma · bez platební karty.</p>
      </div>

      {/* Tab strip */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'var(--surface-hover)', borderRadius: 12, padding: '4px' }}>
        {PLANS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => { setActive(i); setUserPicked(true); }}
            style={{
              flex: 1, padding: '7px 4px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: i === active ? 700 : 500,
              color: i === active ? '#fff' : 'var(--ink-secondary)',
              background: i === active ? 'var(--violet)' : 'transparent',
              transition: 'all 0.2s',
              position: 'relative',
              whiteSpace: 'nowrap',
            }}
          >
            {p.name}
            {p.badge && i === active && (
              <span style={{ position: 'absolute', top: -6, right: 0, background: 'var(--accent-warm)', color: '#fff', fontSize: 8, fontWeight: 800, padding: '2px 4px', borderRadius: 20 }}>
                {p.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Plan content */}
      <div
        key={plan.id}
        className="bento-anim"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', animation: 'bento-plan-in 0.22s cubic-bezier(.4,0,.2,1) both' }}
      >
        <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontSize: 34, fontWeight: 900, fontFamily: 'var(--font-display)', color: plan.highlight ? 'var(--violet)' : 'var(--ink-primary)', letterSpacing: '-0.04em', lineHeight: 1 }}>
              {plan.price}
            </span>
            <span style={{ fontSize: 13, color: 'var(--ink-secondary)' }}>Kč / měs.</span>
          </div>
          <span style={{ fontSize: 12, color: 'var(--ink-tertiary)' }}>{plan.desc}</span>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
          {plan.features.map(f => (
            <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--ink-primary)', lineHeight: 1.4 }}>
              <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(22,179,100,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <iconify-icon icon="solar:check-read-linear" width="10" height="10" style={{ color: '#16B364' }} />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <a
        href="#registrace"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          padding: '12px 20px',
          background: plan.highlight ? 'linear-gradient(135deg, var(--violet), var(--violet-light))' : 'var(--surface-hover)',
          color: plan.highlight ? '#fff' : 'var(--ink-primary)',
          borderRadius: 12, fontSize: 13, fontWeight: 600, textDecoration: 'none',
          border: plan.highlight ? 'none' : '1px solid var(--border)',
          transition: 'opacity 0.15s',
          boxShadow: plan.highlight ? 'var(--shadow-cta)' : 'none',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
      >
        {plan.cta}
        <iconify-icon icon="solar:arrow-right-linear" width="14" height="14" />
      </a>
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
const RING_R = 80;
const RING_C = 2 * Math.PI * RING_R; // ≈ 502.65

function PaymentsCard() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const reduced = usePRM();
  const [drawn, setDrawn]           = useState(false);
  const [toastKey, setToastKey]     = useState(0);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timeouts = [];
    const t = (ms, fn) => timeouts.push(setTimeout(fn, ms));

    if (!reduced) t(250, () => setDrawn(true));

    let intervalId;
    const showToast = () => {
      setToastKey(k => k + 1);
      setToastVisible(true);
      t(2700, () => setToastVisible(false));
    };
    t(2200, showToast);
    intervalId = setInterval(showToast, 5500);

    return () => { timeouts.forEach(clearTimeout); clearInterval(intervalId); };
  }, [inView, reduced]);

  const TOAST_TEXTS = ['850 Kč · Petr S.', '1 200 Kč · Jana N.', '650 Kč · Simona K.'];
  const toastText   = TOAST_TEXTS[(toastKey - 1) % TOAST_TEXTS.length];

  return (
    <div
      ref={ref}
      className="card-premium"
      style={{
        padding: '36px 32px', borderRadius: '28px', minHeight: '480px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden',
        transition: 'transform 300ms cubic-bezier(.4,0,.2,1), box-shadow 300ms cubic-bezier(.4,0,.2,1)',
      }}
      onMouseEnter={onCardEnter}
      onMouseLeave={onCardLeave}
    >
      {/* Payment toast */}
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
          <span style={{ color: '#16B364', fontSize: 13 }}>💳</span>
          <span>Platba přijata · <strong>{toastText}</strong></span>
        </div>
      )}

      <div style={{ textAlign: 'center' }}>
        <span className="eyebrow" style={{ color: 'var(--accent-warm)', display: 'block', marginBottom: '8px' }}>Online platby</span>
        <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Bez práce s fakturami</h3>
      </div>

      {/* SVG ring */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5B4FE9" />
              <stop offset="100%" stopColor="#9B8FF9" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r={RING_R} fill="none" stroke="var(--surface-hover)" strokeWidth="13" />
          <circle
            cx="100" cy="100" r={RING_R}
            fill="none" stroke="url(#ring-grad)" strokeWidth="13" strokeLinecap="round"
            strokeDasharray={RING_C}
            strokeDashoffset={drawn ? RING_C * 0.02 : RING_C}
            transform="rotate(-90 100 100)"
            style={{ transition: reduced ? 'none' : 'stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1)' }}
          />
          <text x="100" y="94" textAnchor="middle" fontSize="38" fontWeight="900"
            fill="var(--ink-primary)" fontFamily="var(--font-display)">0%</text>
          <text x="100" y="113" textAnchor="middle" fontSize="9" fontWeight="600"
            fill="var(--ink-tertiary)" fontFamily="var(--font-body)" letterSpacing="1">PROVIZE Z PLATEB</text>
        </svg>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="badge" style={{ background: '#fff', border: '1px solid var(--border)' }}>
          <iconify-icon icon="logos:stripe" width="36" height="14" />
        </div>
        <div className="badge" style={{ background: '#fff', border: '1px solid var(--border)', padding: '6px 12px', color: 'var(--ink-primary)', fontWeight: 700, fontSize: '11px' }}>
          GoPay
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
