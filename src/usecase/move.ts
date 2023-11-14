import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Command } from './usecase';
import { type Repository, PlayerRepositorySymbol } from './repository'
import { Player, Position } from '../entity'

export const MoveCommandSymbol = Symbol('MoveCommand');
export type MoveCommandInput = {
  direction: 'up' | 'down' | 'left' | 'right'
}

const MoveBoundaries = {
  x: { min: 344, max: 456 },
  y: { min: 260, max: 340 }
}

const isWithinBoundaries = (position: Position) => {
  const { x, y } = position
  const { x: { min, max }, y: { min: minY, max: maxY } } = MoveBoundaries

  return x >= min && x <= max && y >= minY && y <= maxY
}

@injectable()
export class MoveCommand implements Command<MoveCommandInput, void> {
  private readonly _players: Repository<Player>

  constructor(
    @inject(PlayerRepositorySymbol) players: Repository<Player>
  ) {
    this._players = players
  }

  async execute({ direction }: MoveCommandInput): Promise<void> {
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

    if (!isWithinBoundaries(player.position)) {
      player.moveTo(position)
    }

    this._players.save(player)
  }
}
