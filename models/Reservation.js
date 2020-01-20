const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  houseId: { type: mongoose.Schema.Types.ObjectId, ref: "House", required: true },
  rentingPersonId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reservationStart: String,
  reservationEnd: String,
  details: String,
  startOfAccomodation: String,
  endOfAccomodation: String
}, { strict: true });

module.exports = mongoose.model('Reservation', schema);
