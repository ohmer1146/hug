// backend/scripts/seedVillas.js
const mongoose = require('mongoose');
const Villa = require('../models/Villa');
require('dotenv').config();

const sampleVillas = [
  {
    name: "Home Hug Pool Villa 1",
    description: "พูลวิลล่าสุดหรูในพัทยา พร้อมสระว่ายน้ำส่วนตัว",
    location: "พัทยา",
    pricePerNight: 12500,
    bedrooms: 3,
    bathrooms: 2,
    capacity: 6,
    amenities: ["สระว่ายน้ำส่วนตัว", "ที่จอดรถ", "WiFi", "เครื่องปรับอากาศ"],
    images: ["https://example.com/image1.jpg"],
    coordinates: { lat: 12.9235, lng: 100.8824 }
  },
  // เพิ่มวิลล่าอื่นๆ...
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // ลบข้อมูลเก่า
    await Villa.deleteMany({});
    console.log('Cleared existing villas');

    // เพิ่มข้อมูลใหม่
    await Villa.insertMany(sampleVillas);
    console.log('Sample villas added successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();