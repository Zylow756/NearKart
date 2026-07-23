import jwt from "jsonwebtoken";

const signToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

export const generateAccessToken = (payload) =>
  signToken(
    payload,
    process.env.JWT_ACCESS_SECRET,
    process.env.JWT_ACCESS_EXPIRES_IN
  );

export const generateRefreshToken = (payload) =>
  signToken(
    payload,
    process.env.JWT_REFRESH_SECRET,
    process.env.JWT_REFRESH_EXPIRES_IN
  );

export const verifyAccessToken = (token) =>
  verifyToken(token, process.env.JWT_ACCESS_SECRET);

export const verifyRefreshToken = (token) =>
  verifyToken(token, process.env.JWT_REFRESH_SECRET);