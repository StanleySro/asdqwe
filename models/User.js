const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firstName: String,
  secondName: String,
  surname: String,
  dateOfBirth: Date,
  pesel: String,
  nationality: String,
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }]
}, { strict: true });

module.exports = mongoose.model('User', schema);
