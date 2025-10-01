import { Track, TrackId } from "../entities/Track";
import { Effect } from "effect";
import { TrackNotFound } from "../errors/TrackNotFound";

export interface TrackRepository {
  findById(id: TrackId): Effect.Effect<Track, TrackNotFound>;
  save(track: Track): Effect.Effect<void>;
}
