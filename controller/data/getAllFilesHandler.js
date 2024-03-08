const { createCustomError } = require('../../lib/customError');
const FilePool = require('../../models/Files');

const getAllFilesHandler = async (req, res, next) => {

  const author = res.author;
  if (!author || Object.keys(author).length === 0)
    return next(createCustomError('UnAuthorized', 401));

  const pagOptions = res.pagOptions;
  const search = req.query.search;
  const query = {};
  if (search) query.originalname = { $regex: search, $options: 'i' };

  const files = await FilePool.find(query)
    .skip(pagOptions.startIndex)
    .limit(pagOptions.limit)
    .sort({ author: 1 });
  if (!files || files.length === 0) return res.status(204).json({ files: [] });

  const pagination = {
    totalPages: pagOptions.totalPages,
    totalFiles: pagOptions.totalFiles,
    nextPage: pagOptions.nextPage,
    prevPage: pagOptions.prevPage,
  };

  res.send({ files, pagination });
};

module.exports = getAllFilesHandler;