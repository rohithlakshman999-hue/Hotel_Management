import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import RoomCard from '../components/RoomCard';
import api from '../services/api';
import { dummyRooms } from '../data/dummyRooms';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get('/rooms');
        setRooms(res.data);
      } catch (err) {
        console.error("Failed to fetch rooms", err);
        console.log("Using fallback dummy data since backend DB is down");
        setRooms(dummyRooms);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Dark elegant header */}
      <div className="bg-slate-900 text-white py-20 px-6 text-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-c6a4d1409b1d?auto=format&fit=crop&w=2000&q=40')] opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10">
          <span className="text-amber-500 tracking-[0.3em] font-bold uppercase text-xs mb-4 block">The Collection</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 drop-shadow-md">Find Your Sanctuary</h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">Browse our exclusive selection of suites and villas designed for the ultimate sophisticated retreat.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-72 bg-white p-8 border border-slate-200 shadow-sm h-fit">
          <h3 className="font-serif text-2xl text-slate-900 mb-8 border-b border-slate-200 pb-4 flex items-center gap-3">
            <Search className="w-5 h-5 text-amber-500"/> Refine Search
          </h3>
          <div className="space-y-8">
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 block mb-3">Accommodation Type</label>
              <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm p-4 outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all cursor-pointer">
                <option value="">All Categories</option>
                <option value="Standard">Deluxe Room</option>
                <option value="Suite">Premium Suite</option>
                <option value="Villa">Private Villa</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 block mb-3">Price Range</label>
              <input type="range" className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" />
              <div className="flex justify-between text-xs text-slate-500 font-medium mt-3">
                <span>₹1,000</span>
                <span>₹50,000+</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rooms.map((room) => (
                <div key={room._id} className="opacity-100 transition-opacity duration-500">
                  <RoomCard room={room} />
                </div>
              ))}
              {rooms.length === 0 && (
                <div className="col-span-full text-center py-20 bg-white border border-slate-200">
                  <p className="text-xl font-serif text-slate-500">No suites available matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
