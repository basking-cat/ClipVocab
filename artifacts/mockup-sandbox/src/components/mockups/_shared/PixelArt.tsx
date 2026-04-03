import React from 'react';

type Props = { sz?: number; fill: string };

function PixelGrid({ rows, sz, fill }: { rows: number[][]; sz: number; fill: string }) {
  const w = rows[0]?.length ?? 0;
  const h = rows.length;
  return (
    <svg
      width={w * sz}
      height={h * sz}
      viewBox={`0 0 ${w * sz} ${h * sz}`}
      shapeRendering="crispEdges"
      style={{ display: 'block' }}
    >
      {rows.map((row, y) =>
        row.map((on, x) =>
          on ? <rect key={`${x}-${y}`} x={x * sz} y={y * sz} width={sz} height={sz} fill={fill} /> : null
        )
      )}
    </svg>
  );
}

export function PixelGem({ sz = 4, fill }: Props) {
  return (
    <PixelGrid sz={sz} fill={fill} rows={[
      [0,0,1,1,1,0,0],
      [0,1,1,0,1,1,0],
      [1,1,0,1,0,1,1],
      [0,1,1,1,1,1,0],
      [0,0,1,1,1,0,0],
      [0,0,0,1,0,0,0],
    ]} />
  );
}

export function PixelCrown({ sz = 4, fill }: Props) {
  return (
    <PixelGrid sz={sz} fill={fill} rows={[
      [1,0,0,1,0,0,1],
      [1,0,1,1,1,0,1],
      [1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1],
      [0,1,1,1,1,1,0],
    ]} />
  );
}

export function PixelBolt({ sz = 4, fill }: Props) {
  return (
    <PixelGrid sz={sz} fill={fill} rows={[
      [0,0,1,1,1],
      [0,0,1,1,0],
      [0,1,1,0,0],
      [0,1,1,0,0],
      [1,1,1,1,0],
      [0,0,1,1,1],
      [0,0,0,1,1],
      [0,0,0,1,0],
    ]} />
  );
}

export function PixelStar({ sz = 4, fill }: Props) {
  return (
    <PixelGrid sz={sz} fill={fill} rows={[
      [0,0,0,1,0,0,0],
      [0,0,0,1,0,0,0],
      [0,0,1,1,1,0,0],
      [1,1,1,1,1,1,1],
      [0,0,1,1,1,0,0],
      [0,0,0,1,0,0,0],
      [0,0,0,1,0,0,0],
    ]} />
  );
}

export function PixelPlay({ sz = 4, fill }: Props) {
  return (
    <PixelGrid sz={sz} fill={fill} rows={[
      [1,0,0,0,0,0,0],
      [1,1,0,0,0,0,0],
      [1,1,1,0,0,0,0],
      [1,1,1,1,0,0,0],
      [1,1,1,0,0,0,0],
      [1,1,0,0,0,0,0],
      [1,0,0,0,0,0,0],
    ]} />
  );
}

export function PixelSpark({ sz = 4, fill }: Props) {
  return (
    <PixelGrid sz={sz} fill={fill} rows={[
      [1,0,0,1,0,0,1],
      [0,1,0,1,0,1,0],
      [0,0,1,1,1,0,0],
      [1,1,1,1,1,1,1],
      [0,0,1,1,1,0,0],
      [0,1,0,1,0,1,0],
      [1,0,0,1,0,0,1],
    ]} />
  );
}
