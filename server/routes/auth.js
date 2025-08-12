const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();

// مسیر لاگین ادمین
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. پیدا کردن ادمین
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'نام کاربری اشتباه است' });
    }

    // 2. مقایسه رمز عبور
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'رمز عبور اشتباه است' });
    }

    // 3. ساخت توکن JWT
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 4. ارسال توکن به فرانت
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطای سرور' });
  }
});

module.exports = router;
