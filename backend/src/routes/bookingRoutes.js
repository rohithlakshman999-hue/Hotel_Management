const express = require('express');
const { createBooking, getBookings, deleteBooking, createOrder } = require('../controllers/bookingController');
const router = express.Router();

router.post('/create-order', createOrder);
router.post('/', createBooking);
router.get('/', getBookings);
router.delete('/:id', deleteBooking);

module.exports = router;
