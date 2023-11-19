export const EventBusSymbol = Symbol("EventBus");
export class Event {
  public readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  get type() {
    return this.constructor.name;
  }
}

export class PlayerUpdated extends Event {}
export class KeyUpdated extends Event {}

type CollisionEntity = {
  type: string;
  id: string;
};

export class CollisionStart extends Event {
  public readonly concats: CollisionEntity[];
  public readonly pair: CollisionEntity[];

  constructor(id: string, pair: CollisionEntity[], concats: CollisionEntity[]) {
    super(id);
    this.pair = pair;
    this.concats = concats;
  }
}
