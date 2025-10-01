import { expect } from "vitest";
import { Exit } from "effect";

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

export function shouldBeTrue(value: boolean): void {
  expect(value).toBe(true);
}

export function shouldBeFalse(value: boolean): void {
  expect(value).toBe(false);
}

export function createCommonFixtures() {
  return {
    given: {},
    when: {},
    then: {
      shouldBeFalse,
      shouldBeTrue,
      shouldFailWithErrorTag,
      shouldSucceed,
    },
  };
}
