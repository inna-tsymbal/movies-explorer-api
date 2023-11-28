const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login, logout } = require('../controllers/users');

const auth = require('../middlewares/auth');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);
router.post('/signout', logout);
router.use(auth);
router.use('/', userRouter);
router.use('/', moviesRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такая страница не существует.'));
});

module.exports = router;
