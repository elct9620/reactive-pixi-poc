import { Stage, Sprite } from '@pixi/react';

import Player from '@/components/Player'
import mapAsset from '@/assets/map.png'

function App() {
  return (
    <Stage options={{backgroundColor: 0x1c0f14}}>
      <Sprite image={mapAsset} x={320} y={236} />
      <Player />
    </Stage>
  )
}

export default App
