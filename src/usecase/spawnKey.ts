import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Command } from "./usecase";
import { type Repository, KeyRepository } from "./repository";
import { Key, Position } from "@/entity";
import { v4 as uuidv4 } from "uuid";

const xStart = 344;
const yStart = 260;
const xStep = 7;
const yStep = 5;
const boxSize = 16;

@injectable()
export class SpawnKeyCommand implements Command<void, void> {
  private keys: Repository<Key>;

  constructor(@inject(KeyRepository) keys: Repository<Key>) {
    this.keys = keys;
  }

  async execute(): Promise<void> {
    const key = new Key(uuidv4());

    const x = xStart + boxSize * Math.floor(Math.random() * xStep);
    const y = yStart + boxSize * Math.floor(Math.random() * yStep);

    key.position = new Position(x, y);
    this.keys.save(key);
  }
}
