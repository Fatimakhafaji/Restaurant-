const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    err.message = `The value in (${field}) unavailable choose another value`;
    err.statusCode = 400;
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};

module.exports = errorHandler;