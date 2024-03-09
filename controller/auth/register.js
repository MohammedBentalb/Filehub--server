require('dotenv').config();
const { createCustomError } = require('../../lib/customError');
const { registerSchema } = require('../../Schemas/authSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');

const registerHandler = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const validated = registerSchema.safeParse({
    firstName,
    lastName,
    email,
    password,
  });
  if (!validated.success)
    return next(createCustomError('invalid data format', 403));

  const foundUser = await User.findOne({ email: validated.data.email });
  if (foundUser && foundUser.email === validated.data.email)
    return next(createCustomError('Email already exists', 409)); //conflict

  const hashedPassword = await bcrypt.hash(validated.data.password, 10);
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

  const newUser = new User({
    firstName: validated.data.firstName,
    lastName: validated.data.lastName,
    email: validated.data.email,
    password: hashedPassword,
    refreshToken,
  });
  await newUser.save();

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ token });
};
module.exports = registerHandler;
