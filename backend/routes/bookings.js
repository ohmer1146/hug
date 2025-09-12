// backend/routes/bookings.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Villa = require('../models/Villa');
const auth = require('../middleware/auth');
const router = express.Router();

// สร้างการจองใหม่
router.post('/', [
  auth,
  body('villaId').isMongoId(),
  body('checkIn').isISO8601(),
  body('checkOut').isISO8601(),
  body('guests').isInt({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { villaId, checkIn, checkOut, guests, specialRequests } = req.body;
    
    // ตรวจสอบว่าวิลล่าว่างหรือไม่
    const villa = await Villa.findById(villaId);
    if (!villa) {
      return res.status(404).json({ message: 'Villa not found' });
    }

    // ตรวจสอบความจุ
    if (guests > villa.capacity) {
      return res.status(400).json({ message: 'Number of guests exceeds villa capacity' });
    }

    // ตรวจสอบว่าวันที่จองว่างหรือไม่
    const existingBooking = await Booking.findOne({
      villa: villaId,
      $or: [
        { checkIn: { $lte: new Date(checkOut) }, checkOut: { $gte: new Date(checkIn) } }
      ],
      status: { $in: ['confirmed', 'pending'] }
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Villa is not available for the selected dates' });
    }

    // คำนวณราคารวม
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalPrice = villa.pricePerNight * nights;

    // สร้างการจอง
    const booking = new Booking({
      villa: villaId,
      user: req.user.id,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      specialRequests
    });

    await booking.save();
    await booking.populate('villa', 'name images');
    
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ดูการจองของ user
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('villa', 'name images location')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;