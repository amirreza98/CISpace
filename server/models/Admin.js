const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true }
});

// قبل از ذخیره شدن، پسورد رو هش کن
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// مقایسه پسورد وارد شده با هش ذخیره شده
adminSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
