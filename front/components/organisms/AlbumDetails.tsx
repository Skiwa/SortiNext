import { AlbumWithTracksDto } from "@/app/api/dto/AlbumWithTracksDto";
import { AlbumHeader } from "../molecules/AlbumHeader";
import { AlbumTracks } from "../molecules/AlbumTracks";

interface AlbumDetailsProps {
  album: AlbumWithTracksDto;
}

export function AlbumDetails({ album }: AlbumDetailsProps) {
  return (
    <div className="flex flex-col flex-1">
      <AlbumHeader
        artist="Jacques"
        imageUrl={album.imageUrl}
        title={album.title}
        totalDuration={album.totalDuration}
        trackCount={album.trackCount}
        year="2015"
      />
      <AlbumTracks tracks={album.tracks} />
    </div>
  );
}
