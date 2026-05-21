import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PLANS_DATA = [
  {
    id: 'free',
    name: 'Free',
    priceMonth: 0,
    priceYear: 0,
    highlight: false,
    btn: 'Začít zdarma',
    href: 'https://app.terminuj.cz/register',
    tagline: 'Pro jednotlivce a začínající provozy bez vstupních nákladů.',
  },
  {
    id: 'lite',
    name: 'Lite',
    priceMonth: 189,
    priceYear: 157,
    highlight: false,
    btn: 'Vybrat Lite',
    href: 'https://app.terminuj.cz/register?plan=lite',
    tagline: 'Živnostníci, kadeřnice, maséři, kosmetičky.',
  },
  {
    id: 'business',
    name: 'Business',
    badge: 'Nejoblíbenější',
    priceMonth: 349,
    priceYear: 290,
    highlight: true,
    btn: 'Upgradovat',
    href: 'https://app.terminuj.cz/register?plan=business',
    tagline: 'Salóny, fitness studia, firmy s více pobočkami.',
  },
  {
    id: 'premium',
    name: 'Premium',
    priceMonth: 790,
    priceYear: 656,
    highlight: false,
    btn: 'Upgradovat',
    href: 'https://app.terminuj.cz/register?plan=premium',
    tagline: 'Velké provozovny, franchise, agentury.',
  },
];

const TABLE_SECTIONS = [
  {
    title: 'Limity',
    rows: [
      {
        label: 'Rezervace / měsíc',
        values: ['200', '1 100', 'Neomezeno', 'Neomezeno'],
      },
      {
        label: 'Služby',
        values: ['3', '11', '25', 'Neomezeno'],
      },
      {
        label: 'Zaměstnanci',
        values: ['2', '6', '15', 'Neomezeno'],
      },
      {
        label: 'Pobočky',
        values: ['1', '3', '10', 'Neomezeno'],
      },
    ],
  },
  {
    title: 'Základní funkce',
    rows: [
      {
        label: 'Veřejná rezervační stránka',
        values: [true, true, true, true],
      },
      {
        label: 'Widget na web / iframe',
        values: [true, true, true, true],
      },
      {
        label: 'E-mailové notifikace',
        values: [true, true, true, true],
      },
      {
        label: 'Správa rezervací v administraci',
        values: [true, true, true, true],
      },
    ],
  },
  {
    title: 'Prodej a platby',
    rows: [
      {
        label: 'Online platby (Stripe, GoPay)',
        values: [false, true, true, true],
      },
      {
        label: 'Vouchery a dárkové poukazy',
        values: [false, true, true, true],
      },
      {
        label: 'Balíčky a předplatné zákazníků',
        values: [false, false, true, true],
      },
    ],
  },
  {
    title: 'Přizpůsobení a brand',
    rows: [
      {
        label: 'Vlastní URL zákaznické stránky',
        values: [false, true, true, true],
      },
      {
        label: 'Vlastní barevné schéma widgetu',
        values: [false, true, true, true],
      },
      {
        label: 'Plný design widgetu a stránky',
        values: [false, false, true, true],
      },
      {
        label: 'Odstranění brandingu Terminuj.cz',
        values: [false, false, true, true],
      },
      {
        label: 'White-label (žádný Terminuj.cz branding)',
        values: [false, false, false, true],
      },
    ],
  },
  {
    title: 'Automatizace a analytika',
    rows: [
      {
        label: 'Vlastní e-maily a připomínky',
        values: [false, true, true, true],
      },
      {
        label: 'Čekací listina',
        values: [false, false, true, true],
      },
      {
        label: 'Základní statistiky rezervací',
        values: [false, true, true, true],
      },
      {
        label: 'Pokročilá analytika a reporty',
        values: [false, false, true, true],
      },
      {
        label: 'Export dat do CSV',
        values: [false, false, true, true],
      },
      {
        label: 'Pokročilé reporty (vlastní filtry, srovnání)',
        values: [false, false, false, true],
      },
    ],
  },
  {
    title: 'Podpora a integrace',
    rows: [
      {
        label: 'Emailová podpora',
        values: [true, true, true, true],
      },
      {
        label: 'Prioritní podpora (do 4 hodin)',
        values: [false, false, false, true],
      },
      {
        label: 'Onboarding asistence',
        values: [false, false, false, true],
      },
      {
        label: 'API přístup',
        values: ['Brzy', 'Brzy', 'Brzy', 'Brzy'],
        note: 'Připravujeme',
      },
      {
        label: 'SMS notifikace',
        values: ['Brzy', 'Brzy', 'Brzy', 'Brzy'],
        note: 'Připravujeme',
      },
    ],
  },
];

