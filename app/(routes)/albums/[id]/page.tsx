import { AlbumService } from "@/front/services/album.service";
import { AlbumTemplate } from "@/front/components/templates/AlbumTemplate";
import { AlbumNotFoundTemplate } from "@/front/components/templates/AlbumNotFoundTemplate";

export default async function AlbumPage({
  params,
}: {
  params: { id: string };
}) {
  const albumService = new AlbumService();
  const album = await albumService.getAlbumWithTracks(params.id);

  if (!album) {
    return <AlbumNotFoundTemplate albumId={params.id} />;
  }

  return <AlbumTemplate album={album} />;
}
