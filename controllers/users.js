
const User = require('../models/users');

function createUser(req, res) {
  const { email, password, name } = req.body;
  User.create({ email, password, name })
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
}

function getUsers(req, res) {
  User.find({})
    .then(users => res.send({ users }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

function getMyProfile(req, res, next) {
    return User.findById(req.user._id)
      .then(user => res.send({ user }))
      .catch(err => res.status(500).send({ message: err.message }));
}

function updateMyProfile(req, res, next) {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(req.user._id, {
    name,
    email
  }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
}

function loginUser(req, res) {

}


module.exports = {
  createUser,
  loginUser,
  getUsers,
  getMyProfile,
  updateMyProfile
}