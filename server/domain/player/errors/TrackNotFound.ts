import { Data } from "effect";

export class TrackNotFound extends Data.TaggedError("TrackNotFound")<{
  readonly trackId: string;
}> {
  constructor(trackId: string) {
    super({ trackId });
  }
}
