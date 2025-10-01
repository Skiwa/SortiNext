import { Track, TrackId } from "../entities/Track";

export interface TrackRepository {
  findById(id: TrackId): Promise<Track | null>;
}
