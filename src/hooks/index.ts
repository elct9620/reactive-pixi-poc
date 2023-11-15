import { useMemo, useCallback, useContext, useState, useEffect } from "react"
import { bind, state, useStateObservable } from "@react-rxjs/core"
import { Subject, fromEvent, filter, mergeAll, scan, withLatestFrom } from "rxjs"
import { interfaces } from "inversify"
import container, { InjectContext } from '@/container'
import { Command, Query } from '@/usecase'
import { Event, EventBusSymbol } from '@/event'
import { Assets, ArrayOr } from "pixi.js"

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

const useCommand = <I, O = void>(identifier: interfaces.ServiceIdentifier<Command<I, O>>) => {
  const command = useInject(identifier)
  return useCallback((input: I) => command.execute(input), [command])
}

const useQuery = <I, O>(identifier: interfaces.ServiceIdentifier<Query<I, O>>) => {
  const query = useInject(identifier)
  return useCallback((input: I) => query.execute(input), [query])
}

const assets$ = new Subject<Promise<void>>()
const assetsProgress$ = assets$.pipe(mergeAll())
const assetsCount$ = assets$.pipe(scan((acc) => acc + 1, 0))
const [useAssetIsLoading, isAssetsLoading$] = bind(
  assetsProgress$.pipe(
    scan((acc) => acc + 1, 0),
    withLatestFrom(assetsCount$, (current, total) => current < total),
  ),
  false
)

isAssetsLoading$.subscribe()

const useAssets = <T>(assetsUrls: ArrayOr<string>) => {
  const [assets, setAssets] = useState<Record<string, T>>({})

  useEffect(() => {
    const promise = Assets.load(assetsUrls)
    assets$.next(promise)
    promise.then((res) => setAssets(res))
  }, [assetsUrls])

  return assets
}

export {
  useKeyDown,
  useDomainEvent,
  useInject,
  useCommand,
  useQuery,
  useAssets,
  useAssetIsLoading,
}
