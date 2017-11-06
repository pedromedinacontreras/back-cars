var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var logger = require('morgan');
var cookieParser = require('cookie-parser');

// var db = mongoose.connect('mongodb://localhost/consume-local');

var db = mongoose.connect('mongodb://pedro:m0r0cha95@ds161584.mlab.com:61584/jobfinder');

var Place = require('./models/placeModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

placeRouter = require('./Routes/placeRoutes')(Place);

app.use('/api/places', placeRouter);
// app.use('/api/authors', authorRouter);

app.get('/', function(req, res){
  res.send('welcome to consume local API');
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
