const monoose = require('mongoose');

const schema = new mongoose.Schema({
  nOfBathrooms: Number,
  nOfBedrooms: Number,
  nOfRooms: Number,
  floor: Number,
  dateOfRegistration: Date,
  description: String
}, { strict: true });

module.exports = mongoose.model('House', schema);
