const allowedUrls = ['www.Filehub.vercel.app', 'Filehub.vercel.app']; // those are demo, site has not been deployed yet
const { createCustomError } = require('../lib/customError');
const corsOptions = {
  origin: function (origin, cb) {
    if (allowedUrls.indexOf(origin) !== -1 || !origin) return cb(null, true);
    return cb(createCustomError('UnAuthorized Origin', 403));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions
