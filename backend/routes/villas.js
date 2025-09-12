const express = require('express');
const router = express.Router();
const Villa = require('../models/Villa');
const Booking = require('../models/Booking');

// Get all villas
router.get('/', async (req, res) => {
  try {
    const villas = await Villa.find({ available: true });
    res.json(villas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get villa by ID
router.get('/:id', async (req, res) => {
  try {
    const villa = await Villa.findById(req.params.id);
    if (!villa) {
      return res.status(404).json({ message: 'Villa not found' });
    }
    res.json(villa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured villas
router.get('/featured/featured', async (req, res) => {
  try {
    const villas = await Villa.find({ featured: true, available: true });
    res.json(villas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search villas
router.get('/search', async (req, res) => {
  try {
    const { location, checkIn, checkOut, guests, minPrice, maxPrice, amenities } = req.query;
    let query = { available: true };

    // ค้นหาตาม location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // ค้นหาตามจำนวนผู้เข้าพัก
    if (guests) {
      query.capacity = { $gte: parseInt(guests) };
    }

    // ค้นหาตามราคา
    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = parseInt(minPrice);
      if (maxPrice) query.pricePerNight.$lte = parseInt(maxPrice);
    }

    // ค้นหาตาม amenities
    if (amenities) {
      const amenitiesArray = amenities.split(',');
      query.amenities = { $all: amenitiesArray };
    }

    let villas = await Villa.find(query);

    // ตรวจสอบความว่างของวันที่
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      // ค้นหาการจองที่ทับซ้อน
      const overlappingBookings = await Booking.find({
        checkIn: { $lte: checkOutDate },
        checkOut: { $gte: checkInDate },
        status: { $in: ['confirmed', 'pending'] }
      }).select('villa');

      const bookedVillaIds = overlappingBookings.map(booking => booking.villa.toString());
      
      // กรองวิลล่าที่ว่าง
      villas = villas.filter(villa => !bookedVillaIds.includes(villa._id.toString()));
    }

    res.json(villas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;