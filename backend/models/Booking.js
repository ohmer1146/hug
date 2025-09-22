// backend/models/Booking.js - อัพเดท schema
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  villa: { type: mongoose.Schema.Types.ObjectId, ref: 'Villa', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // ไม่บังคับสำหรับผู้ใช้ทั่วไป
  guestInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true },
  additionalGuests: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
    default: 'pending' 
  },
  specialRequests: String,
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  transactionId: String,
  referenceNumber: { type: String, unique: true },
  bookingType: {
    type: String,
    enum: ['user', 'guest'],
    default: 'user'
  }
}, { timestamps: true });

// ตรวจสอบวันที่ซ้ำกัน
bookingSchema.index({ villa: 1, checkIn: 1, checkOut: 1 });

module.exports = mongoose.model('Booking', bookingSchema);