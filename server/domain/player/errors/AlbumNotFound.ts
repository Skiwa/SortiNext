import { Data } from "effect";

export class AlbumNotFound extends Data.TaggedError("AlbumNotFound")<{
  readonly albumId: string;
}> {
  constructor(albumId: string) {
    super({ albumId });
  }
}
