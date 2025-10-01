import { AlbumWithTracksDto } from "@/app/api/dto/AlbumWithTracksDto";
import { AlbumDetails } from "../organisms/AlbumDetails";

interface AlbumPageTemplateProps {
  album: AlbumWithTracksDto;
}

export function AlbumTemplate({ album }: AlbumPageTemplateProps) {
  return (
    <div>
      <AlbumDetails album={album} />
    </div>
  );
}
