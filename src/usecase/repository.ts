export interface Repository<T> {
  find(id: string): T | undefined;
  save(entity: T): void;
  delete(id: string): void;
}

export interface Projection<I, T> {
  execute(inputs: I): T;
}

export const PlayerRepository = Symbol("PlayerRepository");

export const KeyRepository = Symbol("KeyRepository");
export const ListKeyProjection = Symbol("ListKeyProjection");
