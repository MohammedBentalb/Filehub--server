require('dotenv').config();
const express = require('express');
const cors = require('cors');
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
app.use(cors(corsOptions));

// cookie parser middleware
app.use(cookieParser());

// interact with public folder
app.use(express.static('public'));

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
/* const db = mongoose.connection;
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
      title: 'sadida 1 file1',
      caption: 'test 1',
    }),
    FilePool.create({
      name: 'file1.txt',
      originalname: 'original_file2.txt',
      mimetype: 'text/plain',
      size: 1024,
      author: 'sadida 2',
      authorId: '65eb1c82f0aca061981f9f74',
      title: 'sadida 2 file1',
      caption: 'test 2',
    }),
    FilePool.create({
      name: 'file1.txt',
      originalname: 'original_file3.txt',
      mimetype: 'text/plain',
      size: 1024,
      author: 'sadida 3',
      authorId: '65eb80e9c7a56a62c3acf284',
      title: 'sadida 3 file1',
      caption: 'test 3',
    }),
    FilePool.create({
      name: 'file1.txt',
      originalname: 'original_file4.txt',
      mimetype: 'text/plain',
      size: 1024,
      author: 'sadida 4',
      authorId: '65eb80e9c7a56a62c3acf284',
      title: 'sadida 4 file1',
      caption: 'test 4',
    }),
    FilePool.create({
      name: 'file1.txt',
      originalname: 'original_file5.txt',
      mimetype: 'text/plain',
      size: 1024,
      author: 'sadida 5',
      authorId: '65eb1c82f0aca061981f9f74',
      title: 'sadida 5 file1',
      caption: 'test 5',
    }),
    FilePool.create({
      name: 'file1.txt',
      originalname: 'original_file6.txt',
      mimetype: 'text/plain',
      size: 1024,
      author: 'sadida 6',
      authorId: '65eb80e9c7a56a62c3acf284',
      title: 'sadida 6 file1',
      caption: 'test 6',
    }),
    FilePool.create({
      name: 'file1.txt',
      originalname: 'original_file7.txt',
      mimetype: 'text/plain',
      size: 1024,
      author: 'sadida 7',
      authorId: '65eb1c82f0aca061981f9f74',
      title: 'sadida 7 file1',
      caption: 'test 7',
    }),
    FilePool.create({
      name: 'file1.txt',
      originalname: 'original_file8.txt',
      mimetype: 'text/plain',
      size: 1024,
      author: 'sadida 8',
      authorId: '65eb80e9c7a56a62c3acf284',
      title: 'sadida 8 file1',
      caption: 'test 8',
    }),
    FilePool.create({
      name: 'file1.txt',
      originalname: 'original_file9.txt',
      mimetype: 'text/plain',
      size: 1024,
      author: 'sadida 9',
      authorId: '65eb1c82f0aca061981f9f74',
      title: 'sadida 9 file1',
      caption: 'test 9',
    }),
  ]).then(() => {
    console.log('done');
  });
}); */
