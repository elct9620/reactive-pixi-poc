import { useEffect, useRef } from "react";
import { useTick } from "@pixi/react";
import { Engine, Events } from "matter-js";
import container from "@/container";
import { Event, EventBusSymbol, CollisionStart } from "@/event";
import { v4 as uuidv4 } from "uuid";
import { Subject } from "rxjs";

export const usePhysics = () => {
  const engine = useRef<Engine | null>(null);

  useEffect(() => {
    engine.current = container.get<Engine>(Engine);
  }, []);

  useTick((_delta, { deltaMS }) => {
    if (engine.current) {
      Engine.update(engine.current, deltaMS);
    }
  });
};

const engien = container.get<Engine>(Engine);
const domainEvent$ = container.get<Subject<Event>>(EventBusSymbol);
Events.on(engien, "collisionStart", (event) => {
  const bodyIds = event.pairs.map((pair) => [pair.bodyA.id, pair.bodyB.id]);
  domainEvent$.next(new CollisionStart(uuidv4(), bodyIds));
});
