// backend/models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  villa: { type: mongoose.Schema.Types.ObjectId, ref: 'Villa', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Prevent user from submitting more than one review per villa
reviewSchema.index({ villa: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);