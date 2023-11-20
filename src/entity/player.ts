import { AggregateRoot } from "./aggregate";
import { Position } from "./position";
import { Event, PlayerMoved } from "@/event";
import { v4 as uuidv4 } from "uuid";

export class Player extends AggregateRoot<string, Event> {
  private _speed: number = 16;
  private _position: Position = new Position(344, 260);

  public static create() {
    return new this("1");
  }

  public get position() {
    return new Position(this._position.x, this._position.y);
  }

  public get speed() {
    return this._speed;
  }

  public set position(position: Position) {
    this.apply(new PlayerMoved(uuidv4(), position));
  }

  protected onPlayerMoved(event: PlayerMoved) {
    const { position } = event;
    this._position = new Position(position.x, position.y);
  }
}
