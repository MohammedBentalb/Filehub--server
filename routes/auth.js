const route = require('express').Router();
const asyncWrapper = require('../middleware/asyncWrapper');
const registerHandler = require('../controller/auth/register');
const loginHandler = require('../controller/auth/login');
const refreshHandler = require('../controller/auth/refresh');
const logoutHandler = require('../controller/auth/logout');


route.post('/register', asyncWrapper(registerHandler));
route.post('/login', asyncWrapper(loginHandler));
route.post('/refresh', asyncWrapper(refreshHandler));
route.post('/logout', asyncWrapper(logoutHandler));




module.exports = route;
