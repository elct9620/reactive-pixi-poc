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
export class CollisionStart extends Event {
  public readonly pairs: number[][];

  constructor(id: string, pairs: number[][]) {
    super(id);
    this.pairs = pairs;
  }
}
