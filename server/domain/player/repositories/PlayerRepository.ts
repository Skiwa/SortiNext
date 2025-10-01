import { Player, PlayerId } from "../entities/Player";
import { Effect } from "effect";
import { PlayerNotFound } from "../errors/PlayerNotFound";

export interface PlayerRepository {
  findByIdOrFail(id: PlayerId): Effect.Effect<Player, PlayerNotFound>;
  save(player: Player): Effect.Effect<void>;
}
