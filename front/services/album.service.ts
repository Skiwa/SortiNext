import { AlbumWithTracksDto } from "@/app/api/dto/AlbumWithTracksDto";

export class AlbumService {
  private readonly baseUrl: string;

  constructor(
    baseUrl: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  ) {
    this.baseUrl = baseUrl;
  }

  async getAlbumWithTracks(
    albumId: string
  ): Promise<AlbumWithTracksDto | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/albums/${albumId}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la récupération de l'album:", error);
      return null;
    }
  }
}
