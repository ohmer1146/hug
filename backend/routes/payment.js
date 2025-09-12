// backend/routes/payment.js
const express = require('express');
const omise = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY
});
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const router = express.Router();

// สร้าง charge สำหรับการชำระเงิน
router.post('/create-charge', auth, async (req, res) => {
  try {
    const { bookingId, token } = req.body;
    
    const booking = await Booking.findById(bookingId).populate('villa');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // สร้าง charge ด้วย Omise
    const charge = await omise.charges.create({
      amount: booking.totalPrice * 100, // Omise ใช้หน่วยสตางค์
      currency: 'thb',
      card: token,
      description: `Booking for ${booking.villa.name}`
    });

    if (charge.status === 'successful') {
      // อัพเดทสถานะการจอง
      booking.paymentStatus = 'paid';
      booking.transactionId = charge.id;
      await booking.save();

      // ส่งอีเมลยืนยัน
      const user = await User.findById(booking.user);
      await sendBookingConfirmation(booking, user);

      res.json({ message: 'Payment successful', booking });
    } else {
      res.status(400).json({ message: 'Payment failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment error' });
  }
});

module.exports = router;