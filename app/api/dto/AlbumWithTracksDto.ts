import { TrackDto } from "./TrackDto";

export interface AlbumWithTracksDto {
  id: string;
  imageUrl: string;
  title: string;
  totalDuration: number;
  trackCount: number;
  tracks: TrackDto[];
}
