export interface Repository<T> {
  save(entity: T): void;
  find(id: string): T | undefined;
}

export interface Projection<I, T> {
  execute(inputs: I): T;
}

export const PlayerRepository = Symbol("PlayerRepository");

export const KeyRepository = Symbol("KeyRepository");
export const ListKeyProjection = Symbol("ListKeyProjection");
