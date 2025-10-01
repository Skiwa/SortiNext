import { Dependencies } from "@/server/infrastructure/container/ServiceContainer";
import { InMemoryPlayerRepository } from "@/server/infrastructure/database/in-memory/repositories/InMemoryPlayerRepository";
import { InMemoryTrackRepository } from "@/server/infrastructure/database/in-memory/repositories/InMemoryTrackRepository";

export const getInMemoryDependencies = (): Dependencies => {
  return {
    playerRepository: new InMemoryPlayerRepository(),
    trackRepository: new InMemoryTrackRepository(),
  };
};
