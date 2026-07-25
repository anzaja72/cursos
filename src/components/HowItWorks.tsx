import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Calendar, Award, ArrowRight, Sparkles } from 'lucide-react';

interface HowItWorksProps {
  drawDate: string;
  partialDiscountPercent: number;
  onOpenForm: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ drawDate, partialDiscountPercent, onOpenForm }) => {
  return (
    <section className="relative w-full border-b border-white/10 bg-black py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 border border-orange-500/50 bg-orange-500/10 text-orange-400 text-[10px] uppercase tracking-[0.3em] font-bold mb-3">
            Mecánica del Sistema
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight italic uppercase">
            Cómo Funciona la Selección
          </h2>
          <p className="mt-3 text-sm text-gray-400 max-w-xl mx-auto font-light">
            Proceso transparente en 2 pasos diseñado para premiar el compromiso e impulso de tu negocio.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-xl relative rounded-2xl border border-white/10 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400 font-mono font-black text-base border border-orange-500/30">
                  01
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2.5 py-1 border border-orange-500/30">
                  Paso 1
                </span>
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-wide">Registro de Aplicación</h3>
              <p className="mt-2 text-xs text-gray-300 leading-relaxed font-light">
                Ingresa tus datos reales a continuación para participar en el sorteo. Recibirás tu ticket digital inmediato con número de folio verificado.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-gray-400 font-light">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Verificación instantánea de email y WhatsApp</span>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl relative rounded-2xl border border-white/10 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400 font-mono font-black text-base border border-orange-500/30">
                  02
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2.5 py-1 border border-orange-500/30">
                  Paso 2
                </span>
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-wide">Anuncio del Ganador</h3>
              <p className="mt-2 text-xs text-gray-300 leading-relaxed font-light">
                El <strong className="text-orange-400 font-mono font-bold">{drawDate}</strong>, anunciaremos al ganador de la Beca Completa del 100% en vivo a través de nuestra plataforma.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-gray-400 font-light">
              <Calendar className="h-4 w-4 text-orange-400 shrink-0" />
              <span>Transmisión transparente y algoritmo aleatorio</span>
            </div>
          </motion.div>

        </div>

        {/* Participation Trophy / Promo Offer Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-orange-500/40 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-orange-500/20 p-3 text-orange-400 border border-orange-500/30 shrink-0 hidden sm:block">
              <Award className="h-8 w-8" />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-orange-300 bg-orange-500/20 border border-orange-500/30 mb-2 uppercase tracking-widest">
                <span>Nuestra Oferta Promocional</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-black text-white uppercase italic tracking-tight">
                El "Trofeo de Participación" (Ganas Sí o Sí)
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                Sabemos que muchos aplicarán y solo podemos dar una beca completa. Pero si no ganas, no te vas con las manos vacías. Recompensamos a los que toman acción.{' '}
                <strong className="text-orange-300 font-bold">
                  Todos los participantes que no ganen el Gran Premio calificarán para una Beca Parcial con un descuento brutal del {partialDiscountPercent}% en nuestra oferta principal.
                </strong>
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenForm}
                  className="inline-flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-500 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all shadow-lg shadow-orange-600/20 active:scale-95"
                >
                  <span>Asegurar mi Lugar para Beca Completa o Parcial</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
