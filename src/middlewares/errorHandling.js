const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;
  error.status = err.status || `${error.statusCode}`.startsWith('4') ? 'fail' : 'error';

  console.error('ERROR STACK TRACE:');
  console.error(err);

  if (err.name === 'CastError') {
    error.message = `Invalid ${err.path}: ${err.value}`;
    error.statusCode = 400;
    error.status = 'fail';
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    err.message = `The value in (${field}) unavailable choose another value`;
    err.statusCode = 400;
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors || {}).map((val) => val.message);
    error.message = messages.length ? messages.join(', ') : 'Validation error';
    error.statusCode = 400;
    error.status = 'fail';
  }


  if (err.name === 'JsonWebTokenError') {
    err.message = 'Invalid token, please log in again';
    err.statusCode = 401;
    error.status = 'fail';
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
       error: err,
    stack: err.stack
  });

  if (err.name === 'TokenExpiredError') {
    error.message = 'Token has expired, please log in again';
    error.statusCode = 401;
    error.status = 'fail';
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    error.message = 'Invalid JSON payload in request body';
    error.statusCode = 400;
    error.status = 'fail';
  }

  const response = {
    status: error.status,
    message: error.message || 'Internal server error'
  };
  if (process.env.NODE_ENV === 'development') {
    response.error = err;
    response.stack = err.stack;
  }
  res.status(error.statusCode).json(response);
};

module.exports = errorHandler;