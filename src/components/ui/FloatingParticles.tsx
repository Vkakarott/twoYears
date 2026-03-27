import { motion } from 'framer-motion';
import MinecraftHeart from './MinecraftHeart';

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  size: Math.random() * 14 + 10,
  delay: Math.random() * 6,
  duration: Math.random() * 6 + 8,
}));

export default function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute select-none"
          style={{ left: p.x, bottom: '-20px' }}
          animate={{ y: [0, -1100], opacity: [0, 0.7, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <MinecraftHeart size={p.size} />
        </motion.div>
      ))}
    </div>
  );
}
