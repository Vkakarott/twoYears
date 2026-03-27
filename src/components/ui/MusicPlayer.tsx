import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shuffle, SkipBack, SkipForward, Repeat, Play, Pause, Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import type { Track } from '../../data/tracks';

function fmt(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function SoundBars({ playing }: { playing: boolean }) {
  if (!playing) return <div className="h-5" />;
  return (
    <div className="flex items-end gap-[3px] h-5">
      {[0, 0.2, 0.1].map((delay, i) => (
        <div key={i} className="w-[3px] rounded-sm"
          style={{ background: 'var(--color-accent)', animation: `soundbar 0.7s ease-in-out ${delay}s infinite` }}
        />
      ))}
    </div>
  );
}

function TrackHeader({ track, liked, onLike }: { track: Track; liked: boolean; onLike: () => void }) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex-1 min-w-0">
        <p className="text-xl font-bold truncate" style={{ color: 'var(--color-text)' }}>{track.title}</p>
        <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>{track.artist}</p>
      </div>
      <motion.button onClick={onLike} whileTap={{ scale: 0.75 }} className="ml-4 text-2xl shrink-0"
        style={{ color: liked ? 'var(--color-accent)' : 'var(--color-muted)' }} aria-label={liked ? 'Descurtir' : 'Curtir'}>
        {liked ? '♥' : '♡'}
      </motion.button>
    </div>
  );
}

function ProgressBar({ progress, duration, onSeek }: { progress: number; duration: number; onSeek: (p: number) => void }) {
  return (
    <div className="w-full">
      <div className="relative h-1 rounded-full group cursor-pointer" style={{ background: 'rgba(255,255,255,0.15)' }}>
        <div className="absolute inset-y-0 left-0 rounded-full transition-colors"
          style={{ width: `${progress * 100}%`, background: 'var(--color-text)' }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ left: `calc(${progress * 100}% - 6px)` }} />
        <input type="range" min={0} max={1} step={0.001} value={progress}
          onChange={e => onSeek(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" aria-label="Progresso" />
      </div>
      <div className="flex justify-between mt-1.5 text-[11px]" style={{ color: 'var(--color-muted)' }}>
        <span>{fmt(progress * duration)}</span>
        <span>{fmt(duration)}</span>
      </div>
    </div>
  );
}

function Controls({ isPlaying, onToggle, onNext, onPrev }: { isPlaying: boolean; onToggle: () => void; onNext: () => void; onPrev: () => void }) {
  return (
    <div className="flex items-center justify-between w-full">
      <button className="p-2 opacity-40 hover:opacity-80 transition-opacity" style={{ color: 'var(--color-text)' }} aria-label="Aleatório">
        <Shuffle size={18} />
      </button>
      <button onClick={onPrev} className="p-2 opacity-70 hover:opacity-100 transition-opacity" style={{ color: 'var(--color-text)' }} aria-label="Anterior">
        <SkipBack size={26} />
      </button>
      <motion.button onClick={onToggle} whileTap={{ scale: 0.92 }} aria-label={isPlaying ? 'Pausar' : 'Tocar'}
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: 'var(--color-text)', color: '#111' }}>
        {isPlaying ? <Pause size={22} /> : <Play size={22} />}
      </motion.button>
      <button onClick={onNext} className="p-2 opacity-70 hover:opacity-100 transition-opacity" style={{ color: 'var(--color-text)' }} aria-label="Próxima">
        <SkipForward size={26} />
      </button>
      <button className="p-2 opacity-40 hover:opacity-80 transition-opacity" style={{ color: 'var(--color-text)' }} aria-label="Repetir">
        <Repeat size={18} />
      </button>
    </div>
  );
}

function VolumeRow({ volume, onVolume }: { volume: number; onVolume: (v: number) => void }) {
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.35 ? Volume : volume < 0.7 ? Volume1 : Volume2;
  return (
    <div className="flex items-center gap-3 w-full">
      <span className="text-sm" style={{ color: 'var(--color-muted)' }}><VolumeIcon size={16} /></span>
      <div className="flex-1 relative h-1 rounded-full group cursor-pointer" style={{ background: 'rgba(255,255,255,0.15)' }}>
        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${volume * 100}%`, background: 'var(--color-muted)' }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ left: `calc(${volume * 100}% - 6px)` }} />
        <input type="range" min={0} max={1} step={0.01} value={volume}
          onChange={e => onVolume(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" aria-label="Volume" />
      </div>
    </div>
  );
}

interface Props {
  track: Track; isPlaying: boolean; progress: number; duration: number; volume: number;
  onToggle: () => void; onSeek: (p: number) => void; onVolume: (v: number) => void;
  onNext: () => void; onPrev: () => void;
}

export default function MusicPlayer({ track, isPlaying, progress, duration, volume, onToggle, onSeek, onVolume, onNext, onPrev }: Props) {
  const [liked, setLiked] = useState(true);
  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-xs">
      <motion.div className="relative w-full aspect-square rounded-xl overflow-hidden"
        animate={{ boxShadow: isPlaying ? '0 16px 56px rgba(230,57,70,0.45)' : '0 8px 24px rgba(0,0,0,0.7)' }}
        transition={{ duration: 0.6 }}>
        <img src={track.coverSrc} alt={`Capa — ${track.title}`} className="w-full h-full object-cover object-top" />
        <div className="absolute bottom-3 right-3"><SoundBars playing={isPlaying} /></div>
      </motion.div>
      <TrackHeader track={track} liked={liked} onLike={() => setLiked(l => !l)} />
      <ProgressBar progress={progress} duration={duration} onSeek={onSeek} />
      <Controls isPlaying={isPlaying} onToggle={onToggle} onNext={onNext} onPrev={onPrev} />
      <VolumeRow volume={volume} onVolume={onVolume} />
    </div>
  );
}
