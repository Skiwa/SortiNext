import { Album, AlbumId } from "../../../../domain/player/entities/Album";
import { Track } from "../../../../domain/player/entities/Track";
import { AlbumAggregate } from "../../../../domain/player/aggregates/AlbumAggregate";
import { AlbumRepository } from "../../../../domain/player/repositories/AlbumRepository";
import { AlbumNotFound } from "@/server/domain/player/errors/AlbumNotFound";
import { Effect } from "effect";

export class InMemoryAlbumRepository implements AlbumRepository {
  private albums: Map<AlbumId, Album> = new Map();
  private tracks: Map<string, Track> = new Map();

  findById(id: AlbumId): Effect.Effect<Album, AlbumNotFound> {
    const album = this.albums.get(id);
    if (!album) {
      return Effect.fail(new AlbumNotFound(id));
    }
    return Effect.succeed(album);
  }

  findByIdWithTracks(
    id: AlbumId
  ): Effect.Effect<AlbumAggregate, AlbumNotFound> {
    const album = this.albums.get(id);
    if (!album) {
      return Effect.fail(new AlbumNotFound(id));
    }

    const albumTracks = Array.from(this.tracks.values()).filter((track) =>
      album.getTracks().includes(track.getId())
    );

    return Effect.succeed(AlbumAggregate.create(album, albumTracks));
  }

  save(album: Album): Effect.Effect<void> {
    this.albums.set(album.getId(), album);
    return Effect.void;
  }
}
