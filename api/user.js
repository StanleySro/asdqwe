const User = require("../models/User");

function post (req, res) {
  const { firstName, secondName, dateOfBirth, surname, pesel, reservations, nationality } = req.body;
  const newUser = new User(req.body);
  newUser.save().then(result => res.status(200).json(result)).catch(err => res.status(500).json({ error: err }));
}

function get (req, res) {
  const { id } = req.query;
  if (id) {
    User.findById({_id : id}, (user) => {
      res.status(200).json(user);
    });
  } else {
    User.find({}, (users) => res.status(200).json(users));
  }
}

module.exports = { post, get };
