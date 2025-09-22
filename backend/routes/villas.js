const express = require('express');
const router = express.Router();
const Villa = require('../models/Villa');
const Booking = require('../models/Booking');

// ต้องวาง route พิเศษก่อน route ทั่วไป

// ตรวจสอบว่ามีข้อมูลวิลล่าหรือไม่ (ต้องอยู่ก่อน :id)
router.get('/check/data', async (req, res) => {
  try {
    const count = await Villa.countDocuments();
    const villas = await Villa.find().limit(3);
    
    res.json({
      totalVillas: count,
      sampleVillas: villas
    });
  } catch (error) {
    console.error('Error checking villa data:', error);
    res.status(500).json({ message: 'Error checking villa data' });
  }
});

// Create sample villas (ต้องอยู่ก่อน :id)
router.post('/samples', async (req, res) => {
  try {
    console.log('Creating sample villas...');
    
    const sampleVillas = [
      {
        name: "วิลล่าคุณหนู",
        description: "วิลล่าสวยงามที่พัทยา พร้อมสระว่ายน้ำส่วนตัวและวิวทะเล",
        location: "พัทยา",
        pricePerNight: 2500,
        bedrooms: 3,
        bathrooms: 2,
        capacity: 6,
        amenities: ["สระว่ายน้ำ", "ที่จอดรถ", "WiFi", "เครื่องปรับอากาศ", "ทีวี"],
        images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"],
        coordinates: { lat: 12.9235, lng: 100.8824 },
        available: true,
        featured: true,
        rating: 4.5
      },
      {
        name: "วิลล่าทะเลสวย",
        description: "วิลล่าติดทะเลที่หัวหิน พร้อมห้องนอน 4 ห้องและสวนส่วนตัว",
        location: "หัวหิน",
        pricePerNight: 3500,
        bedrooms: 4,
        bathrooms: 3,
        capacity: 8,
        amenities: ["สระว่ายน้ำ", "เตาบาร์บีคิว", "ที่จอดรถ", "WiFi", "ครัว"],
        images: ["https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800"],
        coordinates: { lat: 12.5697, lng: 99.9587 },
        available: true,
        featured: true,
        rating: 4.8
      }
    ];

    // ลบข้อมูลเก่า (optional)
    await Villa.deleteMany({});
    
    // เพิ่มข้อมูลใหม่
    const result = await Villa.insertMany(sampleVillas);
    console.log('Sample villas created successfully');
    
    res.json({ 
      message: 'Sample villas created successfully', 
      count: result.length,
      villas: result 
    });
  } catch (error) {
    console.error('Error creating sample villas:', error);
    res.status(500).json({ message: 'Error creating sample villas', error: error.message });
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

// Get all villas (route หลัก)
router.get('/', async (req, res) => {
  try {
    const villas = await Villa.find({ available: true });
    res.json(villas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get villa by ID (ต้องอยู่หลัง route พิเศษทั้งหมด)
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