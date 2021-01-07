const express = require('express');

const tourController = require('../controllers/tourController');

const router = express.Router();

router.route('/').get(tourController.getAllTours);
router.route('/:id').get(tourController.getTour);

module.exports = router;
