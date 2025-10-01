import { describe, it, expect, beforeEach } from "vitest";
import { Effect, Exit } from "effect";
import { PlaybackPosition, PlaybackPositionError } from "./PlaybackPosition";
import { createCommonFixtures } from "../../../../tests/fixtures/common-assertions";

describe("Feature: PlaybackPosition", () => {
  let fixture: ReturnType<typeof createFixtures>;

  beforeEach(() => {
    fixture = createFixtures();
  });

  describe("Scenario: Creating a playback position", () => {
    it("Given valid seconds, When creating position, Then should succeed", async () => {
      const seconds = 42;

      const exit = await fixture.when.createPosition(seconds);

      const playbackPosition = fixture.then.shouldSucceed(exit);
      fixture.then.shouldHaveSeconds(playbackPosition, seconds);
    });

    it("Given negative seconds, When creating position, Then should fail", async () => {
      const seconds = -1;

      const exit = await fixture.when.createPosition(seconds);

      fixture.then.shouldFailWithErrorTag(exit, "PlaybackPositionError");
    });

    it("Given zero seconds, When creating position, Then should succeed", async () => {
      const seconds = 0;

      const exit = await fixture.when.createPosition(seconds);

      const playbackPosition = fixture.then.shouldSucceed(exit);
      fixture.then.shouldHaveSeconds(playbackPosition, 0);
    });
  });

  describe("Scenario: Creating a position at zero", () => {
    it("Given no input, When creating at zero, Then should have zero value", async () => {
      const exit = await fixture.when.createPositionAtZero();

      const playbackPosition = fixture.then.shouldSucceed(exit);
      fixture.then.shouldHaveSeconds(playbackPosition, 0);
    });
  });
});

function createFixtures() {
  const commonFixtures = createCommonFixtures();

  return {
    given: {
      ...commonFixtures.given,
    },
    when: {
      ...commonFixtures.when,
      createPosition: async (
        seconds: number
      ): Promise<Exit.Exit<PlaybackPosition, PlaybackPositionError>> => {
        return Effect.runPromiseExit(PlaybackPosition.create(seconds));
      },
      createPositionAtZero: async (): Promise<
        Exit.Exit<PlaybackPosition, never>
      > => {
        return Effect.runPromiseExit(
          Effect.succeed(PlaybackPosition.createAtZero())
        );
      },
    },
    then: {
      ...commonFixtures.then,
      shouldHaveSeconds: (
        playbackPosition: PlaybackPosition,
        expected: number
      ) => {
        expect(playbackPosition.getSeconds()).toBe(expected);
      },
    },
  };
}
