import { Position } from "./position";

export class Player {
  public readonly id: string;
  private _speed: number = 16;
  private _position: Position = new Position(344, 260);
  private _health: number = 100;

  constructor(id: string) {
    this.id = id;
  }

  public get position() {
    return new Position(this._position.x, this._position.y);
  }

  public get speed() {
    return this._speed;
  }

  public get health() {
    return this._health;
  }

  public damage(amount: number) {
    this._health -= amount;
  }

  public set position(position: Position) {
    this._position = position;
  }
}
