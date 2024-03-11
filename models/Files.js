const { Schema, model } = require('mongoose');

const filesSchema = new Schema(
  {
    name: { type: String, required: true },
    originalname: { type: String, required: true, unique: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    downloadCounter: { type: Number, default: 0 },
    author: { type: String, required: true },
    authorId: { type: String, required: true },
    caption: { type: String, required: true },
    title: { type: String, required: true },
    path: {type: String, required: true}
  },
  { timestamps: true }
);

module.exports = model('file', filesSchema);
