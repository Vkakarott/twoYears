import { useState, useRef, useEffect, useCallback } from 'react';
import { Howl } from 'howler';
import { tracks, type Track } from '../data/tracks';

interface PlayerState {
  track: Track;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
}

interface PlayerControls {
  toggle: () => void;
  seek: (pct: number) => void;
  setVolume: (v: number) => void;
  next: () => void;
  prev: () => void;
  selectTrack: (id: string) => void;
}

export function useMusicPlayer(): PlayerState & PlayerControls {
  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const volumeRef = useRef(0.8);
  const howlRef = useRef<Howl | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const startTimer = useCallback((howl: Howl) => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setProgress((howl.seek() as number) / (howl.duration() || 1));
    }, 500);
  }, []);

  useEffect(() => {
    howlRef.current?.unload();
    const howl = new Howl({
      src: [tracks[trackIdx].src],
      volume: volumeRef.current,
      onload: () => setDuration(howl.duration()),
      onend: () => {
        setIsPlaying(false);
        stopTimer();
        setProgress(0);
      },
    });
    howlRef.current = howl;
    setIsPlaying(false);
    setProgress(0);
    return () => { howl.unload(); stopTimer(); };
  }, [trackIdx]);

  const toggle = useCallback(() => {
    const howl = howlRef.current;
    if (!howl) return;
    if (howl.playing()) {
      howl.pause();
      setIsPlaying(false);
      stopTimer();
    } else {
      howl.play();
      setIsPlaying(true);
      startTimer(howl);
    }
  }, [startTimer]);

  const seek = useCallback((pct: number) => {
    const howl = howlRef.current;
    if (!howl) return;
    howl.seek(pct * howl.duration());
    setProgress(pct);
  }, []);

  const changeVolume = useCallback((v: number) => {
    volumeRef.current = v;
    setVolume(v);
    howlRef.current?.volume(v);
  }, []);

  const next = useCallback(() => setTrackIdx(i => (i + 1) % tracks.length), []);
  const prev = useCallback(() => setTrackIdx(i => (i - 1 + tracks.length) % tracks.length), []);
  const selectTrack = useCallback((id: string) => {
    const idx = tracks.findIndex(t => t.id === id);
    if (idx !== -1) setTrackIdx(idx);
  }, []);

  return {
    track: tracks[trackIdx],
    isPlaying,
    progress,
    duration,
    volume,
    toggle,
    seek,
    setVolume: changeVolume,
    next,
    prev,
    selectTrack,
  };
}
