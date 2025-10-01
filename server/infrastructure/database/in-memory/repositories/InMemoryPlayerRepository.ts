import { Effect } from "effect";
import {
  Player,
  PlayerId,
  PlayerState,
} from "../../../../domain/player/entities/Player";
import { PlayerRepository } from "../../../../domain/player/repositories/PlayerRepository";

export class InMemoryPlayerRepository implements PlayerRepository {
  private collection: Map<string, PlayerState> = new Map();
  constructor() {}

  save(player: Player): Effect.Effect<void> {
    const state = player.toState();
    this.collection.set(state.id, state);
    return Effect.void;
  }

  findById(id: PlayerId): Effect.Effect<Player | null> {
    const playerData = this.collection.get(id);

    if (!playerData) {
      return Effect.succeed(null);
    }

    const player = Player.fromState(playerData);
    return Effect.succeed(player);
  }
}
