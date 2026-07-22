import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

const getUser = asyncHandler(async (req, res) => {
  return res.json(
    new ApiResponse(
      200,
      "User module working"
    )
  );
});

export { getUser };