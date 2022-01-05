const router = require('express').Router();
const { getMyProfile} = require('../controllers/users');
const { updateMyProfile} = require('../controllers/users');

router.get('/me', getMyProfile);
router.patch('/me', updateMyProfile);

module.exports = router;