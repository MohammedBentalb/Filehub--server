const route = require('express').Router();
const getAllFilesHandler = require('../controller/data/getAllFilesHandler');
const getAuthorFilesAndInfoHandler = require('../controller/data/getAuthorFilesAndInfo');
const getSingleFileHandler = require('../controller/data/getSingleFileHandler');
const insertFileHandler = require('../controller/data/insertFileHandler');
const paginationOptions = require('../controller/pagination.js/paginationOptions');
const asyncWrapper = require('../middleware/asyncWrapper');

route.get('/files', asyncWrapper(paginationOptions), asyncWrapper(getAllFilesHandler)); // route to get all files
route.post('/files/:fileId', asyncWrapper(insertFileHandler)); // route to insert a file
route.get('/files/:fileId', asyncWrapper(getSingleFileHandler)); // route to get a file
route.delete('/files/:fileId', asyncWrapper(() => {})); // route to delete a file
route.get('/author/:authorId', asyncWrapper(getAuthorFilesAndInfoHandler));  // route to get the user's info and files
route.get('/files/download/:fileId', () => {}); // route to download a file

module.exports = route;