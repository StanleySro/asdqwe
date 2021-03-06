const User = require("../models/User");
const Reservation = require("../models/Reservation");

function put (req, res) {
  const { firstName, secondName, dateOfBirth, surname, pesel, reservations, nationality } = req.body;
  const newUser = new User(req.body);
  newUser.save().then(result => res.status(200).json(result)).catch(err => res.status(500).json({ error: err }));
}

function get (req, res) {
  const { id, pesel } = req.query;
  if (id) {
    User.findById({_id : id}).then((user) => {
      res.status(200).json(user);
    });
  } else if (pesel) {
    User.find({ pesel }).then((users) => {
      if (!users[0]) {
        res.status(404).json({ error: 'no such pesel' })
      }
      res.status(200).json(users[0]);
    });
  } else {
    User.find().then((users) => res.status(200).json(users));
  }
}

function post (req, res) {
  User.findByIdAndUpdate({ _id: req.body._id }, { ...req.body }, { new: true }).then((user) => {
    res.status(200).json(user);
  });
}

function del (req, res) {
  User.findByIdAndDelete({ _id: req.query.id }).then(result => {
    Reservation.find({ rentingPersonId: req.query.id }).then(reservations => {
      Reservation.findOneAndDelete({ _id: reservations[0]._id }).then(() => {
           res.status(200).json(result)
      });
    });
  });
}

module.exports = { put, get, post, del };
