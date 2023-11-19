import { injectable, inject } from "inversify";
import { Subject } from "rxjs";
import { Key } from "@/entity";
import { Event, EventBusSymbol, KeyUpdated } from "@/event";
import { v4 as uuidv4 } from "uuid";

const keys: Key[] = [];

@injectable()
export class ListKeys {
  execute() {
    return keys;
  }
}

@injectable()
export class Keys {
  private readonly events: Subject<Event>;

  constructor(@inject(EventBusSymbol) events: Subject<Event>) {
    this.events = events;
  }

  find(id: string) {
    return keys.find((key) => key.id === id);
  }

  save(key: Key) {
    keys.push(key);
    this.events.next(new KeyUpdated(uuidv4()));
  }
}
