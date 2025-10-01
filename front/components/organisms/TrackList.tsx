import { TrackDto } from "@/app/api/dto/TrackDto";

interface TrackListProps {
  tracks: TrackDto[];
}

export function TrackList({ tracks }: TrackListProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold mb-4">Pistes</h2>
      {tracks.map((track, index) => (
        <div
          key={track.id}
          className="flex justify-between items-center py-2 border-b border-gray-700"
        >
          <div className="flex items-center gap-4">
            <span className="text-gray-400 w-8">{index + 1}</span>
            <span className="text-white">{track.title}</span>
          </div>
          <span className="text-gray-400">
            {Math.floor(track.duration / 60)}:
            {(track.duration % 60).toString().padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>
  );
}
