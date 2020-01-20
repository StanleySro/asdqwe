const Reservation = require("../models/Reservation");

function put (req, res) {
  const { houseId, rentingPersonId, reservationStart, reservationEnd, details, startOfAccomodation, endOfAccomodation } = req.body;
  const newReservation = new Reservation(req.body);
  newReservation.save().then(result => res.status(200).json(result)).catch(err => res.status(500).json({ error: err }));
}

function get (req, res) {
  const { id } = req.query;
  if (id) {
    Reservation.findById({_id : id}).then((reservation) => {
      res.status(200).json(reservation);
    });
  } else {
    Reservation.find().then((reservations) => res.status(200).json(reservations));
  }
}

function post (req, res) {
  Reservation.findByIdAndUpdate({ _id: req.body._id }, { ...req.body }, { new: true }).then((reservation) => {
    res.status(200).json(reservation);
  });
}

function del (req, res) {
  Reservation.findByIdAndDelete({ _id: req.query.id }).then(result => res.status(200).json(result));
}

module.exports = { put, get, post, del };
