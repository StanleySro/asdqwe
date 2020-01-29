const House = require("../models/House");
const Reservation = require("../models/Reservation");

function put (req, res) {
  const { nOfBathrooms, nOfBedrooms, nOfRooms, floor, dateOfRegistration, description} = req.body;
  const newHouse = new House(req.body);
  newHouse.save().then(result => res.status(200).json(result)).catch(err => res.status(500).json({ error: err }));
}

function get (req, res) {
  const { id } = req.query;
  if (id) {
    House.findById({_id : id}).then((house) => {
      res.status(200).json(house);
    });
  } else {
    House.find().then((houses) => res.status(200).json(houses));
  }
}

function post (req, res) {
  House.findByIdAndUpdate({ _id: req.body._id }, { ...req.body }, { new: true }).then((house) => {
    res.status(200).json(house);
  });
}

function del (req, res) {
  House.findByIdAndDelete({ _id: req.query.id }).then(result => {
    Reservation.find({ houseId: req.query.id }).then(reservations => {
      Reservation.findOneAndDelete({ _id: reservations[0]._id }).then(() => {
           res.status(200).json(result)
      });
    });
  });
}


module.exports = { put, get, post, del };
