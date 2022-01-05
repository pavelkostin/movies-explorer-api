const Movie = require('../models/movies');

function getMovies(req, res, next) {
  return Movie.find({})
    .then(movies => res.send({ data: movies }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

function postMovies(req, res, next) {
  const { country, director } = req.body;
  const owner = req.user._id;
  return Movie.create(country, director, owner)
    .then(movie => res.send({ data: movie }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

function deleteMovies(req, res, next) {
  return Movie.findById(req.params.movieId)
    .then(movie => res.send({ data: movie }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}


module.exports = {
  getMovies,
  postMovies,
  deleteMovies,
}