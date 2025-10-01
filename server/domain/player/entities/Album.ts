import { z } from "zod";
import { Entity } from "../../shared/Entity";
import { TrackId, TrackIdSchema } from "./Track";

export const AlbumIdSchema = z.uuid().brand("AlbumId");
export const createAlbumId = () => AlbumIdSchema.parse(crypto.randomUUID());

const AlbumStateSchema = z.object({
  id: AlbumIdSchema,
  imageUrl: z.url().optional(),
  title: z.string().min(1),
  tracks: TrackIdSchema.array(),
});

export type AlbumId = z.infer<typeof AlbumIdSchema>;
export type AlbumState = z.infer<typeof AlbumStateSchema>;

type CreateParams = Omit<AlbumState, "id">;

export class Album extends Entity<AlbumState> {
  private constructor(state: AlbumState) {
    super(AlbumStateSchema.parse(state));
  }

  static create(params: CreateParams): Album {
    const state: AlbumState = {
      ...params,
      id: createAlbumId(),
    };
    return new Album(state);
  }

  getId(): AlbumId {
    return this.state.id;
  }

  getTitle(): string {
    return this.state.title;
  }

  getTracks(): TrackId[] {
    return [...this.state.tracks];
  }

  getImageUrl(): string | undefined {
    return this.state.imageUrl;
  }

  static fromState(state: AlbumState): Album {
    return new Album(state);
  }
}
