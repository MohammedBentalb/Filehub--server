const route = require('express').Router();
const asyncWrapper = require('../middleware/asyncWrapper');
const registerHandler = require('../controller/auth/register');
const loginHandler = require('../controller/auth/login');
const refreshHandler = require('../controller/auth/refresh');


route.post('/register', asyncWrapper(registerHandler));
route.post('/login', asyncWrapper(loginHandler));
route.post('/refresh', asyncWrapper(refreshHandler));




route.get('/logout', (req, res) => {
  console.log('index route');
  res.json('hello there');
});
module.exports = route;
