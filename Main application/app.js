const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/database')

// Conect to database
mongoose.connect(config.database);

// On conection
mongoose.connection.on('connected', () => {
  console.log(`Connect to database ${config.database}`)
});

// On error
mongoose.connection.on('error', (err) => {
  console.log(`Daatabase error ${err}`)
});

const app = express();

const users = require('./routes/users');

// Port number:
const port = 5000;

// CORS middleware:
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Body parser middleware:
app.use(bodyParser.json());

app.use('/users', users);

// Index route:
app.get('/', (req, res) => {
  res.send('Invalid endpoint');
})

// Start server:
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});