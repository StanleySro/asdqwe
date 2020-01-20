require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userApi = require("./api/user");

const app = express();
const api = express.Router();

mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(
    `Successfully connected to the MongoDB at ${process.env.DB_CONNECTION_STRING}`
  );
});

// create application/json parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


api.get('/user', userApi.get); // -> /api/user
api.post('/user', userApi.post);
api.put('/user', userApi.put);
api.delete('/user', userApi.del);

api.get('/house', (req, res) => {
  res.status(200).send('house');
});
api.get('/reservations', (req, res) => {
  res.status(200).send('reservations');
});

app.use("/api", api);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
