import React, { useEffect, useState } from 'react';
import Layout from '../assets/Layout.png';
import seatsData from '../data/seats';

function LayoutView({ showSeats, onBack, onConfirm }) {
  const [seats, setSeats] = useState([]);
  const [selectedSeatId, setSelectedSeatId] = useState(null);

  useEffect(() => {
    setSeats(seatsData); // در آینده با fetch جایگزین می‌شه
  }, []);

  const handleSelect = (seat) => {
    if (!seat.available) return;
    setSelectedSeatId(seat.id === selectedSeatId ? null : seat.id);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto p-4">
      {/* نقشه */}
      <div className="relative w-full h-auto">
        <img src={Layout} alt="Layout" className="w-full h-auto" />

        {/* صندلی‌ها */}
        {showSeats===4 && (seats.map((seat) => (
          <div
            key={seat.id}
            onClick={() => handleSelect(seat)}
            style={{
              left: `${seat.position.x}%`,
              top: `${seat.position.y}%`,
            }}
            className={`
              absolute w-10 h-10 rounded-sm cursor-pointer
              transition-all duration-200
              ${!seat.available ? 'bg-gray-400 cursor-not-allowed' :
                seat.id === selectedSeatId ? 'bg-yellow-400' : 'bg-green-500 hover:bg-green-600'}
            `}
            title={`Seat #${seat.id}`}
          />
        )))}
      </div>

      {/* کنترل‌ها */}
      <div className="flex justify-between items-center mt-6">
        {onBack && (
          <button
            onClick={onBack}
            className="bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-600"
          >
            Back
          </button>
        )}

        {selectedSeatId && (
          <button
            onClick={() => onConfirm?.(selectedSeatId)}
            className="bg-emerald-600 px-4 py-2 rounded text-white hover:bg-emerald-700"
          >
            Confirm Seat #{selectedSeatId}
          </button>
        )}
      </div>
    </div>
  );
}

export default LayoutView;
