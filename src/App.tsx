import { Sprite } from "@pixi/react";
import Player from "@/components/Player";
import Key from "@/components/Key";
import mapAsset from "@/assets/map.png";
import { useAssetIsLoading, useCommand, useDomainEvent, usePhysics, useQuery } from "./hooks";
import { ListKeyQuery, SpawnKeyCommand } from '@/usecase'
import { useEffect, useState } from "react";
import { CollisionStart, KeyUpdated } from "@/event";

type Key = {
  x: number
  y: number
}

function App() {
  usePhysics()
  const isLoading = useAssetIsLoading();

  const keyUpdated = useDomainEvent(KeyUpdated)
  const listKeys = useQuery(ListKeyQuery)
  const [keys, setKeys] = useState<Key[]>([])

  useEffect(() => {
    listKeys(null).then(({ keys }) => setKeys(keys))
  }, [keyUpdated, listKeys])

  const spawnKey = useCommand(SpawnKeyCommand)
  useEffect(() => {
    spawnKey(null)
  }, [spawnKey])

  const collisionStarted = useDomainEvent(CollisionStart) as CollisionStart
  useEffect(() => {
    if(!collisionStarted) {
      return
    }

    const [entityA, entityB] = collisionStarted.pair
    if(entityA.type === 'Player' || entityB.type === 'Player') {
      collisionStarted.concats.forEach((entity) => {
        if(entity.type === 'Key') {
          spawnKey(null)
          return
        }
      })
    }
  }, [collisionStarted, spawnKey])

  return (
    <>
      <Sprite image={mapAsset} x={320} y={236} visible={!isLoading} />
      { keys.map(({x, y}, idx) => <Key x={x} y={y} key={idx} />) }
      <Player />
    </>
  );
}

export default App;
