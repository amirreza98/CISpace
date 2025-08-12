const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const authMiddleware = require('../middleware/authMiddleware');

// لاگ ساده
router.use((req,res,next)=>{
  console.log(`[RES] ${req.method} ${req.originalUrl}`);
  next();
});

// گرفتن همه
router.get('/', authMiddleware, async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ msg: 'خطا در دریافت درخواست‌ها' });
  }
});

// تایید
router.put('/:id/approve', authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { $set: { status: 'approved' } },
      { new: true }
    );
    if (!reservation) return res.status(404).json({ msg: 'درخواست پیدا نشد' });
    res.json({ msg: 'درخواست تایید شد', reservation });
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ msg: 'ID نامعتبر' });
    res.status(500).json({ msg: 'خطا در تایید درخواست' });
  }
});

// رد
router.put('/:id/reject', authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { $set: { status: 'rejected' } },
      { new: true }
    );
    if (!reservation) return res.status(404).json({ msg: 'درخواست پیدا نشد' });
    res.json({ msg: 'درخواست رد شد', reservation });
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ msg: 'ID نامعتبر' });
    res.status(500).json({ msg: 'خطا در رد درخواست' });
  }
});

module.exports = router;
