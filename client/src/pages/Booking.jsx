import React, { useState } from 'react'
import { AnimatePresence, motion, time } from 'framer-motion';
import LayoutView from '../components/LayoutView';
import LayoutOverlay from '../components/LayoutOverlay';
import { useNavigate } from 'react-router-dom';
import ReservationTypeSelector from '../components/ReservationTypeSelector';
import ReservationTimingSelector from '../components/ReservationTimingSelector';

function Booking() {
  const [step, setStep] = useState(1);
  const [reservationData, setReservationData] = useState({
    type: null,
    timing: null,
  });
  const [showTimingSelector, setShowTimingSelector] = useState(false);
  const navigate = useNavigate();

  const handleTypeSelect = (type) => {
    console.log('Selected type:', type);
    setReservationData((prev) => ({ ...prev, type }));

    setTimeout(() => {
      setShowTimingSelector(true); // نمایش فرم بعدی
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 gap-12">
      {/* Left Section */}
      <motion.div
        className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, x: -60 }}
        animate={step === 1 ? { opacity: 0, x: -60 } : { opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        onAnimationComplete={() => setStep(2)}
      >
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight md:mb-16">
          Which <br /> space <span className="text-emerald-900">do you want?</span>
        </h1>

        <AnimatePresence mode="wait">
          {!showTimingSelector ? (
            <motion.div
              key="type"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 1 }}
            >
              <ReservationTypeSelector
                onButtonClick={handleTypeSelect}
              />
            </motion.div>
          ) : (
            <motion.div
              key="timing"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 1 }}
            >
            <ReservationTimingSelector
              onSelect={(timing) => {
                setReservationData((prev) => ({ ...prev, timing }));
                setStep(4); 
                console.log(reservationData);
              }}
              onBack={() => {
                setShowTimingSelector(false);
                setReservationData((prev) => ({ ...prev, type: null }));
                setStep(2);
              }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="flex-1 flex justify-center"
        initial={{ opacity: 0, x: -60 }}
        animate={step === 3 ? { opacity: 0, x: 60 } : { opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className="relative p-6 max-w-96 drop-shadow-2xl rounded-xl transition hover:scale-105 duration-500 drop-shadow-emerald-800 hover:bg-white/15 backdrop-blur-lg">
          <LayoutView 
                selected={reservationData}
                showSeats={step}
                onBack={() => setStep(3)}
                onConfirm={(seatId) => {
                  setReservationData({ ...reservationData, seat: seatId });
                  navigate('/confirmation', {
                    state: { reservationData: { ...reservationData, seat: seatId } },
                  });
                }}
              />
        </div>
      </motion.div>
    </div>
  );
}

export default Booking;
