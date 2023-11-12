export interface Query<I, O> {
  execute(input: I): O;
}

export interface Command<I> {
  execute(input: I): void;
}
