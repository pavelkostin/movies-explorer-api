const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
/* const auth = require('../middlewares/auth'); */
/* const { getUsers } = require('../controllers/users'); */
const { getMyProfile } = require('../controllers/users');
const { updateMyProfile } = require('../controllers/users');

router.get('/me', getMyProfile);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
}), updateMyProfile);

// удалить
/* router.get('/', getUsers); */

module.exports = router;
