import { motion } from 'framer-motion';

export default function PixelSection() {
  return (
    <section
      data-snap
      data-section="pixel"
      id="pixel"
      className="flex flex-col items-center justify-center gap-8 px-6"
      style={{ background: '#000000' }}
    >
      <motion.img
        src="/—Pngtree—detailed pixeled heart anatomy in_20847442.png"
        alt="Coração pixelado"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: 320, height: 'auto' }}
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="font-display italic text-xl md:text-2xl text-center max-w-sm leading-relaxed"
        style={{ color: 'var(--color-text)' }}
      >
        cada batida do meu coração tem o som do seu nome
      </motion.p>
    </section>
  );
}
