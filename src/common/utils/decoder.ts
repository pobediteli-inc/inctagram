/**
 * Decodes a JSON Web Token (JWT) to extract its payload.
 *
 * This function takes a JWT as a string input, decodes its payload segment,
 * and attempts to return it as a parsed JSON object. If the token structure
 * is invalid or decoding fails, it returns `null`.
 *
 * @param {string} token - The JSON Web Token (JWT) as a string.
 * @returns {object|null} The decoded payload as a JavaScript object, or `null` if decoding fails.
 */
export const decoderJWT = (token: string): Props | null => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};
/**
 * Determines whether a token has expired or is about to expire within the specified buffer time.
 *
 * This function decodes a provided JWT token to check its expiration time. The `exp` property
 * from the decoded token is used to compare against the current time, accounting for an optional
 * buffer period. If the token does not have a valid expiration time or has already expired
 * (including the buffer), the function returns `true`. Otherwise, it returns `false`.
 *
 * @param {string} token - The JSON Web Token (JWT) to be evaluated for expiry.
 * @param {number} [bufferSeconds=60] - The buffer time in seconds to be added to the current time
 * before checking against the token's expiration. Default is 60 seconds.
 * @returns {boolean} - Returns `true` if the token is expired or is about to expire within the buffer period,
 * otherwise `false`.
 */
export const tokenExpiration = (token: string, bufferSeconds: number = 60): boolean => {
  const decoded = decoderJWT(token);
  if (!decoded || !("exp" in decoded)) return true;

  return decoded.exp * 1000 < Date.now() + bufferSeconds * 1000;
};

type Props = {
  exp: number;
};
