import { Track, TrackId } from "../entities/Track";
import { Dependencies } from "@/server/infrastructure/container/ServiceContainer";

export class GetTrackUseCase {
  constructor(private readonly deps: Dependencies) {}

  async execute(id: TrackId): Promise<Track | null> {
    return await this.deps.trackRepository.findById(id);
  }
}
