import { Album } from "../entities/Album";
import { Track } from "../entities/Track";

export class AlbumAggregate {
  constructor(public readonly album: Album, public readonly tracks: Track[]) {}

  hasTracks(): boolean {
    return this.tracks.length > 0;
  }

  getTotalDuration(): number {
    return this.tracks.reduce((total, track) => total + track.getDuration(), 0);
  }

  getTrackCount(): number {
    return this.tracks.length;
  }

  static create(album: Album, tracks: Track[]): AlbumAggregate {
    return new AlbumAggregate(album, tracks);
  }
}
