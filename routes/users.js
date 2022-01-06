const router = require('express').Router();
const { getUsers} = require('../controllers/users');
const { getMyProfile} = require('../controllers/users');
const { updateMyProfile} = require('../controllers/users');


router.get('/', getUsers);
router.get('/me', getMyProfile);
router.patch('/me', updateMyProfile);

module.exports = router;