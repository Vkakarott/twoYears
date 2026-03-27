import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { declarations } from '../../data/declarations';
import { useCountdown } from '../../hooks/useCountdown';

export default function DeclarationsSection() {
  const [idx, setIdx] = useState(0);
  const t = useCountdown();

  const prev = () => setIdx(i => (i - 1 + declarations.length) % declarations.length);
  const next = () => setIdx(i => (i + 1) % declarations.length);

  return (
    <section data-snap data-section="declarations" id="declarations"
      className="flex flex-col items-center justify-center gap-10 px-6"
      style={{
        background: 'linear-gradient(135deg, #0d0d0d 0%, #120a0e 50%, #0d0d0d 100%)',
        backgroundSize: '400% 400%',
        animation: 'bg-shift 12s ease infinite',
      }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-xs uppercase tracking-[0.3em] font-display italic"
        style={{ color: 'var(--color-accent)' }}
      >
        para você
      </motion.p>

      <div className="flex items-center gap-6 w-full max-w-2xl">
        <button onClick={prev} aria-label="Declaração anterior"
          className="text-2xl shrink-0 opacity-40 hover:opacity-100 transition-opacity"
          style={{ color: 'var(--color-accent)' }}>‹</button>

        <div className="flex-1 min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <blockquote
                className="font-display italic text-center text-lg md:text-xl leading-relaxed"
                style={{ color: 'var(--color-text)' }}
              >
                "{declarations[idx].text}"
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={next} aria-label="Próxima declaração"
          className="text-2xl shrink-0 opacity-40 hover:opacity-100 transition-opacity"
          style={{ color: 'var(--color-accent)' }}>›</button>
      </div>

      <div className="flex gap-2">
        {declarations.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Declaração ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width:  i === idx ? 20 : 6,
              height: 6,
              background: i === idx ? 'var(--color-accent)' : 'var(--color-surface-raised)',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center flex flex-col gap-1"
      >
        <p className="font-display text-2xl" style={{ color: 'var(--color-accent-soft)' }}>
          {t.years > 0 && `${t.years} ${t.years === 1 ? 'ano' : 'anos'}`}
          {t.months > 0 && `, ${t.months} meses`}
          {t.days > 0 && `, ${t.days} dias`}
        </p>
        <p className="text-xs tracking-widest" style={{ color: 'var(--color-muted)' }}>
          de história
        </p>
      </motion.div>
    </section>
  );
}
