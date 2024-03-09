require('dotenv').config();
const jwt = require('jsonwebtoken');
const { createCustomError } = require('../../lib/customError');
const User = require('../../models/Users');

/*
verifying with cookie in devMode with postMan only for speeding purposes only (not to be user in production)

const verificationHandler = async (req, res, next) => {
  const refreshToken = req.cookies.jwt;
  if (!refreshToken) return next(createCustomError('UnAuthorized', 401));
  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser || Object.keys(foundUser).length === 0)
    return next(createCustomError('User not found', 404));
  jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (err, decoded) => {
    if (err || decoded.email !== foundUser.email)
      return next(createCustomError('UnAuthorized user 1', 401));
    res.author = foundUser;
    next();
  });
}; */

const verificationHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(createCustomError('UnAuthorized', 401));

  const token = authHeader.split(' ')[1]
   jwt.verify(
    token,
    process.env.SECRET_TOKEN,
    async (err, decoded) => {
      if (err) return next(createCustomError('UnAuthorized', 401));
      const foundUser = await User.findOne({ email: decoded.email });
      if ( !foundUser ||
        Object.keys(foundUser).length === 0 ||
        foundUser.email !== decoded.email
      )
        return next(createCustomError('UnAuthorized User', 401));
      res.author = foundUser;
      next();
    }
  ); 
};
module.exports = verificationHandler;
