import { Position } from "./position";

export class Key {
  public readonly id: string;
  private _position: Position = new Position(344, 260);

  constructor(id: string) {
    this.id = id;
  }

  public get position() {
    return new Position(this._position.x, this._position.y);
  }

  public set position(position: Position) {
    this._position = position;
  }
}
