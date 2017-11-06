var express = require('express');

var routes = function(Place) {
  var placeRouter = express.Router();

  placeRouter.route('/')
    .post(function(req, res){
      console.log(req.body);
      var place = new Place(req.body);
      console.log(place);
      place.save();
      res.status(201).send(place);

    })
    .get(function(req, res){
      var query = {};
      if(req.query.kind){
        query.kind = req.query.kind;
      }
      if(req.query.city){
        query.city = req.query.city;
      }
      Place.find(query, function(err, places){
        if(err){
          res.status(500).send(err);
        } else {
          res.json(places);
        }
      });
    });

//MIDDLEWARE: evitará repetir código innecesariamente
  placeRouter.use('/:placeId', function(req, res, next){
    Place.findById(req.params.placeId, function(err, place){
      if(err){
        res.status(500).send(err);
      } else if (place) {
        req.place = place;
        next();
      } else {
        res.status(404).send('no place found');
      }
    });
  });

  placeRouter.route('/:placeId')
    .get(function(req, res){
      res.json(req.place);
    })
    // .put(function(req, res){
    //     req.book.title = req.body.title;
    //     req.book.author = req.body.author;
    //     req.book.genre = req.body.genre;
    //     req.book.read = req.body.read;
    //     req.book.save(function(err){
    //       if (err){
    //         res.status(500).send(err);
    //       } else {
    //         res.json(req.book);
    //       }
    //     });
    // })
    // .patch(function(req, res){
    //   // if(req.body.title) {
    //   //   req.book.title = req.body.title
    //   //
    //   if (req.body._id){
    //     delete req.body._id;
    //   }
    //   for(var p in req.body){
    //     req.book[p] = req.body[p];
    //   }
    //   req.book.save(function(err){
    //     if (err){
    //       res.status(500).send(err);
    //     } else {
    //       res.json(req.book);
    //     }
    //   });
    // })
    .delete(function(req, res){
      req.place.remove(function(err){
        if (err){
          res.status(500).send(err);
        } else {
          res.status(204).send('Removed');
        }
      });
    });

  return placeRouter;
};

module.exports = routes;
