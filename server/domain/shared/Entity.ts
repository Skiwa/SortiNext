export abstract class Entity<TState extends { id: unknown }> {
  protected state: TState

  constructor(state: TState | Omit<TState, 'id'>) {
    if ('id' in state) {
      this.state = state
    } else {
      this.state = { ...state, id: crypto.randomUUID() } as TState
    }
  }

  getId() {
    return this.state.id
  }

  getState(): TState {
    return this.state
  }

  protected setState(partialState: Partial<Omit<TState, 'id'>>): void {
    this.state = { ...this.state, ...partialState }
  }
}
