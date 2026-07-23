import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashOTP = async (otp) => {
  return bcrypt.hash(otp, SALT_ROUNDS);
};

export const compareOTP = async (otp, hashedOTP) => {
  return bcrypt.compare(otp, hashedOTP);
};