import { Effect, pipe } from "effect";
import {
  Track,
  TrackId,
  TrackIdSchema,
} from "../../../../domain/player/entities/Track";
import { TrackRepository } from "../../../../domain/player/repositories/TrackRepository";
import { PrismaClient } from "../PrismaClient";
import { TrackNotFound } from "@/server/domain/player/errors/TrackNotFound";

export class PrismaTrackRepository implements TrackRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findById(id: TrackId): Effect.Effect<Track, TrackNotFound> {
    return pipe(
      Effect.promise(() =>
        this.prisma.track.findUnique({
          where: { id },
        })
      ),
      Effect.flatMap((trackData) => {
        if (!trackData) {
          return Effect.fail(new TrackNotFound(id));
        }

        return Effect.succeed(
          Track.fromState({
            duration: trackData.duration,
            id: TrackIdSchema.parse(trackData.id),
            title: trackData.title,
          })
        );
      })
    );
  }

  save(track: Track): Effect.Effect<void> {
    const state = track.toState();

    return Effect.promise(() =>
      this.prisma.track.upsert({
        where: { id: state.id },
        create: {
          id: state.id,
          title: state.title,
          duration: state.duration,
        },
        update: {
          title: state.title,
          duration: state.duration,
        },
      })
    );
  }
}
