const mongoose = require('mongoose');
const { isURL } = require('validator');
const User = require('../models/users');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: false,
  },
  director: {
    type: String,
    required: false,
  },
/*   duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
    },
  },*/
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    /* ref: 'user', */
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('movie', movieSchema);