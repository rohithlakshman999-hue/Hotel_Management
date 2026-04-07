import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Wifi, Tv, Coffee, Wind, CheckCircle } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import api from '../services/api';
import { dummyRooms } from '../data/dummyRooms';

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await api.get(`/api/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        console.error("Failed to fetch room", err);
        const fallbackRoom = dummyRooms.find(r => r._id === id) || dummyRooms[0];
        setRoom(fallbackRoom);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div></div>;
  if (!room) return <div className="text-center py-32 text-xl font-serif text-slate-500 min-h-screen">Room not found</div>;

  const imageUrl = room.images?.[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80';

  return (
    <div className="bg-white min-h-screen pb-32">
      <div className="w-full h-[70vh] relative overflow-hidden bg-slate-900">
        <img src={imageUrl} alt={room.name} className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900 to-transparent opacity-90"></div>
        <div className="absolute bottom-16 left-0 right-0 max-w-7xl mx-auto px-6 z-10">
          <p className="tracking-[0.3em] uppercase text-amber-500 font-bold text-xs mb-4 drop-shadow-md">LuxeHotels Signature</p>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-4 leading-tight drop-shadow-lg">{room.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 flex flex-col lg:flex-row gap-16">
        <div className="flex-1">
          <div className="flex gap-12 text-slate-500 tracking-widest uppercase text-xs font-bold border-b border-slate-200 pb-8 mb-12">
            <div><span className="text-amber-500 block text-2xl font-serif py-1">{room.capacity}</span> Guests</div>
            <div><span className="text-amber-500 block text-2xl font-serif py-1">{room.roomType}</span> Category</div>
          </div>

          <div>
            <h2 className="text-3xl font-serif text-slate-900 mb-6">The Experience</h2>
            <p className="text-slate-600 leading-loose text-lg font-light">
              {room.description || "Immerse yourself in unparalleled luxury. Our meticulously curated suites offer a perfect blend of modern sophistication and timeless elegance, featuring expansive living spaces, artisan furnishings, and breathtaking vistas."}
            </p>
          </div>

          <div className="w-full h-px bg-slate-200 my-16"></div>

          <div>
            <h2 className="text-3xl font-serif text-slate-900 mb-10">Curated Amenities</h2>
            <div className="grid grid-cols-2 gap-y-8 gap-x-12">
              <div className="flex items-start gap-5 group">
                <div className="text-amber-500 group-hover:-translate-y-1 transition-transform"><Wifi className="w-6 h-6" /></div>
                <span className="text-slate-800 font-medium tracking-wide">High-speed WiFi</span>
              </div>
              <div className="flex items-start gap-5 group">
                <div className="text-amber-500 group-hover:-translate-y-1 transition-transform"><Tv className="w-6 h-6" /></div>
                <span className="text-slate-800 font-medium tracking-wide">Premium Entertainment</span>
              </div>
              <div className="flex items-start gap-5 group">
                <div className="text-amber-500 group-hover:-translate-y-1 transition-transform"><Wind className="w-6 h-6" /></div>
                <span className="text-slate-800 font-medium tracking-wide">Climate Control</span>
              </div>
              <div className="flex items-start gap-5 group">
                <div className="text-amber-500 group-hover:-translate-y-1 transition-transform"><Coffee className="w-6 h-6" /></div>
                <span className="text-slate-800 font-medium tracking-wide">Artisan Espresso</span>
              </div>
              <div className="flex items-start gap-5 group">
                <div className="text-amber-500 group-hover:-translate-y-1 transition-transform"><CheckCircle className="w-6 h-6" /></div>
                <span className="text-slate-800 font-medium tracking-wide">24/7 Concierge</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[450px]">
          <div className="sticky top-32">
            <BookingForm room={room} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
