import { z } from "zod";
import { Entity } from "../../shared/Entity";

export const TrackIdSchema = z.uuid().brand("TrackId");
const createTrackId = () => TrackIdSchema.parse(crypto.randomUUID());

const TrackStateSchema = z.object({
  duration: z.number().positive(),
  id: TrackIdSchema,
  title: z.string().min(1),
});

export type TrackId = z.infer<typeof TrackIdSchema>;
export type TrackState = z.infer<typeof TrackStateSchema>;

type CreateParams = Omit<TrackState, "id">;

export class Track extends Entity<TrackState> {
  private constructor(state: TrackState) {
    super(TrackStateSchema.parse(state));
  }

  static create(params: CreateParams): Track {
    const state: TrackState = {
      ...params,
      id: createTrackId(),
    };
    return new Track(state);
  }

  static fromState(state: TrackState): Track {
    return new Track(state);
  }
}
