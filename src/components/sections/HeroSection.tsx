import { motion, type Variants } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';
import CountdownCard from '../ui/CountdownCard';
import FloatingParticles from '../ui/FloatingParticles';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

export default function HeroSection() {
  const t = useCountdown();

  return (
    <section data-snap data-section="hero" id="hero"
      className="flex flex-col items-center justify-center gap-8 px-4"
      style={{ background: 'var(--color-bg)' }}
    >
      <FloatingParticles />

      <motion.div
        className="flex flex-col items-center gap-6 z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="text-xs uppercase tracking-[0.3em]"
          style={{ color: 'var(--color-muted)' }}
        >
          desde 24 de setembro de 2022
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-5xl md:text-7xl text-center leading-tight"
          style={{ color: 'var(--color-text)' }}
        >
          Vitor
          <span style={{ color: 'var(--color-accent)' }}> & </span>
          Beatriz
        </motion.h1>

        <motion.div variants={item} className="flex flex-wrap justify-center gap-2">
          <CountdownCard value={t.years}   label="anos" />
          <CountdownCard value={t.months}  label="meses" />
          <CountdownCard value={t.days}    label="dias" />
          <CountdownCard value={t.hours}   label="horas" />
          <CountdownCard value={t.minutes} label="min" />
          <CountdownCard value={t.seconds} label="seg" />
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-col items-center gap-1 mt-4"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span style={{ color: 'var(--color-muted)', fontSize: 12, letterSpacing: '0.2em' }}>
            role para baixo
          </span>
          <span style={{ color: 'var(--color-accent)', fontSize: 20 }}>↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
