var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var placeModel = new Schema({
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String
  },
  kind: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  }
});

module.exports = mongoose.model('Place', placeModel);
