// Pixel art sprite data — each row is exactly 10 chars (. = transparent)

export type Pal = Record<string, string>;

export const BOY_PAL: Pal = {
  h: '#4a2c17',  // dark brown hair
  s: '#f9c784',  // skin
  e: '#111111',  // eye
  m: '#cc4444',  // mouth
  c: '#2563eb',  // blue shirt
  p: '#1e3a5f',  // dark pants
  k: '#222222',  // shoes
};

export const GIRL_PAL: Pal = {
  h: '#111111',  // black hair
  s: '#f9c784',  // skin
  e: '#111111',  // eye
  m: '#cc4444',  // mouth
  d: '#e879b0',  // pink dress
  k: '#881337',  // dark shoes
};

const BOY_BASE = [
  '..hhhhhh..',  // hair top
  '.hhhhhhhh.',  // hair
  '.hssssssh.',  // forehead
  '.hse..esh.',  // eyes (wide-set)
  '.hss.m.sh.',  // smile
  '.hssssssh.',  // chin
  '..cccccc..',  // shirt collar
  '.cccccccc.',  // shirt (arms)
  '..cccccc..',  // shirt lower
  '.pppppppp.',  // pants waist
];

// Frame A: left foot forward / Frame B: right foot forward
export const BOY_FRAMES: string[][] = [
  [...BOY_BASE, '..pp..pp..', '.ppp...pp.', '.kkk...kk.', '.kkk...kk.'],
  [...BOY_BASE, '..pp..pp..', '.pp...ppp.', '.kk...kkk.', '.kk...kkk.'],
];

const GIRL_BASE = [
  'hhhhhhhhhh',  // full hair top
  'hhhhhhhhhh',  // hair
  'hhsssssshh',  // face (hair on sides)
  'hhse..eshh',  // eyes
  'hhss.m.shh',  // smile
  'hhsssssshh',  // chin
  'hhddddddhh',  // dress top + hair sides
  '.dddddddd.',  // dress body
  '.dddddddd.',  // dress body
  'dddddddddd',  // dress flare
];

// Feet peek under dress hem
export const GIRL_FRAMES: string[][] = [
  [...GIRL_BASE, 'dddddddddd', '.ddd..ddd.', '.kkk..kkk.', '.kkk..kkk.'],
  [...GIRL_BASE, 'dddddddddd', '.dd...ddd.', '.kk...kkk.', '.kk...kkk.'],
];

// Minecraft-style heart — 7×6 pixels
// d = dark outline, r = red fill, h = highlight
export const HEART_ROWS = [
  '.dd.dd.',
  'dhrrrhd',
  'drrrrrd',
  '.drrrd.',
  '..drd..',
  '...r...',
];

export const HEART_PAL: Pal = {
  d: '#880000',  // dark outline
  r: '#cc0000',  // red fill
  h: '#ff5555',  // highlight
};
