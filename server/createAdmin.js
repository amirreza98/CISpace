require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const admin = new Admin({
      username: 'admin', 
      email: 'admin@example.com', // ایمیل ادمین
      password: '12345678'        // رمز ادمین (خودش هش میشه)
    });

    await admin.save();
    console.log('✅ ادمین ساخته شد با موفقیت');
    process.exit();
  } catch (err) {
    console.error('❌ خطا در ساخت ادمین:', err);
    process.exit(1);
  }
})();
