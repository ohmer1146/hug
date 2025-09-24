// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const guestBookingsRoutes = require('./routes/guestBookings');

// Import error handler
const errorHandler = require('./middleware/errorHandler');

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://homehugpoolvilla_0111:homehugpoolvilla_0111@cluster0.yewk82f.mongodb.net/poolvilla?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.log('MongoDB connection error:', err.message);
  console.log('Application will continue running without database connection');
});

// Routes
app.use('/api/villas', require('./routes/villas'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings/guest', guestBookingsRoutes);
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/reviews', require('./routes/reviews'));

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API test route for debugging
app.get('/api/debug/villa/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    receivedId: id,
    isValidObjectId: mongoose.Types.ObjectId.isValid(id),
    timestamp: new Date().toISOString()
  });
});

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/build')));

// ใช้ error handler middleware (ต้องอยู่หลัง routes)
app.use(errorHandler);

// สำหรับทุก request ที่ไม่ใช่ API routes ให้ส่ง index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});