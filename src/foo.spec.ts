import { mocked } from "ts-jest/utils";
import { add } from "./foo";

test("should return Ronald", () => {
  expect(add(2, 3)).toBe(5);
  expect(add("2", 3)).toBe("23");
});
