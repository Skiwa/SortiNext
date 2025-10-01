import { TrackIdSchema } from "@/server/domain/player/entities/Track";
import { Player, PlayerId } from "../../../../domain/player/entities/Player";
import { PlayerRepository } from "../../../../domain/player/repositories/PlayerRepository";
import { PrismaClient } from "../PrismaClient";

export class PrismaPlayerRepository implements PlayerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(player: Player): Promise<void> {
    const state = player.getState();

    await this.prisma.player.upsert({
      where: { id: state.id },
      create: {
        id: state.id,
        currentTrackId: state.currentTrackId,
        playbackPosition: state.playbackPosition,
      },
      update: {
        currentTrackId: state.currentTrackId,
        playbackPosition: state.playbackPosition,
      },
    });
  }

  async findById(id: PlayerId): Promise<Player | null> {
    const playerData = await this.prisma.player.findUnique({
      where: { id },
      include: { currentTrack: true },
    });

    if (!playerData) {
      return null;
    }

    return Player.fromState({
      id: playerData.id as PlayerId,
      currentTrackId: TrackIdSchema.parse(playerData.currentTrackId),
      playbackPosition: playerData.playbackPosition,
    });
  }
}
