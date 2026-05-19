/**
 * InteractiveWidgetCustomizer.jsx
 * ────────────────────────────────
 * Interaktivní showcase karta pro landing page.
 * Plovoucí barevná kolečka + font selector + live preview widgetu.
 *
 * Použití:
 *   import InteractiveWidgetCustomizer from './InteractiveWidgetCustomizer';
 *   <InteractiveWidgetCustomizer />
 *
 * Vyžaduje: React 18+, žádné jiné závislosti.
 */

import React, { useState, useEffect, useRef } from 'react';

/* ─── Paleta barev ───────────────────────────────────────────────────────── */
const COLORS = [
  { hex: '#5B4FE9', name: 'Violet',   light: '#EEF0FD' },
  { hex: '#2563EB', name: 'Indigo',   light: '#EFF6FF' },
  { hex: '#0EA5E9', name: 'Sky',      light: '#F0F9FF' },
  { hex: '#10B981', name: 'Emerald',  light: '#ECFDF5' },
  { hex: '#F59E0B', name: 'Amber',    light: '#FFFBEB' },
  { hex: '#EF4444', name: 'Rose',     light: '#FEF2F2' },
  { hex: '#EC4899', name: 'Pink',     light: '#FDF2F8' },
  { hex: '#1C1B1A', name: 'Dark',     light: '#F5F5F4' },
];

/* ─── Fonty ─────────────────────────────────────────────────────────────── */
const FONTS = [
  { name: 'Plus Jakarta Sans', gf: 'Plus+Jakarta+Sans' },
  { name: 'Inter',             gf: 'Inter'              },
  { name: 'Poppins',           gf: 'Poppins'            },
  { name: 'Montserrat',        gf: 'Montserrat'         },
];

/* ─── Layouty ────────────────────────────────────────────────────────────── */
const LAYOUTS = [
  { id: 'wizard',   label: 'Průvodce', icon: '◫' },
  { id: 'calendar', label: 'Kalendář', icon: '▦' },
];

/* ─── Demo services ─────────────────────────────────────────────────────── */
const SERVICES = [
  { id: 's1', name: 'Masáž 60 min',  price: 800,  dur: 60,  emoji: '💆' },
  { id: 's2', name: 'Kadeřnictví',   price: 500,  dur: 45,  emoji: '✂️' },
  { id: 's3', name: 'Osobní trénink',price: 1200, dur: 60,  emoji: '🏋️' },
];

/* ─── Calendar days for "Kalendář" layout preview ───────────────────────── */
const CAL_SLOTS = [
  { day: 'Po 19.', slots: ['09:00','10:00','14:00','15:30'] },
  { day: 'Út 20.', slots: ['09:30','11:00','14:30','16:00'] },
  { day: 'St 21.', slots: ['10:00','14:00','15:00'] },
  { day: 'Čt 22.', slots: ['09:00','11:00','13:00','16:00'] },
  { day: 'Pá 23.', slots: ['09:30','10:30','14:30'] },
];
const TAKEN = new Set(['09:30-Po','14:30-Út','10:00-St','11:00-Čt','10:30-Pá']);

const fmtCzk = (n) => `${n.toLocaleString('cs-CZ')} Kč`;

/* ─── CSS injector ───────────────────────────────────────────────────────── */
const CSS = `
  @keyframes iwc-float-a { 0%,100%{transform:translateY(0px) rotate(-2deg)}  50%{transform:translateY(-7px) rotate(2deg)} }
  @keyframes iwc-float-b { 0%,100%{transform:translateY(-4px) rotate(1deg)}  50%{transform:translateY(4px) rotate(-1deg)} }
  @keyframes iwc-float-c { 0%,100%{transform:translateY(2px) rotate(2deg)}   50%{transform:translateY(-5px) rotate(-2deg)} }
  @keyframes iwc-float-d { 0%,100%{transform:translateY(-2px) rotate(-1deg)} 50%{transform:translateY(5px) rotate(2deg)} }
  @keyframes iwc-pop-in  { 0%{transform:scale(0) rotate(-20deg)} 70%{transform:scale(1.15)} 100%{transform:scale(1)} }
  @keyframes iwc-slide-in { from{opacity:0;transform:translateX(12px)} to{opacity:1;transform:translateX(0)} }
  @keyframes iwc-pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.2);opacity:0} }
  @keyframes iwc-fade-up { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  .iwc-float-0 { animation: iwc-float-a 3.1s ease-in-out infinite; }
  .iwc-float-1 { animation: iwc-float-b 2.7s ease-in-out infinite 0.4s; }
  .iwc-float-2 { animation: iwc-float-c 3.4s ease-in-out infinite 0.8s; }
  .iwc-float-3 { animation: iwc-float-d 2.9s ease-in-out infinite 1.1s; }
  .iwc-float-4 { animation: iwc-float-a 3.6s ease-in-out infinite 0.2s; }
  .iwc-float-5 { animation: iwc-float-b 3.0s ease-in-out infinite 0.9s; }
  .iwc-float-6 { animation: iwc-float-c 2.8s ease-in-out infinite 1.4s; }
  .iwc-float-7 { animation: iwc-float-d 3.3s ease-in-out infinite 0.6s; }
  .iwc-color-ball:hover { transform: scale(1.22) !important; filter: brightness(1.1); }
  .iwc-preview-slide { animation: iwc-slide-in 0.3s cubic-bezier(0.16,1,0.3,1) both; }
`;

