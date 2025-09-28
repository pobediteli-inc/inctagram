import { decoderJWT, tokenExpiration } from "common/utils/decoder";

const createFakeJWT = (payload: object): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(JSON.stringify(payload));
  const signature = "signature";
  return `${header}.${body}.${signature}`;
};

test("should decode a valid JWT", () => {
  const exp = Math.floor(Date.now() / 1000) + 3600;
  const token = createFakeJWT({ exp });

  const result = decoderJWT(token);
  expect(result).toHaveProperty("exp", exp);
});

test("should return null for invalid JWT", () => {
  const result = decoderJWT("invalid.token");
  expect(result).toBeNull();
});

test("should return true if token is already expired", () => {
  const exp = Math.floor(Date.now() / 1000) - 10; // token expired 10 sec ago
  const token = createFakeJWT({ exp });

  expect(tokenExpiration(token)).toBe(true);
});

test("should return true if token expires within buffer", () => {
  const exp = Math.floor(Date.now() / 1000) + 30; // should be expired after 30 sec
  const token = createFakeJWT({ exp });

  expect(tokenExpiration(token)).toBe(true);
});

test("should return false if token is still valid", () => {
  const exp = Math.floor(Date.now() / 1000) + 120; // should be expired after 2 min
  const token = createFakeJWT({ exp });

  expect(tokenExpiration(token)).toBe(false);
});

test("should return true if token has no exp", () => {
  const token = createFakeJWT({ name: "fakeJWTToken" });

  expect(tokenExpiration(token)).toBe(true);
});
