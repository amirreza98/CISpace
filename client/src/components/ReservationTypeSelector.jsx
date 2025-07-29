import React, { useState } from 'react';

const ReservationTypeSelector = () => {
  const [selectedType, setSelectedType] = useState(null);

  const handleSelect = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="p-4 max-w-md bg-white/10 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-center pb-2"> A Space For: </h2>

      <div className="flex flex-col gap-3">
        {['Event', 'Room', 'Seat'].map((type) => (
          <button
            key={type}
            onClick={() => handleSelect(type)}
            className={`p-3 rounded-lg border ${
              selectedType === type
                ? 'bg-emerald-800 text-gray-900'
                : 'bg-white/30 hover:bg-gray-200'
            }`}
          >
           {type}
          </button>
        ))}
      </div>

      {selectedType && (
        <div className="text-center mt-4 text-green-600 font-semibold">
          You have selected "{selectedType}".
        </div>
      )}
    </div>
  );
};

export default ReservationTypeSelector;
