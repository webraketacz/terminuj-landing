import React from 'react';

const features = [
  {
    icon: 'solar:calendar-linear',
    title: 'Online rezervace 24/7',
    desc: 'Zákazníci rezervují sami přes váš web nebo sdílený odkaz. Vy se probudíte s plným diářem.',
    accent: 'violet',
  },
  {
    icon: 'solar:card-linear',
    title: 'Online platby',
    desc: 'Stripe a GoPay přímo v rezervačním formuláři. Záloha, plná platba nebo cash — vy volíte.',
    accent: 'warm',
  },
  {
    icon: 'solar:users-group-rounded-linear',
    title: 'Správa týmu',
    desc: 'Pracovní doby, dovolené, přiřazení ke službám. Každý zaměstnanec má svůj kalendář.',
    accent: 'violet',
  },
  {
    icon: 'solar:box-linear',
    title: 'Balíčky a vouchery',
    desc: 'Prodávejte předplacené balíčky a slevové kódy. Zákazníci se vracejí.',
    accent: 'warm',
  },
  {
    icon: 'solar:chart-2-linear',
    title: 'Přehledy a statistiky',
    desc: 'Víte přesně, které služby vydělávají a kteří zaměstnanci jsou nejvytíženější.',
    accent: 'violet',
  },
  {
    icon: 'solar:letter-linear',
    title: 'Automatické notifikace',
    desc: 'Potvrzení, připomenutí, zrušení — zákazník vždy ví, co se děje. Vlastní SMTP server.',
    accent: 'warm',
  },
  {
    icon: 'solar:code-square-linear',
    title: 'Widget na web',
    desc: 'Jeden řádek kódu, widget vypadá jako součást vašeho webu. Funguje na mobilu.',
    accent: 'violet',
  },
  {
    icon: 'solar:map-point-linear',
    title: 'Více poboček',
    desc: 'Provozujete víc míst? Zvládnete je z jednoho účtu. Zákazník si vybere před rezervací.',
    accent: 'warm',
  },
  {
    icon: 'solar:user-id-linear',
    title: 'Zákazníci (CRM)',
    desc: 'Databáze klientů automaticky rostoucí s každou rezervací. Historie, poznámky, email.',
    accent: 'violet',
  },
  {
    icon: 'solar:refresh-linear',
    title: 'Opakované rezervace',
    desc: 'Každý týden stejný den? Nastavíte jednou, systém vytvoří celou sérii.',
    accent: 'warm',
  },
  {
    icon: 'solar:global-linear',
    title: 'Vícejazyčnost',
    desc: 'Čeština, angličtina, němčina, slovenština. Více měn, časových zón a formátů.',
    accent: 'violet',
  },
  {
    icon: 'solar:settings-linear',
    title: 'Plná kontrola',
    desc: 'Buffery, kapacity, předstihy, přiřazení k zaměstnancům — služby si nastavíte do detailu.',
    accent: 'warm',
  },
];

export default function FeatureGrid() {
  return (
    <section className="section" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-base)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '56px', maxWidth: '720px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--violet)' }} />
            <span className="eyebrow" style={{ color: 'var(--violet)' }}>Co Terminuj.cz umí</span>
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
            12 funkcí, které vám <span className="gradient-text">vrátí čas i zákazníky.</span>
          </h2>
          <p style={{ fontSize: '17px', lineHeight: 1.55, color: 'var(--ink-secondary)' }}>
            Vše, co potřebujete, abyste přestali řešit rezervace přes WhatsApp a začali podnikat naplno.
          </p>
        </div>

        {/* Grid */}
        <div
          className="stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {features.map((f, i) => (
            <div
              key={f.title}
              className="card-premium"
              style={{
                padding: '28px 26px',
                borderRadius: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background:
                    f.accent === 'violet' ? 'rgba(91, 79, 233, 0.08)' : 'rgba(232, 155, 108, 0.1)',
                  color: f.accent === 'violet' ? 'var(--violet)' : 'var(--accent-warm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <iconify-icon icon={f.icon} width="22" height="22"></iconify-icon>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 600, lineHeight: 1.3 }}>{f.title}</h3>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '14.5px', lineHeight: 1.55, margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
