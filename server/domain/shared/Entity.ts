export abstract class Entity<TState extends { id: unknown }> {
  protected state: TState;

  constructor(state: TState) {
    this.state = state;
  }

  getId() {
    return this.state.id;
  }

  toState(): TState {
    return this.state;
  }

  protected setState(partialState: Partial<Omit<TState, "id">>): void {
    this.state = { ...this.state, ...partialState };
  }

  equals(other: Entity<TState>): boolean {
    return this.state.id === other.state.id;
  }
}
