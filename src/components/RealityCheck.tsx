import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Shovel, Flame } from 'lucide-react';

export const RealityCheck: React.FC = () => {
  return (
    <section className="relative w-full border-b border-zinc-800/80 bg-[#00071a] py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded bg-[#0b1f3f] border border-[#0071b6]/30 px-3 py-1 text-xs font-bold text-[#69b6ff] uppercase tracking-wider mb-3">
            <AlertTriangle className="h-3.5 w-3.5 text-[#0071b6]" />
            <span>DIAGNÓSTICO SINCERO</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            La Realidad de tu Situación
          </h2>
          <p className="mt-2 text-sm text-zinc-400 font-body">
            ¿Por qué la mayoría de emprendedores siguen estancados sin lograr ventas constantes?
          </p>
        </div>

        {/* Corporate Precision Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="corporate-card relative overflow-hidden p-6 sm:p-10 shadow-xl"
        >
          {/* Accent Active Blue Top Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#0071b6]" />

          <p className="text-lg sm:text-xl font-body font-normal text-zinc-100 leading-relaxed">
            Estás viendo videos en YouTube y tratando de adivinar cómo funciona el algoritmo.{' '}
            <strong className="text-[#69b6ff] font-bold underline decoration-[#0071b6] underline-offset-4">
              No tienes un sistema, tienes un pasatiempo caro.
            </strong>
          </p>

          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="rounded-md border border-zinc-800 bg-[#00071a]/80 p-5 flex items-start gap-4">
              <div className="rounded bg-[#0071b6]/20 p-2.5 text-[#69b6ff] border border-[#0071b6]/30 shrink-0">
                <Shovel className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-sm">Sin Automatización</h4>
                <p className="mt-1 text-xs text-zinc-400 font-body leading-relaxed">
                  El marketing sin Inteligencia Artificial ni automatización es como intentar cavar una piscina con una cuchara.
                </p>
              </div>
            </div>

            <div className="rounded-md border border-zinc-800 bg-[#00071a]/80 p-5 flex items-start gap-4">
              <div className="rounded bg-[#0071b6]/20 p-2.5 text-[#69b6ff] border border-[#0071b6]/30 shrink-0">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-sm">Competencia Desalmada</h4>
                <p className="mt-1 text-xs text-zinc-400 font-body leading-relaxed">
                  La competencia te está aplastando porque ellos están ejecutando campañas en minutos, mientras tú tardas días.
                </p>
              </div>
            </div>

          </div>

          <div className="rounded-md bg-[#0071b6]/10 border border-[#0071b6]/30 p-4 text-center">
            <p className="text-xs sm:text-sm text-[#69b6ff] font-bold tracking-wide font-body">
              ⚡ Es momento de dejar de adivinar e instalar un sistema automatizado respaldado por IA.
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
