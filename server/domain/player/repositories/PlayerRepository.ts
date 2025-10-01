import { Player, PlayerId } from "../entities/Player";

export interface PlayerRepository {
  findById(id: PlayerId): Promise<Player | null>;
  save(player: Player): Promise<void>;
}
