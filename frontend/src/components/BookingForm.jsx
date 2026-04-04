import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ room }) => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleBook = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return alert("Please select dates");
    
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) || 1;
    
    const bookingDetails = {
      roomId: room._id,
      roomName: room.name,
      price: room.price,
      fromDate: checkIn,
      toDate: checkOut,
      guests,
      days,
      totalAmount: room.price * days
    };
    
    navigate('/checkout', { state: { bookingDetails } });
  };

  return (
    <div className="bg-white p-12 shadow-2xl border-t-4 border-amber-500">
      <div className="mb-10 pb-8 border-b border-slate-200">
         <span className="text-5xl font-serif text-slate-900 block mb-2">₹{room.price}</span>
         <span className="text-slate-500 tracking-[0.2em] text-xs uppercase font-bold">Per Night</span>
      </div>
      
      <form onSubmit={handleBook} className="space-y-8">
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-3">From Date</label>
            <input 
              type="date" 
              required
              className="bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-colors block p-4 w-full outline-none" 
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-3">To Date</label>
            <input 
              type="date" 
              required
              className="bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-colors block p-4 w-full outline-none" 
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-3">Occupants</label>
          <select 
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-colors block p-4 outline-none cursor-pointer"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          >
            {[...Array((room.capacity || 2))].map((_, i) => (
              <option key={i+1} value={i+1}>{i+1} Guest{i > 0 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        
        <button 
          type="submit" 
          className="w-full text-white bg-slate-900 hover:bg-amber-500 focus:ring-4 focus:ring-slate-200 font-bold tracking-[0.2em] uppercase text-sm px-6 py-5 mt-10 transition-colors shadow-lg"
        >
          Reserve Suite
        </button>
      </form>
      <p className="text-center text-xs tracking-wide text-slate-500 mt-6 font-light">You won't be charged yet</p>
    </div>
  );
};

export default BookingForm;
