import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashToken = async (token) => {
  return bcrypt.hash(token, SALT_ROUNDS);
};

export const compareToken = async (token, hash) => {
  return bcrypt.compare(token, hash);
};