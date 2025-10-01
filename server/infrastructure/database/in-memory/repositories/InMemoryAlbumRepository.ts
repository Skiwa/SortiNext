import { Album, AlbumId } from "../../../../domain/player/entities/Album";
import { AlbumRepository } from "../../../../domain/player/repositories/AlbumRepository";
import { AlbumNotFound } from "@/server/domain/player/errors/AlbumNotFound";
import { Effect } from "effect";

export class InMemoryAlbumRepository implements AlbumRepository {
  private albums: Map<AlbumId, Album> = new Map();

  findById(id: AlbumId): Effect.Effect<Album, AlbumNotFound> {
    const album = this.albums.get(id);
    if (!album) {
      return Effect.fail(new AlbumNotFound(id));
    }
    return Effect.succeed(album);
  }

  save(album: Album): Effect.Effect<void> {
    this.albums.set(album.getId(), album);
    return Effect.void;
  }
}
