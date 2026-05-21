import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Začněte zdarma. Žádná kreditní karta. Neomezená doba používání.',
    priceMonth: 0,
    priceYear: 0,
    highlights: [
      { icon: 'solar:calendar-bold', text: '200 rezervací / měsíc' },
      { icon: 'solar:layers-bold', text: '3 služby, 2 zaměstnanci, 1 pobočka' },
      { icon: 'solar:globe-bold', text: 'Veřejná rezervační stránka' },
      { icon: 'solar:widget-bold', text: 'Widget na web / iframe' },
      { icon: 'solar:bell-bold', text: 'E-mailové notifikace' },
    ],
    btn: 'Začít zdarma',
    href: 'https://app.terminuj.cz/register',
    highlight: false,
  },
  {
    id: 'lite',
    name: 'Lite',
    tagline: 'Online platby, vouchery a vlastní barvy – vše za méně než 200 Kč měsíčně.',
    priceMonth: 189,
    priceYear: 157,
    highlights: [
      { icon: 'solar:calendar-bold', text: '1 100 rezervací / měsíc' },
      { icon: 'solar:layers-bold', text: '11 služeb, 6 zaměstnanců, 3 pobočky' },
      { icon: 'solar:card-bold', text: 'Online platby (Stripe, GoPay)' },
      { icon: 'solar:gift-bold', text: 'Vouchery a dárkové poukazy' },
      { icon: 'solar:link-bold', text: 'Vlastní URL zákaznické stránky' },
    ],
    btn: 'Vybrat Lite',
    href: 'https://app.terminuj.cz/register?plan=lite',
    highlight: false,
  },
  {
    id: 'business',
    name: 'Business',
    badge: 'Nejoblíbenější',
    tagline: 'Váš brand, vaše pravidla. Neomezené rezervace, čekací listina a balíčky.',
    priceMonth: 349,
    priceYear: 290,
    highlights: [
      { icon: 'solar:infinity-bold', text: 'Neomezené rezervace' },
      { icon: 'solar:layers-bold', text: '25 služeb, 15 zaměstnanců, 10 poboček' },
      { icon: 'solar:shield-bold', text: 'Odstranění brandingu Terminuj.cz' },
      { icon: 'solar:box-bold', text: 'Balíčky a čekací listina' },
      { icon: 'solar:chart-bold', text: 'Pokročilá analytika + export CSV' },
    ],
    btn: 'Upgradovat',
    href: 'https://app.terminuj.cz/register?plan=business',
    highlight: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Pro největší provozovny a agentury. Neomezeno vše, prioritní podpora.',
    priceMonth: 790,
    priceYear: 656,
    highlights: [
      { icon: 'solar:infinity-bold', text: 'Neomezeno vše (pobočky, zaměstnanci, služby)' },
      { icon: 'solar:star-bold', text: 'White-label – žádný Terminuj.cz branding' },
      { icon: 'solar:headphones-round-bold', text: 'Prioritní podpora (odpověď do 4 hodin)' },
      { icon: 'solar:graph-bold', text: 'Pokročilé reporty a exporty' },
      { icon: 'solar:code-bold', text: 'API přístup (připravujeme)' },
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
                  {plan.tagline}
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
                    {isFree ? 'navždy' : yearly ? '/měs. ročně' : '/měs.'}
                  </span>
                </div>

                {/* Highlights */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flex: 1, position: 'relative', zIndex: 1 }}>
                  {plan.highlights.map((h) => (
                    <li key={h.text} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '10px',
                      padding: '7px 0', fontSize: '14px', lineHeight: 1.45,
                      color: plan.highlight ? 'rgba(255,255,255,0.82)' : 'var(--ink-secondary)',
                      borderBottom: `1px solid ${plan.highlight ? 'rgba(255,255,255,0.06)' : 'var(--border)'}`,
                    }}>
                      <iconify-icon
                        icon={h.icon}
                        width="16" height="16"
                        style={{ color: plan.highlight ? '#A09AF8' : 'var(--violet)', flexShrink: 0, marginTop: '2px' }}
                      ></iconify-icon>
                      {h.text}
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
                          boxSizing: 'border-box',
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

        {/* Footer note + link to full comparison */}
        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link
            to="/cenik"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 24px',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              background: 'var(--surface-elevated)',
              color: 'var(--ink-secondary)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              marginBottom: '20px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--violet)';
              e.currentTarget.style.color = 'var(--violet)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--ink-secondary)';
            }}
          >
            Zobrazit podrobné srovnání plánů
            <iconify-icon icon="solar:arrow-right-linear" width="15" height="15"></iconify-icon>
          </Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-tertiary)' }}>
            Všechny plány zahrnují SSL, zálohy a GDPR soulad.{' '}
            <a href="mailto:podpora@terminuj.cz" style={{ color: 'var(--violet)', textDecoration: 'none' }}>
              Máte otázky? Napište nám
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
