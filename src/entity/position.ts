import { Vector2 } from "./vector";

export class Position {
  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vec: Vector2): Position {
    return new Position(this.x + vec.x, this.y + vec.y);
  }
}
