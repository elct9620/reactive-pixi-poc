import { injectable } from "inversify";
import "reflect-metadata";
import { Query } from "./usecase";

type Key = {
  x: number;
  y: number;
};

export type ListKeyQueryOutput = {
  keys: Key[];
};

@injectable()
export class ListKeyQuery implements Query<void, ListKeyQueryOutput> {
  constructor() {}

  async execute(): Promise<ListKeyQueryOutput> {
    return {
      keys: [
        {
          x: 360,
          y: 276,
        },
      ],
    };
  }
}
