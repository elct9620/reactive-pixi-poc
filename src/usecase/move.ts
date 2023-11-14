import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Command } from './usecase';
import { type Repository, PlayerRepositorySymbol } from './repository'
import { Player, Position } from '../entity'

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
        player.position = position.add({ x: 0, y: -speed })
        break
      case 'down':
        player.position = position.add({ x: 0, y: speed })
        break
      case 'left':
        player.position = position.add({ x: -speed, y: 0 })
        break
      case 'right':
        player.position = position.add({ x: speed, y: 0 })
        break
    }

    if (!isWithinBoundaries(player.position)) {
      player.position = position
    }

    this._players.save(player)
  }
}
