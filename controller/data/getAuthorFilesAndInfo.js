const { createCustomError } = require('../../lib/customError');
const User = require('../../models/Users');
const FilePool = require('../../models/Files');
const getAuthorFilesAndInfoHandler = async (req, res, next) => {
  const author = res.author;
  const { authorId } = req.params;

  if (!author || Object.keys(author).length === 0)
    return next(createCustomError('UnAuthorized', 401));

  if (!authorId) return next(createCustomError('No id provided', 403));

  const foundAuthor = await User.findOne({ _id: authorId });
  if (!foundAuthor || Object.keys(foundAuthor).length === 0)
    return next(createCustomError('User not found', 404)) 

  let user = {
    id: foundAuthor.id,
    firstName: foundAuthor.firstName,
    lastName: foundAuthor.lastName,
  }
  let files = [];
  const foundFiles = await FilePool.find({ authorId: foundAuthor.id });
  if (foundFiles && foundFiles.length !== 0) files = foundFiles;

  res.status(200).json({ user, files });
};
module.exports = getAuthorFilesAndInfoHandler;
