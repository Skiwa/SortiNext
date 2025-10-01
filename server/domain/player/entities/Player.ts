import { z } from "zod";
import { Entity } from "../../shared/Entity";
import { TrackIdSchema } from "./Track";
import {
  PlaybackPosition,
  PlaybackPositionSchema,
} from "../value-objects/PlaybackPosition";

const PlayerIdSchema = z.uuid().brand("PlayerId");
const createPlayerId = () => PlayerIdSchema.parse(crypto.randomUUID());

const PlayerStateSchema = z.object({
  currentTrackId: TrackIdSchema.nullable(),
  id: PlayerIdSchema,
  playbackPosition: PlaybackPositionSchema,
});

export type PlayerId = z.infer<typeof PlayerIdSchema>;
export type PlayerState = z.infer<typeof PlayerStateSchema>;

export class Player extends Entity<PlayerState> {
  private constructor(state: PlayerState) {
    super(PlayerStateSchema.parse(state));
  }

  static create(): Player {
    const state: PlayerState = {
      currentTrackId: null,
      id: createPlayerId(),
      playbackPosition: PlaybackPosition.createAtZero().getValue(),
    };
    return new Player(state);
  }

  static fromState(state: PlayerState): Player {
    return new Player(state);
  }

  play(trackId: z.infer<typeof TrackIdSchema>): void {
    this.setState({
      currentTrackId: trackId,
      playbackPosition: PlaybackPosition.createAtZero().getValue(),
    });
  }

  getCurrentTrackId(): z.infer<typeof TrackIdSchema> | null {
    return this.state.currentTrackId;
  }

  getPlaybackPosition(): number {
    return this.state.playbackPosition;
  }

  setPlaybackPosition(playbackPosition: PlaybackPosition): void {
    this.setState({
      playbackPosition: playbackPosition.getValue(),
    });
  }
}
