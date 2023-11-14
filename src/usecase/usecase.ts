export interface Query<I, O = void> {
  execute(input: I): Promise<O>;
}

export interface Command<I, O> {
  execute(input: I): Promise<O>;
}
