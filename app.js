// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const {PORT = 3000} = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

app.use('/users', require('./routes/users'));
app.use((req, res, next) => {
  req.user = {
    _id: '649023d7005a0e414f9376a5'
  };

  next();
});

app.use('/cards', require('./routes/cards'));

app.listen(PORT)