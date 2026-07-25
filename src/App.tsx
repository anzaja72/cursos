/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RealityCheck } from './components/RealityCheck';
import { PrizeOffer } from './components/PrizeOffer';
import { HowItWorks } from './components/HowItWorks';
import { Transparency } from './components/Transparency';
import { RulesAndUrgency } from './components/RulesAndUrgency';
import { ApplicationFormModal } from './components/ApplicationFormModal';
import { AdminBackendPanel } from './components/AdminBackendPanel';
import { Footer } from './components/Footer';
import { Lead, GiveawayConfig } from './types';
import { INITIAL_LEADS } from './data/initialLeads';

export default function App() {
  const [config, setConfig] = useState<GiveawayConfig>({
    title: 'Sorteo Oficial: Gana una Beca Completa del 100% para Nuestro Sistema de Marketing Digital 2026 con IA',
    programValueUsd: 997,
    totalSeats: 500,
    registeredSeats: 427,
    drawDate: '31 de Julio de 2026',
    endDateMs: Date.now() + 7 * 24 * 60 * 60 * 1000,
    partialDiscountPercent: 80,
    heroBgImage: 'https://i.imgur.com/jBqbzIM.jpg',
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem('sorteo_ia_leads');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading leads', e);
    }
    return INITIAL_LEADS;
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('sorteo_ia_leads', JSON.stringify(leads));
    } catch (e) {
      console.error('Error saving leads', e);
    }
  }, [leads]);

  const handleAddNewLead = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
    setConfig((prev) => ({
      ...prev,
      registeredSeats: Math.min(prev.totalSeats, prev.registeredSeats + 1),
    }));
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  return (
    <div className="min-h-screen bg-[#00071a] text-zinc-100 font-['Inter',sans-serif] selection:bg-[#0071b6] selection:text-white">
      
      {/* Top Header */}
      <Header
        registeredSeats={config.registeredSeats}
        totalSeats={config.totalSeats}
        onOpenForm={() => setIsFormOpen(true)}
        onToggleAdmin={() => setIsAdminOpen((prev) => !prev)}
        isAdminOpen={isAdminOpen}
      />

      {/* Admin CRM Strategy Backend View (When Toggled) */}
      {isAdminOpen && (
        <AdminBackendPanel
          leads={leads}
          onUpdateLeadStatus={handleUpdateLeadStatus}
          programValueUsd={config.programValueUsd}
          partialDiscountPercent={config.partialDiscountPercent}
          drawDate={config.drawDate}
        />
      )}

      {/* Hero Section with image https://imgur.com/jBqbzIM */}
      <Hero
        heroBgImage={config.heroBgImage}
        programValueUsd={config.programValueUsd}
        registeredSeats={config.registeredSeats}
        totalSeats={config.totalSeats}
        onOpenForm={() => setIsFormOpen(true)}
      />

      {/* Section 1: La Realidad de tu Situación */}
      <RealityCheck />

      {/* Section 2: Nuestra Oferta (El Gran Premio) */}
      <PrizeOffer
        programValueUsd={config.programValueUsd}
        onOpenForm={() => setIsFormOpen(true)}
      />

      {/* Section 3: Cómo Funciona el Sistema de Becas & Trofeo de Participación */}
      <HowItWorks
        drawDate={config.drawDate}
        partialDiscountPercent={config.partialDiscountPercent}
        onOpenForm={() => setIsFormOpen(true)}
      />

      {/* Section 4: Por qué hacemos esto (La Transparencia Total) */}
      <Transparency />

      {/* Section 5: Las Reglas del Juego (Escasez y Urgencia Reales) */}
      <RulesAndUrgency
        totalSeats={config.totalSeats}
        registeredSeats={config.registeredSeats}
        endDateMs={config.endDateMs}
        onOpenForm={() => setIsFormOpen(true)}
      />

      {/* Footer */}
      <Footer />

      {/* Application Form & Digital Ticket Modal */}
      <ApplicationFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmitLead={handleAddNewLead}
        drawDate={config.drawDate}
      />

    </div>
  );
}
