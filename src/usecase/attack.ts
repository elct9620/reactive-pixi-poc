import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Command } from './command';
import { type Repository, PlayerRepositorySymbol } from './repository'
import { Player } from '../entity'

export const AttackCommandSymbol = Symbol('AttackCommand');
export type AttackCommandInput = {
  amount: number;
}

@injectable()
export class AttackCommand implements Command<AttackCommandInput> {
  private readonly _players: Repository<Player>

  constructor(
    @inject(PlayerRepositorySymbol) players: Repository<Player>
  ) {
    this._players = players
  }

  execute({ amount }: AttackCommandInput): void {
    const player = this._players.find('1')
    player.damage(amount)
    this._players.save(player)
  }
}
