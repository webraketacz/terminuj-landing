import React, { useEffect } from 'react';
import { HeroProvider } from '../context/HeroContext';
import CalendarCard from './hero/CalendarCard';
import RevenueCard from './hero/RevenueCard';
import NotificationCard from './hero/NotificationCard';
import ClientsCard from './hero/ClientsCard';

const HERO_CSS = `
  @keyframes hero-slot-in {
    from { transform: scale(0.88); opacity: 0; }
    to   { transform: scale(1);    opacity: 1; }
  }
  @keyframes hero-badge-in {
    0%   { transform: translateY(-8px) scale(0.9); opacity: 0; }
    15%  { transform: translateY(0)    scale(1);   opacity: 1; }
    75%  { transform: translateY(0)    scale(1);   opacity: 1; }
    100% { transform: translateY(-4px) scale(0.95);opacity: 0; }
  }
  @keyframes hero-notif-in {
    from { transform: translateY(-14px); opacity: 0; }
    to   { transform: translateY(0);     opacity: 1; }
  }
  @keyframes hero-card-reveal {
    from { transform: translateY(20px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  @keyframes hero-count-up {
    from { transform: translateY(6px); opacity: 0; }
    to   { transform: translateY(0);   opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    .hero-bento-card { animation: none !important; }
  }
`;

function HeroInner() {
  useEffect(() => {
    if (!document.getElementById('hero-css')) {
      const s = document.createElement('style');
      s.id = 'hero-css';
      s.textContent = HERO_CSS;
      document.head.appendChild(s);
    }
  }, []);

  return (
    <section
      className="hero-bg"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '100px',
        paddingBottom: '64px',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background blobs */}
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

      <div className="container" style={{ position: 'relative', width: '100%' }}>
        <div
          className="hero-main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 3fr',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* LEFT: Text + CTA */}
          <div>
            {/* Eyebrow badge */}
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

            {/* H1 */}
            <h1
              className="animate-fade-up"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.035em',
                maxWidth: '540px',
                marginBottom: '24px',
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
                fontSize: '17px',
                lineHeight: 1.55,
                color: 'var(--ink-secondary)',
                maxWidth: '460px',
                marginBottom: '36px',
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

            {/* Trust badges */}
            <div
              className="animate-fade-up"
              style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                color: 'var(--ink-tertiary)',
                fontSize: '13px',
                animationDelay: '300ms',
                animation: 'hero-card-reveal 500ms cubic-bezier(.4,0,.2,1) 600ms both',
              }}
            >
              {[
                { icon: 'solar:check-circle-bold', text: 'Žádná platební karta' },
                { icon: 'solar:check-circle-bold', text: '14 dní zdarma' },
                { icon: 'solar:check-circle-bold', text: 'Zrušení kdykoliv' },
              ].map((item) => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <iconify-icon
                    icon={item.icon}
                    width="14"
                    height="14"
                    style={{ color: 'var(--accent-success)' }}
                  ></iconify-icon>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Bento grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
            }}
          >
            <CalendarCard
              className="hero-bento-card"
              style={{ animationDelay: '200ms' }}
            />
            <RevenueCard
              className="hero-bento-card"
              style={{ animationDelay: '280ms' }}
            />
            <NotificationCard
              className="hero-bento-card"
              style={{ animationDelay: '360ms' }}
            />
            <ClientsCard
              className="hero-bento-card"
              style={{ animationDelay: '440ms' }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .hero-bento-card {
          animation: hero-card-reveal 500ms cubic-bezier(.4,0,.2,1) both;
        }
        @media (max-width: 900px) {
          .hero-main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .hero-main-grid { gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

export default function Hero() {
  return (
    <HeroProvider>
      <HeroInner />
    </HeroProvider>
  );
}
