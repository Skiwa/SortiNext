import { InMemoryPlayerRepository } from "../database/in-memory/repositories/InMemoryPlayerRepository";
import { InMemoryTrackRepository } from "../database/in-memory/repositories/InMemoryTrackRepository";
import { Container, Dependencies } from "./ServiceContainer";

export class TestContainer implements Container {
  constructor() {}

  buildDependencies(): Dependencies {
    return {
      playerRepository: new InMemoryPlayerRepository(),
      trackRepository: new InMemoryTrackRepository(),
    };
  }

  async dispose(): Promise<void> {}
}
