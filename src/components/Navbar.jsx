import React, { useEffect, useState, useRef } from 'react';
import { Logo } from './Logo';

const NAV_CSS = `
  @keyframes nav-menu-line-in {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes nav-link-in {
    from { opacity: 0; transform: translateX(-32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes nav-cta-in {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes nav-blob-drift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%       { transform: translate(-20px, 15px) scale(1.06); }
  }
  .mobile-nav-link {
    display: block;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(28px, 9vw, 52px);
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    letter-spacing: -0.03em;
    padding: 12px 0;
    position: relative;
    transition: color 0.2s ease;
    overflow: hidden;
  }
  .mobile-nav-link::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 8px;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #5B4FE9, #FF5A3C);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .mobile-nav-link:hover {
    color: #fff;
  }
  .mobile-nav-link:hover::after {
    transform: scaleX(1);
  }
  .ham-btn {
    display: none;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    position: relative;
    z-index: 110;
  }
  .ham-box {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 22px;
  }
  .ham-line {
    display: block;
    width: 22px;
    height: 2px;
    border-radius: 2px;
    background: var(--ink-primary);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                opacity   0.25s ease,
                width     0.35s cubic-bezier(0.4, 0, 0.2, 1),
                background 0.2s ease;
    transform-origin: center;
  }
  .ham-btn.open .ham-line { background: #fff; }
  .ham-btn.open .ham-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .ham-btn.open .ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .ham-btn.open .ham-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  @media (max-width: 900px) {
    .nav-links { display: none !important; }
    .ham-btn   { display: flex !important; }
  }
  @media (max-width: 540px) {
    .nav-login { display: none !important; }
  }
`;

const LINKS = [
  { label: 'Funkce',          href: '#funkce',         num: '01' },
  { label: 'Jak to funguje',  href: '#jak-to-funguje', num: '02' },
  { label: 'Ceník',           href: '#cenik',          num: '03' },
  { label: 'FAQ',             href: '#faq',            num: '04' },
];

function MobileMenu({ open, onClose }) {
  const ref = useRef(null);

  // Trap focus + Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      aria-hidden={!open}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(10, 10, 16, 0.97)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        clipPath: open ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
        transition: 'clip-path 0.55s cubic-bezier(0.77, 0, 0.175, 1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        pointerEvents: open ? 'all' : 'none',
      }}
    >
      {/* Background blobs */}
      <div aria-hidden style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '420px', height: '420px',
        background: 'radial-gradient(circle, rgba(91,79,233,0.22) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
        animation: 'nav-blob-drift 8s ease-in-out infinite',
      }} />
      <div aria-hidden style={{
        position: 'absolute', bottom: '-60px', left: '-60px',
        width: '360px', height: '360px',
        background: 'radial-gradient(circle, rgba(255,90,60,0.16) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
        animation: 'nav-blob-drift 10s ease-in-out infinite reverse',
      }} />

      {/* Grain overlay */}
      <div aria-hidden className="dark-card-grain" style={{
        position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none',
      }} />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(80px, 12vw, 120px) clamp(28px, 8vw, 72px) clamp(40px, 6vw, 64px)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Links */}
        <nav>
          {LINKS.map((link, i) => (
            <div
              key={link.label}
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'translateX(0)' : 'translateX(-40px)',
                transition: `opacity 0.45s ease ${open ? 120 + i * 90 : 0}ms,
                             transform 0.45s cubic-bezier(0.4,0,0.2,1) ${open ? 120 + i * 90 : 0}ms`,
                display: 'flex',
                alignItems: 'baseline',
                gap: '16px',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.25)',
                width: '20px',
                flexShrink: 0,
                userSelect: 'none',
              }}>
                {link.num}
              </span>
              <a
                href={link.href}
                className="mobile-nav-link"
                onClick={onClose}
              >
                {link.label}
              </a>
            </div>
          ))}
        </nav>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'rgba(255,255,255,0.08)',
          margin: 'clamp(24px, 5vw, 40px) 0',
          opacity: open ? 1 : 0,
          transform: open ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: `opacity 0.4s ease ${open ? 480 : 0}ms, transform 0.5s cubic-bezier(0.4,0,0.2,1) ${open ? 480 : 0}ms`,
        }} />

        {/* CTAs */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(20px)',
          transition: `opacity 0.4s ease ${open ? 560 : 0}ms, transform 0.4s ease ${open ? 560 : 0}ms`,
        }}>
          <a
            href="#prihlaseni"
            onClick={onClose}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              padding: '14px 24px',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '999px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
          >
            Přihlásit se
          </a>
          <a
            href="#registrace"
            onClick={onClose}
            className="btn-premium"
            style={{ fontSize: '15px', padding: '14px 28px', borderRadius: '999px' }}
          >
            Začít zdarma
            <iconify-icon icon="solar:arrow-right-linear" width="16" height="16"></iconify-icon>
          </a>
        </div>

        {/* Bottom tagline */}
        <p style={{
          marginTop: 'auto',
          paddingTop: '32px',
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.2)',
          opacity: open ? 1 : 0,
          transition: `opacity 0.4s ease ${open ? 680 : 0}ms`,
        }}>
          © 2026 Terminuj.cz · Rezervace bez kompromisů
        </p>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Inject CSS once
  useEffect(() => {
    if (!document.getElementById('nav-css')) {
      const s = document.createElement('style');
      s.id = 'nav-css';
      s.textContent = NAV_CSS;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = LINKS;

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: scrolled ? '12px' : '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '1200px',
          padding: '0 24px',
          zIndex: 105,
          transition: 'top 0.3s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: mobileOpen
              ? 'rgba(10, 10, 16, 0.0)'
              : scrolled
              ? 'rgba(255, 255, 255, 0.85)'
              : 'rgba(255, 255, 255, 0.65)',
            backdropFilter: mobileOpen ? 'none' : 'blur(16px)',
            WebkitBackdropFilter: mobileOpen ? 'none' : 'blur(16px)',
            border: `1px solid ${mobileOpen ? 'transparent' : 'var(--border)'}`,
            borderRadius: '999px',
            padding: '8px 8px 8px 20px',
            boxShadow: mobileOpen ? 'none' : scrolled ? '0 8px 32px rgba(0,0,0,0.06)' : '0 2px 8px rgba(0,0,0,0.03)',
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
              color: mobileOpen ? '#fff' : 'var(--ink-primary)',
              transition: 'color 0.3s ease',
              position: 'relative',
              zIndex: 110,
            }}
            aria-label="Terminuj.cz domů"
          >
            <Logo size={28} color={mobileOpen ? '#fff' : 'currentColor'} />
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

          {/* Desktop CTA + Hamburger */}
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
            <a
              href="#registrace"
              className="btn-premium nav-links"
              style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '999px' }}
            >
              Začít zdarma
              <iconify-icon icon="solar:arrow-right-linear" width="14" height="14"></iconify-icon>
            </a>

            {/* Hamburger */}
            <button
              className={`ham-btn${mobileOpen ? ' open' : ''}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Zavřít menu' : 'Otevřít menu'}
              aria-expanded={mobileOpen}
            >
              <span className="ham-box">
                <span className="ham-line" />
                <span className="ham-line" />
                <span className="ham-line" />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
