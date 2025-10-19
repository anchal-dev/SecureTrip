// server.js - Main Backend Server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tourist-safety';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tourists', require('./routes/tourists'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/incidents', require('./routes/incidents'));

// Socket.IO for Real-time Updates
io.on('connection', (socket) => {
  console.log('👤 New client connected:', socket.id);

  // Join user to their personal room
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  // Join authorities to monitoring room
  socket.on('join-authorities', () => {
    socket.join('authorities');
    console.log('Authority joined monitoring room');
  });

  // Handle location updates
  socket.on('location-update', (data) => {
    // Broadcast to authorities
    io.to('authorities').emit('tourist-location', data);
  });

  // Handle SOS alerts
  socket.on('sos-alert', (data) => {
    // Broadcast to all authorities
    io.to('authorities').emit('new-alert', {
      ...data,
      type: 'SOS',
      severity: 'critical',
      timestamp: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Make io accessible to routes
app.set('io', io);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = { io };