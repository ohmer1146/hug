// backend/routes/guestBookings.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Villa = require('../models/Villa');
const router = express.Router();

// สร้างการจองสำหรับผู้ใช้ทั่วไป (ไม่ต้องล็อกอิน)
router.post('/', [
  body('villaId').isMongoId(),
  body('checkIn').isISO8601(),
  body('checkOut').isISO8601(),
  body('guests').isInt({ min: 1 }),
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('email').isEmail(),
  body('phone').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      villaId,
      checkIn,
      checkOut,
      guests,
      additionalGuests = 0,
      firstName,
      lastName,
      email,
      phone,
      specialRequests = ''
    } = req.body;

    // ตรวจสอบว่าวิลล่าว่างหรือไม่
    const villa = await Villa.findById(villaId);
    if (!villa) {
      return res.status(404).json({ message: 'ไม่พบวิลล่า' });
    }

    // ตรวจสอบความจุ
    const totalGuests = parseInt(guests) + parseInt(additionalGuests);
    if (totalGuests > villa.capacity) {
      return res.status(400).json({ 
        message: `จำนวนผู้เข้าพักเกินความจุ (สูงสุด ${villa.capacity} คน)` 
      });
    }

    // ตรวจสอบว่าวันที่จองว่างหรือไม่
    const existingBooking = await Booking.findOne({
      villa: villaId,
      $or: [
        { 
          checkIn: { $lte: new Date(checkOut) }, 
          checkOut: { $gte: new Date(checkIn) } 
        }
      ],
      status: { $in: ['confirmed', 'pending'] }
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'วันที่เลือกมีการจองแล้ว' });
    }

    // คำนวณราคารวม
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const basePrice = villa.pricePerNight * nights;
    const extraGuestPrice = additionalGuests > 0 ? additionalGuests * 300 * nights : 0;
    const totalPrice = basePrice + extraGuestPrice;

    // สร้างหมายเลขอ้างอิง
    const referenceNumber = 'HH' + Date.now().toString().slice(-6);

    // สร้างการจอง
    const booking = new Booking({
      villa: villaId,
      guestInfo: {
        firstName,
        lastName,
        email,
        phone
      },
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests: totalGuests,
      additionalGuests: parseInt(additionalGuests),
      totalPrice,
      specialRequests,
      referenceNumber,
      status: 'pending',
      paymentStatus: 'pending',
      bookingType: 'guest' // ระบุว่าเป็นการจองโดยผู้ใช้ทั่วไป
    });

    await booking.save();
    await booking.populate('villa', 'name images location');

    res.status(201).json({
      ...booking.toObject(),
      message: 'การจองสำเร็จ กรุณาชำระเงินภายใน 24 ชั่วโมง'
    });
  } catch (error) {
    console.error('Guest booking error:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการจอง' });
  }
});

module.exports = router;