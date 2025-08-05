const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const authMiddleware = require('../middleware/authMiddleware');

// میاد همه درخواست‌ها رو میاره (فقط ادمین)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ msg: 'خطا در دریافت درخواست‌ها' });
  }
});

// تایید درخواست
router.put('/:id/approve', authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ msg: 'درخواست پیدا نشد' });

    reservation.status = 'approved';
    await reservation.save();

    res.json({ msg: 'درخواست تایید شد' });
  } catch (err) {
    res.status(500).json({ msg: 'خطا در تایید درخواست' });
  }
});

// رد کردن درخواست
router.put('/:id/reject', authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ msg: 'درخواست پیدا نشد' });

    reservation.status = 'rejected';
    await reservation.save();

    res.json({ msg: 'درخواست رد شد' });
  } catch (err) {
    res.status(500).json({ msg: 'خطا در رد درخواست' });
  }
});

module.exports = router;
