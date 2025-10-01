interface AlbumNotFoundTemplateProps {
  albumId: string;
}

export function AlbumNotFoundTemplate({ albumId }: AlbumNotFoundTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 text-red-400">
          Album non trouvé
        </h1>
        <p className="text-xl text-gray-300">
          L'album avec l'ID {albumId} n'existe pas.
        </p>
      </div>
    </div>
  );
}
