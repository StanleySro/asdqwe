require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const userApi = require("./api/user");

const app = express();
const api = express.Router();

mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(
    `Successfully connected to the MongoDB at ${process.env.DB_CONNECTION_STRING}`
  );
});

api.get('/user', (req, res) => {
  const { query } = req;
  res.status(200).send(`users ${query.id}`);
}); // -> /api/user
api.post('/user', userApi.post);
api.get('/house', (req, res) => {
  res.status(200).send('house');
});
api.get('/reservations', (req, res) => {
  res.status(200).send('reservations');
});

app.use("/api", api);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
