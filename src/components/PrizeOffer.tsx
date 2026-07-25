import React from 'react';
import { motion } from 'motion/react';
import { Gift, Video, Bot, Layers, Rocket } from 'lucide-react';

interface PrizeOfferProps {
  programValueUsd: number;
  onOpenForm: () => void;
}

export const PrizeOffer: React.FC<PrizeOfferProps> = ({ programValueUsd, onOpenForm }) => {
  const features = [
    {
      icon: Video,
      title: 'CapCut Pro + Edición Ultra-Rápida con IA',
      desc: 'Plantillas, guiones automatizados y flujos de trabajo en minutos para reels y TikToks de alta conversión.'
    },
    {
      icon: Bot,
      title: 'Agentes de IA para Captura de Leads',
      desc: 'Clonación de voz, chatbots de prospección y automatizaciones en WhatsApp y redes sociales.'
    },
    {
      icon: Layers,
      title: 'Embudos de Ventas de Alta Conversión',
      desc: 'Diseño de landing pages, secuencias de email y copys persuasivos generados con IA en tiempo real.'
    },
    {
      icon: Rocket,
      title: 'Lanzamiento de Campañas Express',
      desc: 'Cómo pasar de idea a campaña en vivo en Meta y Google Ads en menos de 15 minutos.'
    }
  ];

  return (
    <section className="relative w-full border-b border-zinc-800/80 bg-[#00071a] py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        
        {/* Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded bg-[#0b1f3f] border border-[#0071b6]/30 px-3.5 py-1 text-xs font-bold text-[#69b6ff] uppercase tracking-wider mb-3">
            <Gift className="h-4 w-4 text-[#0071b6]" />
            <span>EL GRAN PREMIO</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Nuestra Oferta (El Gran Premio)
          </h2>
        </div>

        {/* Highlight Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="corporate-card relative overflow-hidden p-6 sm:p-8 shadow-2xl"
        >
          <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-body">
            Estamos regalando el acceso total a nuestro programa premium de{' '}
            <strong className="text-[#69b6ff] font-bold">
              Marketing Digital con Inteligencia Artificial & CapCut
            </strong>
            . Esto no es un curso básico; es la instalación de una habilidad de alto nivel que imprime dinero.
          </p>

          <div className="mt-6 flex items-center gap-4 bg-[#00071a]/90 border border-zinc-800 rounded-md p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[#0071b6] text-white font-mono font-extrabold text-xl">
              $0
            </div>
            <div>
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold label-caps">Valor Minorista Total</p>
              <p className="text-xl font-mono font-extrabold text-white">
                <span className="line-through text-zinc-500 mr-2">${programValueUsd} USD</span>
                <span className="text-[#69b6ff]">¡GRATIS PARA EL GANADOR!</span>
              </p>
            </div>
          </div>

          {/* Module Breakdown */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} className="rounded-md border border-zinc-800/90 bg-[#00071a]/60 p-4 transition-all hover:border-[#0071b6]/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="rounded bg-[#0071b6]/20 p-2 text-[#69b6ff] border border-[#0071b6]/30">
                      <IconComp className="h-4 w-4" />
                    </div>
                    <h4 className="font-display font-bold text-zinc-100 text-sm">{feat.title}</h4>
                  </div>
                  <p className="text-xs text-zinc-400 font-body leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onOpenForm}
              className="inline-flex items-center justify-center rounded-md bg-[#0071b6] hover:bg-[#00629f] px-6 py-3.5 text-sm font-bold text-white transition-all shadow-lg active:scale-95"
            >
              Participar Ahora por el Gran Premio
            </button>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
