# Terminuj.cz — Landing Page

Moderní landing page pro rezervační systém Terminuj.cz, postavená podle brand manuálu (Soft Premium Warm Minimalism). Vychází strukturálně z Ledger SaaS šablony, ale plně přepracovaná do brandu Terminuj.cz.

## 🎨 Design system

- **Fonty:** Plus Jakarta Sans (tělo), Inter (nadpisy), JetBrains Mono (čísla)
- **Barvy:** violet `#5B4FE9`, warm `#E89B6C`, success `#2D9D6F`
- **Pozadí:** `#FAFAF7` s jemnou papírovou texturou (SVG noise)
- **Karty:** `border-radius: 20px`, jemné stíny, hover s elevací
- **CTA:** fialový gradient s glow stínem
- **Animace:** fade-up s spring křivkou (cubic-bezier 0.16, 1, 0.3, 1)

## 📦 Struktura

```
terminuj-landing/
├── index.html              # HTML entry + Google Fonts
├── package.json
├── vite.config.js
├── public/
│   └── screenshots/        # Screenshoty aplikace
│       ├── dashboard.png       # Hero — admin dashboard
│       ├── widget-editor.png   # Editor widgetu
│       ├── widget-live.png     # Živý widget
│       ├── widget-live-2.png   # Detail widgetu
│       └── sidebar.png         # Sidebar
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css           # Celý brand systém (CSS vars, animace)
    └── components/
        ├── Navbar.jsx          # Sticky floating nav
        ├── Hero.jsx            # Hero + dashboard screenshot
        ├── TrustBar.jsx        # Industries marquee
        ├── BentoFeatures.jsx   # 4-card bento (security, 24/7, payments, team)
        ├── WidgetShowcase.jsx  # Editor + live widget screenshoty
        ├── FeatureGrid.jsx     # 12 funkcí systému
        ├── HowItWorks.jsx      # 3-step setup
        ├── Testimonials.jsx    # 2 recenze
        ├── Pricing.jsx         # 4 plány + měsíčně/ročně toggle
        ├── FAQ.jsx             # 8 otázek z PROJECT_OVERVIEW
        ├── CTA.jsx             # Final dark CTA
        └── Footer.jsx          # Newsletter + odkazy
```

## 🚀 Spuštění

```bash
npm install
npm run dev      # localhost:3000
npm run build    # production build do dist/
```

## ✏️ Co dál upravit

- Doplnit reálné recenze (TrustBar má jen industries, můžeš doplnit loga klientů)
- Nahradit `#registrace` / `#prihlaseni` / `#demo` reálnými URL
- Connect form na newsletter (Footer)
- OG image pro social sharing (`/og.png` v `public/`)
- Favicon `/favicon.svg`
