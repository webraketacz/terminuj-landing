import React, { useState } from 'react';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    desc: 'Pro jednotlivce a začínající provozy, které chtějí spustit rezervace bez vstupních nákladů.',
    priceMonth: 0,
    priceYear: 0,
    label: 'navždy',
    features: [
      'Veřejná rezervační stránka',
      'Widget na web / iframe',
      'E-mailové notifikace',
      'Základní přehled rezervací',
      'Branding Terminuj.cz',
    ],
    btn: 'Začít zdarma',
    href: 'https://app.terminuj.cz/register',
    highlight: false,
  },
  {
    id: 'lite',
    name: 'Lite',
    desc: 'Ideální pro služby, které chtějí víc automatiky, zpráv a základní prodej bez omezení.',
    priceMonth: 189,
    priceYear: 157,
    label: '/měs.',
    features: [
      'Vše z Free',
      'Vlastní zprávy a připomínky',
      'Pracovní doba, volná a blokace',
      'Online platby',
      'Vouchery',
      'Branding Terminuj.cz',
    ],
    btn: 'Vybrat Lite',
    href: 'https://app.terminuj.cz/register?plan=lite',
    highlight: false,
  },
  {
    id: 'business',
    name: 'Business',
    badge: 'Nejoblíbenější',
    desc: 'Silný balíček pro aktivní týmy, které chtějí prodávat, automatizovat a přizpůsobit si vše.',
    priceMonth: 349,
    priceYear: 290,
    label: '/měs.',
    features: [
      'Vše z Lite',
      'Odstranění brandingu Terminuj.cz',
      'Vlastní design widgetu a stránky',
      'Balíčky služeb',
      'Pokročilá analytika',
      'Více zaměstnanců a provozů',
    ],
    btn: 'Upgradovat',
    href: 'https://app.terminuj.cz/register?plan=business',
    highlight: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    desc: 'Pro firmy, které chtějí maximum přizpůsobení, pokročilý prodej a vyšší provozní limity.',
    priceMonth: 790,
    priceYear: 656,
    label: '/měs.',
    features: [
      'Vše z Business',
      'Pokročilé reporty',
      'Rozšířené nastavení designu',
      'Prioritní podpora',
      'Rozšířené platby a prodej',
      'Vyšší provozní limity',
    ],
    btn: 'Upgradovat',
    href: 'https://app.terminuj.cz/register?plan=premium',
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
          <p style={{ maxWidth: '500px', margin: '0 auto 32px', fontSize: '17px', lineHeight: 1.55, color: 'var(--ink-secondary)' }}>
            Začněte zdarma. Upgradujte kdykoli. Zrušení bez poplatků.
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            alignItems: 'stretch',
          }}
        >
          {PLANS.map((plan) => {
            const price = yearly ? plan.priceYear : plan.priceMonth;
            const isFree = plan.priceMonth === 0;

            return (
              <div
                key={plan.id}
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
                        border: '1.5px solid rgba(91,79,233,0.35)',
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
                    <div aria-hidden style={{
                      position: 'absolute', top: '-40px', right: '-40px',
                      width: '180px', height: '180px',
                      background: 'rgba(91, 79, 233, 0.25)',
                      filter: 'blur(60px)', pointerEvents: 'none',
                    }} />
                    <div
                      style={{
                        display: 'inline-flex',
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 12px',
                        background: 'rgba(91,79,233,0.25)',
                        color: '#A09AF8',
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

                <h3 style={{
                  fontSize: '22px', fontWeight: 700, letterSpacing: '-0.025em',
                  marginBottom: '8px', position: 'relative', zIndex: 1,
                  color: plan.highlight ? '#fff' : 'var(--ink-primary)',
                }}>
                  {plan.name}
                </h3>

                <p style={{
                  fontSize: '13px',
                  color: plan.highlight ? 'rgba(255,255,255,0.55)' : 'var(--ink-secondary)',
                  marginBottom: '24px', lineHeight: 1.5,
                  minHeight: '54px', position: 'relative', zIndex: 1,
                }}>
                  {plan.desc}
                </p>

                {/* Price */}
                <div style={{ marginBottom: '28px', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'baseline', gap: '4px', flexWrap: 'wrap' }}>
                  <span className="font-mono" style={{
                    fontSize: '44px', fontWeight: 700, lineHeight: 1,
                    color: plan.highlight ? '#fff' : 'var(--ink-primary)',
                  }}>
                    {price}
                  </span>
                  <span style={{ fontSize: '14px', color: plan.highlight ? 'rgba(255,255,255,0.45)' : 'var(--ink-tertiary)', fontWeight: 500 }}>
                    {' '}Kč
                  </span>
                  <span style={{ fontSize: '13px', color: plan.highlight ? 'rgba(255,255,255,0.45)' : 'var(--ink-tertiary)', fontWeight: 400 }}>
                    {isFree ? 'navždy' : yearly ? '/měs. ročně' : plan.label}
                  </span>
                </div>

                {/* Features */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flex: 1, position: 'relative', zIndex: 1 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '10px',
                      padding: '7px 0', fontSize: '14px', lineHeight: 1.45,
                      color: plan.highlight ? 'rgba(255,255,255,0.82)' : 'var(--ink-secondary)',
                      borderBottom: `1px solid ${plan.highlight ? 'rgba(255,255,255,0.06)' : 'var(--border)'}`,
                    }}>
                      <iconify-icon
                        icon="solar:check-circle-bold"
                        width="16" height="16"
                        style={{ color: plan.highlight ? '#A09AF8' : 'var(--violet)', flexShrink: 0, marginTop: '2px' }}
                      ></iconify-icon>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.href}
                  style={
                    plan.highlight
                      ? {
                          display: 'block', width: '100%', padding: '14px',
                          borderRadius: '12px', border: 'none',
                          background: 'linear-gradient(135deg, #5B4FE9 0%, #7C6FF5 100%)',
                          color: '#fff',
                          fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px',
                          cursor: 'pointer', textDecoration: 'none', textAlign: 'center',
                          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                          boxShadow: '0 8px 20px rgba(91, 79, 233, 0.45)',
                          position: 'relative', zIndex: 1,
                        }
                      : {
                          display: 'block', width: '100%', padding: '14px',
                          borderRadius: '12px',
                          border: '1px solid var(--border)',
                          background: 'var(--surface-elevated)',
                          color: 'var(--ink-primary)',
                          fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px',
                          cursor: 'pointer', textDecoration: 'none', textAlign: 'center',
                          transition: 'all 0.15s ease',
                          boxSizing: 'border-box',
                        }
                  }
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {plan.btn}
                </a>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '13px', color: 'var(--ink-tertiary)' }}>
          Všechny plány zahrnují SSL, zálohy a GDPR soulad.{' '}
          <a href="mailto:podpora@terminuj.cz" style={{ color: 'var(--violet)', textDecoration: 'none' }}>
            Máte otázky? Napište nám
          </a>
        </p>
      </div>
    </section>
  );
}
