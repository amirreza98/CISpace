require('dotenv').config();
const mongoose = require('mongoose');
const Reservation = require('./models/Reservation');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    // پاک‌سازی قبلی
    await Reservation.deleteMany({});

    // اضافه کردن تستی
    await Reservation.create({
      Tables: [
        { id: 1, type: 'Four-seater', position: { x: 45, y: 85 } },
        { id: 2, type: 'Four-seater', position: { x: 64, y: 85 } },
        { id: 3, type: 'Four-seater', position: { x: 83, y: 78 } },
        { id: 4, type: 'Single-seater', position: { x: 80, y: 55 } },
        { id: 5, type: 'Single-seater', position: { x: 80, y: 39 } },
        { id: 6, type: 'Single-seater', position: { x: 52, y: 39 } },
        { id: 7, type: 'Single-seater', position: { x: 52, y: 23 } },
        { id: 8, type: 'Single-seater', position: { x: 52, y: 7 } },
      ],
      Rooms: [
        { id: 1, type: 'Room A', position: { x: 21, y: 1 } },
        { id: 2, type: 'Room B', position: { x: 21, y: 66 } }
      ],
      Walls: [
        { id: 1, type: 'Wall A', position: { x: 10, y: 0 } },
        { id: 2, type: 'Wall B', position: { x: 70, y: 0 } }
      ]
    });

    console.log('✅ دیتا تستی اضافه شد');
    process.exit(0);
  } catch (e) {
    console.error('❌ خطا در seeding:', e);
    process.exit(1);
  }
})();
