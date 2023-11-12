import { useMemo, useContext } from "react"
import { bind, state, useStateObservable } from "@react-rxjs/core"
import { Subject, fromEvent, filter } from "rxjs"
import { interfaces } from "inversify"
import container, { InjectContext } from '@/container'
import { Event, EventBusSymbol } from '@/event'

const keydown$ = fromEvent(document, 'keydown')
const [useKeyDown] = bind(keydown$, null)

export const domainEvent$ = container.get<Subject<Event>>(EventBusSymbol)
const getDomainEvent$ = state(<T>(type: interfaces.Newable<T>) => {
  return domainEvent$.pipe(
    filter((event: Event) => event instanceof type)
  )
}, null)
const useDomainEvent = <T>(type: interfaces.Newable<T>) => useStateObservable(getDomainEvent$(type))

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
