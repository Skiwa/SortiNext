import { Dependencies } from "@/server/infrastructure/container/ServiceContainer";
import { Player, PlayerId } from "../entities/Player";

export class GetPlayerUseCase {
  constructor(private readonly deps: Dependencies) {}

  async execute(id: PlayerId): Promise<Player | null> {
    return await this.deps.playerRepository.findById(id);
  }
}
