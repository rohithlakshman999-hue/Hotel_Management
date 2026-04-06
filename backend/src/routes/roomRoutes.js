const express = require('express');
const {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');

const router = express.Router();

// Get all rooms & create room
router.route('/')
  .get(getRooms)
  .post(createRoom);

// Get single room, update, delete
router.route('/:id')
  .get(getRoomById)
  .put(updateRoom)
  .delete(deleteRoom);

module.exports = router;