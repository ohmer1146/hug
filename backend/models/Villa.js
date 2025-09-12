const mongoose = require('mongoose');

const villaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  capacity: { type: Number, required: true },
  amenities: [String],
  images: [String],
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  available: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Villa', villaSchema);