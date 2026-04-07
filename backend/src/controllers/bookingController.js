const Booking = require('../models/Booking');
const Room = require('../models/Room');
const User = require('../models/User');
const Razorpay = require('razorpay');

// @desc    Create Razorpay Order
// @route   POST /api/bookings/create-order
exports.createOrder = async (req, res) => {
  try {
    const { roomId, fromDate, toDate } = req.body;

    if (!roomId || !fromDate || !toDate) {
      return res.status(400).json({ message: 'Missing required fields for order' });
    }

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const from = new Date(fromDate);
    const to = new Date(toDate);

    const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) || 1;
    const amount = room.price * days;

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    res.json({
      success: true,
      order,
      amount,
      key_id: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error("RAZORPAY ERROR:", error);
    res.status(500).json({ message: 'Error creating Razorpay order', error: error.message });
  }
};

// @desc    Create booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    console.log("BOOKING DATA:", req.body); // ✅ DEBUG

    const { userName, email, phone, roomId, fromDate, toDate } = req.body;

    if (!userName || !email || !phone || !roomId || !fromDate || !toDate) {
      return res.status(400).json({ message: 'Missing required booking fields' });
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);

    // Check overlapping bookings
    const overlappingBookings = await Booking.find({
      room: roomId,
      $and: [
        { fromDate: { $lte: to } },
        { toDate: { $gte: from } }
      ]
    });

    if (overlappingBookings.length > 0) {
      return res.status(400).json({ message: "Room not available" });
    }

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) || 1;
    const totalAmount = room.price * days;

    // ✅ FIXED BOOKING CREATE
    const booking = await Booking.create({
      userName,
      email, // ✅ added
      phone,
      room: roomId,
      fromDate: from,
      toDate: to,
      totalAmount
    });

    // Handle User creation/update
    let user = await User.findOne({ email });

    if (user) {
      user.totalBookings += 1;
      user.name = userName;
      user.phone = phone;
      await user.save();
    } else {
      await User.create({
        name: userName,
        email,
        phone,
        totalBookings: 1
      });
    }

    res.status(201).json({
      message: "Room booked successfully",
      booking: {
        userName: booking.userName,
        email: booking.email,
        phone: booking.phone,
        room: {
          name: room.name,
          price: room.price
        },
        fromDate: booking.fromDate,
        toDate: booking.toDate,
        totalAmount: booking.totalAmount
      }
    });

    const io = req.app.get('io');
    if (io) io.emit('dashboard_update');

  } catch (error) {
    console.error("BOOKING ERROR:", error); // ✅ DEBUG
    res.status(500).json({
      message: 'Error creating booking',
      error: error.message
    });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('room');
    res.json(bookings);
  } catch (error) {
    console.error("FETCH BOOKINGS ERROR:", error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.deleteOne();

    const io = req.app.get('io');
    if (io) io.emit('dashboard_update');

    res.json({ message: 'Booking deleted successfully' });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({
      message: 'Error deleting booking',
      error: error.message
    });
  }
};