const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

router
  .route('/checkout-session/:productId')
  .get(authController.protect, orderController.getCheckoutSession);

module.exports = router;
