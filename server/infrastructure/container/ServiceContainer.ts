import { PlayerRepository } from "../../domain/player/repositories/PlayerRepository";
import { TrackRepository } from "../../domain/player/repositories/TrackRepository";
import { AlbumRepository } from "../../domain/player/repositories/AlbumRepository";
import { GetOnePlayer } from "../../domain/player/use-cases/get-one-player";
import { GetOneTrack } from "../../domain/player/use-cases/get-one-track";
import { ProdContainer } from "./ProdContainer";

export interface Container {
  buildDependencies(): Dependencies;
  dispose(): Promise<void>;
}

export type Dependencies = {
  albumRepository: AlbumRepository;
  playerRepository: PlayerRepository;
  trackRepository: TrackRepository;
};

export type UseCases = {
  getPlayerUseCase: GetOnePlayer;
  getTrackUseCase: GetOneTrack;
};

export class ServiceContainer {
  private static instance: ServiceContainer;
  private dependencies: Dependencies;
  public useCases: UseCases;

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

  private buildUseCases(dependencies: Dependencies): UseCases {
    return {
      getPlayerUseCase: new GetOnePlayer(dependencies),
      getTrackUseCase: new GetOneTrack(dependencies),
    };
  }
}