const COMPETITION_ROWS = [
  { label: 'Rezervace / měsíc (Free)', terminuj: '200', competitor: '50', terminujWin: true },
  { label: 'Cena nejlevnějšího placeného plánu', terminuj: '189 Kč', competitor: '~297 Kč', terminujWin: true },
  { label: 'Online platby v placeném plánu', terminuj: true, competitor: true, terminujWin: false },
  { label: 'Vouchery v placeném plánu', terminuj: true, competitor: false, terminujWin: true },
  { label: 'Vlastní URL zákaznické stránky', terminuj: true, competitor: false, terminujWin: true },
  { label: 'Česká podpora a lokální platby (CZK)', terminuj: true, competitor: false, terminujWin: true },
];

function CheckIcon({ ok, note }) {
  if (note) {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        padding: '2px 8px', borderRadius: '999px',
        background: 'rgba(212, 162, 74, 0.1)', color: 'var(--accent-warning)',
        fontSize: '11px', fontWeight: 600,
      }}>
        <iconify-icon icon="solar:clock-circle-bold" width="12" height="12"></iconify-icon>
        Brzy
      </span>
    );
  }
  if (ok === true) {
    return <iconify-icon icon="solar:check-circle-bold" width="20" height="20" style={{ color: 'var(--accent-success)' }}></iconify-icon>;
  }
  if (ok === false) {
    return <iconify-icon icon="solar:close-circle-bold" width="20" height="20" style={{ color: 'var(--ink-tertiary)', opacity: 0.4 }}></iconify-icon>;
  }
  return <span style={{ fontWeight: 700, color: 'var(--ink-primary)', fontSize: '14px' }}>{ok}</span>;
}

