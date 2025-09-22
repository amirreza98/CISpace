const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const router = require('./routes/reservation');
const Reservation = require('./models/Reservation');

const app = express();
app.use(cors());
app.use(express.json());


// 📌 روت رزرو + ذخیره در MongoDB + ارسال ایمیل
app.post('/api/reserve', async (req, res) => {
  const { email, seat, type, time, bookingId, note } = req.body;
  console.log('POST /api/reserve payload:', { email, seat, type, time, bookingId, note });

  try {
    const layout = await Reservation.findOne();
    if (!layout) {
      console.log('No layout found in DB');
      return res.status(404).json({ error: 'Layout پیدا نشد (no layout document)' });
    }

    const item =
      layout.Tables?.find(t => String(t.id) === String(seat)) ||
      layout.Rooms?.find(r => String(r.id) === String(seat)) ||
      layout.Walls?.find(w => String(w.id) === String(seat));

    if (!item) {
      console.log('Seat not found. seat=', seat, {
        tablesIds: layout.Tables?.map(x => x.id),
        roomIds: layout.Rooms?.map(x => x.id),
        wallIds: layout.Walls?.map(x => x.id),
      });
      return res.status(404).json({ error: 'آیتم پیدا نشد (seat id not in layout)' });
    }

    // 3️⃣ آپدیت آیتم انتخاب‌شده
    item.reservationDetail = JSON.stringify({
      bookingId,
      email,
      seat,
      type,
      time,
      note,
    });
    item.status = 'pending';

    await layout.save(); // ذخیره در MongoDB

    // 4️⃣ ارسال ایمیل
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Reservation Confirmation - ${bookingId}`,
      html: `
        <h2>Your Reservation is Confirmed 🎉</h2>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Seat/Room ID:</strong> ${seat}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Time:</strong> ${time}</p>
        ${note ? `<p><strong>Note:</strong> ${note}</p>` : ""}
        <p>Status: Pending (waiting for admin)</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Reservation saved & email sent ✅', item });

  } catch (error) {
    console.error('❌ Error in /api/reserve:', error);
    res.status(500).json({ error: 'Failed to process reservation' });
  }
});


// 📌 روت‌ها
app.use('/api', authRoutes);
app.use('/api/admin/reservations', router);
app.use('/api/reservationpost', require('./routes/reservationpost'));


// 📌 اتصال به دیتابیس و ران شدن سرور فقط یک بار
const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB وصل شد');
  app.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
