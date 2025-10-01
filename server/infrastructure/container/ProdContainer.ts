import { PrismaClient } from "../database/prisma/PrismaClient";
import { PrismaPlayerRepository } from "../database/prisma/repositories/PrismaPlayerRepository";
import { PrismaTrackRepository } from "../database/prisma/repositories/PrismaTrackRepository";
import { Container, Dependencies } from "./ServiceContainer";

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
