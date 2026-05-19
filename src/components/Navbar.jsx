import React, { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Funkce', href: '#funkce' },
    { label: 'Jak to funguje', href: '#jak-to-funguje' },
    { label: 'Ceník', href: '#cenik' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: scrolled ? '12px' : '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '1100px',
        padding: '0 16px',
        zIndex: 50,
        transition: 'top 0.3s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--border)',
          borderRadius: '999px',
          padding: '8px 8px 8px 20px',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.06)' : '0 2px 8px rgba(0,0,0,0.03)',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--ink-primary)',
          }}
          aria-label="Terminuj.cz domů"
        >
          <div className="logo-orb" style={{ width: '32px', height: '32px' }} />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.025em' }}>
            Terminuj<span style={{ color: 'var(--ink-tertiary)', fontWeight: 500 }}>.cz</span>
          </span>
        </a>

        {/* Desktop links */}
        <div
          className="nav-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--ink-secondary)',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-secondary)')}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a
            href="#prihlaseni"
            className="nav-login"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--ink-secondary)',
              textDecoration: 'none',
              padding: '8px 14px',
            }}
          >
            Přihlásit
          </a>
          <a href="#registrace" className="btn-premium" style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '999px' }}>
            Začít zdarma
            <iconify-icon icon="solar:arrow-right-linear" width="14" height="14"></iconify-icon>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
        }
        @media (max-width: 540px) {
          .nav-login { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
