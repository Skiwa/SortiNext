import { Track } from "@/server/domain/player/entities/Track";
import { TrackDto } from "../dto/TrackDto";

export class TrackDtoMapper {
  static fromEntity(track: Track): TrackDto {
    const duration = track.getDuration();
    return {
      id: track.getId(),
      title: track.getTitle(),
      duration,
      durationFormatted: TrackDtoMapper.formatDuration(duration),
    };
  }

  private static formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
}
