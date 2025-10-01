import { Track, TrackId } from "../entities/Track";
import { Effect } from "effect";

export interface TrackRepository {
  findById(id: TrackId): Effect.Effect<Track | null>;
  save(track: Track): Effect.Effect<void>;
}
