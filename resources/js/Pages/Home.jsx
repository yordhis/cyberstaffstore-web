import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '../Layouts/PublicLayout';
import HeroFlagship from '../Components/Public/HeroFlagship';
import ServicesSection from '../Components/Public/ServicesSection';
import PortfolioSection from '../Components/Public/PortfolioSection';
import CotizadorWizard from '../Components/Public/CotizadorWizard';
import ContactSection from '../Components/Public/ContactSection';

export default function Home({ products, projects, quoteOptions, settings }) {
  return (
    <PublicLayout settings={settings}>
      <Head title="Agencia de Desarrollo de Software & Ideas Tecnológicas" />

      {/* FIRST SECTION MANDATE: Promotion of CyberStock & CyberGym with Demo Links */}
      <HeroFlagship products={products} settings={settings} />

      {/* Services Section */}
      <ServicesSection />

      {/* Portfolio Section */}
      <PortfolioSection projects={projects} />

      {/* Cotizador WhatsApp Section */}
      <CotizadorWizard quoteOptions={quoteOptions} settings={settings} />

      {/* Contact Section */}
      <ContactSection settings={settings} />
    </PublicLayout>
  );
}
