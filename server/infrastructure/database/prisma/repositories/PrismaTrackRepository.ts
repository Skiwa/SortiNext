import { Effect, pipe } from "effect";
import {
  Track,
  TrackId,
  TrackIdSchema,
} from "../../../../domain/player/entities/Track";
import { TrackRepository } from "../../../../domain/player/repositories/TrackRepository";
import { PrismaClient } from "../PrismaClient";

export class PrismaTrackRepository implements TrackRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findById(id: TrackId): Effect.Effect<Track | null> {
    return pipe(
      Effect.promise(() =>
        this.prisma.track.findUnique({
          where: { id },
        })
      ),
      Effect.map((trackData) => {
        if (!trackData) {
          return null;
        }

        return Track.fromState({
          duration: trackData.duration,
          id: TrackIdSchema.parse(trackData.id),
          title: trackData.title,
        });
      })
    );
  }
}
