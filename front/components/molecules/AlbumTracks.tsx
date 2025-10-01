import { TrackDto } from "@/app/api/dto/TrackDto";
import { AlbumTrack } from "../atoms/AlbumTrack";

type AlbumTracksProps = {
  tracks: TrackDto[];
};

export function AlbumTracks({ tracks }: AlbumTracksProps) {
  return (
    <div>
      {tracks.map((track) => (
        <AlbumTrack key={track.id} track={track} />
      ))}
    </div>
  );
}
