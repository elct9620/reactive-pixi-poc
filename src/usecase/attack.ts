import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Command } from "./usecase";
import { type Repository, PlayerRepository } from "./repository";
import { Player } from "../entity";

export const AttackCommandSymbol = Symbol("AttackCommand");
export type AttackCommandInput = {
  amount: number;
};

@injectable()
export class AttackCommand implements Command<AttackCommandInput, boolean> {
  private readonly _players: Repository<Player>;

  constructor(@inject(PlayerRepository) players: Repository<Player>) {
    this._players = players;
  }

  async execute({ amount }: AttackCommandInput): Promise<boolean> {
    const player = this._players.find("1");
    player.damage(amount);
    this._players.save(player);
    return true;
  }
}