function injectCss() {
  if (document.getElementById('iwc-styles')) return;
  const s = document.createElement('style'); s.id = 'iwc-styles'; s.textContent = CSS;
  document.head.appendChild(s);
}
function loadGfont(name) {
  const id = `iwc-font-${name.replace(/ /g,'-')}`;
  if (document.getElementById(id)) return;
  const gf = FONTS.find(f => f.name === name)?.gf; if (!gf) return;
  const l = document.createElement('link'); l.id = id; l.rel = 'stylesheet';
  l.href = `https://fonts.googleapis.com/css2?family=${gf}:wght@400;500;600;700&display=swap`;
  document.head.appendChild(l);
}

/* ════════════════════════════════════════════════════════════════════════════
   MINI WIDGET PREVIEW — Wizard layout
   ════════════════════════════════════════════════════════════════════════════ */
const PreviewWizard = ({ color, colorLight, font, selectedSvc, onSelect }) => (
  <div style={{ fontFamily: `'${font}', system-ui, sans-serif`, animation: 'iwc-fade-up 0.3s both' }}>
    <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 3 }}>Vyberte službu</div>
    <div style={{ fontSize: 11, color: '#6B6B6B', marginBottom: 12 }}>Vyberte jeden ze dostupných termínů</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      {SERVICES.map(s => {
        const sel = selectedSvc === s.id;
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            style={{
              textAlign: 'left', background: sel ? colorLight : '#fff',
              border: `1.5px solid ${sel ? color : '#E8E4DC'}`, borderRadius: 10,
              padding: '8px 10px', cursor: 'pointer', transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: sel ? `0 0 0 2px ${color}22` : '0 1px 2px rgba(0,0,0,0.04)',
            }}
          >
            <span style={{ fontSize: 14 }}>{s.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.3 }}>{s.name}</div>
              <div style={{ fontSize: 10, color: '#6B6B6B' }}>{s.dur} min</div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: color }}>{fmtCzk(s.price)}</span>
          </button>
        );
      })}
    </div>
    <button style={{
      marginTop: 12, width: '100%', background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
      color: '#fff', border: 'none', borderRadius: 8, padding: '9px 0', fontSize: 12, fontWeight: 600,
      cursor: 'pointer', boxShadow: `0 2px 10px ${color}40`,
    }}>
      Pokračovat →
    </button>
  </div>
);

