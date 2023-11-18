import { Stage, Sprite } from "@pixi/react";

import Player from "@/components/Player";
import mapAsset from "@/assets/map.png";
import { useAssetIsLoading } from "./hooks";

function App() {
  const isLoading = useAssetIsLoading();

  return (
    <Stage options={{ backgroundColor: 0x1c0f14 }}>
      <Sprite image={mapAsset} x={320} y={236} visible={!isLoading} />
      <Player />
    </Stage>
  );
}

export default App;
