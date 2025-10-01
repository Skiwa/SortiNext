import { describe, it, beforeEach } from "vitest";
import { Effect, Exit } from "effect";
import { GetOnePlayer } from "./get-one-player";
import { createPlayerId, Player, PlayerId } from "../entities/Player";
import { createCommonFixtures } from "../../../../tests/fixtures/common-assertions";
import { getInMemoryDependencies } from "@/tests/in-memory-dependencies";
import { PlayerNotFound } from "../errors/PlayerNotFound";

describe("Feature: GetOnePlayer", () => {
  let fixture: ReturnType<typeof createFixtures>;

  beforeEach(() => {
    fixture = createFixtures();
  });

  describe("Scenario: Getting a player by ID", () => {
    it("Given existing player ID, When getting player, Then should return player", async () => {
      const player = fixture.given.player();
      await fixture.given.savedPlayer(player);

      const exit = await fixture.when.execute(player.getId());

      const resultOrNull = fixture.then.shouldSucceed(exit);
      const result = fixture.then.shouldBeNotNull(resultOrNull);
      fixture.then.shouldBeSameEntity(result, player);
    });

    it("Given non-existing player ID, When getting player, Then should return PlayerNotFound", async () => {
      const playerId = createPlayerId();
      const exit = await fixture.when.execute(playerId);

      fixture.then.shouldFailWithErrorTag(exit, "PlayerNotFound");
    });
  });
});

function createFixtures() {
  const commonFixtures = createCommonFixtures();
  const deps = getInMemoryDependencies();

  const service = new GetOnePlayer(deps);

  return {
    given: {
      ...commonFixtures.given,
      player: (): Player => Player.create(),
      savedPlayer: async (player: Player): Promise<void> => {
        return Effect.runPromise(deps.playerRepository.save(player));
      },
    },
    when: {
      ...commonFixtures.when,
      execute: async (
        playerId: PlayerId
      ): Promise<Exit.Exit<Player, PlayerNotFound>> => {
        return Effect.runPromiseExit(service.execute(playerId));
      },
    },
    then: {
      ...commonFixtures.then,
    },
  };
}
