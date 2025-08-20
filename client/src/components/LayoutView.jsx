import React, { useEffect, useState } from 'react';
import Layout from '../assets/Layout.png';
import GalleryImg from '../assets/GalleryImg.png';
import api from '../api/api';

function LayoutView({ type= 'Seat', showSeats, onConfirm }) {
  const [data, setData] = useState({ Tables: [], Rooms: [], Walls: [] });
  const [selectedId, setSelectedId] = useState(null);
  const [note, setNote] = useState('');

  // useEffect(() => {
  //   setSeats(seatsData); // در آینده با fetch جایگزین می‌شه
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/reservationpost');
      setData(res.data);   // کل دیتا یک‌بار ذخیره میشه
    };
    fetchData();
  }, []);


  const handleSelect = (item) => {
    if (item.status) return;
    setSelectedId(item.id === selectedId ? null : item.id);
  };

    const renderContent = () => {
    if (type === 'Seat') {
      return (
        <>
          <img src={Layout} alt="Layout" className="w-full h-auto" />
          {showSeats === 4 &&
            data.Tables.map((seat) => (
              <div
                key={seat.id}
                onClick={() => handleSelect(seat)}
                style={{ left: `${seat.position.x}%`, top: `${seat.position.y}%` }}
                className={`
                  absolute w-10 h-10 rounded-sm cursor-pointer
                  transition-all duration-200
                  ${seat.status ? 'bg-gray-400 cursor-not-allowed' :
                    seat.id === selectedId ? 'bg-yellow-400' : 'bg-green-500 hover:bg-green-600'}
                `}
                title={`Seat #${seat.id}`}
              />
            ))}
        </>
      );
    }

    if (type === 'Room') {
      return (
        <>
          <img src={Layout} alt="Layout" className="w-full h-auto" />
          {showSeats === 4 &&
          data.Rooms.map((room) => (
            <div
              key={room.id}
              onClick={() => handleSelect(room)}
              style={{ left: `${room.position.x}%`, top: `${room.position.y}%` }}
              className={`
                absolute p-6 border rounded-lg cursor-pointer text-center
                ${room.status ? 'bg-gray-300/5 cursor-not-allowed' :
                  room.id === selectedId ? 'bg-yellow-300/30' : 'bg-green-200/5 hover:bg-green-300'}
                ${room.type === "Room A" ? "w-60 h-80" : "w-60 h-40"}
              `}
            >
              {room.type}
            </div>
          ))}
        </>
      );
    }

    if (type === 'Gallery') {
      return (
        <img src={GalleryImg} alt="Gallery" className="w-max h-auto rounded-lg shadow-lg" />
      );
    }

    return <p>Any detail you may tell us.</p>;
  };

  return (
    <div className="relative w-full  mx-auto p-4">
      <div className="relative w-full h-auto">{renderContent()}</div>

      {/* باکس توضیحات */}
      { showSeats === 4 && (
      <textarea
        className="w-full mt-6 p-3 border rounded-lg focus:ring focus:ring-emerald-300"
        placeholder="any note you may tell us."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />)}

      {/* کنترل‌ها */}
      <div className="flex justify-between items-center mt-6">

        {(selectedId || type === "Gallery") && (
          <button
            onClick={() => onConfirm?.(selectedId, note)}
            className="w-full bg-emerald-600 px-4 py-2 rounded text-white hover:bg-emerald-700"
          >
            Confirm {type} #{selectedId}
          </button>
        )}
      </div>
    </div>
  );
}

export default LayoutView;