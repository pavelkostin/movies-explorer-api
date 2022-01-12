const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser } = require('../controllers/users');
const { loginUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

router.use('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);
router.use('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), loginUser);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('*', (req, res, next) => {
  const error = new NotFoundError('Ресурс не найден.');
  next(error);
});

module.exports = router;
