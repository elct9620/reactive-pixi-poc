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
  event.pairs.forEach((pair) => {
    const [receiverAType, receiverAId] = pair.bodyA.label.split("#");
    const [receiverBType, receiverBId] = pair.bodyB.label.split("#");

    const eventPair = [
      { type: receiverAType, id: receiverAId },
      { type: receiverBType, id: receiverBId },
    ];

    const concats = pair.activeContacts.map((contact) => {
      const [type, id] = contact.vertex.body.label.split("#");
      return { type, id };
    });

    domainEvent$.next(new CollisionStart(uuidv4(), eventPair, concats));
  });
});
