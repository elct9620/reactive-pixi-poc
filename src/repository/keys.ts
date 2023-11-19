import { injectable, inject } from "inversify";
import { Subject } from "rxjs";
import { Key } from "@/entity";
import { Event, EventBusSymbol, KeyUpdated } from "@/event";
import { v4 as uuidv4 } from "uuid";
import { Engine, Body, Bodies, Composite } from "matter-js";

const keys: Key[] = [];
const bodies: Body[] = [];

@injectable()
export class ListKeys {
  execute() {
    return keys;
  }
}

@injectable()
export class Keys {
  private readonly events: Subject<Event>;
  private readonly physEngine: Engine;

  constructor(
    @inject(EventBusSymbol) events: Subject<Event>,
    @inject(Engine) physEngine: Engine,
  ) {
    this.events = events;
    this.physEngine = physEngine;
  }

  find(id: string) {
    return keys.find((key) => key.id === id);
  }

  save(key: Key) {
    keys.push(key);
    const body = Bodies.rectangle(
      key.position.x - 8,
      key.position.y - 8,
      16,
      16,
      {
        label: `Key#${key.id}`,
        isStatic: true,
      },
    );
    bodies.push(body);
    Composite.add(this.physEngine.world, body);

    this.events.next(new KeyUpdated(uuidv4()));
  }

  delete(id: string) {
    const index = keys.findIndex((key) => key.id === id);
    if (index !== -1) {
      keys.splice(index, 1);
      Composite.remove(this.physEngine.world, bodies[index]);
      bodies.splice(index, 1);
    }
  }
}
