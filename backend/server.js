const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const guestBookingsRoutes = require('./routes/guestBookings');

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
  res.json({ status: 'OK', message: 'Server is running' });
});

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/build')));

// สำหรับทุก request ที่ไม่ใช่ API routes ให้ส่ง index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});