import React from 'react';

export default function BentoFeatures() {
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

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '32px',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 48px)',
                lineHeight: 1.08,
                fontWeight: 700,
                letterSpacing: '-0.028em',
                maxWidth: '720px',
                flex: '1 1 480px',
              }}
            >
              Vše, co potřebuje moderní salon nebo studio.
            </h2>
            <p style={{ maxWidth: '380px', fontSize: '16px', lineHeight: 1.6, color: 'var(--ink-secondary)', flex: '0 1 380px' }}>
              Žádné nekonečné funkce, které nikdo nepoužívá. Jen ty, díky kterým budete mít plný diář a víc času na svou práci.
            </p>
          </div>
        </div>

        {/* Bento grid: 4 cards */}
        <div
          className="bento-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Card 1 — Security / Brand Card */}
          <div
            className="card-premium"
            style={{
              padding: '36px 32px',
              borderRadius: '28px',
              minHeight: '480px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'var(--surface-elevated)',
            }}
          >
            <div>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: 'rgba(91, 79, 233, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '28px',
                  color: 'var(--violet)',
                }}
              >
                <iconify-icon icon="solar:shield-check-linear" width="24" height="24"></iconify-icon>
              </div>
              <h3 style={{ fontSize: '22px', lineHeight: 1.2, marginBottom: '16px', fontWeight: 600 }}>
                Bezpečnost na úrovni bank.
              </h3>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '15px', lineHeight: 1.55 }}>
                SSL šifrování, data v EU (Supabase Frankfurt) a kompletní GDPR soulad.
                Platby přes Stripe a GoPay — nikdy je nevidíme.
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', marginTop: '24px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-tertiary)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                GDPR · SSL · EU Hosting
              </span>
            </div>
          </div>

          {/* Card 2 — Dark image card (Calendar) */}
          <div
            className="dark-card-grain"
            style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              minHeight: '480px',
              background: 'linear-gradient(160deg, #2a1a5c 0%, #1A1A1A 100%)',
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              color: '#fff',
            }}
          >
            {/* Decorative calendar grid */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: '0',
                right: '-40px',
                width: '320px',
                height: '320px',
                opacity: 0.15,
                pointerEvents: 'none',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', padding: '20px' }}>
                {Array.from({ length: 35 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: '1',
                      borderRadius: '4px',
                      background: [4, 9, 12, 18, 22, 27].includes(i)
                        ? 'var(--violet-light)'
                        : 'rgba(255,255,255,0.08)',
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  background: 'var(--violet)',
                  borderRadius: '999px',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  marginBottom: '24px',
                }}
              >
                Rezervace 24/7
              </span>
              <p style={{ fontSize: '24px', lineHeight: 1.2, fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '-0.025em', maxWidth: '280px' }}>
                Zákazníci rezervují sami. Vy se probudíte s plným diářem.
              </p>
            </div>

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div className="font-mono" style={{ fontSize: '36px', fontWeight: 700, color: '#fff' }}>+47%</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', maxWidth: '120px', lineHeight: 1.4 }}>
                průměrný nárůst rezervací po nasazení widgetu
              </div>
            </div>
          </div>

          {/* Card 3 — Payments / Money flow */}
          <div
            className="card-premium"
            style={{
              padding: '36px 32px',
              borderRadius: '28px',
              minHeight: '480px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'var(--surface-elevated)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <span className="eyebrow" style={{ color: 'var(--accent-warm)', display: 'block', marginBottom: '8px' }}>
                Online platby
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Bez práce s fakturami</h3>
            </div>

            {/* Circular payment widget */}
            <div
              style={{
                width: '200px',
                height: '200px',
                margin: '0 auto',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '14px solid var(--surface-hover)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '14px solid transparent',
                  borderTopColor: 'var(--violet)',
                  borderRightColor: 'var(--violet-light)',
                  transform: 'rotate(-30deg)',
                }}
              />
              <div style={{ textAlign: 'center' }}>
                <div className="font-mono" style={{ fontSize: '36px', fontWeight: 700, color: 'var(--ink-primary)' }}>0%</div>
                <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--ink-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
                  Provize z plateb
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="badge badge-violet" style={{ background: '#fff', border: '1px solid var(--border)' }}>
                <iconify-icon icon="logos:stripe" width="36" height="14"></iconify-icon>
              </div>
              <div className="badge badge-violet" style={{ background: '#fff', border: '1px solid var(--border)', padding: '6px 12px', color: 'var(--ink-primary)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.04em' }}>
                GoPay
              </div>
            </div>
          </div>

          {/* Card 4 — Team management dark */}
          <div
            className="dark-card-grain"
            style={{
              padding: '36px 32px',
              borderRadius: '28px',
              minHeight: '480px',
              background: 'linear-gradient(155deg, #1A1A1A 0%, #2a1a3c 100%)',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--accent-warm)' }}>
                Tým & pobočky
              </span>
              <div style={{ padding: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px' }}>
                <iconify-icon icon="solar:users-group-rounded-linear" width="18" height="18"></iconify-icon>
              </div>
            </div>

            <p style={{ fontSize: '22px', lineHeight: 1.22, fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '-0.025em' }}>
              Každý zaměstnanec, každá pobočka — vlastní kalendář, vlastní pravidla.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'Jana K.', role: 'Kadeřnice', status: 'Online', color: 'var(--accent-success)' },
                { name: 'Petra M.', role: 'Masérka', status: 'Dovolená', color: 'var(--accent-warning)' },
                { name: 'Tomáš H.', role: 'Trenér', status: 'Online', color: 'var(--accent-success)' },
              ].map((p) => (
                <div
                  key={p.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--violet-light), var(--accent-warm))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 700,
                    }}
                  >
                    {p.name[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 500 }}>{p.name}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{p.role}</div>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: p.color }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: p.color }} />
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
