import { add } from "./math";

describe("add", () => {
  test("should add two numbers together", () => {
    expect(add(1, 2)).toBe(3);
  });

  test("should add three numbers together", () => {
    expect(add(1, 2, 3)).toBe(6);
  });
});