export default function CenikPage() {
  const [yearly, setYearly] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ backgroundColor: 'var(--surface-base)', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ paddingTop: '120px', paddingBottom: '64px', textAlign: 'center', padding: '120px 24px 64px' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '8px 16px', borderRadius: '999px',
            border: '1px solid var(--border)', background: 'var(--surface-elevated)',
            color: 'var(--ink-secondary)', fontSize: '13px', fontWeight: 500,
            textDecoration: 'none', marginBottom: '32px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--violet)'; e.currentTarget.style.borderColor = 'var(--violet)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ink-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
          <iconify-icon icon="solar:arrow-left-linear" width="14" height="14"></iconify-icon>
          Zpět na úvod
        </Link>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--violet)' }} />
          <span className="eyebrow" style={{ color: 'var(--violet)' }}>Ceník</span>
          <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--violet)' }} />
        </div>

        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.06,
          fontWeight: 700, letterSpacing: '-0.028em', marginBottom: '20px',
        }}>
          Plány pro každou velikost
          <br />
          <span className="gradient-text">provozovny.</span>
        </h1>
        <p style={{ maxWidth: '520px', margin: '0 auto 40px', fontSize: '18px', lineHeight: 1.6, color: 'var(--ink-secondary)' }}>
          Začněte zdarma. Plaťte až když rostete. Bez závazků, bez skrytých poplatků.
        </p>

        {/* Billing toggle */}
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            padding: '4px', background: 'var(--surface-elevated)',
            border: '1px solid var(--border)', borderRadius: '999px',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <button
            onClick={() => setYearly(false)}
            style={{
              padding: '10px 22px', borderRadius: '999px', border: 'none',
              background: !yearly ? 'var(--violet)' : 'transparent',
              color: !yearly ? '#fff' : 'var(--ink-secondary)',
              fontWeight: 600, fontSize: '14px', cursor: 'pointer',
              fontFamily: 'var(--font-body)', transition: 'all 0.2s ease',
            }}
          >
            Měsíčně
          </button>
          <button
            onClick={() => setYearly(true)}
            style={{
              padding: '10px 22px', borderRadius: '999px', border: 'none',
              background: yearly ? 'var(--violet)' : 'transparent',
              color: yearly ? '#fff' : 'var(--ink-secondary)',
              fontWeight: 600, fontSize: '14px', cursor: 'pointer',
              fontFamily: 'var(--font-body)', transition: 'all 0.2s ease',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
            }}
          >
            Ročně
            <span style={{
              padding: '2px 8px',
              background: yearly ? 'rgba(255,255,255,0.2)' : 'rgba(45, 157, 111, 0.15)',
              color: yearly ? '#fff' : 'var(--accent-success)',
              borderRadius: '999px', fontSize: '11px', fontWeight: 700,
            }}>
              −17 %
            </span>
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Plan cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px', marginBottom: '80px',
        }}>
          {PLANS_DATA.map((plan) => {
            const price = yearly ? plan.priceYear : plan.priceMonth;
            const isFree = plan.priceMonth === 0;

            return (
              <div
                key={plan.id}
                className={plan.highlight ? 'dark-card-grain' : 'card-premium'}
                style={plan.highlight ? {
                  position: 'relative', borderRadius: '24px', padding: '32px 24px',
                  background: 'linear-gradient(165deg, #2a1a5c 0%, #1A1A1A 100%)',
                  color: '#fff', display: 'flex', flexDirection: 'column',
                  overflow: 'hidden', boxShadow: '0 24px 60px -16px rgba(91, 79, 233, 0.45)',
                  border: '1.5px solid rgba(91,79,233,0.35)',
                } : {
                  padding: '32px 24px', borderRadius: '24px', display: 'flex', flexDirection: 'column',
                }}
              >
                {plan.highlight && (
                  <>
                    <div aria-hidden style={{
                      position: 'absolute', top: '-40px', right: '-40px',
                      width: '180px', height: '180px',
                      background: 'rgba(91, 79, 233, 0.25)',
                      filter: 'blur(60px)', pointerEvents: 'none',
                    }} />
                    <div style={{
                      display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center',
                      gap: '6px', padding: '4px 10px',
                      background: 'rgba(91,79,233,0.25)', color: '#A09AF8',
                      borderRadius: '999px', fontSize: '11px', fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      marginBottom: '16px', position: 'relative', zIndex: 1,
                    }}>
                      <iconify-icon icon="solar:star-bold" width="11" height="11"></iconify-icon>
                      {plan.badge}
                    </div>
                  </>
                )}

                <h3 style={{
                  fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em',
                  marginBottom: '6px', position: 'relative', zIndex: 1,
                  color: plan.highlight ? '#fff' : 'var(--ink-primary)',
                }}>
                  {plan.name}
                </h3>

                <p style={{
                  fontSize: '12px',
                  color: plan.highlight ? 'rgba(255,255,255,0.5)' : 'var(--ink-secondary)',
                  marginBottom: '20px', lineHeight: 1.5,
                  position: 'relative', zIndex: 1,
                }}>
                  {plan.tagline}
                </p>

                <div style={{ marginBottom: '24px', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span className="font-mono" style={{
                    fontSize: '40px', fontWeight: 700, lineHeight: 1,
                    color: plan.highlight ? '#fff' : 'var(--ink-primary)',
                  }}>
                    {price}
                  </span>
                  <span style={{ fontSize: '13px', color: plan.highlight ? 'rgba(255,255,255,0.45)' : 'var(--ink-tertiary)' }}>
                    {' '}Kč
                  </span>
                  <span style={{ fontSize: '12px', color: plan.highlight ? 'rgba(255,255,255,0.4)' : 'var(--ink-tertiary)' }}>
                    {isFree ? 'navždy' : yearly ? '/měs. ročně' : '/měs.'}
                  </span>
                </div>

                {yearly && !isFree && (
                  <p style={{
                    fontSize: '12px', marginTop: '-18px', marginBottom: '20px',
                    color: plan.highlight ? 'rgba(255,255,255,0.4)' : 'var(--ink-tertiary)',
                    position: 'relative', zIndex: 1,
                  }}>
                    {plan.priceYear * 12} Kč / rok (2 měsíce zdarma)
                  </p>
                )}

                <a
                  href={plan.href}
                  style={plan.highlight ? {
                    display: 'block', width: '100%', padding: '13px',
                    borderRadius: '12px', border: 'none',
                    background: 'linear-gradient(135deg, #5B4FE9 0%, #7C6FF5 100%)',
                    color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 700,
                    fontSize: '14px', cursor: 'pointer', textDecoration: 'none',
                    textAlign: 'center', boxShadow: '0 8px 20px rgba(91, 79, 233, 0.45)',
                    position: 'relative', zIndex: 1, boxSizing: 'border-box',
                    marginTop: 'auto',
                  } : {
                    display: 'block', width: '100%', padding: '13px',
                    borderRadius: '12px', border: '1px solid var(--border)',
                    background: 'var(--surface-elevated)', color: 'var(--ink-primary)',
                    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px',
                    cursor: 'pointer', textDecoration: 'none', textAlign: 'center',
                    boxSizing: 'border-box', marginTop: 'auto',
                  }}
                >
                  {plan.btn}
                </a>
              </div>
            );
          })}
        </div>

        {/* Roční úspora note */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '14px 20px', borderRadius: '12px',
          background: 'rgba(45, 157, 111, 0.06)', border: '1px solid rgba(45, 157, 111, 0.15)',
          marginBottom: '64px',
        }}>
          <iconify-icon icon="solar:tag-price-bold" width="18" height="18" style={{ color: 'var(--accent-success)', flexShrink: 0 }}></iconify-icon>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--ink-secondary)' }}>
            <strong style={{ color: 'var(--ink-primary)' }}>Roční plán = platíte 10 měsíců, 2 dostanete zdarma.</strong>
            {' '}Úspora ~17 % oproti měsíčnímu účtování.
          </p>
        </div>

        {/* Comparison Table */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700,
            letterSpacing: '-0.025em', marginBottom: '8px',
          }}>
            Srovnání plánů
          </h2>
          <p style={{ color: 'var(--ink-secondary)', fontSize: '16px', marginBottom: '40px' }}>
            Přehled všech funkcí — najděte plán přesně pro vaše potřeby.
          </p>

          <div style={{ overflowX: 'auto', borderRadius: '20px', border: '1px solid var(--border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
              <thead>
                <tr style={{ background: 'var(--surface-elevated)' }}>
                  <th style={{
                    padding: '16px 20px', textAlign: 'left', fontSize: '13px',
                    fontWeight: 600, color: 'var(--ink-tertiary)', letterSpacing: '0.04em',
                    textTransform: 'uppercase', width: '35%',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    Funkce
                  </th>
                  {PLANS_DATA.map((plan) => (
                    <th
                      key={plan.id}
                      style={{
                        padding: '16px 12px', textAlign: 'center', fontSize: '14px',
                        fontWeight: 700, letterSpacing: '-0.01em',
                        borderBottom: '1px solid var(--border)',
                        color: plan.highlight ? 'var(--violet)' : 'var(--ink-primary)',
                        background: plan.highlight ? 'rgba(91, 79, 233, 0.04)' : 'transparent',
                        position: 'relative',
                      }}
                    >
                      {plan.badge && (
                        <div style={{
                          position: 'absolute', top: '8px', right: '8px',
                          padding: '2px 6px', borderRadius: '999px',
                          background: 'rgba(91,79,233,0.12)', color: 'var(--violet)',
                          fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}>
                          ⭐
                        </div>
                      )}
                      {plan.name}
                      <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--ink-tertiary)', marginTop: '2px' }}>
                        {plan.priceMonth === 0 ? 'zdarma' : `${yearly ? plan.priceYear : plan.priceMonth} Kč/měs.`}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_SECTIONS.map((section, si) => (
                  <React.Fragment key={section.title}>
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          padding: '12px 20px 8px',
                          fontSize: '11px', fontWeight: 700,
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          color: 'var(--ink-tertiary)',
                          background: 'var(--surface-base)',
                          borderTop: si > 0 ? '2px solid var(--border)' : 'none',
                        }}
                      >
                        {section.title}
                      </td>
                    </tr>
                    {section.rows.map((row, ri) => (
                      <tr
                        key={row.label}
                        style={{ borderTop: '1px solid var(--border)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-hover)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        <td style={{
                          padding: '13px 20px', fontSize: '14px',
                          color: 'var(--ink-secondary)', fontWeight: 400,
                        }}>
                          {row.label}
                          {row.note && (
                            <span style={{
                              marginLeft: '6px', fontSize: '11px',
                              color: 'var(--accent-warning)', fontWeight: 600,
                            }}>
                              ({row.note})
                            </span>
                          )}
                        </td>
                        {row.values.map((val, vi) => (
                          <td
                            key={vi}
                            style={{
                              padding: '13px 12px', textAlign: 'center',
                              background: PLANS_DATA[vi].highlight ? 'rgba(91, 79, 233, 0.03)' : 'transparent',
                            }}
                          >
                            <CheckIcon ok={val === 'Brzy' ? 'Brzy' : val} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Competition Comparison */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700,
                letterSpacing: '-0.025em', marginBottom: '8px',
              }}>
                Terminuj vs. konkurence
              </h2>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '15px', maxWidth: '480px' }}>
                Srovnání s Reenio.cz — nejpopulárnějším alternativním rezervačním systémem na českém trhu.
              </p>
            </div>
            <div style={{
              marginLeft: 'auto', padding: '8px 16px', borderRadius: '12px',
              background: 'rgba(45, 157, 111, 0.08)', border: '1px solid rgba(45, 157, 111, 0.2)',
              fontSize: '13px', color: 'var(--accent-success)', fontWeight: 600,
              whiteSpace: 'nowrap', alignSelf: 'center',
            }}>
              4× více rezervací zdarma
            </div>
          </div>

          <div style={{ overflowX: 'auto', borderRadius: '20px', border: '1px solid var(--border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '480px' }}>
              <thead>
                <tr style={{ background: 'var(--surface-elevated)' }}>
                  <th style={{
                    padding: '16px 20px', textAlign: 'left', fontSize: '13px',
                    fontWeight: 600, color: 'var(--ink-tertiary)', letterSpacing: '0.04em',
                    textTransform: 'uppercase', width: '44%',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    Funkce
                  </th>
                  <th style={{
                    padding: '16px 20px', textAlign: 'center', fontSize: '15px',
                    fontWeight: 700, color: 'var(--violet)',
                    background: 'rgba(91, 79, 233, 0.04)',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    Terminuj.cz
                  </th>
                  <th style={{
                    padding: '16px 20px', textAlign: 'center', fontSize: '15px',
                    fontWeight: 700, color: 'var(--ink-secondary)',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    Reenio.cz
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPETITION_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    style={{ borderTop: '1px solid var(--border)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-hover)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td style={{ padding: '13px 20px', fontSize: '14px', color: 'var(--ink-secondary)' }}>
                      {row.label}
                    </td>
                    <td style={{
                      padding: '13px 20px', textAlign: 'center',
                      background: 'rgba(91, 79, 233, 0.03)',
                      fontWeight: row.terminujWin ? 700 : 400,
                      color: row.terminujWin ? 'var(--accent-success)' : 'var(--ink-secondary)',
                      fontSize: '14px',
                    }}>
                      {typeof row.terminuj === 'boolean' ? (
                        row.terminuj
                          ? <iconify-icon icon="solar:check-circle-bold" width="20" height="20" style={{ color: 'var(--accent-success)' }}></iconify-icon>
                          : <iconify-icon icon="solar:close-circle-bold" width="20" height="20" style={{ color: 'var(--ink-tertiary)', opacity: 0.4 }}></iconify-icon>
                      ) : (
                        <span>
                          {row.terminujWin && <iconify-icon icon="solar:cup-star-bold" width="14" height="14" style={{ color: 'var(--accent-success)', marginRight: '4px', verticalAlign: 'middle' }}></iconify-icon>}
                          {row.terminuj}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '13px 20px', textAlign: 'center', fontSize: '14px', color: 'var(--ink-secondary)' }}>
                      {typeof row.competitor === 'boolean' ? (
                        row.competitor
                          ? <iconify-icon icon="solar:check-circle-bold" width="20" height="20" style={{ color: 'var(--accent-success)' }}></iconify-icon>
                          : <iconify-icon icon="solar:close-circle-bold" width="20" height="20" style={{ color: 'var(--ink-tertiary)', opacity: 0.4 }}></iconify-icon>
                      ) : (
                        row.competitor
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{
            marginTop: '16px', fontSize: '13px', color: 'var(--ink-tertiary)',
            padding: '12px 16px', borderRadius: '10px',
            background: 'var(--surface-elevated)', border: '1px solid var(--border)',
          }}>
            Terminuj.cz nabízí ve free tarifu <strong style={{ color: 'var(--ink-secondary)' }}>4× více rezervací</strong> než Reenio. V placeném tarifu totéž za o <strong style={{ color: 'var(--ink-secondary)' }}>36 % nižší cenu</strong> a s funkcemi jako vouchery nebo vlastní URL navíc.
          </p>
        </div>

        {/* FAQ teaser */}
        <div style={{
          borderRadius: '24px', padding: '48px 40px', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(91, 79, 233, 0.06) 0%, rgba(91, 79, 233, 0.02) 100%)',
          border: '1px solid rgba(91, 79, 233, 0.12)',
          marginBottom: '40px',
        }}>
          <h3 style={{
            fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700,
            letterSpacing: '-0.02em', marginBottom: '12px',
          }}>
            Máte otázky?
          </h3>
          <p style={{ color: 'var(--ink-secondary)', fontSize: '16px', marginBottom: '28px', maxWidth: '440px', margin: '0 auto 28px' }}>
            Kdykoli můžete změnit plán v administraci → Fakturace. Upgrade i downgrade okamžitě, bez sankcí.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://app.terminuj.cz/register"
              className="btn-premium"
              style={{ padding: '14px 28px', borderRadius: '999px', fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              Začít zdarma
              <iconify-icon icon="solar:arrow-right-linear" width="16" height="16"></iconify-icon>
            </a>
            <a
              href="mailto:podpora@terminuj.cz"
              style={{
                padding: '14px 28px', borderRadius: '999px', fontSize: '15px',
                border: '1px solid var(--border)', background: 'var(--surface-elevated)',
                color: 'var(--ink-primary)', textDecoration: 'none', fontWeight: 600,
                fontFamily: 'var(--font-body)', display: 'inline-flex', alignItems: 'center', gap: '8px',
              }}
            >
              <iconify-icon icon="solar:letter-linear" width="16" height="16"></iconify-icon>
              Napsat nám
            </a>
          </div>
        </div>

        {/* SSL/GDPR note */}
        <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--ink-tertiary)' }}>
          Všechny plány zahrnují SSL, zálohy a GDPR soulad. Český systém, česká podpora, platby v CZK.
        </p>
      </div>

      <Footer />
    </div>
  );
}
