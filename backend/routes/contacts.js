const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Contact form submission
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    // Here you would typically save to database or send an email
    console.log('Contact form submission:', { name, email, message });

    res.status(200).json({ 
      message: 'Thank you for your message! We will get back to you soon.' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;