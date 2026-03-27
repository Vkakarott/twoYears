// Minecraft-style pixel heart — 11×10 grid
// b = black outline, r = red fill, w = white highlight

const PIXELS: (string | 0)[][] = [
  [0, 0,'b','b','b', 0, 0,'b','b','b', 0],
  [0,'b','r','r','r','b','b','r','r','r','b'],
  ['b','w','w','r','r','r','r','r','r','r','b'],
  ['b','w','r','r','r','r','r','r','r','r','b'],
  ['b','r','r','r','r','r','r','r','r','r','b'],
  [0,'b','r','r','r','r','r','r','r','b', 0],
  [0, 0,'b','r','r','r','r','r','b', 0, 0],
  [0, 0, 0,'b','r','r','r','b', 0, 0, 0],
  [0, 0, 0, 0,'b','r','b', 0, 0, 0, 0],
  [0, 0, 0, 0, 0,'b', 0, 0, 0, 0, 0],
];

const COLORS: Record<string, string> = {
  b: '#000000',
  r: '#cc0000',
  w: '#ffffff',
};

export default function MinecraftHeart({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 10 / 11}
      viewBox="0 0 11 10"
      shapeRendering="crispEdges"
    >
      {PIXELS.flatMap((row, y) =>
        row.map((cell, x) =>
          cell !== 0 ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={COLORS[cell]} />
          ) : null
        )
      )}
    </svg>
  );
}
