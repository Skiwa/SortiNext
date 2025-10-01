import { Player, PlayerId } from "../entities/Player";
import { Effect } from "effect";

export interface PlayerRepository {
  findById(id: PlayerId): Effect.Effect<Player | null>;
  save(player: Player): Effect.Effect<void>;
}
