require('dotenv').config();
const { createCustomError } = require('../../lib/customError');
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');

const refreshHandler = async (req, res, next) => {
  const token = req.cookies?.jwt;
  if (!token) return next(createCustomError('invalid token', 401));
  console.log(token);

  const foundUser = await User.findOne({ refreshToken: token });
  if (!foundUser || Object.keys(foundUser).length === 0) return next(createCustomError('invalid token', 401));
  jwt.verify(token, process.env.SECRET_REFRESH_TOKEN, async (err, decoded) => {
    if (err || decoded.email !== foundUser.email)
      return next(createCustomError('invalid Token', 403));
    const accessToken = jwt.sign(
      { email: foundUser.email },
      process.env.SECRET_TOKEN,
      { expiresIn: '10m' }
    );
    res.status(200).json({ token: accessToken });
  });
};

module.exports = refreshHandler;
