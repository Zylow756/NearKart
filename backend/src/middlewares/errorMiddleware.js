import AppError from "../errors/AppError.js";

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.details,
      requestId: req.requestId,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    requestId: req.requestId,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

export default errorMiddleware;