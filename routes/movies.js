const router = require('express').Router();

const {
  addMovie, getMovies, deleteMovies,
} = require('../controllers/movies');

const {
  validateCreateMovie,
  validateUpdateMovie,
} = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', validateCreateMovie, addMovie);
router.delete('/movies/:_id', validateUpdateMovie, deleteMovies);

module.exports = router;
