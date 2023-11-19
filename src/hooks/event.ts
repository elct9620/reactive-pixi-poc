import { Subject, fromEvent, filter } from "rxjs";
import { interfaces } from "inversify";
import { bind, state, useStateObservable } from "@react-rxjs/core";
import { Event, EventBusSymbol } from "@/event";
import container from "@/container";

const keydown$ = fromEvent(document, "keydown");
const [useKeyDown] = bind(keydown$, null);

export const domainEvent$ = container.get<Subject<Event>>(EventBusSymbol);
const getDomainEvent$ = state(<T>(type: interfaces.Newable<T>) => {
  return domainEvent$.pipe(filter((event: Event) => event instanceof type));
}, null);
const useDomainEvent = <T>(type: interfaces.Newable<T>) =>
  useStateObservable(getDomainEvent$(type));

export { useKeyDown, useDomainEvent };
