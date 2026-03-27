import { motion } from 'framer-motion';
import { sortedTimeline } from '../../data/timeline';

function TimelineCard({ event, index }: { event: (typeof sortedTimeline)[0]; index: number }) {
  const isLeft = index % 2 === 0;
  const isAnniversary = event.anniversary !== undefined;

  return (
    <div className={`flex items-center gap-4 w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.05 * index }}
        className="flex-1 max-w-[42%] rounded-2xl p-4"
        style={{
          background: isAnniversary ? 'rgba(192,132,160,0.12)' : 'var(--color-surface)',
          border: `1px solid ${isAnniversary ? 'rgba(192,132,160,0.5)' : 'rgba(255,255,255,0.06)'}`,
          textAlign: isLeft ? 'right' : 'left',
        }}
      >
        <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--color-muted)' }}>
          {event.label}
        </p>
        <p className="text-sm font-medium leading-snug" style={{ color: isAnniversary ? 'var(--color-accent-soft)' : 'var(--color-text)' }}>
          {event.title}
        </p>
        {isAnniversary && event.anniversary! > 0 && (
          <p className="text-xs mt-1 font-display italic" style={{ color: 'var(--color-accent)' }}>
            {event.anniversary} {event.anniversary === 1 ? 'ano' : 'anos'} juntos ✨
          </p>
        )}
      </motion.div>

      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.05 * index }}
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm z-10"
        style={{
          background: isAnniversary ? 'var(--color-accent)' : 'var(--color-surface-raised)',
          border: `2px solid ${isAnniversary ? 'var(--color-accent-soft)' : 'rgba(255,255,255,0.1)'}`,
          boxShadow: isAnniversary ? '0 0 12px rgba(192,132,160,0.6)' : 'none',
        }}
      >
        {event.emoji}
      </motion.div>

      {/* Spacer oposto */}
      <div className="flex-1 max-w-[42%]" />
    </div>
  );
}

export default function TimelineSection() {
  return (
    <section
      data-section="timeline"
      id="timeline"
      style={{ background: '#0d0a10', minHeight: '100dvh', scrollSnapAlign: 'start' }}
      className="flex flex-col items-center py-16 px-4"
    >
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xs uppercase tracking-[0.3em] font-display italic mb-12"
        style={{ color: 'var(--color-accent)' }}
      >
        nossa história
      </motion.p>

      <div className="relative w-full max-w-2xl flex flex-col gap-6">
        {/* Linha central */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(192,132,160,0.3) 5%, rgba(192,132,160,0.3) 95%, transparent)' }}
        />

        {sortedTimeline.map((event, i) => (
          <TimelineCard key={event.date} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}
