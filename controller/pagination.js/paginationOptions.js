const FilePool = require('../../models/Files');

const paginationOptions = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const totalFiles = await FilePool.countDocuments();
  const totalPages = Math.ceil(totalFiles / limit);
  const endIndex = page * limit;

  const options = {
    limit,
    startIndex: (page - 1) * limit,
    prevPage: page - 1,
    nextPage: -1,
    totalFiles,
    totalPages,
  };

  if (endIndex < totalFiles) {
    options.nextPage = page + 1;
  }

  res.pagOptions = options;
  next();
};

module.exports = paginationOptions;
