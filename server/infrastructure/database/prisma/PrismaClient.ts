import { PrismaClient as GeneratedPrismaClient } from "../generated";

export class PrismaClient extends GeneratedPrismaClient {
  private static instance: PrismaClient;

  private constructor() {
    super({
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error"],
    });
  }

  static getInstance(): PrismaClient {
    if (!PrismaClient.instance) {
      PrismaClient.instance = new PrismaClient();
    }
    return PrismaClient.instance;
  }

  async disconnect(): Promise<void> {
    await this.$disconnect();
  }
}
