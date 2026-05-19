import React from 'react';

const steps = [
  {
    n: '01',
    icon: 'solar:user-plus-linear',
    title: 'Zaregistrujte se zdarma',
    desc: 'Vytvoříte si účet za 30 sekund. Bez platební karty, bez závazků — jen email a heslo.',
    bullet: 'Hotovo za 30 sekund',
  },
  {
    n: '02',
    icon: 'solar:tuning-square-2-linear',
    title: 'Přidejte služby a zaměstnance',
    desc: 'Definujte své služby, ceny, délku trvání. Přidejte tým a nastavte pracovní hodiny.',
    bullet: 'Hotovo do 30 minut',
  },
  {
    n: '03',
    icon: 'solar:code-square-linear',
    title: 'Vložte widget na web',
    desc: 'Jeden řádek kódu na váš web — nebo sdílejte unikátní odkaz na Instagramu a sociálních sítích.',
    bullet: 'Hotovo za hodinu',
  },
];

export default function HowItWorks() {
  return (
    <section id="jak-to-funguje" className="section mesh-soft" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '56px', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
            }}
          >
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--accent-warm)' }} />
            <span className="eyebrow" style={{ color: 'var(--accent-warm)' }}>Jak to funguje</span>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--accent-warm)' }} />
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: '-0.028em',
              marginBottom: '16px',
            }}
          >
            Spustíte za <span className="gradient-text">hodinu.</span>
          </h2>
          <p style={{ maxWidth: '560px', margin: '0 auto', fontSize: '17px', lineHeight: 1.55, color: 'var(--ink-secondary)' }}>
            Tři kroky od registrace k první online rezervaci. Bez programátora, bez IT znalostí.
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            position: 'relative',
          }}
        >
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="card-premium"
              style={{
                padding: '40px 32px 32px',
                borderRadius: '24px',
                background: 'var(--surface-elevated)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Number badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '8px',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: 'var(--violet)',
                    background: 'linear-gradient(135deg, #5B4FE9, #E89B6C)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {s.n}
                </span>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(91, 79, 233, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--violet)',
                  }}
                >
                  <iconify-icon icon={s.icon} width="22" height="22"></iconify-icon>
                </div>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.25 }}>{s.title}</h3>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '15px', lineHeight: 1.55, margin: 0, flex: 1 }}>
                {s.desc}
              </p>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '999px',
                  background: 'rgba(45, 157, 111, 0.08)',
                  color: 'var(--accent-success)',
                  fontSize: '12px',
                  fontWeight: 600,
                  alignSelf: 'flex-start',
                }}
              >
                <iconify-icon icon="solar:clock-circle-linear" width="14" height="14"></iconify-icon>
                {s.bullet}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
