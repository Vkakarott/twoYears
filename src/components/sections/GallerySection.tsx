import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mediaItems, type MediaItem } from '../../data/photos';
import MediaLightbox from '../ui/MediaLightbox';

export default function GallerySection() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);
  const total = mediaItems.length;

  const prev = useCallback(() => setCurrent(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent(i => (i + 1) % total),          [total]);

  const indices = [
    (current - 1 + total) % total,
    current,
    (current + 1) % total,
  ];

  return (
    <section data-snap data-section="gallery" id="gallery"
      className="flex flex-col items-center justify-center gap-6 px-4"
      style={{ background: '#0f0a0d' }}
    >
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xs uppercase tracking-[0.3em] font-display italic"
        style={{ color: 'var(--color-accent)' }}
      >
        nossas memórias
      </motion.p>

      <div className="flex items-center gap-3 md:gap-5 w-full justify-center">
        <button onClick={prev} aria-label="Anterior"
          className="text-2xl shrink-0 transition-opacity hover:opacity-100 opacity-50"
          style={{ color: 'var(--color-accent)' }}>‹</button>

        <div className="flex items-center gap-3">
          {indices.map((idx, pos) => {
            const media = mediaItems[idx];
            const isCenter = pos === 1;
            return (
              <motion.div
                key={idx}
                layout
                animate={{
                  scale:   isCenter ? 1.1 : 0.85,
                  opacity: isCenter ? 1   : 0.45,
                  rotate:  isCenter ? 0   : (pos === 0 ? -3 : 3),
                }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="cursor-pointer shrink-0 rounded-xl overflow-hidden"
                style={{ height: isCenter ? '58dvh' : '42dvh', maxWidth: isCenter ? '70vw' : '25vw' }}
                onClick={() => isCenter ? setLightbox(media) : setCurrent(idx)}
              >
                {media.type === 'video' ? (
                  <video
                    className="w-full h-full object-cover"
                    src={media.src}
                    muted
                    loop
                    autoPlay={isCenter}
                  />
                ) : (
                  <img
                    className="w-full h-full object-cover"
                    src={media.src}
                    alt={media.caption}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        <button onClick={next} aria-label="Próximo"
          className="text-2xl shrink-0 transition-opacity hover:opacity-100 opacity-50"
          style={{ color: 'var(--color-accent)' }}>›</button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <p className="font-display italic" style={{ color: 'var(--color-accent-soft)' }}>
            {mediaItems[current].caption}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-2">
        {mediaItems.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ir para foto ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width:  i === current ? 20 : 6,
              height: 6,
              background: i === current ? 'var(--color-accent)' : 'var(--color-surface-raised)',
            }}
          />
        ))}
      </div>

      <MediaLightbox item={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
