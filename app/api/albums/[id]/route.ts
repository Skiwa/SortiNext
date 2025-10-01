import { NextRequest, NextResponse } from "next/server";
import { ServiceContainer } from "@/server/infrastructure/container/ServiceContainer";
import { AlbumWithTracksDtoMapper } from "@/app/api/mappers/AlbumWithTracksDtoMapper";
import { Effect } from "effect";
import { AlbumIdSchema } from "@/server/domain/player/entities/Album";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const container = ServiceContainer.getInstance();

  const { getAlbumWithTracksUseCase } = container.useCases;

  return Effect.runPromise(
    Effect.Do.pipe(
      Effect.bind("id", () => Effect.succeed(AlbumIdSchema.parse(id))),
      Effect.bind("albumAggregate", ({ id }) =>
        getAlbumWithTracksUseCase.execute(id)
      ),
      Effect.map(({ albumAggregate }) =>
        AlbumWithTracksDtoMapper.fromAggregate(albumAggregate)
      ),
      Effect.catchAll((error) => Effect.succeed({ error: error.message })),
      Effect.map((albumAggregate) => NextResponse.json(albumAggregate))
    )
  );
}
