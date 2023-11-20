import { AggregateRoot } from "./aggregate";
import { Position } from "./position";
import { Event, KeyUpdated } from "@/event";
import { v4 as uuidv4 } from "uuid";

export class Key extends AggregateRoot<string, Event> {
  private _position: Position = new Position(344, 260);

  public static create() {
    return new this(uuidv4());
  }

  public get position() {
    return new Position(this._position.x, this._position.y);
  }

  public set position(position: Position) {
    this.apply(new KeyUpdated(uuidv4(), position));
  }

  protected onKeyUpdated(event: KeyUpdated) {
    const { position } = event as KeyUpdated;
    this._position = new Position(position.x, position.y);
  }
}
