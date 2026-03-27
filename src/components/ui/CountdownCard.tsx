import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  value: number;
  label: string;
}

export default function CountdownCard({ value, label }: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-10 h-10 md:w-13 md:h-13 rounded-lg flex items-center justify-center"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid rgba(230,57,70,0.2)',
          boxShadow: '0 0 6px 1px rgba(230,57,70,0.1)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="text-sm md:text-lg font-bold tabular-nums"
            style={{ color: 'var(--color-accent)' }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[9px] uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>
        {label}
      </span>
    </div>
  );
}
