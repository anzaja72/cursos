import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, QrCode, Sparkles, Send, Copy, AlertTriangle } from 'lucide-react';
import { Lead, ApplicationFormData } from '../types';

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitLead: (lead: Lead) => void;
  drawDate: string;
}

export const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({
  isOpen,
  onClose,
  onSubmitLead,
  drawDate,
}) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    whatsapp: '',
    businessType: 'Emprendedor Digital',
    commitmentLevel: '100%',
    acceptedTerms: true,
  });

  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.whatsapp) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const ticketNum = `BECA-IA-${Math.floor(1000 + Math.random() * 9000)}`;
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        ticketNumber: ticketNum,
        fullName: formData.fullName,
        email: formData.email,
        whatsapp: formData.whatsapp,
        businessType: formData.businessType,
        commitmentLevel: formData.commitmentLevel,
        createdAt: new Date().toISOString(),
        status: 'pending',
        score: Math.floor(90 + Math.random() * 10),
      };

      onSubmitLead(newLead);
      setSubmittedLead(newLead);
      setIsSubmitting(false);

      // Trigger Confetti Celebratory Burst
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0071b6', '#69b6ff', '#25D366', '#ffffff'],
        });
      } catch (err) {
        console.log('Confetti error', err);
      }
    }, 600);
  };

  const handleCopyLink = () => {
    const textToCopy = `¡Ya estoy registrado para la Beca 100% de Marketing Digital 2026 con IA! Mi ticket es #${submittedLead?.ticketNumber}. Sorteo el ${drawDate}.`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShareWhatsApp = () => {
    const shareText = encodeURIComponent(
      `¡Hola! Me acabo de inscribir al Sorteo de Beca Completa para el Sistema de Marketing Digital 2026 con IA. Mi ticket oficial es #${submittedLead?.ticketNumber}. ¡Te comparto para que participes también!`
    );
    window.open(`https://wa.me/?text=${shareText}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-black border border-white/10 rounded-2xl overflow-hidden p-6 sm:p-8 shadow-2xl my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-xl bg-white/5 p-2 text-gray-400 hover:text-white transition-colors border border-white/10"
          >
            <X className="h-5 w-5" />
          </button>

          {!submittedLead ? (
            /* Application Form */
            <div>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 border border-orange-500/50 bg-orange-500/10 text-orange-400 text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
                  Aplicación Oficial de Beca
                </span>
                <h3 className="font-display text-2xl font-black text-white italic uppercase">
                  Aplica a la Beca Completa 100% IA
                </h3>
                <p className="mt-1 text-xs text-gray-400 font-light">
                  Ingresa tus datos reales para validar tu folio y participación oficial.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1 uppercase tracking-wider font-mono">
                    Nombre Completo <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carlos Mendoza"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1 uppercase tracking-wider font-mono">
                    Correo Electrónico Principal <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="carlos@tuagencia.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1 uppercase tracking-wider font-mono">
                    Número de WhatsApp (con país) <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+52 55 1234 5678"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-gray-500 mt-1 font-light">
                    Aquí notificaremos los resultados y el acceso a la beca parcial en caso de aplicar.
                  </p>
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1 uppercase tracking-wider font-mono">
                    ¿Cuál es tu rol / tipo de negocio actual?
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full rounded-xl bg-black border border-white/10 px-4 py-2.5 text-sm text-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value="Emprendedor Digital">Emprendedor Digital / E-Commerce</option>
                    <option value="Dueño de Agencia de Marketing">Dueño de Agencia de Marketing</option>
                    <option value="Creador de Contenido / CapCut">Creador de Contenido / Video Maker</option>
                    <option value="Trafficker & Media Buyer">Trafficker / Especialista en Anuncios</option>
                    <option value="Consultor / Coach / Infoproductos">Consultor / Coach / Infoproductos</option>
                    <option value="Freelancer buscando escalar">Freelancer buscando escalar</option>
                  </select>
                </div>

                {/* Commitment Level */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1 uppercase tracking-wider font-mono">
                    ¿Estás dispuesto a implementar inmediatamente?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['100%', 'Alto', 'Curioso'] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setFormData({ ...formData, commitmentLevel: level })}
                        className={`rounded-xl border px-3 py-2 text-xs font-bold transition-all uppercase tracking-wider ${
                          formData.commitmentLevel === level
                            ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                            : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        {level === '100%' ? '⚡ 100%' : level === 'Alto' ? '⚡ Alto' : '👀 Explorar'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Warning Card */}
                <div className="rounded-xl bg-orange-500/10 border border-orange-500/30 p-3 text-xs text-orange-300 flex items-start gap-2.5 font-light">
                  <AlertTriangle className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
                  <p className="italic leading-tight">
                    *(Advertencia: Solo ingresa si estás dispuesto a implementar lo que aprendes).*
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-orange-600 hover:bg-orange-500 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all shadow-lg shadow-orange-600/20 disabled:opacity-50"
                >
                  {isSubmitting ? 'Registrando Folio...' : '[Ingresa tus Datos y Aplica a la Beca Completa de IA Ahora]'}
                </button>

              </form>
            </div>
          ) : (
            /* Confirmation Ticket Screen */
            <div className="text-center py-2">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <h3 className="font-display text-2xl font-black text-white italic uppercase">
                ¡Aplicación Registrada!
              </h3>
              <p className="mt-1 text-xs text-gray-400 font-light">
                Tu folio ha sido ingresado en el bombo oficial para el sorteo del <strong className="text-orange-400 font-mono font-bold">{drawDate}</strong>.
              </p>

              {/* Digital Pass / Ticket Card */}
              <div className="mt-6 rounded-2xl border border-orange-500/40 bg-white/5 backdrop-blur-xl p-5 shadow-2xl relative text-left overflow-hidden">
                <div className="absolute top-0 right-0 bg-orange-500 text-black font-mono text-[9px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  VERIFICADO
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Nº DE TICKET</span>
                    <p className="font-mono text-xl font-black text-orange-400 tracking-wider">
                      {submittedLead.ticketNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-gray-400 uppercase">ESTADO</span>
                    <p className="text-xs font-bold text-emerald-400">Activo en Sorteo</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-4 font-light">
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-mono">Participante:</span>
                    <span className="font-bold text-white">{submittedLead.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-mono">WhatsApp:</span>
                    <span className="font-bold text-white">{submittedLead.whatsapp}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-mono">Perfil:</span>
                    <span className="font-bold text-white">{submittedLead.businessType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-mono">Compromiso:</span>
                    <span className="font-bold text-orange-400">{submittedLead.commitmentLevel}</span>
                  </div>
                </div>

                {/* QR Code Graphic Mockup */}
                <div className="flex items-center gap-4 bg-black/60 border border-white/10 rounded-xl p-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
                    <QrCode className="h-8 w-8" />
                  </div>
                  <div className="text-[11px] text-gray-400 font-light">
                    <p className="text-white font-bold uppercase tracking-wide">Código QR de Validación</p>
                    <p>Guarda esta pantalla o comparte para confirmar tu elegibilidad.</p>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors"
                >
                  <Send className="h-4 w-4" />
                  <span>Compartir en WhatsApp</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-gray-200 hover:bg-white/10 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  <span>{copied ? '¡Copiado!' : 'Copiar Ticket'}</span>
                </button>
              </div>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
