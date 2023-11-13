import { useCallback, useState } from "react"
import { Stage, Container, Text } from '@pixi/react';
import { useEffect } from "react";
import * as UseCase from '@/usecase'
import { PlayerUpdated } from '@/event'
import {
  useKeyDown,
  useDomainEvent,
  useInject,
} from '@/hooks'

function App() {
  const attackCommand = useInject<UseCase.Command<UseCase.AttackCommandInput, boolean>>(UseCase.AttackCommandSymbol)
  const playerQuery = useInject<UseCase.Query<UseCase.PlayerQueryInput, UseCase.PlayerQueryOutput>>(UseCase.PlayerQuerySymbol)

  const [health, setHealth] = useState(0)

  const playerUpdatedEvent = useDomainEvent(PlayerUpdated)
  useEffect(() => {
    const player = playerQuery.execute({ id: '1' })
    setHealth(player.health)
  }, [playerUpdatedEvent, playerQuery])

  const keydown = useKeyDown()
  const attack = useCallback(() => {
    attackCommand.execute({ amount: 10 })
  }, [attackCommand])
  useEffect(() => {
    if (keydown) {
      attack()
    }
  }, [keydown, attack])

  return (
    <Stage options={{backgroundColor: 0xffffff}}>
      <Container x={400} y={300} eventMode="static" pointerdown={() => attack()}>
        <Text text={`Health is ${health}`} />
      </Container>
    </Stage>
  )
}

export default App
