const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);

router.route('/signup').post(authController.signUp);

router
  .route('/updateUser')
  .post(authController.protect, userController.updateUser);

router.route('/me').get(authController.protect, userController.getMe);

router
  .route('/:id')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'guide', 'lead-guide'),
    userController.getUser
  );

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getUsers
  );

module.exports = router;
