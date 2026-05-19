import React from 'react';

const testimonials = [
  {
    quote:
      'Dřív jsem řešila rezervace přes WhatsApp a furt se mi ozývali zákazníci v 11 večer. Teď si rezervují sami a já se konečně soustředím na práci.',
    name: 'Jana Kovářová',
    role: 'Kadeřnice · Salon Vita, Brno',
    initial: 'J',
    dark: true,
  },
  {
    quote:
      'Za první měsíc s Terminuj.cz jsem měla o 40 % víc rezervací. Widget na webu funguje sám a klienti se vracejí díky balíčkům.',
    name: 'Petra Marková',
    role: 'Masérka · Studio Aura, Praha',
    initial: 'P',
    dark: false,
  },
];

export default function Testimonials() {
  return (
    <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--violet)' }} />
            <span className="eyebrow" style={{ color: 'var(--violet)' }}>Co říkají zákazníci</span>
          </div>
          <div className="dotted-line" style={{ marginBottom: '32px' }} />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                lineHeight: 1.08,
                fontWeight: 700,
                letterSpacing: '-0.028em',
                maxWidth: '620px',
                flex: '1 1 460px',
              }}
            >
              Saloňáci, trenérky a maséři, kteří už nemusí řešit rezervace.
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '0 1 auto' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <iconify-icon
                    key={i}
                    icon="solar:star-bold"
                    width="20"
                    height="20"
                    style={{ color: 'var(--accent-warm)' }}
                  ></iconify-icon>
                ))}
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: '22px', fontWeight: 700 }}>4.9/5</div>
                <div style={{ fontSize: '12px', color: 'var(--ink-tertiary)' }}>z 240+ hodnocení</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '20px',
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className={t.dark ? 'dark-card-grain' : 'card-premium'}
              style={
                t.dark
                  ? {
                      padding: '36px 32px',
                      borderRadius: '24px',
                      background: 'linear-gradient(160deg, #1A1A1A 0%, #2a1a5c 100%)',
                      color: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '300px',
                      position: 'relative',
                      overflow: 'hidden',
                    }
                  : {
                      padding: '36px 32px',
                      borderRadius: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '300px',
                    }
              }
            >
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '20px', color: 'var(--accent-warm)' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <iconify-icon key={i} icon="solar:star-bold" width="16" height="16"></iconify-icon>
                  ))}
                </div>
                <blockquote
                  style={{
                    fontSize: '19px',
                    lineHeight: 1.45,
                    fontWeight: 500,
                    letterSpacing: '-0.015em',
                    margin: 0,
                    color: t.dark ? '#fff' : 'var(--ink-primary)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  "{t.quote}"
                </blockquote>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: '24px',
                  paddingTop: '24px',
                  borderTop: t.dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--border)',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--violet-light), var(--accent-warm))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '18px',
                  }}
                >
                  {t.initial}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '15px' }}>{t.name}</div>
                  <div
                    style={{
                      fontSize: '12px',
                      letterSpacing: '0.04em',
                      color: t.dark ? 'rgba(255,255,255,0.6)' : 'var(--ink-tertiary)',
                      marginTop: '2px',
                    }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
