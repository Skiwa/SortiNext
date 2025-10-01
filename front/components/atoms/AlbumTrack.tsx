import { TrackDto } from "@/app/api/dto/TrackDto";
import { formatDuration, intervalToDuration } from "date-fns";

type AlbumTrackProps = {
  track: TrackDto;
};

function formatTrackDuration(seconds: number): string {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  if (duration.hours && duration.hours > 0) {
    return formatDuration(duration, { format: ["hours", "minutes", "seconds"] })
      .replace(" hours", "h")
      .replace(" hour", "h")
      .replace(" minutes", "m")
      .replace(" minute", "m")
      .replace(" seconds", "s")
      .replace(" second", "s")
      .replace(/\s+/g, " ");
  }

  const minutes = duration.minutes || 0;
  const secs = duration.seconds || 0;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export function AlbumTrack({ track }: AlbumTrackProps) {
  return (
    <div>
      {track.title} - {formatTrackDuration(track.duration)}
    </div>
  );
}
