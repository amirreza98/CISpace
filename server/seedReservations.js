require('dotenv').config();
const mongoose = require('mongoose');
const Reservation = require('./models/Reservation');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    await Reservation.deleteMany({}); // پاک‌سازی قبلی (اختیاری)
    await Reservation.insertMany([
      { name: 'A-01', seatNumber: 'user1@example.com', startTime: '1995-12-17T03:24:00', endTime: '1995-12-17T03:24:00', status: 'pending' },
      { name: 'A-02', seatNumber: 'user2@example.com', startTime: '1995-12-17T03:24:00', endTime: '1995-12-17T03:24:00', status: 'pending' },
      { name: 'A-03', seatNumber: 'user3@example.com', startTime: '1995-12-17T03:24:00', endTime: '1995-12-17T03:24:00', status: 'pending' },
      { name: 'A-04', seatNumber: 'user4@example.com', startTime: '1995-12-17T03:24:00', endTime: '1995-12-17T03:24:00', status: 'pending' },
      { name: 'A-05', seatNumber: 'user5@example.com', startTime: '1995-12-17T03:24:00', endTime: '1995-12-17T03:24:00', status: 'pending' },

    ]);
    console.log('✅ رزروهای تستی اضافه شد');
    process.exit(0);
  } catch (e) {
    console.error('❌ خطا در seeding:', e);
    process.exit(1);
  }
})();
