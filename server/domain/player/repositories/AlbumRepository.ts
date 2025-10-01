import { Album, AlbumId } from "../entities/Album";
import { Effect } from "effect";
import { AlbumNotFound } from "../errors/AlbumNotFound";

export interface AlbumRepository {
  findById(id: AlbumId): Effect.Effect<Album, AlbumNotFound>;
  save(album: Album): Effect.Effect<void>;
}
