const express = require('express');
const {
    createBooking,
    getBookings,
    deleteBooking,
    createOrder
} = require('../controllers/bookingController');

const router = express.Router();

// Create Razorpay order
router.post('/create-order', createOrder);

// Create booking
router.post('/', createBooking);

// Get all bookings
router.get('/', getBookings);

// Delete booking by ID
router.delete('/:id', deleteBooking);

module.exports = router;