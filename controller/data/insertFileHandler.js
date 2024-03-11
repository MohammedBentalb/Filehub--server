const FilePool = require('../../models/Files');
const fs = require('fs').promises;
const { createCustomError } = require('../../lib/customError');

const insertFileHandler = async (req, res, next) => {
  const author = res.author;
  const { caption, title } = req.body;
  const file = req.file;

  if (!author || Object.keys(author).length === 0)
    return next(createCustomError('UnAuthorized', 401));

  if (!file || Object.keys(file).length === 0)
    return next(createCustomError('invalid data', 403));

  if (!caption || !title) {
    await fs.unlink(file.path);
    console.log('file deleted');
    return next(createCustomError('invalid data', 403));
  }
  const newFile = new FilePool({
    name: file.filename,
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    author: author.email,
    authorId: author.id,
    path: file.path,
    caption,
    title,
  });
  await newFile.save();
  res.status(200).json({ newFile });
};

module.exports = insertFileHandler;
