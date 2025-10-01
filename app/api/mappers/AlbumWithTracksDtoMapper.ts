import { AlbumAggregate } from "@/server/domain/player/aggregates/AlbumAggregate";
import { AlbumWithTracksDto } from "../dto/AlbumWithTracksDto";
import { TrackDtoMapper } from "./TrackDtoMapper";

export class AlbumWithTracksDtoMapper {
  static fromAggregate(aggregate: AlbumAggregate): AlbumWithTracksDto {
    const album = aggregate.album;
    const totalDuration = aggregate.getTotalDuration();

    return {
      id: album.getId(),
      title: album.getTitle(),
      imageUrl: album.getImageUrl()!,
      trackCount: aggregate.getTrackCount(),
      totalDuration,
      totalDurationFormatted:
        AlbumWithTracksDtoMapper.formatDuration(totalDuration),
      tracks: aggregate.tracks.map((track) => TrackDtoMapper.fromEntity(track)),
    };
  }

  private static formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
}
