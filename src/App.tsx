import { Sprite } from "@pixi/react";
import Player from "@/components/Player";
import Key from "@/components/Key";
import mapAsset from "@/assets/map.png";
import { useAssetIsLoading, usePhysics, useQuery } from "./hooks";
import { ListKeyQuery } from '@/usecase'
import { useEffect, useState } from "react";

type Key = {
  x: number
  y: number
}

function App() {
  usePhysics()
  const isLoading = useAssetIsLoading();

  const listKeys = useQuery(ListKeyQuery)
  const [keys, setKeys] = useState<Key[]>([])

  useEffect(() => {
    listKeys(null).then(({ keys }) => setKeys(keys))
  }, [listKeys])

  return (
    <>
      <Sprite image={mapAsset} x={320} y={236} visible={!isLoading} />
      { keys.map(({x, y}, idx) => <Key x={x} y={y} key={idx} />) }
      <Player />
    </>
  );
}

export default App;
