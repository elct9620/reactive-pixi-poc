import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Command } from "./usecase";
import {
  type Repository,
  KeyRepository,
  type Projection,
  ListKeyProjection,
} from "./repository";
import { Key, Position } from "@/entity";

const xStart = 344;
const yStart = 260;
const xStep = 7;
const yStep = 5;
const boxSize = 16;

@injectable()
export class SpawnKeyCommand implements Command<void, void> {
  private keys: Repository<Key>;
  private listKeys: Projection<void, Key[]>;

  constructor(
    @inject(KeyRepository) keys: Repository<Key>,
    @inject(ListKeyProjection) listKeys: Projection<void, Key[]>,
  ) {
    this.keys = keys;
    this.listKeys = listKeys;
  }

  async execute(): Promise<void> {
    const keys = this.listKeys.execute();
    keys.forEach((key) => {
      this.keys.delete(key.id);
    });

    const key = Key.create();

    const x = xStart + boxSize * Math.floor(Math.random() * xStep);
    const y = yStart + boxSize * Math.floor(Math.random() * yStep);

    key.position = new Position(x, y);
    this.keys.save(key);
  }
}
