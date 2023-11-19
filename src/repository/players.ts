import { injectable, inject } from "inversify";
import { Subject } from "rxjs";
import { Engine, Bodies, Body, Composite } from "matter-js";
import { Player } from "@/entity";
import { Event, EventBusSymbol, PlayerUpdated } from "@/event";

@injectable()
export class Players {
  private readonly events: Subject<Event>;
  private readonly physEngine: Engine;
  private player: Player;
  private playerBody;

  constructor(
    @inject(EventBusSymbol) events: Subject<Event>,
    @inject(Engine) physEngine: Engine,
  ) {
    this.events = events;
    this.physEngine = physEngine;
    /**
     * Static Player
     */
    this.player = new Player("1");
    this.playerBody = Bodies.rectangle(
      this.player.position.x,
      this.player.position.y,
      16,
      16,
      {
        isStatic: true,
      },
    );

    Composite.add(this.physEngine.world, this.playerBody);
  }

  find() {
    return this.player;
  }

  save(player: Player) {
    this.player = player;
    Body.setPosition(this.playerBody, player.position);
    this.events.next(new PlayerUpdated(player.id));
  }
}
