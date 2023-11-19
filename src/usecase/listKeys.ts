import { inject, injectable } from "inversify";
import "reflect-metadata";
import { Query } from "./usecase";
import { Key } from "@/entity";
import { ListKeyProjection, type Projection } from ".";

type KeyPosition = {
  x: number;
  y: number;
};

export type ListKeyQueryOutput = {
  keys: KeyPosition[];
};

@injectable()
export class ListKeyQuery implements Query<void, ListKeyQueryOutput> {
  private readonly getKeys: Projection<void, Key[]>;

  constructor(@inject(ListKeyProjection) getKeys: Projection<void, Key[]>) {
    this.getKeys = getKeys;
  }

  async execute(): Promise<ListKeyQueryOutput> {
    const keys = this.getKeys.execute();

    return {
      keys: keys.map((key) => ({
        x: key.position.x,
        y: key.position.y,
      })),
    };
  }
}
