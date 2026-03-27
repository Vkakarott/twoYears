export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  coverSrc: string;
}

const b = import.meta.env.BASE_URL;

export const tracks: Track[] = [
  {
    id:       'track-1',
    title:    'Die For You',
    artist:   'Vitor',
    src:      `${b}music/track.mp4`,
    coverSrc: `${b}IMG-20241222-WA0039.jpg`,
  },
];
