import { useState } from "react"
import { bind } from "@react-rxjs/core"
import { Subject, fromEvent } from "rxjs"
import { Stage, Container, Text } from '@pixi/react';
import { useEffect } from "react";
import container from './container'
import * as Controller from './controller'
import { Event, EventBusSymbol } from './event'

const keydown$ = fromEvent(document, 'keydown')
const [useKeyDown] = bind(keydown$, null)

const domainEvent$ = container.get<Subject<Event>>(EventBusSymbol)
const [useDomainEvent] = bind(domainEvent$, null)

const attackCommand = container.get<Controller.Command<Controller.AttackCommandInput>>(Controller.AttackCommandSymbol)
const playerQuery = container.get<Controller.Query<Controller.PlayerQueryInput, Controller.PlayerQueryOutput>>(Controller.PlayerQuerySymbol)

function App() {
  const [health, setHealth] = useState(0)

  useEffect(() => {
    const player = playerQuery.execute({ id: '1' })
    setHealth(player.health)
  }, [])

  const keydown = useKeyDown()
  useEffect(() => {
    if (keydown) {
      attackCommand.execute({ amount: 10 })
    }
  }, [keydown])

  const domainEvent = useDomainEvent()
  useEffect(() => {
    if (domainEvent) {
      const player = playerQuery.execute({ id: '1' })
      setHealth(player.health)
    }
  }, [domainEvent])

  return (
    <Stage options={{backgroundColor: 0xffffff}}>
      <Container x={400} y={300}>
        <Text text={`Health is ${health}`} />
      </Container>
    </Stage>
  )
}

export default App
