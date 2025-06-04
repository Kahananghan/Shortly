export default (err, req, res, next) => {
  console.error("ERROR 💥", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  // If not operational, hide details in production
  if (!err.isOperational) {
    statusCode = 500;
    message = err.message || "Internal Server Error";
  }

  res.status(statusCode).json({
    status: err.status || "error",
    message,
  });
};