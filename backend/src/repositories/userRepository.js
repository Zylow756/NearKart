import User from "../models/User.js";

const findByMobile = (mobileNumber) =>
  User.findOne({ mobileNumber });

const createUser = (userData) =>
  User.create(userData);

const updateUser = (id, data) =>
  User.findByIdAndUpdate(id, data, {
    new: true,
  });

export default {
  findByMobile,
  createUser,
  updateUser,
};