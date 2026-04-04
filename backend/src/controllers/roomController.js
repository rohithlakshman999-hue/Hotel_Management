const Room = require('../models/Room');

// @desc    Get all rooms (Active only by default, Admin can see all)
// @route   GET /api/rooms
exports.getRooms = async (req, res) => {
  try {
    const filters = {};
    if (req.query.type) filters.roomType = req.query.type;
    // By default, hide unavailable rooms for guests
    if (req.query.admin !== 'true') filters.isAvailable = true;

    const rooms = await Room.find(filters);
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching rooms' });
  }
};

// @desc    Get single room
// @route   GET /api/rooms/:id
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching room' });
  }
};

// @desc    Create a room (Admin)
// @route   POST /api/rooms
exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: 'Error creating room', error: error.message });
  }
};

// @desc    Update a room (Admin)
// @route   PUT /api/rooms/:id
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: 'Error updating room', error: error.message });
  }
};

// @desc    Delete a room (Admin)
// @route   DELETE /api/rooms/:id
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json({ message: 'Room removed successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting room' });
  }
};
