const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
    photoName: { type: String, required: true },
    photoOriginalname: { type: String, required: true },
    photoPath: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model('user', usersSchema);
