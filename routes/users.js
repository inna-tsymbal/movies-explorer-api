const router = require('express').Router();

const {
  getUsers, editUserData
} = require('../controllers/users');

const {
  validateUpdateUser,
} = require('../middlewares/validation');

router.get('/users/me', getUsers);
router.patch('/users/me', validateUpdateUser, editUserData);

module.exports = router;
