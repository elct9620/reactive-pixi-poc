import { describe, expect, test } from "vitest";
import container from "@/container";
import { PlayerQuery } from "./player";

describe("PlayerQuery", () => {
  test("have x property", async () => {
    const query = container.resolve<PlayerQuery>(PlayerQuery);
    const player = await query.execute({ id: "1" });

    expect(player).toHaveProperty("x", 344);
  });

  test("have y property", async () => {
    const query = container.resolve<PlayerQuery>(PlayerQuery);
    const player = await query.execute({ id: "1" });

    expect(player).toHaveProperty("y", 260);
  });
});
