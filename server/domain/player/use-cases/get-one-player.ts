import { Dependencies } from "@/server/infrastructure/container/ServiceContainer";
import { Player, PlayerId } from "../entities/Player";
import { Effect, pipe } from "effect";
import { PlayerNotFound } from "../errors/PlayerNotFound";

export class GetOnePlayer {
  constructor(private readonly deps: Dependencies) {}

  execute(id: PlayerId): Effect.Effect<Player, PlayerNotFound> {
    return pipe(this.deps.playerRepository.findByIdOrFail(id));
  }
}
