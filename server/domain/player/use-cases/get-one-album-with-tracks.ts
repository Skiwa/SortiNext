import { AlbumId } from "../entities/Album";
import { AlbumRepository } from "../repositories/AlbumRepository";
import { AlbumNotFound } from "../errors/AlbumNotFound";
import { Effect } from "effect";
import { AlbumAggregate } from "../aggregates/AlbumAggregate";

export class GetOneAlbumWithTracksUseCase {
  constructor(private dependencies: { albumRepository: AlbumRepository }) {}

  execute(id: AlbumId): Effect.Effect<AlbumAggregate, AlbumNotFound> {
    return this.dependencies.albumRepository.findByIdWithTracks(id);
  }
}
