import userRepository from "../repositories/userRepository.js";

const findUserByMobile = async (mobileNumber) => {
  return await userRepository.findByMobile(mobileNumber);
};

export default {
  findUserByMobile,
};