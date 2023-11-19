import { Sprite } from "@pixi/react";
import Player from "@/components/Player";
import Key from "@/components/Key";
import mapAsset from "@/assets/map.png";
import { useAssetIsLoading, usePhysics } from "./hooks";

function App() {
  usePhysics()
  const isLoading = useAssetIsLoading();

  return (
    <>
      <Sprite image={mapAsset} x={320} y={236} visible={!isLoading} />
      <Key x={360} y={276} />
      <Player />
    </>
  );
}

export default App;
