export interface Query<I, O> {
  execute(input: I): O;
}

export interface Command<I, O> {
  execute(input: I): O;
}
