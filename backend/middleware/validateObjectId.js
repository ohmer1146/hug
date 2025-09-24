// backend/middleware/validateObjectId.js
const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  // ตรวจสอบว่า id มีค่าและเป็น ObjectId ที่ถูกต้อง
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
      receivedId: id,
      expected: 'Valid MongoDB ObjectId'
    });
  }
  
  next();
};

module.exports = validateObjectId;