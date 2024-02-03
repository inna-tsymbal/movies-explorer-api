const router = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');
const {
  validateUpdateUser,
} = require('../middlewares/validation');

router.get('/users/me', getUser);
router.patch('/users/me', validateUpdateUser, updateUser);

module.exports = router;