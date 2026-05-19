import React from 'react';

export default function CTA() {
  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div
          className="dark-card-grain"
          style={{
            position: 'relative',
            borderRadius: '32px',
            padding: 'clamp(48px, 8vw, 96px) clamp(24px, 6vw, 80px)',
            background: 'linear-gradient(160deg, #1A1A1A 0%, #2a1a5c 60%, #3d2147 100%)',
            color: '#fff',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          {/* Decorative gradient blobs */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '-80px',
              right: '-80px',
              width: '320px',
              height: '320px',
              background: 'radial-gradient(circle, rgba(91, 79, 233, 0.4) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              bottom: '-80px',
              left: '-80px',
              width: '360px',
              height: '360px',
              background: 'radial-gradient(circle, rgba(232, 155, 108, 0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: 'rgba(232, 155, 108, 0.15)',
                color: 'var(--accent-warm)',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                marginBottom: '28px',
              }}
            >
              <iconify-icon icon="solar:rocket-bold" width="14" height="14"></iconify-icon>
              Spusťte rezervace ještě dnes
            </div>

            <h2
              style={{
                fontSize: 'clamp(32px, 5vw, 56px)',
                lineHeight: 1.08,
                fontWeight: 700,
                letterSpacing: '-0.03em',
                marginBottom: '24px',
                color: '#fff',
              }}
            >
              Připraveni mít{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #A09AF8 0%, #E89B6C 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                plný diář?
              </span>
            </h2>

            <p
              style={{
                fontSize: '18px',
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '560px',
                margin: '0 auto 40px',
              }}
            >
              Vytvořte si bezplatný účet. Bez platební karty, bez závazků.
              Spustíte rezervace za hodinu — a uvidíte rozdíl už příští týden.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '40px',
              }}
            >
              <a
                href="#registrace"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  background: '#fff',
                  color: '#1A1A1A',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '15px',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Vytvořit bezplatný účet
                <iconify-icon icon="solar:arrow-right-linear" width="16" height="16"></iconify-icon>
              </a>
              <a
                href="#demo"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '15px',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                }}
              >
                <iconify-icon icon="solar:calendar-linear" width="16" height="16"></iconify-icon>
                Domluvit si demo
              </a>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '32px',
                flexWrap: 'wrap',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '13px',
              }}
            >
              {[
                { icon: 'solar:shield-check-linear', label: 'GDPR & SSL' },
                { icon: 'solar:card-linear', label: 'Bez platební karty' },
                { icon: 'solar:close-circle-linear', label: 'Zrušení kdykoli' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    letterSpacing: '0.04em',
                  }}
                >
                  <iconify-icon icon={item.icon} width="16" height="16" style={{ color: 'var(--accent-warm)' }}></iconify-icon>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
