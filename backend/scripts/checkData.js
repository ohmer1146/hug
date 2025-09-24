// backend/scripts/checkData.js
const mongoose = require('mongoose');
const Villa = require('../models/Villa');
require('dotenv').config();

const checkDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // นับจำนวนวิลล่า
    const villaCount = await Villa.countDocuments();
    console.log(`Total villas in database: ${villaCount}`);

    // แสดงรายการวิลล่า
    const villas = await Villa.find().select('name _id location pricePerNight').limit(5);
    console.log('Sample villas:');
    villas.forEach(villa => {
      console.log(`- ${villa.name} (${villa._id}) - ${villa.location} - ฿${villa.pricePerNight}`);
    });

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error checking database:', error);
  }
};

checkDatabase();