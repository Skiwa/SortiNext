import { PrismaClient } from "../database/prisma/PrismaClient";
import { PrismaPlayerRepository } from "../database/prisma/repositories/PrismaPlayerRepository";
import { PrismaTrackRepository } from "../database/prisma/repositories/PrismaTrackRepository";
import { PlayerRepository } from "../../domain/player/repositories/PlayerRepository";
import { TrackRepository } from "../../domain/player/repositories/TrackRepository";
import { Container } from "./ServiceContainer";

export type Dependencies = {
  playerRepository: PlayerRepository;
  trackRepository: TrackRepository;
};

export class ProdContainer implements Container {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaClient.getInstance();
  }

  buildDependencies(): Dependencies {
    return {
      playerRepository: new PrismaPlayerRepository(this.prisma),
      trackRepository: new PrismaTrackRepository(this.prisma),
    };
  }

  async dispose(): Promise<void> {
    await this.prisma.disconnect();
  }
}
