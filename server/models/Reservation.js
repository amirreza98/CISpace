const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  type: { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  reservationDetail: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'approved', 'rejected', ''], default: '' }
});

const reservationSchema = new mongoose.Schema({
  Tables: [itemSchema],
  Rooms: [itemSchema],
  Walls: [itemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
