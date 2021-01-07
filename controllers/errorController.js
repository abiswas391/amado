module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';
  const { message } = err;

  return res.status(err.statusCode).json({
    status: err.status,
    msg: message,
    errorName: err.name,
    stack: err.stack
  });
};
