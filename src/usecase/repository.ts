export interface Repository<T> {
  save(entity: T): void;
  find(id: string): T;
}

export interface Projection<I, T> {
  execute(inputs: I): T;
}

export const PlayerRepository = Symbol("PlayerRepository");
export const ListKeyProjection = Symbol("ListKeyProjection");
