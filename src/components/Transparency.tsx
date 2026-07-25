import React from 'react';
import { motion } from 'motion/react';
import { Handshake, Eye, TrendingUp } from 'lucide-react';

export const Transparency: React.FC = () => {
  return (
    <section className="relative w-full border-b border-white/10 bg-black py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 border border-orange-500/50 bg-orange-500/10 text-orange-400 text-[10px] uppercase tracking-[0.3em] font-bold mb-3">
            Transparencia Radical
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight italic uppercase">
            Por Qué Hacemos Esto
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-xl relative rounded-2xl border border-white/10 p-6 sm:p-10 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/30">
              <Handshake className="h-7 w-7 text-orange-400" />
            </div>

            <div className="space-y-4 text-gray-300 font-light text-sm sm:text-base leading-relaxed">
              <p className="font-bold text-white text-base sm:text-lg uppercase tracking-wide">
                No somos una caridad. Hacemos este sorteo por una razón estratégica muy clara.
              </p>
              
              <p>
                Sabemos que cuando veas el nivel de nuestro material y la velocidad con la que puedes implementar embudos y campañas con Inteligencia Artificial, vas a querer contratar nuestros servicios de agencia a largo plazo.
              </p>

              <div className="rounded-xl bg-black/60 border border-white/10 p-4 text-orange-300 font-bold text-xs sm:text-sm flex items-center gap-3 uppercase tracking-wider">
                <TrendingUp className="h-5 w-5 text-orange-500 shrink-0" />
                <span>
                  <strong className="text-white">Nuestra Apuesta:</strong> Te regalamos la habilidad hoy, porque sabemos que harás negocios con nosotros mañana.
                </span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
