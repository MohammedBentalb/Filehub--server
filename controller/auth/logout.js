require('dotenv').config();
const { createCustomError } = require('../../lib/customError');
const User = require('../../models/Users');

const logoutHandler = async (req, res, next) => {
  const token = req.cookies?.jwt;
  if (!token) return next(createCustomError('', 401));
  const foundUser = await User.findOne({ refreshToken: token });
  if (!foundUser || Object.keys(foundUser) === 0)
    return next('user not found', 404);
  foundUser.refreshToken = '';
  await foundUser.save()
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'Strict', secure: true });
  res.sendStatus(204); //no content
};

module.exports = logoutHandler;
