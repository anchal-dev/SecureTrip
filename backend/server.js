// server.js - Main Backend Server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// ALLOWED ORIGINS (for local + deployment)
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

// CORS Middleware (Main)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // allow all for now
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SOCKET.IO (SINGLE INITIALIZATION)
const io = socketIo(server, {
  cors: {
    origin: allowedOrigins.length > 0 ? allowedOrigins : "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

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

// Socket.IO Listeners
io.on('connection', (socket) => {
  console.log('👤 Client connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on('join-authorities', () => {
    socket.join('authorities');
    console.log('Authority joined monitoring room');
  });

  socket.on('location-update', (data) => {
    io.to('authorities').emit('tourist-location', data);
  });

  socket.on('sos-alert', (data) => {
    io.to('authorities').emit('new-alert', {
      ...data,
      type: "SOS",
      severity: "critical",
      timestamp: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Make io available to other routes
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
