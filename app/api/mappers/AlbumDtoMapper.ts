import { Album } from "@/server/domain/player/entities/Album";
import { AlbumDto } from "../dto/AlbumDto";

export class AlbumDtoMapper {
  static fromEntity(album: Album): AlbumDto {
    return {
      id: album.getId(),
      title: album.getTitle(),
      imageUrl: album.getImageUrl()!,
      trackCount: album.getTracks().length,
    };
  }
}
