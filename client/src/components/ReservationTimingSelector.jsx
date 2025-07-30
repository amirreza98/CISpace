import React, { useState } from 'react';

const ReservationTimingSelector = ({ onSelect, onBack }) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');

  const handleConfirm = () => {
    if (date && startTime && duration) {
      onSelect({ date, startTime, duration });
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="p-4 max-w-md bg-white/10 rounded-xl shadow-md text-white">
      <h2 className="text-xl font-bold text-center pb-4">When do you need the space?</h2>

      <div className="flex flex-col gap-4">
        {/* Date */}
        <div>
          <label className="block mb-1">Select Day:</label>
          <input
            type="date"
            className="w-full p-2 rounded bg-white/10 text-white border border-white/30"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Start Time */}
        <div>
          <label className="block mb-1">Start Time:</label>
          <input
            type="time"
            className="w-full p-2 rounded bg-white/10 text-white border border-white/30"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1">Duration (hours):</label>
          <select
            className="w-full p-2 rounded bg-white/10 text-white border border-white/30"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="" className='text-black'>Select duration</option>
            <option value="1" className='text-black'>1 hour</option>
            <option value="2" className='text-black'>2 hours</option>
            <option value="3" className='text-black'>3 hours</option>
            <option value="4" className='text-black'>4 hours</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600 transition"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-700 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationTimingSelector;
