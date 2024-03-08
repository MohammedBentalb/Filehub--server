const { CustomError } = require('../lib/customError');

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  if (err instanceof CustomError)
    return res.status(err.statusCode).json({ message: err.message });

  return res.status(500).json({ message: 'Something went Wrong , try again later' });
};

module.exports = errorHandlerMiddleware;
