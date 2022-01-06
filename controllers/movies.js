const Movie = require('../models/movies');

function postMovies(req, res) {

  const { country, director, movieId, nameRU, nameEN } = req.body;
  const owner = req.user._id;
  Movie.create({ country, director, owner, movieId, nameRU, nameEN })

    .then(movie => res.status(200).send({ data: movie }))
    .catch(err => res.status(500).send({ message: err.message }));
}

function getMovies(req, res, next) {
  return Movie.find({})
    /* .populate('owner') */
    .then(movies => res.send({ movies }))
    .catch(err => res.status(500).send({ message: err.message }));
}

function deleteMovies(req, res, next) {
  return Movie.findByIdAndRemove(req.params.movieId)
    .then(movie => res.send({ movie }))
    .catch(err => res.status(500).send({ message: err.message }));
}


module.exports = {
  getMovies,
  postMovies,
  deleteMovies,
}