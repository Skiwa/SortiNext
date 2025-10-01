import {
  Track,
  TrackId,
  TrackIdSchema,
} from "../../../../domain/player/entities/Track";
import { TrackRepository } from "../../../../domain/player/repositories/TrackRepository";
import { PrismaClient } from "../PrismaClient";

export class PrismaTrackRepository implements TrackRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: TrackId): Promise<Track | null> {
    const trackData = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!trackData) {
      return null;
    }

    return Track.fromState({
      duration: trackData.duration,
      id: TrackIdSchema.parse(trackData.id),
      title: trackData.title,
    });
  }
}
