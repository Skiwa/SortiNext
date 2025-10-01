import { PrismaClient } from "../PrismaClient";
import {
  Album,
  AlbumId,
  AlbumIdSchema,
} from "../../../../domain/player/entities/Album";
import { AlbumRepository } from "../../../../domain/player/repositories/AlbumRepository";
import { AlbumNotFound } from "@/server/domain/player/errors/AlbumNotFound";
import { Effect, pipe } from "effect";
import { TrackIdSchema } from "@/server/domain/player/entities/Track";

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
            title: album.title,
            tracks: album.tracks.map((track) => TrackIdSchema.parse(track)),
            imageUrl: album.imageUrl || undefined,
          })
        );
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
          title: state.title,
          tracks: state.tracks,
          imageUrl: state.imageUrl,
        },
        update: {
          title: state.title,
          tracks: state.tracks,
          imageUrl: state.imageUrl,
        },
      })
    );
  }
}
