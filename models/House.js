const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  nOfBathrooms: Number,
  nOfBedrooms: Number,
  nOfRooms: Number,
  floor: Number,
  dateOfRegistration: String,
  description: String
}, { strict: true });

module.exports = mongoose.model('House', schema);
