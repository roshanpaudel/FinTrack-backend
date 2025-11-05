import jwt from "jsonwebtoken";
// ---------------------------------------------------
// 🔐 Token Generators
// ---------------------------------------------------

/**
 * Generates a short-lived Access Token (used for authorization)
 * - Payload: user's email
 * - Expires in: 15 minutes
 */
const createAccessJWT = (email) =>
  jwt.sign({ email }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: "15m",
  });

/**
 * Generates a long-lived Refresh Token (used to get new Access Token)
 * - Payload: user's email
 * - Expires in: 180 days (~6 months)
 */
const createRefreshJWT = (email) =>
  jwt.sign({ email }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "180d",
  });

export { createAccessJWT, createRefreshJWT };
