import React from 'react'
import { useState } from 'react';
import { motion } from 'framer-motion';
import LayoutView from '../components/LayoutView';
import { useNavigate } from 'react-router-dom';
import ReservationTypeSelector from '../components/ReservationTypeSelector';
import LayoutOverlay from '../components/LayoutOverlay';

function Booking() {
    const [bookingData, setBookingData] = useState({
    type: null,
    startDate: null,
    endDate: null,
  });

    const navigate = useNavigate();
    const [exitAnimation, setExitAnimation] = useState(false);

    const handleClick = () => {
    setExitAnimation(true);
  };

    const handleAnimationComplete = () => {
      if (exitAnimation) {
        navigate('/Confirmation' , { replace: true });
      }
    };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 gap-12">
      {/* Left Section */}
      <motion.div
        className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, x: -60 }}
        animate={exitAnimation ? { opacity: 0, x: 60 } : { opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        onAnimationComplete={handleAnimationComplete}
      >
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight md:mb-16">
          Which <br />  space <span className=' text-emerald-900'>do you want? </span>
        </h1>
        <ReservationTypeSelector setBookingData={setBookingData}/>
        <ReservationTimingSelector setBookingData={setBookingData}/>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="flex-1 flex justify-center"
        initial={{ opacity: 0, x: -60 }}
        animate={exitAnimation ? { opacity: 0, x: 60 } : { opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        onAnimationComplete={handleAnimationComplete}
      >
        <div className="p-6 max-w-96 drop-shadow-2xl rounded-xl transition hover:scale-105 duration-500 drop-shadow-emerald-800 hover:bg-white/15 backdrop-blur-lg">
            <LayoutView />
            <LayoutOverlay bookingData={bookingData} />
        </div>
      </motion.div>
    </div>
  );
}

export default Booking