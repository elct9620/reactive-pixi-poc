export class Player {
  public readonly id: string;
  private _health: number = 100;

  constructor(id: string) {
    this.id = id;
  }

  public get health() {
    return this._health;
  }

  public damage(amount: number) {
    this._health -= amount;
  }
}
