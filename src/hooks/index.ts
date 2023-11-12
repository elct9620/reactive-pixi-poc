import { useMemo, useContext } from "react"
import { bind } from "@react-rxjs/core"
import { Subject, fromEvent } from "rxjs"
import { interfaces } from "inversify"
import container, { InjectContext } from '@/container'
import { Event, EventBusSymbol } from '@/event'

const keydown$ = fromEvent(document, 'keydown')
const [useKeyDown] = bind(keydown$, null)

const domainEvent$ = container.get<Subject<Event>>(EventBusSymbol)
const [useDomainEvent] = bind(domainEvent$, null)

const useInject = <T>(identifier: interfaces.ServiceIdentifier<T>)  => {
  const { container } = useContext(InjectContext)
  if(!container) {
    throw new Error('InjectContext not found')
  }

  return useMemo(() => container.get<T>(identifier), [container, identifier])
}

export {
  useKeyDown,
  useDomainEvent,
  useInject,
}
