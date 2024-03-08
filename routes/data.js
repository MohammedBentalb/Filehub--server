const route = require('express').Router();

route.get('/', (req, res) => {
  console.log('yes i am working');
  res.send('indeed this is data');
});

route.post('/files', (req, res) => {
  console.log('yes i am working');
  res.send('indeed this is data');
});
route.get('/:fileId', (req, res) => {
  res.send(`this is the param ${req.params?.fileId}`);
  console.log('this is the param ' + req.params?.fileId);
});

route.get('/files/download/:fileId', (req, res) => {
  console.log('yes i am working');
  res.send('indeed this is data');
});

module.exports = route;
