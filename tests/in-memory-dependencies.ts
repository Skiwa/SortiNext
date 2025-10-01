import { Dependencies } from "@/server/infrastructure/container/ServiceContainer";
import { InMemoryPlayerRepository } from "@/server/infrastructure/database/in-memory/repositories/InMemoryPlayerRepository";
import { InMemoryTrackRepository } from "@/server/infrastructure/database/in-memory/repositories/InMemoryTrackRepository";
import { InMemoryAlbumRepository } from "@/server/infrastructure/database/in-memory/repositories/InMemoryAlbumRepository";

export const getInMemoryDependencies = (): Dependencies => {
  return {
    albumRepository: new InMemoryAlbumRepository(),
    playerRepository: new InMemoryPlayerRepository(),
    trackRepository: new InMemoryTrackRepository(),
  };
};
