import { describe, it, beforeEach } from "vitest";
import { Effect, Exit } from "effect";
import { GetOneTrack } from "./get-one-track";
import { createTrackId, Track, TrackId } from "../entities/Track";
import { createCommonFixtures } from "../../../../tests/fixtures/common-assertions";
import { getInMemoryDependencies } from "@/tests/in-memory-dependencies";

describe("Feature: GetOneTrack", () => {
  let fixture: ReturnType<typeof createFixtures>;

  beforeEach(() => {
    fixture = createFixtures();
  });

  describe("Scenario: Getting a track by ID", () => {
    it("Given existing track ID, When getting track, Then should return track", async () => {
      const track = fixture.given.track();
      await fixture.given.savedTrack(track);

      const exit = await fixture.when.execute(track.getId());

      const resultOrNull = fixture.then.shouldSucceed(exit);
      const result = fixture.then.shouldBeNotNull(resultOrNull);
      fixture.then.shouldBeSameEntity(result, track);
    });

    it("Given non-existing track ID, When getting track, Then should return null", async () => {
      const trackId = createTrackId();
      const exit = await fixture.when.execute(trackId);

      const result = fixture.then.shouldSucceed(exit);
      fixture.then.shouldBeNull(result);
    });
  });
});

function createFixtures() {
  const commonFixtures = createCommonFixtures();
  const deps = getInMemoryDependencies();

  const service = new GetOneTrack(deps);

  return {
    given: {
      ...commonFixtures.given,
      track: (): Track => commonFixtures.given.createTrack({}),
      savedTrack: async (track: Track): Promise<void> => {
        return Effect.runPromise(deps.trackRepository.save(track));
      },
    },
    when: {
      ...commonFixtures.when,
      execute: async (trackId: TrackId): Promise<Exit.Exit<Track | null>> => {
        return Effect.runPromiseExit(service.execute(trackId));
      },
    },
    then: {
      ...commonFixtures.then,
    },
  };
}
