const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

function getMyProfile(req, res, next) {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден.');
    })
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
}

function updateMyProfile(req, res, next) {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(req.user._id, {
    name,
    email,
  }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден.');
    })
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
}

// Регистрация и логин

function createUser(req, res, next) {
  const { email, password } = req.body;
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Вы пытаетесь зарегистрироваться по уже существующему в базе email.');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => res.status(200).send({ email: user.email, name: user.name }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
}

function loginUser(req, res, next) {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
}

// удалить
/* function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => next(err));
} */

module.exports = {
  createUser,
  loginUser,
  /* getUsers, */
  getMyProfile,
  updateMyProfile,
};
