import React, { useEffect, useState } from 'react';
import 'iconify-icon';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import BentoFeatures from './components/BentoFeatures';
import WidgetShowcase from './components/WidgetShowcase';
import FeatureGrid from './components/FeatureGrid';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="overflow-x-hidden antialiased" style={{ backgroundColor: 'var(--surface-base)' }}>
      <Navbar />
      <Hero />
      <TrustBar />
      <BentoFeatures />
      <WidgetShowcase />
      <FeatureGrid />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
