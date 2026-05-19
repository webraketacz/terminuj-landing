/**
 * DemoBookingWidget.jsx
 * ─────────────────────
 * Standalone interaktivní demo rezervačního widgetu pro landing page.
 * Žádné závislosti mimo React. Kopíruj tento soubor do svého projektu.
 *
 * Použití:
 *   import DemoBookingWidget from './DemoBookingWidget';
 *   <DemoBookingWidget />
 *
 * Vyžaduje: React 18+
 * Volitelně: Tailwind (nebo přidej vlastní wrapper CSS)
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ─── Barvy ─────────────────────────────────────────────────────────────── */
const C = {
  primary:  '#5B4FE9',
  primaryHover: '#7C6FF5',
  warm:     '#E89B6C',
  bg:       '#FAFAF7',
  card:     '#FFFFFF',
  border:   '#E8E4DC',
  text:     '#1A1A1A',
  muted:    '#6B6B6B',
  mutedBg:  '#F5F3EF',
  success:  '#2D9D6F',
  successBg:'#ECFDF5',
};

/* ─── Demo data ──────────────────────────────────────────────────────────── */
const SERVICES = [
  { id: 's1', name: 'Masáž 60 min',      price: 800,  duration: 60, desc: 'Relaxační masáž celého těla' },
  { id: 's2', name: 'Kadeřnictví',        price: 500,  duration: 45, desc: 'Střih, mytí a foukaná' },
  { id: 's3', name: 'Osobní trénink',     price: 1200, duration: 60, desc: 'Trénink se zkušeným instruktorem' },
];

const SLOTS_ALL = ['09:00','09:30','10:00','10:30','11:00','14:00','14:30','15:00','15:30','16:00'];
const SLOTS_TAKEN = new Set(['09:30','10:30','14:30']);

const getDemoDates = () => {
  const out = [];
  const base = new Date();
  base.setHours(0,0,0,0);
  for (let i = 1; out.length < 21; i++) {
    const d = new Date(base); d.setDate(base.getDate() + i);
    if (d.getDay() !== 0 && d.getDay() !== 6) out.push(d);
  }
  return out;
};
const DEMO_DATES = getDemoDates();

const fmtCurrency = (n) =>
  n.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK', minimumFractionDigits: 0 });

const fmtDate = (d) =>
  d.toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long' });

const fmtShort = (d) =>
  d.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric' });

const MONTH_NAMES = ['leden','únor','březen','duben','květen','červen',
  'červenec','srpen','září','říjen','listopad','prosinec'];
const DAY_NAMES_SHORT = ['Po','Út','St','Čt','Pá','So','Ne'];

/* ─── CSS keyframes injected once ───────────────────────────────────────── */
const STYLES = `
  @keyframes demo-cursor-click {
    0%   { transform: scale(1);   opacity: 1; }
    30%  { transform: scale(0.82); opacity: 1; }
    100% { transform: scale(1);   opacity: 1; }
  }
  @keyframes demo-click-ripple {
    0%   { transform: scale(0); opacity: 0.6; }
    100% { transform: scale(3); opacity: 0; }
  }
  @keyframes demo-step-in {
    from { opacity: 0; transform: translateX(18px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes demo-step-out {
    from { opacity: 1; transform: translateX(0); }
    to   { opacity: 0; transform: translateX(-18px); }
  }
  @keyframes demo-blink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0; }
  }
  @keyframes demo-success-pop {
    0%   { transform: scale(0.5); opacity: 0; }
    70%  { transform: scale(1.1); }
    100% { transform: scale(1);   opacity: 1; }
  }
  @keyframes demo-fade-in {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .demo-step-animate { animation: demo-step-in 0.32s cubic-bezier(0.16,1,0.3,1) both; }
  .demo-cursor-click-anim { animation: demo-cursor-click 0.22s ease; }
`;

function injectStyles() {
  if (document.getElementById('demo-widget-styles')) return;
  const el = document.createElement('style');
  el.id = 'demo-widget-styles';
  el.textContent = STYLES;
  document.head.appendChild(el);
}

