require('dotenv').config();
const { createCustomError } = require('../../lib/customError');
const { loginSchema } = require('../../Schemas/authSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');

const loginHandler = async (req, res, next) => {
  const { email, password } = req.body;
  const validated = loginSchema.safeParse({ email, password });

  if (!validated.success)
    return next(createCustomError('invalid data format', 401));

  const foundUser = await User.findOne({ email: validated.data.email });
  if (!foundUser || Object.keys(foundUser).length === 0)
    return next(createCustomError('Email not found', 404));
  const match = await bcrypt.compare(
    validated.data.password,
    foundUser.password
  );
  if (!match) return next(createCustomError('Wrong email'), 401);

  const token = await jwt.sign(
    { email: validated.data.email },
    process.env.SECRET_TOKEN,
    { expiresIn: '10m' }
  );
  const refreshToken = await jwt.sign(
    { email: validated.data.email },
    process.env.SECRET_REFRESH_TOKEN,
    { expiresIn: '7d' }
  );

  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const user = {
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
    email: foundUser.email,
    id: foundUser.id,
    photoName: foundUser.photoName,
  };
  res.json({ token, user });
};

module.exports = loginHandler;
