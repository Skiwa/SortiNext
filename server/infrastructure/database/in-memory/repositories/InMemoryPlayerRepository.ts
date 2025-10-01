import { Effect } from "effect";
import {
  Player,
  PlayerId,
  PlayerState,
} from "../../../../domain/player/entities/Player";
import { PlayerRepository } from "../../../../domain/player/repositories/PlayerRepository";
import { PlayerNotFound } from "@/server/domain/player/errors/PlayerNotFound";

export class InMemoryPlayerRepository implements PlayerRepository {
  private collection: Map<string, PlayerState> = new Map();
  constructor() {}

  save(player: Player): Effect.Effect<void> {
    const state = player.toState();
    this.collection.set(state.id, state);
    return Effect.void;
  }

  findByIdOrFail(id: PlayerId): Effect.Effect<Player, PlayerNotFound> {
    const playerData = this.collection.get(id);

    if (!playerData) {
      return Effect.fail(new PlayerNotFound(id));
    }

    const player = Player.fromState(playerData);
    return Effect.succeed(player);
  }
}
