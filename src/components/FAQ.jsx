import React, { useState } from 'react';

const faqs = [
  {
    q: 'Jak rychle mohu začít?',
    a: 'Registrace, přidání první služby a vložení widgetu na web trvá méně než hodinu. Pokud potřebujete s čímkoli pomoci, napište nám — odpovídáme do několika hodin.',
  },
  {
    q: 'Musím mít vlastní web?',
    a: 'Ne. Každá organizace dostane vlastní rezervační odkaz (terminuj.cz/rezervace/nazev-firmy), který sdílíte přes sociální sítě nebo do BIO na Instagramu. Klient si rezervuje bez ohledu na to, zda máte web.',
  },
  {
    q: 'Jak fungují online platby?',
    a: 'Propojíte svůj Stripe nebo GoPay účet a peníze chodí přímo k vám. Terminuj.cz si neúčtuje žádnou provizi za transakce — platíte pouze měsíční předplatné.',
  },
  {
    q: 'Mohu zrušit kdykoli?',
    a: 'Ano. Žádné dlouhodobé smlouvy, žádné sankce. Předplatné zrušíte jedním klikem v nastavení a data si můžete stáhnout.',
  },
  {
    q: 'Podporujete více jazyků?',
    a: 'Administrace podporuje češtinu, angličtinu, němčinu a slovenštinu. Rezervační widget se přepíná podle nastavení vaší organizace a podporuje více měn (CZK, EUR, USD, GBP).',
  },
  {
    q: 'Je systém bezpečný?',
    a: 'Ano. Platby probíhají přes šifrovaný Stripe/GoPay, my karty nikdy nevidíme. Data jsou hostována v EU (Supabase Frankfurt) a systém splňuje veškeré požadavky GDPR.',
  },
  {
    q: 'Můžu si widget upravit podle svého webu?',
    a: 'Samozřejmě. V editoru nastavíte barvy, fonty (výběr z Google Fonts), zaoblení rohů i rozložení. Widget bude vypadat jako přirozená součást vašeho webu.',
  },
  {
    q: 'Existuje API pro vlastní integraci?',
    a: 'Ano, plné REST API je dostupné v plánu Enterprise. Můžete napojit svůj CRM, fakturační software nebo cokoli dalšího.',
  },
];

function FAQItem({ q, a, open, onClick }) {
  return (
    <div
      style={{
        borderBottom: '1px solid var(--border)',
        padding: '20px 0',
      }}
    >
      <button
        onClick={onClick}
        aria-expanded={open}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          textAlign: 'left',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          fontFamily: 'var(--font-heading)',
          fontSize: '18px',
          fontWeight: 600,
          color: 'var(--ink-primary)',
          letterSpacing: '-0.015em',
        }}
      >
        {q}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: open ? 'var(--violet)' : 'var(--surface-hover)',
            color: open ? '#fff' : 'var(--ink-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.2s ease',
            transform: open ? 'rotate(45deg)' : 'rotate(0)',
          }}
        >
          <iconify-icon icon="solar:add-circle-linear" width="20" height="20"></iconify-icon>
        </div>
      </button>
      <div
        style={{
          maxHeight: open ? '400px' : '0',
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease',
          marginTop: open ? '12px' : '0',
        }}
      >
        <p style={{ color: 'var(--ink-secondary)', fontSize: '15.5px', lineHeight: 1.6, margin: 0, maxWidth: '720px' }}>
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
            }}
          >
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--accent-warm)' }} />
            <span className="eyebrow" style={{ color: 'var(--accent-warm)' }}>FAQ</span>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--accent-warm)' }} />
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: '-0.028em',
              marginBottom: '16px',
            }}
          >
            Časté otázky.
          </h2>
          <p style={{ fontSize: '17px', lineHeight: 1.55, color: 'var(--ink-secondary)', maxWidth: '560px', margin: '0 auto' }}>
            Nenašli jste odpověď? Napište nám na{' '}
            <a href="mailto:podpora@terminuj.cz" style={{ color: 'var(--violet)', textDecoration: 'none', fontWeight: 600 }}>
              podpora@terminuj.cz
            </a>{' '}
            — odpovídáme do několika hodin.
          </p>
        </div>

        <div>
          {faqs.map((f, i) => (
            <FAQItem
              key={i}
              q={f.q}
              a={f.a}
              open={openIdx === i}
              onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
