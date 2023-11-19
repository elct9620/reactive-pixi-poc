import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Query } from "./usecase";
import { type Repository, PlayerRepository } from "./repository";
import { Player } from "../entity";

export type PlayerQueryInput = {
  id: string;
};
export type PlayerQueryOutput = {
  health: number;
  x: number;
  y: number;
};

@injectable()
export class PlayerQuery implements Query<PlayerQueryInput, PlayerQueryOutput> {
  private readonly _players: Repository<Player>;

  constructor(@inject(PlayerRepository) players: Repository<Player>) {
    this._players = players;
  }

  async execute({ id }: PlayerQueryInput): Promise<PlayerQueryOutput> {
    const player = this._players.find(id);
    if (!player) {
      return { health: 0, x: 0, y: 0 };
    }

    const { health, position } = player;
    const { x, y } = position;

    return { health, x, y };
  }
}
