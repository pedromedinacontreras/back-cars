var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

// var db = mongoose.connect('mongodb://localhost/consume-local');

var db = mongoose.connect('mongodb://pedro:m0r0cha95@ds161584.mlab.com:61584/jobfinder');

var Place = require('./models/placeModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

placeRouter = require('./Routes/placeRoutes')(Place);

app.use('/api/places', placeRouter);
// app.use('/api/authors', authorRouter);

app.get('/', function(req, res){
  res.send('welcome to consume local API');
});

app.listen(port, function(){
  console.log('Running on PORTTTT:' + port);
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
