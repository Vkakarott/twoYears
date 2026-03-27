import { motion } from 'framer-motion';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';
import MusicPlayer from '../ui/MusicPlayer';

function BlurredBg({ src }: { src: string }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(80px) brightness(0.18) saturate(1.5)',
        transform: 'scale(1.15)',
      }}
    />
  );
}

export default function MusicSection() {
  const player = useMusicPlayer();

  return (
    <section data-snap data-section="music" id="music"
      className="relative flex flex-col items-center justify-center px-6"
      style={{ background: '#111' }}
    >
      <BlurredBg src={player.track.coverSrc} />

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />

      <motion.div
        className="relative z-10 flex flex-col items-center w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-[10px] uppercase tracking-[0.3em] mb-7 font-display italic"
          style={{ color: 'var(--color-accent)' }}>
          a tocar agora
        </p>
        <MusicPlayer
          track={player.track}
          isPlaying={player.isPlaying}
          progress={player.progress}
          duration={player.duration}
          volume={player.volume}
          onToggle={player.toggle}
          onSeek={player.seek}
          onVolume={player.setVolume}
          onNext={player.next}
          onPrev={player.prev}
        />
      </motion.div>
    </section>
  );
}