/* ─── Cursor SVG ─────────────────────────────────────────────────────────── */
const CursorIcon = ({ clicking }) => (
  <svg
    width="22" height="26" viewBox="0 0 22 26" fill="none"
    style={{ display: 'block', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.28))' }}
    className={clicking ? 'demo-cursor-click-anim' : ''}
  >
    <path d="M2 2L2 19L7 14.5L10.5 22L13 21L9.5 13.5L16 13.5L2 2Z" fill="white" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

/* ─── Calendar mini ──────────────────────────────────────────────────────── */
const MiniCalendar = ({ selectedDate, onSelect, highlightDates }) => {
  const today = new Date(); today.setHours(0,0,0,0);
  const [month, setMonth] = useState(() => {
    const d = new Date(DEMO_DATES[0]);
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const firstDay = new Date(month.year, month.month, 1);
  const lastDay  = new Date(month.year, month.month + 1, 0);
  let startPad = firstDay.getDay() - 1; if (startPad < 0) startPad = 6;
  const cells = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) cells.push(new Date(month.year, month.month, d));

  const isAvailable = (d) => d && d > today && d.getDay() !== 0 && d.getDay() !== 6;
  const isSelected  = (d) => d && selectedDate && d.toDateString() === selectedDate.toDateString();
  const isToday     = (d) => d && d.toDateString() === today.toDateString();

  return (
    <div style={{ userSelect: 'none' }}>
      {/* Month nav */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 12 }}>
        <button
          onClick={() => setMonth(m => { const d = new Date(m.year, m.month-1); return { year: d.getFullYear(), month: d.getMonth() }; })}
          style={{ background:'none', border:'none', cursor:'pointer', padding: 4, borderRadius: 6, color: C.muted, fontSize: 16 }}
        >‹</button>
        <span style={{ fontWeight: 600, fontSize: 14, color: C.text }}>
          {MONTH_NAMES[month.month]} {month.year}
        </span>
        <button
          onClick={() => setMonth(m => { const d = new Date(m.year, m.month+1); return { year: d.getFullYear(), month: d.getMonth() }; })}
          style={{ background:'none', border:'none', cursor:'pointer', padding: 4, borderRadius: 6, color: C.muted, fontSize: 16 }}
        >›</button>
      </div>
      {/* Day headers */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap: 2, marginBottom: 4 }}>
        {DAY_NAMES_SHORT.map(d => (
          <div key={d} style={{ textAlign:'center', fontSize: 11, fontWeight: 500, color: C.muted, padding: '2px 0' }}>{d}</div>
        ))}
      </div>
      {/* Days grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap: 2 }}>
        {cells.map((d, i) => {
          const avail = isAvailable(d);
          const sel   = isSelected(d);
          const tod   = isToday(d);
          return (
            <button
              key={i}
              onClick={() => avail && onSelect(d)}
              disabled={!avail}
              data-demo-date={d ? d.toDateString() : ''}
              style={{
                height: 34, width: '100%', border: 'none', borderRadius: 8, cursor: avail ? 'pointer' : 'default',
                fontSize: 13, fontWeight: sel ? 700 : (avail ? 500 : 400),
                background: sel ? C.primary : (tod ? `${C.primary}14` : 'transparent'),
                color: sel ? '#fff' : (!d || !avail ? '#CBD5E1' : C.text),
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {d ? d.getDate() : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Stepper ────────────────────────────────────────────────────────────── */
const STEP_LABELS = ['Služba', 'Termín', 'Údaje', 'Hotovo'];

const Stepper = ({ step }) => {
  const idx = ['service','datetime','details','confirm'].indexOf(step);
  return (
    <div style={{ display:'flex', alignItems:'center', marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${C.border}` }}>
      {STEP_LABELS.map((label, i) => (
        <React.Fragment key={label}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: 4 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', display:'flex', alignItems:'center', justifyContent:'center',
              fontSize: 13, fontWeight: 600, transition: 'all 0.3s',
              background: i <= idx ? C.primary : C.mutedBg,
              color: i <= idx ? '#fff' : C.muted,
              boxShadow: i === idx ? `0 0 0 4px ${C.primary}20` : 'none',
            }}>
              {i < idx ? '✓' : i + 1}
            </div>
            <span style={{ fontSize: 11, fontWeight: i === idx ? 600 : 400, color: i === idx ? C.primary : C.muted, whiteSpace: 'nowrap' }}>
              {label}
            </span>
          </div>
          {i < STEP_LABELS.length - 1 && (
            <div style={{ flex: 1, height: 2, margin: '0 6px', marginBottom: 18, background: i < idx ? C.primary : C.border, transition: 'background 0.3s' }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════════════════ */
export default function DemoBookingWidget({ className = '' }) {
  const containerRef   = useRef(null);
  const stepKeyRef     = useRef(0);

  /* ── Widget state ── */
  const [step,             setStep]             = useState('service');
  const [selectedService,  setSelectedService]  = useState(null);
  const [selectedDate,     setSelectedDate]     = useState(null);
  const [selectedSlot,     setSelectedSlot]     = useState(null);
  const [name,             setName]             = useState('');
  const [email,            setEmail]            = useState('');
  const [stepKey,          setStepKey]          = useState(0);

  /* ── Demo / interactive mode ── */
  const [mode,             setMode]             = useState('demo'); // 'demo' | 'interactive'
  const [loopCount,        setLoopCount]        = useState(0);

  /* ── Cursor ── */
  const [cursor, setCursor] = useState({ x: 50, y: 50, visible: false, clicking: false });
  const timeoutsRef = useRef([]);

  useEffect(() => { injectStyles(); }, []);

  /* ── helpers ── */
  const advanceStep = useCallback((nextStep) => {
    stepKeyRef.current += 1;
    setStepKey(stepKeyRef.current);
    setStep(nextStep);
  }, []);

  const moveCursor = (x, y) => setCursor(c => ({ ...c, x, y }));
  const click      = ()     => {
    setCursor(c => ({ ...c, clicking: true }));
    setTimeout(() => setCursor(c => ({ ...c, clicking: false })), 220);
  };
  const hideCursor = ()     => setCursor(c => ({ ...c, visible: false }));
  const showCursor = ()     => setCursor(c => ({ ...c, visible: true }));

  const t = useCallback((ms, fn) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const clearAll = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  /* ── Reset widget state ── */
  const resetWidget = useCallback(() => {
    stepKeyRef.current += 1;
    setStepKey(stepKeyRef.current);
    setStep('service');
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    setName('');
    setEmail('');
  }, []);

  /* ── Demo auto-play sequence ── */
  useEffect(() => {
    if (mode !== 'demo') return;
    clearAll();

    const DEMO_DATE    = DEMO_DATES[2]; // a date a few days ahead
    const DEMO_SLOT    = '14:00';
    const DEMO_NAME    = 'Jana Horáková';
    const DEMO_EMAIL   = 'jana@example.com';

    // ── 1. SERVICE STEP ──────────────────────────────────────────
    t(300,  () => showCursor());
    t(600,  () => moveCursor(48, 43));      // hover over service 1
    t(1300, () => click());
    t(1520, () => { setSelectedService(SERVICES[0]); });
    t(1700, () => moveCursor(74, 88));      // hover Continue button
    t(2000, () => click());
    t(2200, () => advanceStep('datetime'));

    // ── 2. DATETIME STEP ─────────────────────────────────────────
    t(2500, () => moveCursor(30, 58));      // hover calendar date
    t(3100, () => click());
    t(3300, () => setSelectedDate(DEMO_DATE));
    t(3600, () => moveCursor(68, 62));      // hover time slot 14:00
    t(4200, () => click());
    t(4400, () => setSelectedSlot(DEMO_SLOT));
    t(4700, () => moveCursor(74, 88));      // Continue button
    t(5000, () => click());
    t(5200, () => advanceStep('details'));

    // ── 3. DETAILS STEP ─────────────────────────────────────────
    t(5500, () => moveCursor(50, 38));      // name input
    t(5800, () => click());
    // Typewriter: name
    const nameChars = DEMO_NAME.split('');
    nameChars.forEach((ch, i) => {
      t(5900 + i * 80, () => setName(prev => prev + ch));
    });
    const nameEnd = 5900 + nameChars.length * 80;
    t(nameEnd + 200, () => moveCursor(50, 57)); // email input
    t(nameEnd + 500, () => click());
    // Typewriter: email
    const emailChars = DEMO_EMAIL.split('');
    emailChars.forEach((ch, i) => {
      t(nameEnd + 600 + i * 70, () => setEmail(prev => prev + ch));
    });
    const emailEnd = nameEnd + 600 + emailChars.length * 70;
    t(emailEnd + 300, () => moveCursor(74, 88)); // Continue button
    t(emailEnd + 600, () => click());
    t(emailEnd + 800, () => advanceStep('confirm'));

    // ── 4. CONFIRMATION ──────────────────────────────────────────
    t(emailEnd + 1000, () => hideCursor());

    // ── 5. LOOP ───────────────────────────────────────────────────
    t(emailEnd + 4500, () => {
      resetWidget();
      hideCursor();
      t(400, () => setLoopCount(n => n + 1));
    });

    return clearAll;
  }, [mode, loopCount, t, clearAll, advanceStep, resetWidget]);

  /* ── Switch to interactive ── */
  const switchToInteractive = () => {
    clearAll();
    hideCursor();
    setMode('interactive');
    resetWidget();
  };

  const switchToDemo = () => {
    clearAll();
    resetWidget();
    setMode('demo');
    setLoopCount(n => n + 1);
  };

  /* ── Interactive step handlers ── */
  const handleSelectService = (svc) => {
    if (mode !== 'interactive') return;
    setSelectedService(svc);
    setTimeout(() => advanceStep('datetime'), 180);
  };
  const handleSelectSlot = (slot) => {
    if (mode !== 'interactive') return;
    setSelectedSlot(slot);
  };
  const handleContinueDatetime = () => {
    if (!selectedDate || !selectedSlot) return;
    advanceStep('details');
  };
  const handleConfirm = () => {
    if (!name.trim() || !email.trim()) return;
    advanceStep('confirm');
  };
  const handleRestart = () => {
    resetWidget();
    if (mode === 'demo') setLoopCount(n => n + 1);
  };

  /* ─────────────────────────────────────────────────────────────────────────
     RENDER STEPS
     ───────────────────────────────────────────────────────────────────────── */

  const renderServiceStep = () => (
    <div key={stepKey} className="demo-step-animate" style={{ animation: 'demo-step-in 0.32s cubic-bezier(0.16,1,0.3,1) both' }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, letterSpacing: '-0.02em', color: C.text }}>Vyberte službu</h2>
      <p style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Vyberte jeden ze dostupných termínů</p>
      <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
        {SERVICES.map((svc) => {
          const sel = selectedService?.id === svc.id;
          return (
            <button
              key={svc.id}
              onClick={() => mode === 'interactive' && handleSelectService(svc)}
              style={{
                textAlign: 'left', width: '100%', background: sel ? `${C.primary}0D` : C.card,
                border: `2px solid ${sel ? C.primary : C.border}`, borderRadius: 14,
                padding: '14px 16px', cursor: mode === 'interactive' ? 'pointer' : 'default',
                transition: 'all 0.18s', display: 'flex', alignItems: 'center', gap: 14,
                boxShadow: sel ? `0 0 0 3px ${C.primary}18` : '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${C.primary}14`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0 }}>
                <span style={{ fontSize: 18 }}>{svc.id === 's1' ? '💆' : svc.id === 's2' ? '✂️' : '🏋️'}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: C.text, marginBottom: 2 }}>{svc.name}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{svc.desc} · {svc.duration} min</div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.primary, flexShrink: 0 }}>{fmtCurrency(svc.price)}</div>
            </button>
          );
        })}
      </div>
      {/* "Pokračovat" button for demo visual */}
      {selectedService && mode === 'demo' && (
        <div style={{ marginTop: 20, display:'flex', justifyContent:'flex-end' }}>
          <div style={{
            background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryHover} 100%)`,
            color: '#fff', borderRadius: 10, padding: '11px 24px', fontWeight: 600, fontSize: 14,
            boxShadow: `0 2px 12px ${C.primary}40`,
          }}>
            Pokračovat →
          </div>
        </div>
      )}
      {selectedService && mode === 'interactive' && (
        <div style={{ marginTop: 20, display:'flex', justifyContent:'flex-end' }}>
          <button
            onClick={() => advanceStep('datetime')}
            style={{
              background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryHover} 100%)`,
              color: '#fff', border: 'none', borderRadius: 10, padding: '11px 24px', fontWeight: 600, fontSize: 14,
              cursor: 'pointer', boxShadow: `0 2px 12px ${C.primary}40`,
            }}
          >
            Pokračovat →
          </button>
        </div>
      )}
    </div>
  );

  const renderDatetimeStep = () => {
    const allSlots = SLOTS_ALL.map(s => ({ time: s, available: !SLOTS_TAKEN.has(s) }));
    return (
      <div key={stepKey} style={{ animation: 'demo-step-in 0.32s cubic-bezier(0.16,1,0.3,1) both' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, letterSpacing: '-0.02em', color: C.text }}>Vyberte datum a čas</h2>
        <p style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Vyberte termín, který vám vyhovuje</p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 20 }}>
          {/* Calendar */}
          <div style={{ background: `${C.bg}`, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16 }}>
            <MiniCalendar
              selectedDate={selectedDate}
              onSelect={(d) => { if (mode === 'interactive') { setSelectedDate(d); setSelectedSlot(null); } }}
            />
          </div>
          {/* Time slots */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 10 }}>
              {selectedDate ? fmtDate(selectedDate) : 'Nejprve vyberte datum'}
            </div>
            {!selectedDate ? (
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 14, padding: '30px 16px', textAlign:'center', color: C.muted, fontSize: 13 }}>
                👆 Klikněte na den v kalendáři
              </div>
            ) : (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8, maxHeight: 220, overflowY:'scroll' }}>
                {allSlots.map(s => {
                  const isSel = selectedSlot === s.time;
                  return (
                    <button
                      key={s.time}
                      onClick={() => mode === 'interactive' && s.available && setSelectedSlot(s.time)}
                      disabled={!s.available}
                      style={{
                        border: `2px solid ${isSel ? C.primary : s.available ? C.border : '#F1F5F9'}`,
                        borderRadius: 10, padding: '10px 8px', fontWeight: 600, fontSize: 13, textAlign:'center',
                        background: isSel ? C.primary : s.available ? C.card : '#F8FAFC',
                        color: isSel ? '#fff' : s.available ? C.text : '#CBD5E1',
                        cursor: mode === 'interactive' && s.available ? 'pointer' : 'default',
                        transition: 'all 0.15s',
                        textDecoration: !s.available ? 'line-through' : 'none',
                      }}
                    >
                      {s.time}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {selectedDate && selectedSlot && (
          <div style={{ marginTop: 20, display:'flex', justifyContent:'flex-end' }}>
            <button
              onClick={mode === 'interactive' ? handleContinueDatetime : undefined}
              style={{
                background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryHover} 100%)`,
                color: '#fff', border: 'none', borderRadius: 10, padding: '11px 24px', fontWeight: 600, fontSize: 14,
                cursor: mode === 'interactive' ? 'pointer' : 'default',
                boxShadow: `0 2px 12px ${C.primary}40`,
              }}
            >
              Pokračovat →
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderDetailsStep = () => (
    <div key={stepKey} style={{ animation: 'demo-step-in 0.32s cubic-bezier(0.16,1,0.3,1) both' }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, letterSpacing: '-0.02em', color: C.text }}>Vaše kontaktní údaje</h2>
      <p style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Vyplňte prosím vaše kontaktní informace</p>
      <div style={{ display:'flex', flexDirection:'column', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, color: C.text, display:'block', marginBottom: 6 }}>Jméno a příjmení *</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={name}
              onChange={(e) => mode === 'interactive' && setName(e.target.value)}
              placeholder="Jan Novák"
              readOnly={mode === 'demo'}
              style={{
                width: '100%', padding: '10px 14px', border: `1.5px solid ${C.border}`,
                borderRadius: 10, fontSize: 14, color: C.text, background: C.card,
                outline: 'none', boxSizing: 'border-box',
                caretColor: mode === 'demo' ? C.primary : undefined,
              }}
            />
            {mode === 'demo' && name && (
              <span style={{ position:'absolute', right: 12, top:'50%', transform:'translateY(-50%)', width: 2, height: 16, background: C.primary, animation: 'demo-blink 0.9s infinite' }} />
            )}
          </div>
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, color: C.text, display:'block', marginBottom: 6 }}>Email *</label>
          <div style={{ position: 'relative' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => mode === 'interactive' && setEmail(e.target.value)}
              placeholder="jan@example.com"
              readOnly={mode === 'demo'}
              style={{
                width: '100%', padding: '10px 14px', border: `1.5px solid ${C.border}`,
                borderRadius: 10, fontSize: 14, color: C.text, background: C.card,
                outline: 'none', boxSizing: 'border-box',
              }}
            />
            {mode === 'demo' && email && (
              <span style={{ position:'absolute', right: 12, top:'50%', transform:'translateY(-50%)', width: 2, height: 16, background: C.primary, animation: 'demo-blink 0.9s infinite' }} />
            )}
          </div>
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, color: C.text, display:'block', marginBottom: 6 }}>Telefon</label>
          <input
            type="tel"
            placeholder="+420 123 456 789"
            readOnly={mode === 'demo'}
            style={{
              width: '100%', padding: '10px 14px', border: `1.5px solid ${C.border}`,
              borderRadius: 10, fontSize: 14, color: C.text, background: C.card,
              outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
      </div>
      <div style={{ marginTop: 24, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        {mode === 'interactive' && (
          <button
            onClick={() => advanceStep('datetime')}
            style={{ background:'none', border:'none', color: C.muted, cursor:'pointer', fontSize: 13 }}
          >
            ← Zpět
          </button>
        )}
        <button
          onClick={mode === 'interactive' ? handleConfirm : undefined}
          disabled={mode === 'interactive' && (!name.trim() || !email.trim())}
          style={{
            marginLeft: 'auto',
            background: (mode === 'demo' || (name.trim() && email.trim()))
              ? `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryHover} 100%)`
              : C.mutedBg,
            color: (mode === 'demo' || (name.trim() && email.trim())) ? '#fff' : C.muted,
            border: 'none', borderRadius: 10, padding: '11px 24px', fontWeight: 600, fontSize: 14,
            cursor: mode === 'interactive' ? 'pointer' : 'default',
            boxShadow: (mode === 'demo' || (name.trim() && email.trim())) ? `0 2px 12px ${C.primary}40` : 'none',
            transition: 'all 0.2s',
          }}
        >
          Potvrdit rezervaci ✓
        </button>
      </div>
    </div>
  );

  const renderConfirmStep = () => (
    <div key={stepKey} style={{ animation: 'demo-step-in 0.32s cubic-bezier(0.16,1,0.3,1) both', textAlign:'center', padding: '16px 0 8px' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: C.successBg, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', animation: 'demo-success-pop 0.5s cubic-bezier(0.16,1,0.3,1) both' }}>
        <span style={{ fontSize: 32 }}>✓</span>
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 8 }}>Rezervace potvrzena!</h2>
      <p style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>
        Potvrzení jsme odeslali na {email || 'váš email'}
      </p>
      <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, textAlign:'left', marginBottom: 24 }}>
        {[
          ['Služba',     selectedService?.name],
          ['Datum',      selectedDate ? fmtDate(selectedDate) : null],
          ['Čas',        selectedSlot],
          ['Celkem',     selectedService ? fmtCurrency(selectedService.price) : null],
        ].filter(([,v]) => v).map(([label, val]) => (
          <div key={label} style={{ display:'flex', justifyContent:'space-between', padding: '8px 0', borderBottom: `1px solid ${C.border}`, fontSize: 14 }}>
            <span style={{ color: C.muted }}>{label}</span>
            <span style={{ fontWeight: 600, color: label === 'Celkem' ? C.primary : C.text }}>{val}</span>
          </div>
        ))}
      </div>
      <button
        onClick={handleRestart}
        style={{
          background: 'none', border: `1.5px solid ${C.primary}`, borderRadius: 10,
          color: C.primary, padding: '10px 22px', fontWeight: 600, fontSize: 13, cursor: 'pointer',
        }}
      >
        {mode === 'demo' ? 'Přehrát znovu' : 'Nová rezervace'}
      </button>
    </div>
  );

  /* ── Cursor ripple effect ── */
  const [ripples, setRipples] = useState([]);
  useEffect(() => {
    if (!cursor.clicking) return;
    const id = Date.now();
    setRipples(r => [...r, { id, x: cursor.x, y: cursor.y }]);
    setTimeout(() => setRipples(r => r.filter(rr => rr.id !== id)), 600);
  }, [cursor.clicking]);

  /* ─────────────────────────────────────────────────────────────────────────
     MAIN RENDER
     ───────────────────────────────────────────────────────────────────────── */
  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        background: C.bg,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.06)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Browser chrome */}
      <div style={{ background: '#1C1B1A', padding: '10px 16px', display:'flex', alignItems:'center', gap: 10 }}>
        <div style={{ display:'flex', gap: 6 }}>
          {['#FF5F57','#FEBC2E','#28C840'].map(c => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, background: '#2E2D2B', borderRadius: 6, padding: '4px 12px', display:'flex', alignItems:'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#6B6B6B' }}>🔒</span>
          <span style={{ fontSize: 11, color: '#9A9A9A', fontFamily: 'monospace' }}>app.terminuj.cz/rezervace/demo</span>
        </div>
      </div>

      {/* Widget body */}
      <div style={{ padding: 28, background: C.bg, minHeight: 480 }}>
        {/* Logo + org name */}
        <div style={{ display:'flex', alignItems:'center', gap: 10, marginBottom: 20 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg, ${C.primary}, ${C.primaryHover})`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ color:'#fff', fontSize: 16, fontWeight: 700 }}>T</span>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>Studio Pohoda</div>
            <div style={{ fontSize: 11, color: C.muted }}>Online rezervace</div>
          </div>
          {/* Mode toggle */}
          <div style={{ marginLeft:'auto' }}>
            {mode === 'demo' ? (
              <button
                onClick={switchToInteractive}
                style={{
                  background: `${C.primary}12`, border: `1px solid ${C.primary}30`, borderRadius: 20,
                  color: C.primary, padding: '5px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}
              >
                <span>▶</span> Vyzkoušet sami
              </button>
            ) : (
              <button
                onClick={switchToDemo}
                style={{
                  background: C.mutedBg, border: `1px solid ${C.border}`, borderRadius: 20,
                  color: C.muted, padding: '5px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                }}
              >
                ← Demo
              </button>
            )}
          </div>
        </div>

        <Stepper step={step} />

        {step === 'service'  && renderServiceStep()}
        {step === 'datetime' && renderDatetimeStep()}
        {step === 'details'  && renderDetailsStep()}
        {step === 'confirm'  && renderConfirmStep()}
      </div>

      {/* ── Animated cursor overlay ── */}
      {mode === 'demo' && cursor.visible && (
        <div
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            pointerEvents: 'none', zIndex: 50,
          }}
        >
          {/* Ripple effects */}
          {ripples.map(r => (
            <div
              key={r.id}
              style={{
                position: 'absolute',
                left: `${r.x}%`, top: `${r.y}%`,
                transform: 'translate(-50%, -50%)',
                width: 30, height: 30, borderRadius: '50%',
                background: `${C.primary}40`,
                animation: 'demo-click-ripple 0.55s ease-out forwards',
              }}
            />
          ))}
          {/* Cursor */}
          <div
            style={{
              position: 'absolute',
              left: `${cursor.x}%`,
              top: `${cursor.y}%`,
              transform: 'translate(-4px, -4px)',
              transition: 'left 0.55s cubic-bezier(0.34,1.56,0.64,1), top 0.55s cubic-bezier(0.34,1.56,0.64,1)',
              pointerEvents: 'none',
            }}
          >
            <CursorIcon clicking={cursor.clicking} />
          </div>
        </div>
      )}
    </div>
  );
}
