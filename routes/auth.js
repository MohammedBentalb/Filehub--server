const route = require('express').Router();
const asyncWrapper = require('../middleware/asyncWrapper');
const registerHandler = require('../controller/auth/register');
const loginHandler = require('../controller/auth/login');
const refreshHandler = require('../controller/auth/refresh');
const logoutHandler = require('../controller/auth/logout');
const multer = require('multer');

const upload = multer({ dest: 'public/avatar' });

route.post('/register', upload.single('avatar'), asyncWrapper(registerHandler));
route.post('/login', asyncWrapper(loginHandler));
route.post('/refresh', asyncWrapper(refreshHandler));
route.post('/logout', asyncWrapper(logoutHandler));

module.exports = route;
