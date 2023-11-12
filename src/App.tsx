import { useState } from "react"
import { Stage, Container, Text } from '@pixi/react';
import { useEffect } from "react";
import {
  useKeyDown,
  useDomainEvent,
  useAttackCommand,
  usePlayerQuery
} from '@/hooks'

function App() {
  const attackCommand = useAttackCommand()
  const playerQuery = usePlayerQuery()

  const [health, setHealth] = useState(0)

  useEffect(() => {
    const player = playerQuery.execute({ id: '1' })
    setHealth(player.health)
  }, [playerQuery])

  const keydown = useKeyDown()
  useEffect(() => {
    if (keydown) {
      attackCommand.execute({ amount: 10 })
    }
  }, [keydown, attackCommand])

  const domainEvent = useDomainEvent()
  useEffect(() => {
    if (domainEvent) {
      const player = playerQuery.execute({ id: '1' })
      setHealth(player.health)
    }
  }, [domainEvent, playerQuery])

  return (
    <Stage options={{backgroundColor: 0xffffff}}>
      <Container x={400} y={300}>
        <Text text={`Health is ${health}`} />
      </Container>
    </Stage>
  )
}

export default App
