import React from 'react'

function LayoutOverlay({ bookingData }) {
  const [seats, setSeats] = useState(initialSeats); // یا fetch از سرور

  const availableSeats = seats.filter(
    seat => seat.type === selectedType && seat.available
  );
  return (
    <div>
        
    </div>
  )
}

export default LayoutOverlay