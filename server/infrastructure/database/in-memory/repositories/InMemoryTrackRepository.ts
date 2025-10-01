import { Effect } from "effect";
import {
  Track,
  TrackId,
  TrackState,
} from "../../../../domain/player/entities/Track";
import { TrackRepository } from "../../../../domain/player/repositories/TrackRepository";

export class InMemoryTrackRepository implements TrackRepository {
  private collection: Map<string, TrackState> = new Map();
  constructor() {}

  findById(id: TrackId): Effect.Effect<Track | null> {
    const trackData = this.collection.get(id);

    if (!trackData) {
      return Effect.succeed(null);
    }

    const track = Track.fromState(trackData);
    return Effect.succeed(track);
  }

  save(track: Track): Effect.Effect<void> {
    this.collection.set(track.getId(), track.toState());
    return Effect.succeed(undefined);
  }
}
