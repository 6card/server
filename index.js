const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const winston = require('./src/config/winston');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

//logger 
app.use(morgan('MORGAN :remote-addr HTTP/:http-version :status :method :url - :response-time ms'/*, { stream: winston.stream }*/));

//fix favicon error
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use('/video', express.static('video'));

app.use(bodyParser.json());
require('./src/modules/category/router')(app); //categories rourer
require('./src/modules/video/router')(app); //video rourer

app.get("/", (req, res) => {
  res.status(200).send("WHATABYTE: Food For Devs");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  //winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}. Data: %j %s`, req.body, err.stack);
  res.status(err.status || 500);
  res.json({
      error: true,
      code: err.status || 500,
      message: err.message || err,
      data: {}
  });
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});