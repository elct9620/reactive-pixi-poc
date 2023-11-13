import { useState, useEffect } from 'react'
import { Assets, Texture } from 'pixi.js'
import { AnimatedSprite } from '@pixi/react';

const skeletonAsset = [1, 2, 3, 4].map(i => new URL(`../assets/skeleton/skeleton_v2_${i}.png`, import.meta.url).href)

export default function Player() {
  const [frames, setFrames] = useState<Texture[]>([])
  useEffect(() => {
    Promise.all(skeletonAsset.map(url => Assets.load(url)))
      .then(() => setFrames(skeletonAsset.map(url => Assets.get(url))))
  },[])

  if(frames.length === 0) {
    return null
  }

  return (
    <AnimatedSprite animationSpeed={0.1} textures={frames} x={336} y={252} isPlaying={true} anchor={0.5} />
  )
}
