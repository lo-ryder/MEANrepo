// require mongoose
var mongoose = require('mongoose');
// create the schema
const elephantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,

  },
  species: {
    type: String,
    required: true,
    trim: true,
  },
  native_country: {
    type: String,
    required: true,
    trim: true,
  },
  age: Number,

}, {
  timestamps: true
});

const Elephant = mongoose.model('Elephant', elephantSchema);
