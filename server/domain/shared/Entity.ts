export abstract class Entity<TState extends { id: unknown }> {
  protected state: TState;

  constructor(state: TState) {
    this.state = state;
  }

  getId() {
    return this.state.id;
  }

  getState(): TState {
    return this.state;
  }

  protected setState(partialState: Partial<Omit<TState, "id">>): void {
    this.state = { ...this.state, ...partialState };
  }
}
