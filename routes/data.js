const route = require('express').Router();
const getAllFilesHandler = require('../controller/data/getAllFilesHandler');
const getAuthorFilesAndInfoHandler = require('../controller/data/getAuthorFilesAndInfo');
const getSingleFileHandler = require('../controller/data/getSingleFileHandler');
const insertFileHandler = require('../controller/data/insertFileHandler');
const paginationOptions = require('../controller/pagination.js/paginationOptions');
const asyncWrapper = require('../middleware/asyncWrapper');

const multer = require('multer')

const upload = multer({dest: 'uploads'})

route.get('/files', asyncWrapper(paginationOptions), asyncWrapper(getAllFilesHandler)); // route to get all files
route.get('/files/:fileId', asyncWrapper(getSingleFileHandler)); // route to get a Single file
route.get('/author/:authorId', asyncWrapper(getAuthorFilesAndInfoHandler));  // route to get the user's info and files
route.delete('/files/:fileId', asyncWrapper(() => {})); // route to delete a file
route.get('/files/download/:fileId', asyncWrapper(() => {})); // route to download a file
route.post('/files/upload/',upload.single('file'), asyncWrapper(insertFileHandler)); // route to insert a file

module.exports = route;