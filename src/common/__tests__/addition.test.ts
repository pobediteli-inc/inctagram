import { addition } from "common/__tests__/addition";

test("addition", () => {
  const result = addition(1, 2);

  expect(result).toBe(3);
})
