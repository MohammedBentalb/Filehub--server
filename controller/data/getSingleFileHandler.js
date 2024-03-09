const { createCustomError } = require('../../lib/customError');
const FilePool = require('../../models/Files');

const getSingleFileHandler = async (req, res, next) => {
  const author = res.author;
  const { fileId } = req.params;

  if (!author || Object.keys(author) === 0)
    return next(createCustomError('unAuthorized', 403));

  if (!fileId) return next(createCustomError('No id provided', 403));

   const foundFile = await FilePool.findById(fileId);
  if (!foundFile || Object.keys(foundFile).length === 0)
    return next(createCustomError('User not found', 404));

  res.json({ author, fileId, foundFile });
};
module.exports = getSingleFileHandler;
