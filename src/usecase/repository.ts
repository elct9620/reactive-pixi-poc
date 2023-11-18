export interface Repository<T> {
  save(entity: T): void;
  find(id: string): T;
}

export const PlayerRepository = Symbol("PlayerRepository");
