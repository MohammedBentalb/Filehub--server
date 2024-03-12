require('dotenv').config();
const { createCustomError } = require('../../lib/customError');
const { registerSchema } = require('../../Schemas/authSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');
const fs = require('fs').promises;

const registerHandler = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const file = req.file;
  if (!file || Object.keys(file) === 0) {
    return next(createCustomError('invalid data', 401));
  }

  const validated = registerSchema.safeParse({
    firstName,
    lastName,
    email,
    password,
  });

  if (!validated.success) {
    await fs.unlink(file.path);
    return next(createCustomError('invalid data format', 403));
  }

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
    photoName: file.filename,
    photoOriginalname: file.originalname,
    photoPath: file.path,
  });
  await newUser.save();

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const user = {
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    id: newUser.id,
    photoName: newUser.photoName,
  };

  res.json({ token, user });
};
module.exports = registerHandler;
