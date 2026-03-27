import { useEffect, useRef } from 'react';
import { BOY_PAL, GIRL_PAL, BOY_FRAMES, GIRL_FRAMES, HEART_ROWS, HEART_PAL, type Pal } from '../data/sprites';

const SCALE     = 6;
const GW        = 60;   // canvas width  (px)
const GH        = 28;   // canvas height (px)
const CHAR_W    = 10;
const CHAR_H    = 14;
const GROUND_Y  = 22;
const CHAR_Y    = GROUND_Y - CHAR_H;  // = 8
const BOY_X0    = 1;
const GIRL_X0   = GW - CHAR_W - 1;   // = 49
const MEET_GAP  = 4;

const SKY         = '#000000';
const GROUND_COL  = '#1a3d0a';
const EARTH_COL   = '#2d1a0a';


// Static star positions [x, y]
const STARS: [number, number][] = [
  [5, 1], [12, 3], [20, 2], [28, 4], [37, 1], [45, 3], [55, 2],
  [8, 6], [17, 5], [30, 7], [42, 5], [50, 8], [15, 9], [35, 10],
];

interface Heart { x: number; y: number; vy: number; opacity: number }
interface AnimState {
  boyX: number; girlX: number; walkF: number;
  tick: number; meeting: boolean; hearts: Heart[];
}

function px(ctx: CanvasRenderingContext2D, x: number, y: number, color: string): void {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x) * SCALE, Math.round(y) * SCALE, SCALE, SCALE);
}

function drawBg(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = SKY;
  ctx.fillRect(0, 0, GW * SCALE, GROUND_Y * SCALE);
  STARS.forEach(([sx, sy]) => px(ctx, sx, sy, '#ffffff'));
  ctx.fillStyle = GROUND_COL;
  ctx.fillRect(0, GROUND_Y * SCALE, GW * SCALE, 2 * SCALE);
  ctx.fillStyle = EARTH_COL;
  ctx.fillRect(0, (GROUND_Y + 2) * SCALE, GW * SCALE, (GH - GROUND_Y - 2) * SCALE);
}

function drawMoon(ctx: CanvasRenderingContext2D): void {
  const mx = 52, my = 2;
  const c = '#fffde7';
  px(ctx, mx, my, c); px(ctx, mx + 1, my - 1, c);
  px(ctx, mx + 1, my, c); px(ctx, mx + 1, my + 1, c);
  px(ctx, mx, my + 1, c);
}

function drawSprite(ctx: CanvasRenderingContext2D, rows: string[], pal: Pal, x: number, y: number, flip = false): void {
  rows.forEach((row, r) => {
    const cols = [...row];
    if (flip) cols.reverse();
    cols.forEach((ch, c) => { const col = pal[ch]; if (col) px(ctx, x + c, y + r, col); });
  });
}

function drawHearts(ctx: CanvasRenderingContext2D, hearts: Heart[]): void {
  hearts.forEach(h => {
    ctx.globalAlpha = Math.max(0, h.opacity);
    HEART_ROWS.forEach((row, r) =>
      [...row].forEach((ch, c) => { const col = HEART_PAL[ch]; if (col) px(ctx, h.x + c, h.y + r, col); })
    );
  });
  ctx.globalAlpha = 1;
}

function spawnHeart(boyX: number, girlX: number, offset = 0): Heart {
  const mid = (boyX + CHAR_W + girlX) / 2 - 3;
  return { x: mid + offset, y: CHAR_Y - 2, vy: 0.06 + Math.random() * 0.05, opacity: 1 };
}

function tickHearts(hearts: Heart[], boyX: number, girlX: number): Heart[] {
  return hearts.map(h => {
    const next = { ...h, y: h.y - h.vy, opacity: h.opacity - 0.004 };
    return next.opacity <= 0 ? spawnHeart(boyX, girlX, Math.random() * 10 - 5) : next;
  });
}

function animate(ctx: CanvasRenderingContext2D, s: AnimState): void {
  s.tick++;

  if (!s.meeting) {
    if (s.tick % 10 === 0) {
      s.boyX++;
      s.girlX--;
      s.walkF = (s.walkF + 1) % 2;
    }
    if (s.boyX + CHAR_W + MEET_GAP >= s.girlX) {
      s.meeting = true;
      s.hearts  = [-3, 2, 7].map(o => spawnHeart(s.boyX, s.girlX, o));
    }
  } else {
    s.hearts = tickHearts(s.hearts, s.boyX, s.girlX);
  }

  ctx.clearRect(0, 0, GW * SCALE, GH * SCALE);
  drawBg(ctx);
  drawMoon(ctx);
  drawSprite(ctx, BOY_FRAMES[s.walkF],  BOY_PAL,  s.boyX,  CHAR_Y);
  drawSprite(ctx, GIRL_FRAMES[s.walkF], GIRL_PAL, s.girlX, CHAR_Y, true);
  if (s.meeting) drawHearts(ctx, s.hearts);
}

export function usePixelCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>): void {
  const rafRef   = useRef<number>(0);
  const stateRef = useRef<AnimState>({
    boyX: BOY_X0, girlX: GIRL_X0, walkF: 0, tick: 0, meeting: false, hearts: [],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width  = GW * SCALE;
    canvas.height = GH * SCALE;
    const loop = () => { animate(ctx, stateRef.current); rafRef.current = requestAnimationFrame(loop); };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [canvasRef]);
}
