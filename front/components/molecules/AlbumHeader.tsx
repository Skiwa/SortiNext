interface AlbumHeaderProps {
  artist: string;
  imageUrl: string;
  title: string;
  totalDuration: number;
  trackCount: number;
  year: string;
}

export function AlbumHeader({
  imageUrl,
  title,
  artist,
  year,
  trackCount,
  totalDuration,
}: AlbumHeaderProps) {
  const imageSize = 218;

  return (
    <div>
      <div>
        <img
          alt={title}
          style={{
            height: imageSize,
            width: imageSize,
          }}
          src={"https://placehold.co/400x400/png"}
        />
      </div>

      <div>
        <h1>{title}</h1>
        <p>
          {year} • {trackCount} songs, {totalDuration}
        </p>
      </div>
    </div>
  );
}