/* ─── Mini Widget Preview — Calendar layout ─────────────────────────────── */
const PreviewCalendar = ({ color, colorLight, font }) => (
  <div style={{ fontFamily: `'${font}', system-ui, sans-serif`, animation: 'iwc-fade-up 0.3s both' }}>
    <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>Vyberte termín</div>
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 4, minWidth: 300 }}>
        {CAL_SLOTS.map((col, ci) => (
          <div key={ci}>
            <div style={{ fontSize: 9, fontWeight: 700, color: color, textAlign: 'center', marginBottom: 4, padding: '3px 0', background: colorLight, borderRadius: 5 }}>{col.day}</div>
            {col.slots.map((sl, si) => {
              const key = `${sl}-${col.day.slice(0,2)}`;
              const taken = TAKEN.has(key);
              const highlighted = si === 1 && ci === 1;
              return (
                <div key={si} style={{
                  fontSize: 9, fontWeight: 600, textAlign: 'center', padding: '4px 0', marginBottom: 3, borderRadius: 5, cursor: taken ? 'default' : 'pointer',
                  background: highlighted ? color : taken ? '#F1F5F9' : '#fff',
                  border: `1px solid ${highlighted ? color : taken ? '#E2E8F0' : '#E8E4DC'}`,
                  color: highlighted ? '#fff' : taken ? '#CBD5E1' : '#1A1A1A',
                  textDecoration: taken ? 'line-through' : 'none',
                }}>{sl}</div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ════════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ════════════════════════════════════════════════════════════════════════════ */
export default function InteractiveWidgetCustomizer({ className = '' }) {
  const [activeColor,  setActiveColor]  = useState(0);
  const [activeFont,   setActiveFont]   = useState(0);
  const [activeLayout, setActiveLayout] = useState(0);
  const [selectedSvc,  setSelectedSvc]  = useState('s1');
  const [previewKey,   setPreviewKey]   = useState(0);
  const [pulse,        setPulse]        = useState(null); // index of pulsing ball

  const color      = COLORS[activeColor].hex;
  const colorLight = COLORS[activeColor].light;
  const font       = FONTS[activeFont].name;
  const layout     = LAYOUTS[activeLayout].id;

  useEffect(() => { injectCss(); }, []);
  useEffect(() => { loadGfont(font); }, [font]);

  const handleColorClick = (i) => {
    setActiveColor(i);
    setPulse(i);
    setPreviewKey(k => k + 1);
    setTimeout(() => setPulse(null), 500);
  };
  const handleFontClick = (i) => {
    setActiveFont(i);
    setPreviewKey(k => k + 1);
  };
  const handleLayoutClick = (i) => {
    setActiveLayout(i);
    setPreviewKey(k => k + 1);
  };

  /* ── Tooltip state ── */
  const [tooltip, setTooltip] = useState(null);

  return (
    <div
      className={className}
      style={{
        background: '#fff',
        borderRadius: 20,
        padding: 28,
        border: '1px solid #E8E4DC',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        maxWidth: 520,
      }}
    >
      {/* ── Badge ── */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#F0EEFF', borderRadius: 20, padding: '5px 12px', marginBottom: 16 }}>
        <span style={{ fontSize: 13 }}>🎨</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#5B4FE9' }}>Editor widgetu</span>
      </div>

      {/* ── Headline ── */}
      <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em', color: '#1A1A1A', margin: '0 0 8px' }}>
        Plně přizpůsobitelný
      </h2>
      <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.6, margin: '0 0 24px' }}>
        Nastavte vlastní paletu, fonty i rozložení. Změny vidíte živě, než je nasadíte.
      </p>

      {/* ═══════════════════════════════════════════════
          CONTROLS
          ═══════════════════════════════════════════════ */}

      {/* ── Layout toggle ── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A8A8A8', marginBottom: 8 }}>
          Rozložení
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {LAYOUTS.map((l, i) => {
            const active = i === activeLayout;
            return (
              <button
                key={l.id}
                onClick={() => handleLayoutClick(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
                  border: `1.5px solid ${active ? color : '#E8E4DC'}`, borderRadius: 10,
                  background: active ? colorLight : '#fff',
                  color: active ? color : '#6B6B6B', fontWeight: active ? 600 : 400, fontSize: 13,
                  cursor: 'pointer', transition: 'all 0.18s',
                  boxShadow: active ? `0 0 0 3px ${color}18` : 'none',
                }}
              >
                <span style={{ fontSize: 16 }}>{l.icon}</span>
                {l.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Font pills ── */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A8A8A8', marginBottom: 8 }}>
          Font
        </div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {FONTS.map((f, i) => {
            const active = i === activeFont;
            return (
              <button
                key={f.name}
                onClick={() => handleFontClick(i)}
                style={{
                  padding: '6px 13px', borderRadius: 20, fontSize: 12,
                  fontFamily: `'${f.name}', system-ui`,
                  border: `1.5px solid ${active ? color : '#E8E4DC'}`,
                  background: active ? colorLight : '#fff',
                  color: active ? color : '#6B6B6B', fontWeight: active ? 700 : 400,
                  cursor: 'pointer', transition: 'all 0.18s',
                  boxShadow: active ? `0 0 0 3px ${color}15` : 'none',
                }}
              >
                {f.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Color circles ── */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A8A8A8', marginBottom: 12 }}>
          Barva
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 56, position: 'relative' }}>
          {COLORS.map((c, i) => {
            const active = i === activeColor;
            return (
              <div key={i} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Pulse ring on click */}
                {pulse === i && (
                  <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    width: 36, height: 36, borderRadius: '50%',
                    transform: 'translate(-50%,-50%)',
                    background: c.hex, opacity: 0.5,
                    animation: 'iwc-pulse-ring 0.5s ease-out forwards',
                    pointerEvents: 'none',
                  }} />
                )}
                {/* Tooltip */}
                {tooltip === i && (
                  <div style={{
                    position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
                    background: '#1C1B1A', color: '#fff', borderRadius: 6, padding: '3px 8px',
                    fontSize: 10, fontWeight: 600, whiteSpace: 'nowrap', pointerEvents: 'none',
                    zIndex: 10,
                  }}>
                    {c.name}
                  </div>
                )}
                <button
                  className={`iwc-color-ball iwc-float-${i}`}
                  onClick={() => handleColorClick(i)}
                  onMouseEnter={() => setTooltip(i)}
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    width: active ? 38 : 30,
                    height: active ? 38 : 30,
                    borderRadius: '50%',
                    background: c.hex,
                    border: active ? `3px solid #fff` : '2.5px solid rgba(255,255,255,0.6)',
                    boxShadow: active
                      ? `0 0 0 3px ${c.hex}, 0 4px 12px ${c.hex}60`
                      : `0 2px 8px ${c.hex}50`,
                    cursor: 'pointer',
                    transition: 'width 0.2s, height 0.2s, box-shadow 0.2s',
                    outline: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {active && (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          LIVE PREVIEW FRAME
          ═══════════════════════════════════════════════ */}
      <div style={{
        borderRadius: 14, overflow: 'hidden',
        border: '1px solid #E8E4DC',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      }}>
        {/* Browser chrome */}
        <div style={{ background: '#1C1B1A', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#FF5F57','#FEBC2E','#28C840'].map(col => (
              <div key={col} style={{ width: 9, height: 9, borderRadius: '50%', background: col }} />
            ))}
          </div>
          <div style={{ flex: 1, background: '#2E2D2B', borderRadius: 5, padding: '3px 10px' }}>
            <span style={{ fontSize: 10, color: '#6B6B6B', fontFamily: 'monospace' }}>terminuj.cz/rezervace/studio-demo</span>
          </div>
        </div>

        {/* Widget preview body */}
        <div style={{
          background: '#FAFAF7', padding: '16px 16px 12px',
          transition: 'background 0.3s',
        }}>
          {/* Mini header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #E8E4DC' }}>
            <div style={{ width: 24, height: 24, borderRadius: 7, background: `linear-gradient(135deg, ${color}, ${color}99)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ color:'#fff', fontSize:11, fontWeight:700 }}>T</span>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1A1A1A', fontFamily: `'${font}', system-ui` }}>Studio Pohoda</div>
              <div style={{ fontSize: 9, color: '#6B6B6B' }}>Online rezervace</div>
            </div>
            {/* Mini stepper */}
            <div style={{ marginLeft: 'auto', display:'flex', alignItems:'center', gap: 3 }}>
              {[1,2,3,4].map(n => (
                <React.Fragment key={n}>
                  <div style={{ width:16, height:16, borderRadius:'50%', background: n === 1 ? color : '#E8E4DC', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontSize:8, color: n === 1 ? '#fff' : '#A8A8A8', fontWeight:700 }}>{n}</span>
                  </div>
                  {n < 4 && <div style={{ width:12, height:1.5, background: '#E8E4DC' }} />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Live preview content */}
          <div key={`${previewKey}-${activeLayout}`}>
            {layout === 'wizard' ? (
              <PreviewWizard
                color={color}
                colorLight={colorLight}
                font={font}
                selectedSvc={selectedSvc}
                onSelect={setSelectedSvc}
              />
            ) : (
              <PreviewCalendar
                color={color}
                colorLight={colorLight}
                font={font}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom hint ── */}
      <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2D9D6F', animation: 'iwc-float-a 1.5s ease-in-out infinite' }} />
        <span style={{ fontSize: 11, color: '#6B6B6B' }}>
          Změny vidíte živě · Vložení jedním řádkem kódu
        </span>
      </div>
    </div>
  );
}
