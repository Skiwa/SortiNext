interface AlbumNotFoundTemplateProps {
  albumId: string;
}

export function AlbumNotFoundTemplate({ albumId }: AlbumNotFoundTemplateProps) {
  return (
    <div className="min-h-screen">
      <div>
        <h1>Album non trouvé</h1>
        <p>L'album avec l'ID {albumId} n'existe pas.</p>
      </div>
    </div>
  );
}
