import React, { useState } from 'react';

const plans = [
  {
    name: 'Free',
    desc: 'Pro vyzkoušení a malé začátky.',
    priceMonth: '0',
    priceYear: '0',
    features: [
      'Základní přístup',
      '1 zaměstnanec',
      '2 služby',
      'E-mailová podpora',
      'GDPR & SSL v ceně',
    ],
    btn: 'Vyzkoušet zdarma',
    highlight: false,
  },
  {
    name: 'Basic',
    desc: 'Pro jednotlivce a malé salony.',
    priceMonth: '490',
    priceYear: '4 490',
    features: [
      'Až 3 zaměstnanci',
      'Až 5 služeb',
      'Online rezervace 24/7',
      'E-mailové notifikace',
      'Základní statistiky',
    ],
    btn: 'Vybrat Basic',
    highlight: false,
  },
  {
    name: 'Pro',
    desc: 'Pro rostoucí salony a studia.',
    priceMonth: '990',
    priceYear: '8 990',
    features: [
      'Neomezení zaměstnanci',
      'Neomezené služby',
      'Online platby (Stripe & GoPay)',
      'Vouchery a balíčky',
      'Vlastní e-mailové šablony',
      'Pokročilé statistiky',
      'Prioritní podpora',
    ],
    btn: 'Vybrat Pro',
    highlight: true,
    badge: 'Nejoblíbenější',
  },
  {
    name: 'Enterprise',
    desc: 'Pro řetězce a větší firmy.',
    priceMonth: '2 490',
    priceYear: '22 490',
    features: [
      'Vše z Pro',
      'Více poboček',
      'Stripe Connect (výplaty)',
      'Vlastní doména',
      'SLA & dedikovaná podpora',
      'Individuální integrace',
    ],
    btn: 'Kontaktovat tým',
    highlight: false,
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="cenik" className="section" style={{ background: 'var(--surface-base)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--violet)' }} />
            <span className="eyebrow" style={{ color: 'var(--violet)' }}>Ceník</span>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--violet)' }} />
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: '-0.028em',
              marginBottom: '16px',
            }}
          >
            Jednoduché ceny,
            <br />
            <span className="gradient-text">žádná překvapení.</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 32px', fontSize: '17px', lineHeight: 1.55, color: 'var(--ink-secondary)' }}>
            Začněte zdarma. Upgradujte kdykoli. Zrušení bez sankcí. Žádné transakční poplatky z plateb.
          </p>

          {/* Billing toggle */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px',
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '999px',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <button
              onClick={() => setYearly(false)}
              style={{
                padding: '10px 20px',
                borderRadius: '999px',
                border: 'none',
                background: !yearly ? 'var(--violet)' : 'transparent',
                color: !yearly ? '#fff' : 'var(--ink-secondary)',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.2s ease',
              }}
            >
              Měsíčně
            </button>
            <button
              onClick={() => setYearly(true)}
              style={{
                padding: '10px 20px',
                borderRadius: '999px',
                border: 'none',
                background: yearly ? 'var(--violet)' : 'transparent',
                color: yearly ? '#fff' : 'var(--ink-secondary)',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              Ročně
              <span
                style={{
                  padding: '2px 8px',
                  background: yearly ? 'rgba(255,255,255,0.2)' : 'rgba(45, 157, 111, 0.15)',
                  color: yearly ? '#fff' : 'var(--accent-success)',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 700,
                }}
              >
                −17 %
              </span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            alignItems: 'stretch',
          }}
        >
          {plans.map((plan) => {
            const price = yearly ? plan.priceYear : plan.priceMonth;
            const suffix = yearly ? '/rok' : '/měsíc';
            const isFree = plan.priceMonth === '0';

            return (
              <div
                key={plan.name}
                className={plan.highlight ? 'dark-card-grain' : 'card-premium'}
                style={
                  plan.highlight
                    ? {
                        position: 'relative',
                        borderRadius: '24px',
                        padding: '36px 28px',
                        background: 'linear-gradient(165deg, #2a1a5c 0%, #1A1A1A 100%)',
                        color: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        boxShadow: '0 24px 60px -16px rgba(91, 79, 233, 0.45)',
                      }
                    : {
                        padding: '36px 28px',
                        borderRadius: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                      }
                }
              >
                {plan.highlight && (
                  <>
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute',
                        top: '-40px',
                        right: '-40px',
                        width: '180px',
                        height: '180px',
                        background: 'rgba(232, 155, 108, 0.3)',
                        filter: 'blur(60px)',
                        pointerEvents: 'none',
                      }}
                    />
                    <div
                      style={{
                        display: 'inline-flex',
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 12px',
                        background: 'rgba(232, 155, 108, 0.2)',
                        color: 'var(--accent-warm)',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom: '20px',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <iconify-icon icon="solar:star-bold" width="12" height="12"></iconify-icon>
                      {plan.badge}
                    </div>
                  </>
                )}

                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    marginBottom: '6px',
                    position: 'relative',
                    zIndex: 1,
                    color: plan.highlight ? '#fff' : 'var(--ink-primary)',
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  style={{
                    fontSize: '13.5px',
                    color: plan.highlight ? 'rgba(255,255,255,0.6)' : 'var(--ink-secondary)',
                    marginBottom: '24px',
                    lineHeight: 1.5,
                    minHeight: '40px',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {plan.desc}
                </p>

                {/* Price */}
                <div style={{ marginBottom: '28px', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
                  {!isFree && (
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '42px',
                        fontWeight: 700,
                        color: plan.highlight ? '#fff' : 'var(--ink-primary)',
                      }}
                    >
                      {price}
                    </span>
                  )}
                  {isFree && (
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '42px',
                        fontWeight: 700,
                        color: plan.highlight ? '#fff' : 'var(--ink-primary)',
                      }}
                    >
                      0
                    </span>
                  )}
                  <span style={{ fontSize: '14px', color: plan.highlight ? 'rgba(255,255,255,0.5)' : 'var(--ink-tertiary)', fontWeight: 500 }}>
                    Kč{!isFree && suffix}
                  </span>
                </div>

                {/* Features */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flex: 1, position: 'relative', zIndex: 1 }}>
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '7px 0',
                        fontSize: '14px',
                        color: plan.highlight ? 'rgba(255,255,255,0.85)' : 'var(--ink-secondary)',
                        lineHeight: 1.5,
                      }}
                    >
                      <iconify-icon
                        icon="solar:check-circle-bold"
                        width="18"
                        height="18"
                        style={{
                          color: plan.highlight ? 'var(--accent-warm)' : 'var(--violet)',
                          flexShrink: 0,
                          marginTop: '1px',
                        }}
                      ></iconify-icon>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={plan.highlight ? '' : ''}
                  style={
                    plan.highlight
                      ? {
                          width: '100%',
                          padding: '14px',
                          borderRadius: '12px',
                          border: 'none',
                          background: 'linear-gradient(135deg, #E89B6C 0%, #F5B989 100%)',
                          color: '#1A1A1A',
                          fontFamily: 'var(--font-body)',
                          fontWeight: 700,
                          fontSize: '14px',
                          cursor: 'pointer',
                          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                          boxShadow: '0 8px 20px rgba(232, 155, 108, 0.35)',
                          position: 'relative',
                          zIndex: 1,
                        }
                      : {
                          width: '100%',
                          padding: '14px',
                          borderRadius: '12px',
                          border: '1px solid var(--border)',
                          background: 'var(--surface-elevated)',
                          color: 'var(--ink-primary)',
                          fontFamily: 'var(--font-body)',
                          fontWeight: 600,
                          fontSize: '14px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {plan.btn}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p
          style={{
            textAlign: 'center',
            marginTop: '32px',
            fontSize: '13px',
            color: 'var(--ink-tertiary)',
          }}
        >
          Všechny plány zahrnují SSL, denní zálohy dat a GDPR soulad. Žádné transakční poplatky z plateb.
        </p>
      </div>
    </section>
  );
}
