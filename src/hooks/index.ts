import { useMemo } from "react"
import { bind } from "@react-rxjs/core"
import { Subject, fromEvent } from "rxjs"
import container from '@/container'
import { Event, EventBusSymbol } from '@/event'
import * as UseCase from '@/usecase'

const keydown$ = fromEvent(document, 'keydown')
const [useKeyDown] = bind(keydown$, null)

const domainEvent$ = container.get<Subject<Event>>(EventBusSymbol)
const [useDomainEvent] = bind(domainEvent$, null)

const useAttackCommand = () => useMemo(() => container.get<UseCase.Command<UseCase.AttackCommandInput, boolean>>(UseCase.AttackCommandSymbol), [])
const usePlayerQuery = () => useMemo(() => container.get<UseCase.Query<UseCase.PlayerQueryInput, UseCase.PlayerQueryOutput>>(UseCase.PlayerQuerySymbol), [])

export {
  useKeyDown,
  useDomainEvent,
  useAttackCommand,
  usePlayerQuery,
}
