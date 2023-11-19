import { useState, useEffect } from 'react'
import { useAssets } from '@/hooks'
import { AnimatedSprite } from '@pixi/react'
import { Texture } from 'pixi.js'

const keyAsset = [1, 2, 3, 4].map(
  (i) =>
    new URL(`/src/assets/keys/keys_1_${i}.png`, import.meta.url).href,
);

export type KeyProps = {
  x: number;
  y: number;
}

export default function Key({ x, y }: KeyProps) {
  const assets = useAssets(keyAsset);
  const [frames, setFrames] = useState<Texture[]>([]);
  useEffect(() => {
    setFrames(
      keyAsset
      .map((asset) => (assets as Record<string, Texture>)[asset])
      .filter((asset) => asset),
    );
  }, [assets]);

  if (!frames.length) {
    return null;
  }

  return (
    <AnimatedSprite
      animationSpeed={0.1}
      textures={frames}
      x={x}
      y={y}
      isPlaying={true}
      anchor={0.5}
    />
  )
}
