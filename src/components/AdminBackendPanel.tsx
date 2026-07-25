import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Send,
  PhoneCall,
  Search,
  Filter,
  Download,
  Bot,
  Copy,
} from 'lucide-react';
import { Lead } from '../types';

interface AdminBackendPanelProps {
  leads: Lead[];
  onUpdateLeadStatus: (leadId: string, newStatus: Lead['status']) => void;
  programValueUsd: number;
  partialDiscountPercent: number;
  drawDate: string;
}

export const AdminBackendPanel: React.FC<AdminBackendPanelProps> = ({
  leads,
  onUpdateLeadStatus,
  programValueUsd,
  partialDiscountPercent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isDrawingWinner, setIsDrawingWinner] = useState(false);
  const [drawnWinner, setDrawnWinner] = useState<Lead | null>(null);
  const [selectedLeadForOffer, setSelectedLeadForOffer] = useState<Lead | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);

  const discountedPrice = Math.round(programValueUsd * (1 - partialDiscountPercent / 100));

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' ? true : lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Execute Live Winner Sorteo
  const handleRunLiveDraw = () => {
    if (leads.length === 0) return;
    setIsDrawingWinner(true);
    setDrawnWinner(null);

    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * leads.length);
      setDrawnWinner(leads[randomIndex]);
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        const finalWinner = leads[Math.floor(Math.random() * leads.length)];
        setDrawnWinner(finalWinner);
        onUpdateLeadStatus(finalWinner.id, 'winner_full');
        setIsDrawingWinner(false);

        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#0071b6', '#25D366', '#69b6ff', '#ffffff'],
        });
      }
    }, 150);
  };

  const getBackendOfferText = (lead: Lead) => {
    return `Hola ${lead.fullName}, ¡un gusto saludarte! Te escribo de la agencia por tu participación en el Sorteo de la Beca de Marketing Digital con IA 2026.

No ganaste la beca completa del 100%, pero revisamos tu perfil como ${lead.businessType} y es exactamente el tipo de emprendedor con el que queremos trabajar.

Te ofrezco formalmente la Beca Parcial del ${partialDiscountPercent}% de descuento (SÓLO pagas $${discountedPrice} USD en lugar de $${programValueUsd} USD). 

Esta oportunidad expira en 48 horas exactas. ¿Tienes 5 minutos para una breve llamada o te paso el enlace directo de registro?`;
  };

  const handleCopyScript = (lead: Lead) => {
    const text = getBackendOfferText(lead);
    navigator.clipboard.writeText(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  const handleSendWhatsAppDirect = (lead: Lead) => {
    const cleanPhone = lead.whatsapp.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(getBackendOfferText(lead));
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
    onUpdateLeadStatus(lead.id, 'offered_partial');
  };

  const handleExportCSV = () => {
    const headers = 'Ticket,Nombre,Email,WhatsApp,TipoNegocio,Compromiso,Estado,Fecha\n';
    const rows = leads
      .map(
        (l) =>
          `"${l.ticketNumber}","${l.fullName}","${l.email}","${l.whatsapp}","${l.businessType}","${l.commitmentLevel}","${l.status}","${l.createdAt}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_sorteo_beca_ia_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="w-full bg-black py-12 px-4 sm:px-6 border-b border-white/10">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10">
          <div>
            <div className="flex items-center gap-2 text-orange-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-1 font-mono">
              <Bot className="h-4 w-4 text-orange-500" /> Panel de Control CRM
            </div>
            <h2 className="font-display text-2xl font-black text-white italic uppercase">
              Estrategia de Backend & Cierre
            </h2>
            <p className="text-xs text-gray-400 mt-1 font-light">
              Gestiona los prospectos del sorteo, realiza la rifa en vivo y convierte no-ganadores en clientes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-200 hover:bg-white/10 transition-colors"
            >
              <Download className="h-4 w-4 text-orange-400" />
              <span>Exportar CSV</span>
            </button>

            <button
              onClick={handleRunLiveDraw}
              disabled={isDrawingWinner || leads.length === 0}
              className="flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-500 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-lg shadow-orange-600/20 active:scale-95 disabled:opacity-50"
            >
              <Trophy className="h-4 w-4" />
              <span>{isDrawingWinner ? 'Girando Sorteo...' : 'Sorteo en Vivo'}</span>
            </button>
          </div>
        </div>

        {/* Strategy Explanation Blueprint Box */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-emerald-500/20 p-2 text-emerald-400 border border-emerald-500/30 shrink-0">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base uppercase tracking-wide">
                La Estrategia de Cierre Inmediato (Tu Backend):
              </h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed font-light">
                El día del sorteo, contactas a todos los que no ganaron. Les dices:{' '}
                <em className="text-orange-300 font-normal">
                  "No ganaste la beca completa, pero tu perfil es exactamente el tipo de emprendedor con el que queremos trabajar. Te ofrezco la Beca Parcial del {partialDiscountPercent}% de descuento (${discountedPrice} USD), pero tienes que tomarla en esta misma llamada"
                </em>
                . Conviertes a prospectos fríos en clientes de pago en el acto.
              </p>
            </div>
          </div>
        </div>

        {/* Live Draw Winner Result Box */}
        {drawnWinner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border-2 border-orange-500 bg-white/5 backdrop-blur-xl p-6 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-1 text-[10px] font-black text-black uppercase tracking-widest mb-2">
              <Trophy className="h-4 w-4" /> GANADOR DE LA BECA COMPLETA (100%)
            </div>
            <h3 className="font-display text-3xl font-black text-white mt-1 italic uppercase">
              {drawnWinner.fullName}
            </h3>
            <p className="text-sm text-gray-200 mt-1 font-light">
              Ticket: <strong className="text-orange-400 font-mono">{drawnWinner.ticketNumber}</strong> | WhatsApp:{' '}
              <strong className="text-white font-mono">{drawnWinner.whatsapp}</strong>
            </p>
            <p className="text-xs text-gray-400 mt-2 font-light">
              Rol: {drawnWinner.businessType} | Email: {drawnWinner.email}
            </p>
          </motion.div>
        )}

        {/* Leads Table Management */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-xl">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar por nombre, ticket, WhatsApp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl bg-black/60 border border-white/10 pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-xl bg-black/60 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none font-mono"
              >
                <option value="all">Todos los Estados ({leads.length})</option>
                <option value="pending">Pendientes en Sorteo</option>
                <option value="winner_full">Ganador Beca 100%</option>
                <option value="offered_partial">Beca Parcial Oferta Enviada</option>
                <option value="accepted_partial">Aceptó Beca Parcial</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300 font-light">
              <thead className="border-b border-white/10 bg-black/40 text-gray-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="py-3 px-4">Ticket</th>
                  <th className="py-3 px-4">Nombre</th>
                  <th className="py-3 px-4">WhatsApp</th>
                  <th className="py-3 px-4">Tipo de Negocio</th>
                  <th className="py-3 px-4">Compromiso</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 text-right">Acción de Cierre</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      No se encontraron prospectos con este filtro.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-orange-400">
                        {lead.ticketNumber}
                      </td>
                      <td className="py-3 px-4 font-bold text-white">
                        {lead.fullName}
                        <span className="block text-[10px] text-gray-500 font-normal">{lead.email}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-300 font-mono">{lead.whatsapp}</td>
                      <td className="py-3 px-4 text-gray-400">{lead.businessType}</td>
                      <td className="py-3 px-4">
                        <span className="rounded-lg bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold text-orange-400 border border-orange-500/20 font-mono">
                          {lead.commitmentLevel}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {lead.status === 'winner_full' && (
                          <span className="rounded-lg bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30 uppercase tracking-wider font-mono">
                            🏆 Ganador 100%
                          </span>
                        )}
                        {lead.status === 'offered_partial' && (
                          <span className="rounded-lg bg-orange-500/20 px-2 py-0.5 text-[10px] font-bold text-orange-400 border border-orange-500/30 uppercase tracking-wider font-mono">
                            💬 Oferta Enviada
                          </span>
                        )}
                        {lead.status === 'accepted_partial' && (
                          <span className="rounded-lg bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-400 border border-purple-500/30 uppercase tracking-wider font-mono">
                            💰 Cliente Cerrado
                          </span>
                        )}
                        {lead.status === 'pending' && (
                          <span className="rounded-lg bg-white/5 px-2 py-0.5 text-[10px] font-medium text-gray-400 font-mono">
                            Pendiente Sorteo
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedLeadForOffer(lead)}
                            className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-200 hover:bg-white/10 transition-colors"
                          >
                            Ver Guión
                          </button>
                          <button
                            onClick={() => handleSendWhatsAppDirect(lead)}
                            className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white transition-colors flex items-center gap-1"
                            title="Enviar mensaje de Beca Parcial por WhatsApp"
                          >
                            <Send className="h-3 w-3" />
                            <span>WhatsApp</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* Script Modal Preview */}
      <AnimatePresence>
        {selectedLeadForOffer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-black rounded-2xl p-6 shadow-2xl border border-white/10"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <h3 className="font-bold text-white text-base uppercase tracking-wide">
                  Guión de Venta Inmediata: Beca Parcial ({partialDiscountPercent}% Off)
                </h3>
                <button
                  onClick={() => setSelectedLeadForOffer(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-xs font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">
                {getBackendOfferText(selectedLeadForOffer)}
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => handleCopyScript(selectedLeadForOffer)}
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-200 hover:bg-white/10"
                >
                  <Copy className="h-4 w-4" />
                  <span>{copiedScript ? '¡Copiado!' : 'Copiar Guión'}</span>
                </button>

                <button
                  onClick={() => {
                    handleSendWhatsAppDirect(selectedLeadForOffer);
                    setSelectedLeadForOffer(null);
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white"
                >
                  <Send className="h-4 w-4" />
                  <span>Abrir WhatsApp</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
