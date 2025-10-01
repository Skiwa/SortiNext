import { Data } from "effect";

export class PlayerNotFound extends Data.TaggedError("PlayerNotFound")<{
  readonly playerId: string;
}> {
  constructor(playerId: string) {
    super({ playerId });
  }
}
