import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Query } from './usecase';
import { type Repository, PlayerRepositorySymbol } from './repository'
import { Player } from '../entity'

export const PlayerQuerySymbol = Symbol('PlayerQuery');
export type PlayerQueryInput = {
  id: string;
}
export type PlayerQueryOutput = {
  health: number;
  x: number;
  y: number;
}

@injectable()
export class PlayerQuery implements Query<PlayerQueryInput, PlayerQueryOutput> {
  private readonly _players: Repository<Player>

  constructor(
    @inject(PlayerRepositorySymbol) players: Repository<Player>
  ) {
    this._players = players
  }

  async execute({ id }: PlayerQueryInput): Promise<PlayerQueryOutput> {
    const player = this._players.find(id)
    const { health, position } = player
    const { x, y } = position

    return { health, x, y }
  }
}
