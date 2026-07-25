import React from 'react';
import { motion } from 'motion/react';
import { Trophy, ArrowRight, ShieldCheck, Clock, Flame, Users, Sparkles } from 'lucide-react';

interface HeroProps {
  heroBgImage: string;
  programValueUsd: number;
  registeredSeats: number;
  totalSeats: number;
  onOpenForm: () => void;
}

const getDirectImageUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('imgur.com') && !url.includes('i.imgur.com')) {
    const id = url.split('/').pop()?.split('?')[0]?.split('#')[0];
    if (id) return `https://i.imgur.com/${id}.jpg`;
  }
  return url;
};

export const Hero: React.FC<HeroProps> = ({
  heroBgImage,
  programValueUsd,
  registeredSeats,
  totalSeats,
  onOpenForm,
}) => {
  const imageUrl = getDirectImageUrl(heroBgImage);

  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden border-b border-white/10 bg-black flex items-center justify-center pt-8 pb-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageUrl}
          alt="Marketing Digital con Inteligencia Artificial"
          className="h-full w-full object-cover object-center opacity-60 transition-opacity duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.endsWith('.jpg')) {
              target.src = target.src.replace('.jpg', '.jpeg');
            } else if (target.src.endsWith('.jpeg')) {
              target.src = target.src.replace('.jpeg', '.png');
            }
          }}
        />
        {/* Dark Gradient Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 text-center">
        
        {/* Top Scarcity Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded bg-[#0b1f3f] border border-[#0071b6]/40 px-4 py-1.5 text-xs font-semibold text-[#69b6ff]"
        >
          <Trophy className="h-4 w-4 text-[#0071b6]" />
          <span className="font-body tracking-wider uppercase">SORTEO OFICIAL 2026 &bull; CURSOS Y CAPACITACIÓN</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]"
        >
          Sorteo Oficial: Gana una Beca Completa del 100% para Nuestro{' '}
          <span className="text-[#0071b6] underline decoration-[#0071b6]/40 underline-offset-8">
            Sistema de Marketing Digital 2026 con IA
          </span>
        </motion.h1>

        {/* Real Value Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 inline-block"
        >
          <span className="inline-flex flex-wrap items-center justify-center gap-2 rounded-md bg-[#0b172a] border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300">
            <span className="text-zinc-400 font-body">Valor Real del Programa:</span>
            <strong className="text-white text-lg font-bold font-mono">${programValueUsd} USD</strong>
            <span className="rounded bg-[#0071b6]/20 px-2.5 py-0.5 text-[11px] font-bold text-[#69b6ff] border border-[#0071b6]/30 uppercase tracking-wider">
              100% GRATIS EN EL SORTEO
            </span>
          </span>
        </motion.div>

        {/* Subheadline / Audience Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-body font-normal"
        >
          Exclusivo para emprendedores y dueños de agencias que están cansados de consumir tutoriales gratuitos sin ganar un solo dólar.
        </motion.p>

        {/* Urgent Live Stats Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 mx-auto max-w-xl corporate-card p-5 shadow-xl"
        >
          <div className="grid grid-cols-2 gap-4 divide-x divide-zinc-800 text-center">
            <div className="flex flex-col items-center justify-center p-2">
              <div className="flex items-center gap-1.5 text-[#0071b6] text-xs font-bold uppercase tracking-wider">
                <Flame className="h-4 w-4 animate-bounce" />
                <span>Cupos Disponibles</span>
              </div>
              <p className="mt-1 text-2xl font-bold font-mono text-white">
                {registeredSeats} <span className="text-zinc-500 text-sm font-normal">/ {totalSeats}</span>
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5 font-body">85% ocupados por el público</p>
            </div>

            <div className="flex flex-col items-center justify-center p-2">
              <div className="flex items-center gap-1.5 text-[#0071b6] text-xs font-bold uppercase tracking-wider">
                <Clock className="h-4 w-4" />
                <span>Cierre de Registro</span>
              </div>
              <p className="mt-1 text-2xl font-bold font-mono text-white">
                7 Días
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5 font-body">o al llegar a {totalSeats} inscritos</p>
            </div>
          </div>
        </motion.div>

        {/* Main CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 flex flex-col items-center justify-center gap-3"
        >
          <button
            onClick={onOpenForm}
            className="group relative inline-flex w-full sm:w-auto items-center justify-center overflow-hidden rounded-md bg-[#0071b6] hover:bg-[#00629f] px-8 py-4 text-base font-bold text-white shadow-lg transition-all active:scale-98"
          >
            <span className="relative z-10 flex items-center gap-2">
              [Ingresa tus Datos y Aplica a la Beca Completa de IA Ahora]
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </button>

          {/* Warning Copy */}
          <p className="mt-2 text-xs text-zinc-400 italic max-w-xl leading-normal font-body">
            *(Advertencia: Solo ingresa si estás dispuesto a implementar lo que aprendes. Si solo eres un coleccionista de cursos que nunca toma acción, deja el espacio para alguien que realmente quiera facturar).*
          </p>
        </motion.div>

        {/* Micro Guarantee features */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 border-t border-zinc-800/60 pt-6 font-body">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Sorteo 100% Verificable</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-[#69b6ff]" />
            <span>Acceso Inmediato al Backend</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#69b6ff]" />
            <span>CapCut + IA Automatizado</span>
          </div>
        </div>

      </div>
    </section>
  );
};
