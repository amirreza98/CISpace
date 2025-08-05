const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ثبت‌نام ادمین
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing = await Admin.findOne({ username });
    if (existing) return res.status(400).json({ msg: 'ادمین قبلاً ساخته شده' });

    const hashed = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ username, password: hashed });
    await newAdmin.save();

    res.status(201).json({ msg: 'ادمین ساخته شد' });
  } catch (err) {
    res.status(500).json({ msg: 'خطای سرور' });
  }
});

// ورود ادمین
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ msg: 'ادمین پیدا نشد' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: 'رمز اشتباهه' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'خطای سرور' });
  }
});

module.exports = router;
