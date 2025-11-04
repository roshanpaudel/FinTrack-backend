import jwt from "jsonwebtoken";

export const createAccessJWT = (email) => {
  const accessToken = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
};

export const createRefreshJWT = (email) => {
  const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return refreshToken;
};
