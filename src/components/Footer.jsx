import React from 'react';
import { Logo } from './Logo';

const productLinks = [
  { label: 'Funkce', href: '#funkce' },
  { label: 'Widget na web', href: '#funkce' },
  { label: 'Ceník', href: '#cenik' },
  { label: 'Demo', href: '#demo' },
];

const companyLinks = [
  { label: 'O nás', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Kontakt', href: 'mailto:podpora@terminuj.cz' },
  { label: 'Kariéra', href: '#' },
];

const legalLinks = [
  { label: 'Obchodní podmínky', href: '#' },
  { label: 'Ochrana soukromí', href: '#' },
  { label: 'GDPR', href: '#' },
  { label: 'Cookies', href: '#' },
];

export default function Footer() {
  return (
    <footer style={{ padding: '0 16px 32px' }}>
      <div
        className="dark-card-grain"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: '#1A1A1A',
          color: '#F5F4F2',
          borderRadius: '32px',
          padding: 'clamp(48px, 6vw, 72px) clamp(28px, 5vw, 64px) clamp(28px, 4vw, 40px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative gradient */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-100px',
            right: '20%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(91, 79, 233, 0.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Logo + tagline + newsletter */}
          <div style={{ gridColumn: 'span 1', minWidth: '260px' }}>
            <a
              href="#"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                color: '#fff',
                textDecoration: 'none',
                marginBottom: '20px',
              }}
            >
              <Logo size={22} color="#fff" />
            </a>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '320px',
                marginBottom: '24px',
              }}
            >
              Rezervační systém pro salony, studia a poskytovatele služeb. Bez zbytečné složitosti, s vším, co vaše firma potřebuje.
            </p>

            {/* Newsletter */}
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{
                display: 'flex',
                gap: '6px',
                maxWidth: '320px',
              }}
            >
              <input
                type="email"
                placeholder="Váš e-mail"
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  color: '#fff',
                  fontSize: '13px',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '12px 16px',
                  background: 'linear-gradient(135deg, #5B4FE9 0%, #7C6FF5 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Odebírat
                <iconify-icon icon="solar:arrow-right-linear" width="12" height="12"></iconify-icon>
              </button>
            </form>
          </div>

          {/* Columns */}
          {[
            { title: 'Produkt', links: productLinks },
            { title: 'Společnost', links: companyLinks },
            { title: 'Právní', links: legalLinks },
          ].map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: '20px',
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {col.links.map((l) => (
                  <li key={l.label} style={{ marginBottom: '12px' }}>
                    <a
                      href={l.href}
                      style={{
                        color: 'rgba(255,255,255,0.7)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'color 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Watermark logo */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 0,
            left: '-5%',
            right: '-5%',
            opacity: 0.07,
            pointerEvents: 'none',
            lineHeight: 0,
          }}
        >
          <Logo
            color="#fff"
            accent="#FF5A3C"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Bottom row */}
        <div
          style={{
            marginTop: '48px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            © 2026 Terminuj.cz · Všechna práva vyhrazena
          </p>

          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { icon: 'simple-icons:instagram', label: 'Instagram' },
              { icon: 'simple-icons:facebook', label: 'Facebook' },
              { icon: 'simple-icons:linkedin', label: 'LinkedIn' },
              { icon: 'simple-icons:youtube', label: 'YouTube' },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                <iconify-icon icon={social.icon} width="16" height="16"></iconify-icon>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
