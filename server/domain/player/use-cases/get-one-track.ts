import { Track, TrackId } from "../entities/Track";
import { Dependencies } from "@/server/infrastructure/container/ServiceContainer";
import { Effect } from "effect";

export class GetOneTrack {
  constructor(private readonly deps: Dependencies) {}

  execute(id: TrackId): Effect.Effect<Track | null> {
    return this.deps.trackRepository.findById(id);
  }
}
