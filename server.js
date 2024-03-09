require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const dataRoute = require('./routes/data');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const verificationHandler = require('./controller/routeProtection/verificationHandler');
const FilePool = require('./models/Files');
const asyncWrapper = require('./middleware/asyncWrapper');
const corsOptions = require('./config/corsOptions');
// parsing json
app.use(express.json());

// cors
app.use(cors(corsOptions))

// cookie parser middleware
app.use(cookieParser());

// authentication route
app.use('/api/auth', authRoute);

// protect data routes
app.use(asyncWrapper(verificationHandler));

// data transaction route
app.use('/api/data', dataRoute);

// error handler
app.use(errorHandlerMiddleware);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log('listening on port ' + (process.env.PORT || 3001));
    });
  })
  .catch((err) => {
    console.log('ERROR CONNECTING WITH MONGOOSE', err);
  });

// Dummy data for testing
const db = mongoose.connection;
db.once('open', async () => {
  if ((await FilePool.countDocuments()) > 0) return;
  Promise.all([
    FilePool.create({
      name: 'file1.txt',
      originalname: 'original_file1.txt',
      mimetype: 'text/plain',
      size: 1024,
      author: 'sadida 1',
      authorId: '65eb1c82f0aca061981f9f74',
    }),
    FilePool.create({
      name: 'file1.txt',
      originalname: 'original_file2.txt',
      mimetype: 'text/plain',
      size: 1024,
      author: 'sadida 2',
      authorId: '65eb1c82f0aca061981f9f74',
    }),
    FilePool.create({
      name: 'file1.txt',
      originalname: 'original_file3.txt',
      mimetype: 'text/plain',
      size: 1024,
      author: 'sadida 3',
      authorId: '65eb1c82f0aca061981f9f74',
    }),
    FilePool.create({
      name: 'file1.txt',
      originalname: 'original_file4.txt',
      mimetype: 'text/plain',
      size: 1024,
      author: 'sadida 4',
      authorId: '65eb1c82f0aca061981f9f74',
    }),
    FilePool.create({
      name: 'file1.txt',
      originalname: 'original_file5.txt',
      mimetype: 'text/plain',
      size: 1024,
      author: 'sadida 5',
      authorId: '65eb1c82f0aca061981f9f74',
    }),
    FilePool.create({
      name: 'file1.txt',
      originalname: 'original_file6.txt',
      mimetype: 'text/plain',
      size: 1024,
      author: 'sadida 6',
      authorId: '65eb1c82f0aca061981f9f74',
    }),
    FilePool.create({
      name: 'file1.txt',
      originalname: 'original_file7.txt',
      mimetype: 'text/plain',
      size: 1024,
      author: 'sadida 7',
      authorId: '65eb1c82f0aca061981f9f74',
    }),
    FilePool.create({
      name: 'file1.txt',
      originalname: 'original_file8.txt',
      mimetype: 'text/plain',
      size: 1024,
      author: 'sadida 8',
      authorId: '65eb1c82f0aca061981f9f74',
    }),
    FilePool.create({
      name: 'file1.txt',
      originalname: 'original_file9.txt',
      mimetype: 'text/plain',
      size: 1024,
      author: 'sadida 9',
      authorId: '65eb1c82f0aca061981f9f74',
    }),
  ]).then(() => {
    console.log('done');
  });
});
