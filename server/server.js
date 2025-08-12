const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const router = require('./routes/reservation');

const app = express();
app.use(cors());
app.use(express.json());




// فقط ایمیل بدون MongoDB
app.post('/api/reserve', async (req, res) => {
  const { email, seat, type, time, bookingId } = req.body;

  try {
    // Nodemailer کانفیگ
    const transporter = nodemailer.createTransport({
      service: 'gmail', // یا mailtrap
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ایمیل محتوا
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Reservation Confirmation - ${bookingId}`,
      html: `
        <h2>Your Reservation is Confirmed 🎉</h2>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Seat:</strong> ${seat}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p>Thanks for choosing us!</p>
      `,
    };

    // ارسال ایمیل
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

app.use('/api', authRoutes);
app.use('/api/admin/reservations', router);

// اجرای سرور
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// وصل شدن به دیتابیس
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB وصل شد');
  app.listen(5000, () => console.log('🚀 Server is running on http://localhost:5000'));
}).catch(err => {
  console.error('❌', err);
});
