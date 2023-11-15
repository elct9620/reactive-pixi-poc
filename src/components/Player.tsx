import { useState, useEffect, useRef } from 'react'
import { Texture } from 'pixi.js'
import { AnimatedSprite } from '@pixi/react';
import {
  MoveCommand,
  PlayerQuery,
}  from '@/usecase'
import { useKeyDown, useCommand, useQuery, useDomainEvent, useAssets } from '@/hooks'
import { PlayerUpdated } from '@/event'

const skeletonAsset = [1, 2, 3, 4].map(i => new URL(`/src/assets/skeleton/skeleton_v2_${i}.png`, import.meta.url).href)

const keyCodeToDirection = (event: KeyboardEvent | null) => {
  if(!event) {
    return null
  }

  switch(event.code) {
    case 'ArrowUp':
      return 'up'
    case 'ArrowDown':
      return 'down'
    case 'ArrowLeft':
      return 'left'
    case 'ArrowRight':
      return 'right'
    default:
      return null
  }
}

export default function Player() {
  const move = useCommand(MoveCommand)
  const keydown = useKeyDown()
  useEffect(() => {
    const direction = keyCodeToDirection(keydown as KeyboardEvent)
    if (direction) {
      keydown?.preventDefault()
      move({ direction })
    }
  }, [keydown, move])

  const playerUpdatedEvent = useDomainEvent(PlayerUpdated)
  const getPlayer = useQuery(PlayerQuery)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const updatePlayer = async () => {
      const player = await getPlayer({ id: '1' })
      setPosition({ x: player.x, y: player.y })
    }

    updatePlayer()
  }, [playerUpdatedEvent, getPlayer])

  const { current: assetsUrl } = useRef(skeletonAsset)
  const assets = useAssets(assetsUrl)
  const [frames, setFrames] = useState<Texture[]>([])
  useEffect(() => {
    setFrames(skeletonAsset.map(asset => (assets as Record<string, Texture>)[asset]).filter(asset => asset))
  }, [assets])

  if(frames.length === 0) {
    return null
  }

  return (
    <AnimatedSprite animationSpeed={0.1} textures={frames} x={position.x} y={position.y} isPlaying={true} anchor={0.5} />
  )
}
