import { describe, it, expect, beforeEach } from "vitest";
import { PlaybackPosition } from "./PlaybackPosition";

describe("Feature: PlaybackPosition", () => {
  let fixture: ReturnType<typeof createFixtures>;

  beforeEach(() => {
    fixture = createFixtures();
  });

  describe("Scenario: Creating a playback position", () => {
    it("Given valid seconds, When creating position, Then should succeed", () => {
      const seconds = fixture.given.seconds(42);
      const position = fixture.when.createPosition(seconds);
      fixture.then.shouldHaveValue(position, 42);
    });

    it("Given negative seconds, When creating position, Then should fail", () => {
      const seconds = fixture.given.seconds(-1);
      fixture.then.shouldFail(() => fixture.when.createPosition(seconds));
    });

    it("Given zero seconds, When creating position, Then should succeed", () => {
      const seconds = fixture.given.seconds(0);
      const position = fixture.when.createPosition(seconds);
      fixture.then.shouldHaveValue(position, 0);
    });
  });

  describe("Scenario: Creating a position at zero", () => {
    it("Given no input, When creating at zero, Then should have zero value", () => {
      const position = fixture.when.createPositionAtZero();
      fixture.then.shouldHaveValue(position, 0);
    });
  });

  describe("Scenario: Comparing positions", () => {
    it("Given two positions with same value, When comparing, Then should be equal", () => {
      const position1 = fixture.given.positionAt(50);
      const position2 = fixture.given.positionAt(50);
      const areEqual = fixture.when.comparePositions(position1, position2);
      fixture.then.shouldBeTrue(areEqual);
    });

    it("Given two positions with different values, When comparing, Then should not be equal", () => {
      const position1 = fixture.given.positionAt(50);
      const position2 = fixture.given.positionAt(100);
      const areEqual = fixture.when.comparePositions(position1, position2);
      fixture.then.shouldBeFalse(areEqual);
    });
  });
});

function createFixtures() {
  return {
    given: {
      seconds: (value: number) => value,
      positionAt: (seconds: number) => PlaybackPosition.create(seconds),
    },
    when: {
      createPosition: (seconds: number) => PlaybackPosition.create(seconds),
      createPositionAtZero: () => PlaybackPosition.createAtZero(),
      comparePositions: (p1: PlaybackPosition, p2: PlaybackPosition) =>
        p1.equals(p2),
    },
    then: {
      shouldHaveValue: (position: PlaybackPosition, expected: number) => {
        expect(position.getSeconds()).toBe(expected);
      },
      shouldFail: (fn: () => unknown) => {
        expect(fn).toThrow();
      },
      shouldBeTrue: (value: boolean) => {
        expect(value).toBe(true);
      },
      shouldBeFalse: (value: boolean) => {
        expect(value).toBe(false);
      },
    },
  };
}
