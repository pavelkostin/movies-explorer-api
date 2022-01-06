const router = require('express').Router();

const { getMovies} = require('../controllers/movies');
const { postMovies} = require('../controllers/movies');
const { deleteMovies} = require('../controllers/movies');

router.post('/', postMovies);
router.get('/', getMovies);
router.delete('/:movieId', deleteMovies);


module.exports = router;