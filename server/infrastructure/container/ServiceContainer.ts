import { PlayerRepository } from "../../domain/player/repositories/PlayerRepository";
import { TrackRepository } from "../../domain/player/repositories/TrackRepository";
import { GetPlayerUseCase } from "../../domain/player/use-cases/GetPlayerUseCase";
import { GetTrackUseCase } from "../../domain/player/use-cases/GetTrackUseCase";
import { ProdContainer } from "./ProdContainer";

export interface Container {
  buildDependencies(): Dependencies;
  dispose(): Promise<void>;
}

export type Dependencies = {
  playerRepository: PlayerRepository;
  trackRepository: TrackRepository;
};

export type UseCases = {
  getPlayerUseCase: GetPlayerUseCase;
  getTrackUseCase: GetTrackUseCase;
};

export class ServiceContainer {
  private static instance: ServiceContainer;
  private dependencies: Dependencies;
  private useCases: UseCases;

  private constructor() {
    const prodContainer = new ProdContainer();
    this.dependencies = prodContainer.buildDependencies();
    this.useCases = this.buildUseCases(this.dependencies);
  }

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  buildUseCases(dependencies: Dependencies): UseCases {
    return {
      getPlayerUseCase: new GetPlayerUseCase(dependencies),
      getTrackUseCase: new GetTrackUseCase(dependencies),
    };
  }
}
