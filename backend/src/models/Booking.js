const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  phone: { type: String, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  totalPrice: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
