'use client';

import { useState, useEffect } from 'react';

export function GrainOverlay({
  opacity = 0.4,
  blendMode = 'overlay',
  size = 4,
  type = 'standard',
}: {
  opacity?: number;
  blendMode?: string;
  size?: number;
  type?: 'standard' | 'rough' | 'film' | 'digital';
}) {
  const [noiseUrl, setNoiseUrl] = useState('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.createImageData(128, 128);
    const data = imageData.data;
    let seed = 1;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < data.length; i += 4) {
      let val: number;
      if (type === 'rough') {
        val = random() > 0.5 ? 255 : 0;
      } else if (type === 'film') {
        const u = 1 - random();
        const v = random();
        const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
        val = Math.max(0, Math.min(255, 128 + z * 64));
      } else if (type === 'digital') {
        const levels = 4;
        val = Math.floor(random() * levels) * (255 / (levels - 1));
      } else {
        val = random() * 255;
      }
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
    setNoiseUrl(canvas.toDataURL());
  }, [type]);

  if (!noiseUrl) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      style={{ opacity, mixBlendMode: blendMode as React.CSSProperties['mixBlendMode'] }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${noiseUrl})`,
          backgroundRepeat: 'repeat',
          backgroundSize: `${128 * size}px`,
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}
