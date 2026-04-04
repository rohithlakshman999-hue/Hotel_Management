const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String, required: true },
  amenities: [{ type: String }],
  capacity: { type: Number, default: 2 },
  roomType: { type: String, enum: ['Standard', 'Deluxe', 'Suite'], default: 'Standard' },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
