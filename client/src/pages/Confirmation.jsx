import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Confirmation() {
  const { state } = useLocation();
  const reservationData = state?.reservationData; // مطمئن شدیم اسم درست باشه

  const [email, setEmail] = useState('');
  const [bookingId, setBookingId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const id = 'RSV-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setBookingId(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      seat: reservationData.item,
      type: reservationData.type,
      time: `${reservationData.timing.date} ${reservationData.timing.startTime}`,
      bookingId,
      note: reservationData.note || null,
    };

    try {
      const res = await fetch('http://localhost:5001/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Reservation confirmed and email sent!');
      } else {
        alert('Something went wrong: ' + data.error);
      }
    } catch (err) {
      alert('Server error: ' + err.message);
    }
  };

  if (!reservationData) {
    return (
      <div className="p-6 text-center text-red-500">
        No reservation data found.
        <button
          onClick={() => navigate('/')}
          className="block mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
        Reservation Confirmed!
      </h2>

      <div className="space-y-2 text-gray-700">
        <p><strong>Booking ID:</strong> {bookingId}</p>
        <p><strong>item:</strong> {reservationData.type} {reservationData.item}</p>
        <p>
          <strong>Time:</strong> {reservationData.timing.date} at {reservationData.timing.startTime} 
          ({reservationData.timing.duration} hrs)
        </p>
        {reservationData.note && <p><strong>Note:</strong> {reservationData.note}</p>}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-gray-700">Enter your email for confirmation:</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            placeholder="you@example.com"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700"
        >
          Confirm & Send Email
        </button>
      </form>

      <button
        onClick={() => navigate('/')}
        className="w-full mt-4 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
      >
        Back to Home
      </button>
    </div>
  );
}

export default Confirmation;
