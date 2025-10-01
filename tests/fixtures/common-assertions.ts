import { expect } from "vitest";
import { Exit } from "effect";
import { Entity } from "@/server/domain/shared/Entity";
import { Track, TrackState } from "@/server/domain/player/entities/Track";
import { Chance } from "chance";
import { Player } from "@/server/domain/player/entities/Player";

const chance = new Chance();

function shouldSucceed<T, E>(exit: Exit.Exit<T, E>): T {
  if (!Exit.isSuccess(exit)) {
    expect(Exit.isSuccess(exit)).toBe(true);
    throw new Error("Exit should be success");
  }

  return exit.value;
}

function shouldFailWithErrorTag<T, E extends { _tag: string }>(
  exit: Exit.Exit<T, E>,
  expectedTag: string
): void {
  if (!Exit.isFailure(exit)) {
    expect(Exit.isFailure(exit)).toBe(true);
    return;
  }

  const cause = exit.cause;
  if (cause._tag !== "Fail") {
    expect(cause._tag).toBe("Fail");
    return;
  }

  expect(cause.error._tag).toBe(expectedTag);
}

function shouldBeTrue(value: boolean): void {
  expect(value).toBe(true);
}

function shouldBeFalse(value: boolean): void {
  expect(value).toBe(false);
}

function shouldBeSameEntity<TState extends { id: unknown }>(
  value: Entity<TState>,
  expected: Entity<TState>
): void {
  expect(value?.equals(expected)).toBe(true);
}

function shouldBeNotNull<T>(value: T | null): T {
  if (value === null) {
    expect(value).not.toBeNull();
    throw new Error("Value should not be null");
  }

  return value;
}

function shouldBeNull<T>(value: T | null): void {
  expect(value).toBeNull();
}

export function createCommonFixtures() {
  return {
    given: {
      createPlayer: (): Player => Player.create(),
      createTrack: (props: Partial<TrackState> = {}): Track =>
        Track.create({
          duration: props.duration ?? chance.integer({ min: 5, max: 1_000 }),
          title: props.title ?? chance.sentence(),
          ...props,
        }),
    },
    when: {},
    then: {
      shouldBeFalse,
      shouldBeNotNull,
      shouldBeNull,
      shouldBeSameEntity,
      shouldBeTrue,
      shouldFailWithErrorTag,
      shouldSucceed,
    },
  };
}
