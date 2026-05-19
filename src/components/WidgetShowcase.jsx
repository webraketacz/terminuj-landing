import React from 'react';

export default function WidgetShowcase() {
  return (
    <section className="section mesh-soft" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '56px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--accent-warm)' }} />
            <span className="eyebrow" style={{ color: 'var(--accent-warm)' }}>Widget na web</span>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--accent-warm)' }} />
          </div>

          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: '-0.028em',
              maxWidth: '780px',
              margin: '0 auto 18px',
            }}
          >
            Widget, který vypadá jako součást <span className="gradient-text-violet">vašeho webu.</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '17px', lineHeight: 1.55, color: 'var(--ink-secondary)' }}>
            Nastavte si barvy, fonty a zaoblení. Vložte jeden řádek kódu na svůj web — a hotovo.
            Zákazník si rezervuje bez vyskakovacího okna, přímo u vás.
          </p>
        </div>

        {/* Two-column showcase: editor + live preview */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '24px',
            marginBottom: '56px',
          }}
        >
          {/* Editor screenshot */}
          <div
            className="card-premium"
            style={{
              padding: '0',
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ padding: '28px 28px 0' }}>
              <span className="badge badge-violet" style={{ marginBottom: '14px' }}>
                <iconify-icon icon="solar:palette-linear" width="12" height="12"></iconify-icon>
                Editor widgetu
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '8px' }}>Plně přizpůsobitelný</h3>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '14px', lineHeight: 1.55, marginBottom: '20px' }}>
                Vyberte ze 4 layoutů, nastavte vlastní paletu a fonty z Google Fonts. Změny vidíte
                živě, než je nasadíte.
              </p>
            </div>
            <div style={{ flex: 1, padding: '0 14px 14px', display: 'flex', alignItems: 'flex-end' }}>
              <img
                src="/screenshots/widget-editor.png"
                alt="Editor rezervačního widgetu"
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                }}
              />
            </div>
          </div>

          {/* Live widget screenshot */}
          <div
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'linear-gradient(160deg, #1A1A1A 0%, #2a1a5c 100%)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              color: '#fff',
              position: 'relative',
            }}
            className="dark-card-grain"
          >
            <span
              className="badge"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'var(--accent-warm)',
                marginBottom: '14px',
                alignSelf: 'flex-start',
              }}
            >
              <iconify-icon icon="solar:code-square-linear" width="12" height="12"></iconify-icon>
              Živý widget
            </span>
            <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '8px', color: '#fff' }}>
              Funguje na mobilu i desktopu
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.55, marginBottom: '20px' }}>
              Průvodce v 6 jednoduchých krocích: služba → pobočka → termín → údaje → platba → potvrzení.
            </p>
            <div style={{ flex: 1, marginTop: 'auto' }}>
              <img
                src="/screenshots/widget-live.png"
                alt="Rezervační widget — živá ukázka"
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Embed code mockup */}
        <div
          style={{
            background: '#1A1A1A',
            borderRadius: '16px',
            padding: '24px 28px',
            maxWidth: '720px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="dark-card-grain"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FEBC2E' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840' }} />
            <span style={{ marginLeft: '12px', color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
              vase-webovky.cz — embed
            </span>
          </div>
          <pre
            style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: '#F5F4F2',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}
          >
            <span style={{ color: '#A8A8A8' }}>{'<!-- Vložte tento řádek na svůj web -->'}</span>{'\n'}
            <span style={{ color: '#9B8FF9' }}>{'<script '}</span>
            <span style={{ color: '#E89B6C' }}>src</span>=<span style={{ color: '#7C9AFF' }}>"https://terminuj.cz/widget.js"</span>{'\n'}        <span style={{ color: '#E89B6C' }}>data-org</span>=<span style={{ color: '#7C9AFF' }}>"vase-firma"</span>
            <span style={{ color: '#9B8FF9' }}>{'></script>'}</span>
          </pre>
        </div>
      </div>
    </section>
  );
}
