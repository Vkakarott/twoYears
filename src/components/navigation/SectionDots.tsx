import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SECTIONS = [
  { id: 'hero',         label: 'Início' },
  { id: 'gallery',      label: 'Galeria' },
  { id: 'pixel',        label: 'Pixel Art' },
  { id: 'music',        label: 'Música' },
  { id: 'timeline',     label: 'Nossa história' },
  { id: 'declarations', label: 'Para você' },
];

export default function SectionDots() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3" aria-label="Navegação por seções">
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          aria-label={label}
          title={label}
          className="flex items-center justify-end gap-2 group"
        >
          <span
            className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ color: 'var(--color-muted)' }}
          >
            {label}
          </span>
          <motion.div
            animate={{
              width:           active === id ? 20 : 8,
              height:          8,
              backgroundColor: active === id ? 'var(--color-accent)' : 'rgba(192,132,160,0.3)',
            }}
            transition={{ duration: 0.25 }}
            className="rounded-full"
          />
        </button>
      ))}
    </nav>
  );
}
