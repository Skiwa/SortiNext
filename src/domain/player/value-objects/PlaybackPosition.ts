import { z } from "zod";
import { ValueObject } from "../../shared/ValueObject";

export const PlaybackPositionSchema = z.number().min(0);

export class PlaybackPosition extends ValueObject<number> {
  private constructor(value: number) {
    super(PlaybackPositionSchema.parse(value));
  }

  static create(seconds: number): PlaybackPosition {
    return new PlaybackPosition(seconds);
  }

  static createAtZero(): PlaybackPosition {
    return new PlaybackPosition(0);
  }

  getSeconds(): number {
    return this.value;
  }
}
