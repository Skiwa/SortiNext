import { Dependencies } from "@/server/infrastructure/container/ServiceContainer";
import { Player, PlayerId } from "../entities/Player";
import { Effect } from "effect";

export class GetOnePlayer {
  constructor(private readonly deps: Dependencies) {}

  execute(id: PlayerId): Effect.Effect<Player | null> {
    return this.deps.playerRepository.findById(id);
  }
}
