import { injectable, inject } from "inversify";
import { Player } from '../entity'
import { Subject } from "rxjs";
import { Event, EventBusSymbol, PlayerUpdated } from '../event'

@injectable()
export class Players {
  private events: Subject<Event>;
  private player: Player;

  constructor (
    @inject(EventBusSymbol) events: Subject<Event>
  ) {
    this.events = events
    this.player = new Player('1')
  }

  find() {
    return this.player
  }

  save(player: Player) {
    this.player = player
    this.events.next(new PlayerUpdated(player.id))
  }
}
