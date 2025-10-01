import { PrismaClient } from "../PrismaClient";
import {
  Album,
  AlbumId,
  AlbumIdSchema,
} from "../../../../domain/player/entities/Album";
import { Track, TrackIdSchema } from "../../../../domain/player/entities/Track";
import { AlbumAggregate } from "../../../../domain/player/aggregates/AlbumAggregate";
import { AlbumRepository } from "../../../../domain/player/repositories/AlbumRepository";
import { AlbumNotFound } from "@/server/domain/player/errors/AlbumNotFound";
import { Effect, pipe } from "effect";

export class PrismaAlbumRepository implements AlbumRepository {
  constructor(private prisma: PrismaClient) {}

  findById(id: AlbumId): Effect.Effect<Album, AlbumNotFound> {
    const p = () =>
      this.prisma.album.findUnique({
        where: { id },
      });

    return pipe(
      Effect.promise(p),
      Effect.flatMap((album) => {
        if (!album) {
          return Effect.fail(new AlbumNotFound(id));
        }

        return Effect.succeed(
          Album.fromState({
            id: AlbumIdSchema.parse(album.id),
            imageUrl: album.imageUrl,
            title: album.title,
            tracks: [],
          })
        );
      })
    );
  }

  findByIdWithTracks(
    id: AlbumId
  ): Effect.Effect<AlbumAggregate, AlbumNotFound> {
    const p = () =>
      this.prisma.album.findUnique({
        where: { id },
        include: {
          tracks: true,
        },
      });

    return pipe(
      Effect.promise(p),
      Effect.flatMap((data) => {
        if (!data) {
          return Effect.fail(new AlbumNotFound(id));
        }

        const album = Album.fromState({
          id: AlbumIdSchema.parse(data.id),
          imageUrl: data.imageUrl,
          title: data.title,
          tracks: data.tracks.map((track) => TrackIdSchema.parse(track.id)),
        });

        const tracks = data.tracks.map((trackData) =>
          Track.fromState({
            duration: trackData.duration,
            id: TrackIdSchema.parse(trackData.id),
            title: trackData.title,
          })
        );

        return Effect.succeed(AlbumAggregate.create(album, tracks));
      })
    );
  }

  save(album: Album): Effect.Effect<void> {
    const state = album.toState();

    return Effect.promise(() =>
      this.prisma.album.upsert({
        where: { id: state.id },
        create: {
          id: state.id,
          imageUrl: state.imageUrl,
          title: state.title,
        },
        update: {
          imageUrl: state.imageUrl,
          title: state.title,
        },
      })
    );
  }
}
