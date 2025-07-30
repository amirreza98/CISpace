import React, { useEffect, useState } from 'react';
import seatsData from '../data/seats';

const LayoutOverlay = ({ timing, onBack, onConfirm }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeatId, setSelectedSeatId] = useState(null);

  useEffect(() => {
    setSeats(seatsData);
  }, []);

  const handleSelect = (seat) => {
    if (!seat.available) return;
    setSelectedSeatId(seat.id === selectedSeatId ? null : seat.id);
  };

  return (
    <div className="w-full max-w-md p-4">
      <h3 className="text-xl font-bold text-white mb-4 text-center">Available Seats</h3>

      {/* کانتینر نقشه با position: relative و ارتفاع مناسب */}
      <div
        className="relative w-full min-h-[600px] border border-white/20 rounded-md overflow-hidden"
      >
        {seats.map((seat) => (
          <div
            key={seat.id}
            onClick={() => handleSelect(seat)}
            style={{
              position: 'absolute',
              left: `${seat.position.x}px`,
              top: `${seat.position.y}px`,
            }}
            className={`
              w-10 h-10 rounded-sm cursor-pointer transition-all
              ${!seat.available ? 'bg-gray-400 cursor-not-allowed' :
                seat.id === selectedSeatId ? 'bg-yellow-400' : 'bg-green-500 hover:bg-green-600'}
            `}
            title={`Seat #${seat.id}`}
          />
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-600"
        >
          Back
        </button>

        {selectedSeatId && (
          <button
            onClick={() => onConfirm(selectedSeatId)}
            className="bg-emerald-600 px-4 py-2 rounded text-white hover:bg-emerald-700"
          >
            Confirm Seat #{selectedSeatId}
          </button>
        )}
      </div>
    </div>
  );
};

export default LayoutOverlay;
