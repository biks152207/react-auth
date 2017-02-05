const express = require('express'),
          app = express(),
          logger = require('morgan'),
          mongoose = require('mongoose'),
          bodyParser = require('body-parser'),
          bcrypt = require('bcrypt-nodejs'),
          config = require('./config/main');


mongoose.connect(config.database, function(err){
  console.log(err);
});

const router = require('./router');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

router(app);
const server = app.listen(config.port);
console.log('Your server is listening on port ' + config.port);
