import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Command } from './usecase';
import { type Repository, PlayerRepositorySymbol } from './repository'
import { Player, Position } from '../entity'

export const MoveCommandSymbol = Symbol('MoveCommand');
export type MoveCommandInput = {
  direction: 'up' | 'down' | 'left' | 'right'
}

@injectable()
export class MoveCommand implements Command<MoveCommandInput, void> {
  private readonly _players: Repository<Player>

  constructor(
    @inject(PlayerRepositorySymbol) players: Repository<Player>
  ) {
    this._players = players
  }

  execute({ direction }: MoveCommandInput): void {
    const player = this._players.find('1')
    const { position, speed } = player

    switch (direction) {
      case 'up':
        player.moveTo(new Position(position.x, position.y - speed))
        break
      case 'down':
        player.moveTo(new Position(position.x, position.y + speed))
        break
      case 'left':
        player.moveTo(new Position(position.x - speed, position.y))
        break
      case 'right':
        player.moveTo(new Position(position.x + speed, position.y))
        break
    }

    this._players.save(player)
  }
}
