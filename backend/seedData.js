const mongoose = require('mongoose');
const Villa = require('./models/Villa');
require('dotenv').config();

const sampleVillas = [
  {
    name: "Luxury Pool Villa in Phuket",
    description: "Beautiful luxury villa with private pool and ocean view",
    location: "Phuket, Thailand",
    pricePerNight: 15000,
    bedrooms: 3,
    bathrooms: 2,
    capacity: 6,
    amenities: ["Swimming Pool", "Wi-Fi", "Air Conditioning", "TV", "Kitchen", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    coordinates: {
      lat: 7.8804,
      lng: 98.3923
    },
    available: true,
    featured: true
  },
  {
    name: "Beachfront Villa in Koh Samui",
    description: "Stunning beachfront villa with direct access to the beach",
    location: "Koh Samui, Thailand",
    pricePerNight: 20000,
    bedrooms: 4,
    bathrooms: 3,
    capacity: 8,
    amenities: ["Swimming Pool", "Wi-Fi", "Air Conditioning", "TV", "Kitchen", "Beach Access"],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80"
    ],
    coordinates: {
      lat: 9.5120,
      lng: 100.0136
    },
    available: true,
    featured: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/poolvilla');
    console.log('Connected to MongoDB');
    
    // ล้างข้อมูลเดิม (ถ้ามี)
    await Villa.deleteMany({});
    console.log('Cleared existing villas');
    
    // เพิ่มข้อมูลตัวอย่าง
    await Villa.insertMany(sampleVillas);
    console.log('Sample villas added successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();