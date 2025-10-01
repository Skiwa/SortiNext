import { AlbumWithTracksDto } from "@/app/api/dto/AlbumWithTracksDto";

interface AlbumDetailsProps {
  album: AlbumWithTracksDto;
}

export function AlbumDetails({ album }: AlbumDetailsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3">
        <img
          src={album.imageUrl}
          alt={album.title}
          className="w-full rounded-lg shadow-2xl"
        />
      </div>
      <div className="md:w-2/3">
        <h1 className="text-4xl font-bold mb-4">{album.title}</h1>
        <p className="text-xl text-gray-300 mb-4">
          {album.trackCount} pistes • {Math.floor(album.totalDuration / 60)}:
          {(album.totalDuration % 60).toString().padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
