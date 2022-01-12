const Movie = require('../models/movies');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

function postMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(200).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
}

function getMovies(req, res, next) {
  return Movie.find({})
    .then((movies) => res.status(200).send({ movies }))
    .catch((err) => {
      next(err);
    });
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError(`Карточка по ID: ${req.params.movieId} не найдена.`);
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id.toString()) {
        movie.remove();
        res
          .status(200)
          .send(movie);
      } else {
        next(new ForbiddenError(`Фильм c _id: ${req.params.movieId} создал другой пользователь. Нельзя удалять чужие фильмы.`));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан несуществующий ID фильма.'));
      } else {
        next(err);
      }
    });
}

// удалить потом
function deleteALlMovies(req, res, next) {
  Movie.deleteMany({})
    .then((movie) => res.status(200).send({ data: movie }))
    .catch((err) => next(err));
}

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
  deleteALlMovies,
};
