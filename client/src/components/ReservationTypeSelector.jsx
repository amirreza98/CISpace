import React, { useState } from 'react';

const ReservationTypeSelector = ({ onButtonClick }) => {
  const [selected, setSelected] = useState(null);

  const handleClick = (type) => {
    setSelected(type);
    onButtonClick?.(type); 
  };

  return (
    <div className="p-4 max-w-md bg-white/10 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-center pb-2">A Space For:</h2>

      <div className="flex flex-col gap-3">
        {['Room', 'Seat', 'Gallery'].map((type) => (
          <button
            key={type}
            onClick={() => handleClick(type)}
            className={`p-3 rounded-lg border transition-colors duration-300 ${
              selected === type
                ? 'bg-emerald-500 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {selected && (
        <div className="text-center mt-4 text-green-950 font-semibold">
          You have selected "{selected}".
        </div>
      )}
    </div>
  );
};

export default ReservationTypeSelector;
