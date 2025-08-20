const express = require('express');
const reservationpost = express.Router();
const Reservation = require('../models/Reservation');

// گرفتن کل layout (Tables + Rooms + Walls)
reservationpost.get('/', async (req, res) => {
  try {
    const layout = await Reservation.findOne(); // چون یه داکیومنت داری
    if (!layout) return res.status(404).json({ msg: 'Layout پیدا نشد' });
    res.json(layout);
  } catch (err) {
    res.status(500).json({ msg: 'خطا در دریافت layout' });
  }
});

module.exports = reservationpost;