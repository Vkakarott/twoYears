import { motion, AnimatePresence } from 'framer-motion';
import type { MediaItem } from '../../data/photos';

interface Props {
  item: MediaItem | null;
  onClose: () => void;
}

export default function MediaLightbox({ item, onClose }: Props) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1,    opacity: 1 }}
            exit={{ scale: 0.85,    opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
            className="relative max-w-[90vw] max-h-[90dvh] flex flex-col items-center gap-3"
          >
            {item.type === 'video' ? (
              <video
                className="max-h-[80dvh] rounded-2xl"
                src={item.src}
                autoPlay
                controls
                loop
              />
            ) : (
              <img
                className="max-h-[80dvh] rounded-2xl object-contain"
                src={item.src}
                alt={item.caption}
              />
            )}
            {item.caption && (
              <p className="font-display italic text-center" style={{ color: 'var(--color-accent-soft)' }}>
                {item.caption}
              </p>
            )}
            <button
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm"
              style={{ background: 'var(--color-surface-raised)', color: 'var(--color-muted)' }}
              onClick={onClose}
              aria-label="Fechar"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
