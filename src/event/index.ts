export const EventBusSymbol = Symbol("EventBus");
export abstract class Event {
  public readonly id: string;
  public abstract readonly type: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class PlayerUpdated extends Event {
  public readonly type = "PlayerUpdated";
}
export class KeyUpdated extends Event {
  public readonly type = "KeyUpdated";
  public readonly position: { x: number; y: number };

  constructor(id: string, position: { x: number; y: number }) {
    super(id);
    this.position = position;
  }
}

type CollisionEntity = {
  type: string;
  id: string;
};

export class CollisionStart extends Event {
  public readonly type = "CollisionStart";
  public readonly concats: CollisionEntity[];
  public readonly pair: CollisionEntity[];

  constructor(id: string, pair: CollisionEntity[], concats: CollisionEntity[]) {
    super(id);
    this.pair = pair;
    this.concats = concats;
  }
}
