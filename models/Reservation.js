const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  houseId: { type: mongoose.Schema.Types.ObjectId, ref: "House", required: true },
  rentingPersonId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reservationStart: Date,
  reservationEnd: Date,
  details: String,
  startOfAccomodation: Date,
  endOfAccomodation: Date
}, { strict: true });

module.exports = mongoose.model('Reservation', schema);
