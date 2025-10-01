import { TrackIdSchema } from "@/server/domain/player/entities/Track";
import {
  Player,
  PlayerId,
  PlayerIdSchema,
} from "../../../../domain/player/entities/Player";
import { PlayerRepository } from "../../../../domain/player/repositories/PlayerRepository";
import { PrismaClient } from "../PrismaClient";
import { Effect, pipe } from "effect";

export class PrismaPlayerRepository implements PlayerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  save(player: Player): Effect.Effect<void> {
    const state = player.getState();

    const p = () =>
      this.prisma.player.upsert({
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

    return Effect.promise(p);
  }

  findById(id: PlayerId): Effect.Effect<Player | null> {
    const p = () =>
      this.prisma.player.findUnique({
        where: { id },
        include: { currentTrack: true },
      });

    return pipe(
      Effect.promise(p),
      Effect.map((playerData) => {
        if (!playerData) {
          return null;
        }

        return Player.fromState({
          ...playerData,
          currentTrackId: TrackIdSchema.parse(playerData.currentTrackId),
          id: PlayerIdSchema.parse(playerData.id),
        });
      })
    );
  }
}
