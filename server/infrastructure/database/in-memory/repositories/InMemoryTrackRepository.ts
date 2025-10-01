import { Effect } from "effect";
import {
  Track,
  TrackId,
  TrackState,
} from "../../../../domain/player/entities/Track";
import { TrackRepository } from "../../../../domain/player/repositories/TrackRepository";
import { TrackNotFound } from "@/server/domain/player/errors/TrackNotFound";

export class InMemoryTrackRepository implements TrackRepository {
  private collection: Map<string, TrackState> = new Map();
  constructor() {}

  findById(id: TrackId): Effect.Effect<Track, TrackNotFound> {
    const trackData = this.collection.get(id);

    if (!trackData) {
      return Effect.fail(new TrackNotFound(id));
    }

    const track = Track.fromState(trackData);
    return Effect.succeed(track);
  }

  save(track: Track): Effect.Effect<void> {
    this.collection.set(track.getId(), track.toState());
    return Effect.void;
  }
}
