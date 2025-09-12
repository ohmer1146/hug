// backend/routes/reviews.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');
const Villa = require('../models/Villa');
const auth = require('../middleware/auth');
const router = express.Router();

// Get reviews for a villa
router.get('/villa/:villaId', async (req, res) => {
  try {
    const reviews = await Review.find({ villa: req.params.villaId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a review
router.post('/', [
  auth,
  body('villaId').isMongoId(),
  body('rating').isInt({ min: 1, max: 5 }),
  body('comment').isLength({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { villaId, rating, comment } = req.body;

    // Check if user has already reviewed this villa
    const existingReview = await Review.findOne({
      villa: villaId,
      user: req.user.id
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this villa' });
    }

    // Create review
    const review = new Review({
      villa: villaId,
      user: req.user.id,
      rating,
      comment
    });

    await review.save();
    await review.populate('user', 'name avatar');

    // Update villa rating
    await updateVillaRating(villaId);

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to update villa rating
async function updateVillaRating(villaId) {
  const result = await Review.aggregate([
    { $match: { villa: mongoose.Types.ObjectId(villaId) } },
    { $group: { _id: '$villa', averageRating: { $avg: '$rating' } } }
  ]);

  if (result.length > 0) {
    await Villa.findByIdAndUpdate(villaId, {
      rating: result[0].averageRating
    });
  }
}

module.exports = router;