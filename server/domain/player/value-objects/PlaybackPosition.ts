import { z } from "zod";
import { Effect } from "effect";
import { ValueObject } from "../../shared/ValueObject";

export const PlaybackPositionSchema = z.number().min(0);

export class PlaybackPositionError {
  readonly _tag = "PlaybackPositionError";
  constructor(readonly message: string) {}
}

export class PlaybackPosition extends ValueObject<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(
    seconds: number
  ): Effect.Effect<PlaybackPosition, PlaybackPositionError> {
    return Effect.try({
      try: () => {
        const validated = PlaybackPositionSchema.parse(seconds);
        return new PlaybackPosition(validated);
      },
      catch: (error) =>
        new PlaybackPositionError(
          error instanceof Error ? error.message : "Invalid playback position"
        ),
    });
  }

  static createAtZero(): PlaybackPosition {
    return new PlaybackPosition(0);
  }

  getSeconds(): number {
    return this.value;
  }
}
