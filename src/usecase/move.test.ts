import { describe, expect, test } from "vitest";
import container from "@/container";
import { MoveCommand } from "./move";
import { Event, EventBusSymbol, PlayerMoved } from "@/event";
import { Subject, lastValueFrom, take } from "rxjs";

describe("MoveCommand", () => {
  test("executable", async () => {
    const domainEvent$ = container
      .get<Subject<Event>>(EventBusSymbol)
      .pipe(take(1));
    const command = container.resolve<MoveCommand>(MoveCommand);
    const event = lastValueFrom(domainEvent$);

    command.execute({ direction: "right" });

    expect(await event).toBeInstanceOf(PlayerMoved);
  });

  test("player 1 is updated", async () => {
    const domainEvent$ = container
      .get<Subject<Event>>(EventBusSymbol)
      .pipe(take(1));
    const command = container.resolve<MoveCommand>(MoveCommand);
    const event = lastValueFrom(domainEvent$);

    command.execute({ direction: "right" });

    expect(await event).toHaveProperty("id", "1");
  });
});
