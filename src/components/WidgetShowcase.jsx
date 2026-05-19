import React from 'react';
import InteractiveWidgetCustomizer from './InteractiveWidgetCustomizer';
import DemoBookingWidget from './DemoBookingWidget';

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

        {/* Two-column showcase: customizer + live demo */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '24px',
            marginBottom: '56px',
            alignItems: 'start',
          }}
        >
          <InteractiveWidgetCustomizer />
          <DemoBookingWidget />
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
