import jwt from "jsonwebtoken";

// Codex: Verify access tokens on protected routes.
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ message: "Missing access token" });
  }

  jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid access token" });
    }
    // Codex: Attach user context for downstream handlers when needed.
    req.user = { email: decoded.email };
    return next();
  });
};
