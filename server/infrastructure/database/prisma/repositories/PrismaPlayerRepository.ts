import { TrackIdSchema } from "@/server/domain/player/entities/Track";
import {
  Player,
  PlayerId,
  PlayerIdSchema,
} from "../../../../domain/player/entities/Player";
import { PlayerRepository } from "../../../../domain/player/repositories/PlayerRepository";
import { PrismaClient } from "../PrismaClient";
import { Effect, pipe } from "effect";
import { PlayerNotFound } from "../../../../domain/player/errors/PlayerNotFound";

export class PrismaPlayerRepository implements PlayerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  save(player: Player): Effect.Effect<void> {
    const state = player.toState();

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

  findByIdOrFail(id: PlayerId): Effect.Effect<Player, PlayerNotFound> {
    const p = () =>
      this.prisma.player.findUnique({
        where: { id },
        include: { currentTrack: true },
      });

    return pipe(
      Effect.promise(p),
      Effect.flatMap((playerData) => {
        if (!playerData) {
          return Effect.fail(new PlayerNotFound(id));
        }

        return Effect.succeed(
          Player.fromState({
            ...playerData,
            currentTrackId: TrackIdSchema.parse(playerData.currentTrackId),
            id: PlayerIdSchema.parse(playerData.id),
          })
        );
      })
    );
  }
}
