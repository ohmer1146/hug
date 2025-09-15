const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/poolvilla';

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
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/reviews', require('./routes/reviews'));

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Serve static files - ALWAYS try to serve frontend (ไม่ใช่แค่ production)
const frontendBuildPath = path.join(__dirname, '../frontend/build');
console.log('Frontend build path:', frontendBuildPath);

// ตรวจสอบว่า frontend build directory มีอยู่จริง
const fs = require('fs');
if (fs.existsSync(frontendBuildPath)) {
  console.log('Frontend build directory exists');
  app.use(express.static(frontendBuildPath));
} else {
  console.log('Frontend build directory does not exist - serving API only');
}

// สำหรับทุก request ที่ไม่ใช่ API routes ให้ส่ง index.html
app.get('*', (req, res) => {
  if (fs.existsSync(frontendBuildPath)) {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  } else {
    res.status(404).json({ 
      message: 'Frontend not built. Please check build process.',
      api: 'API is working. Use /api endpoints.'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});