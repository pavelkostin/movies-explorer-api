const User = require('../models/users');

function getMyProfile(req, res, next) {
  return User.findById(req.params._id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

function updateMyProfile(req, res, next) {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(req.params._id, {
    name,
    email
  }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}


module.exports = {
  getMyProfile,
  updateMyProfile
}