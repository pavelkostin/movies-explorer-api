const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
/* const auth = require('../middlewares/auth'); */
const { getMovies } = require('../controllers/movies');
const { postMovie } = require('../controllers/movies');
const { deleteMovie } = require('../controllers/movies');
/* const { deleteALlMovies } = require('../controllers/movies'); */
const regExp = require('../regexp/regexp');

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regExp),
    trailer: Joi.string().required().pattern(regExp),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(regExp),
    movieId: Joi.number().required(),
  }),
}), postMovie);
router.get('/', getMovies);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), deleteMovie);

// удалить потом
/* router.delete('/', auth, celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), deleteALlMovies); */

module.exports = router;
