const router = require('express').Router();

const { getMovies} = require('../controllers/movies');
const { postMovies} = require('../controllers/movies');
const { deleteMovies} = require('../controllers/movies');

router.get('/', getMovies);
router.patch('/', postMovies);
router.delete('/:movieId', deleteMovies);


module.exports = router;