require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const dataRoute = require('./routes/data');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
// parsing json
app.use(express.json());

// cookie parser middleware
app.use(cookieParser());
// authentication route
app.use('/api/auth', authRoute);

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
