import React from 'react';

export default function Hero() {
  return (
    <section
      className="hero-bg"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '160px',
        paddingBottom: '80px',
      }}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(91, 79, 233, 0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '50px',
          left: '-150px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(232, 155, 108, 0.14) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
        {/* Eyebrow tag */}
        <div
          className="animate-fade-up"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border)',
            padding: '6px 14px',
            borderRadius: '999px',
            marginBottom: '32px',
          }}
        >
          <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
            <span
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--accent-success)',
                borderRadius: '50%',
                animation: 'pulse-ring 1.6s ease-out infinite',
              }}
            />
            <span
              style={{
                position: 'relative',
                width: '8px',
                height: '8px',
                background: 'var(--accent-success)',
                borderRadius: '50%',
              }}
            />
          </span>
          <span className="eyebrow" style={{ letterSpacing: '0.12em' }}>
            Nová verze · Květen 2026
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.035em',
            maxWidth: '900px',
            margin: '0 auto 24px',
            animationDelay: '60ms',
          }}
        >
          Rezervační systém,
          <br />
          který <span className="gradient-text">pracuje za vás</span>
        </h1>

        {/* Subhead */}
        <p
          className="animate-fade-up"
          style={{
            fontSize: '19px',
            lineHeight: 1.55,
            color: 'var(--ink-secondary)',
            maxWidth: '620px',
            margin: '0 auto 40px',
            animationDelay: '140ms',
          }}
        >
          Přijímejte rezervace 24/7, spravujte zaměstnance a berte online platby — vše z jednoho místa.
          Bez IT znalostí, spustíte za hodinu.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up"
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '24px',
            animationDelay: '220ms',
          }}
        >
          <a href="#registrace" className="btn-premium" style={{ fontSize: '15px', padding: '15px 28px' }}>
            Začít zdarma
            <iconify-icon icon="solar:arrow-right-linear" width="16" height="16"></iconify-icon>
          </a>
          <a href="#demo" className="btn-secondary" style={{ fontSize: '15px', padding: '15px 28px' }}>
            <iconify-icon icon="solar:play-circle-linear" width="18" height="18"></iconify-icon>
            Vyzkoušet demo
          </a>
        </div>

        {/* Trust microcopy */}
        <div
          className="animate-fade-up"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            marginBottom: '64px',
            color: 'var(--ink-tertiary)',
            fontSize: '13px',
            animationDelay: '300ms',
          }}
        >
          {[
            { icon: 'solar:check-circle-bold', text: 'Žádná platební karta' },
            { icon: 'solar:check-circle-bold', text: '14 dní zdarma' },
            { icon: 'solar:check-circle-bold', text: 'Zrušení kdykoliv' },
          ].map((item) => (
            <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <iconify-icon icon={item.icon} width="14" height="14" style={{ color: 'var(--accent-success)' }}></iconify-icon>
              {item.text}
            </div>
          ))}
        </div>

        {/* Dashboard screenshot */}
        <div
          className="animate-fade-up"
          style={{
            position: 'relative',
            maxWidth: '1140px',
            margin: '0 auto',
            animationDelay: '380ms',
          }}
        >
          {/* Glow underneath */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              right: '10%',
              bottom: '-20%',
              background: 'radial-gradient(ellipse, rgba(91, 79, 233, 0.25) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              boxShadow: '0 32px 80px -20px rgba(91, 79, 233, 0.25), 0 8px 24px rgba(0,0,0,0.08)',
              background: '#fff',
            }}
          >
            <img
              src="/screenshots/dashboard.png"
              alt="Terminuj.cz dashboard"
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
            {/* Subtle top fade for browser-chrome feel */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
              }}
            />
          </div>

          {/* Floating stat cards */}
          <div
            className="animate-float"
            style={{
              position: 'absolute',
              top: '12%',
              left: '-3%',
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '14px 18px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animationDelay: '0.5s',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(45, 157, 111, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <iconify-icon icon="solar:bell-bold" width="18" height="18" style={{ color: 'var(--accent-success)' }}></iconify-icon>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', color: 'var(--ink-tertiary)', fontWeight: 500 }}>Nová rezervace</div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Jana Nováková · 14:30</div>
            </div>
          </div>

          <div
            className="animate-float"
            style={{
              position: 'absolute',
              bottom: '15%',
              right: '-3%',
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '14px 18px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animationDelay: '1.2s',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(91, 79, 233, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <iconify-icon icon="solar:dollar-bold" width="18" height="18" style={{ color: 'var(--violet)' }}></iconify-icon>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', color: 'var(--ink-tertiary)', fontWeight: 500 }}>Platba přijata</div>
              <div className="font-mono" style={{ fontSize: '14px', fontWeight: 700 }}>+ 1 200 Kč</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .animate-float { display: none !important; }
        }
      `}</style>
    </section>
  );
}
