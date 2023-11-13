export class Player {
  public readonly id: string;
  private _speed: number = 16;
  private _x: number = 336;
  private _y: number = 252;
  private _health: number = 100;

  constructor(id: string) {
    this.id = id;
  }

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  public get health() {
    return this._health;
  }

  public damage(amount: number) {
    this._health -= amount;
  }

  public move(direction: 'up' | 'down' | 'left' | 'right') {
    switch (direction) {
      case 'up':
        this._y -= this._speed;
        break;
      case 'down':
        this._y += this._speed;
        break;
      case 'left':
        this._x -= this._speed;
        break;
      case 'right':
        this._x += this._speed;
        break;
    }
  }
}
