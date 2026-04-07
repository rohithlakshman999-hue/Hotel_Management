const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTP server + Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// Make io accessible in routes
app.set('io', io);

// ================= ROUTES ================= //

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend API is running.' });
});

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Import Routes (ONLY ONCE ✅)
const roomRoutes = require('./src/routes/roomRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const userRoutes = require('./src/routes/userRoutes');

// Use Routes
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

// ================= DATABASE ================= //

const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGO_URI || 'mongodb://localhost:27017/hotel_booking',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });