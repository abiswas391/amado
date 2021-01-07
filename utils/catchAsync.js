const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(err);
    });
  };
};

module.exports = catchAsync;

/**
 * catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    data: {
      result: users.length,
      status: 'success',
      users
    }
  });
});
 * 
 const getUser = (req, res, next) => {

 }
 */
