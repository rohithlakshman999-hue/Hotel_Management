import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Wifi, Shield } from 'lucide-react';
import RoomCard from '../components/RoomCard';
import api from '../services/api';
import { dummyRooms } from '../data/dummyRooms';

const Home = () => {
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get('/api/rooms');
        const data = res.data && res.data.length > 0 ? res.data : dummyRooms;
        setFeaturedRooms(data.slice(0, 3)); // ✅ safe
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
        // fallback data
        setFeaturedRooms((dummyRooms || []).slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="bg-white min-h-screen">

      {/* Hero Section */}
      <div className="relative h-[85vh] bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={featuredRooms[0]?.image || 'https://images.unsplash.com/photo-1542314831-c6a4d1409b1d?auto=format&fit=crop&w=2000&q=80'}
            alt="Luxury Resort"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-6 pb-32">
          <span className="text-amber-500 uppercase tracking-widest text-sm font-bold mb-4">
            Welcome to Paradise
          </span>

          <h1 className="text-5xl md:text-7xl text-white font-serif mb-6 max-w-3xl">
            Experience Unrivaled <span className="text-amber-500">Luxury</span>
          </h1>

          <p className="text-lg text-slate-200 mb-10 max-w-2xl">
            Escape to an oasis of tranquility with world-class comfort.
          </p>

          <Link to="/rooms" className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-4 font-semibold uppercase">
            Reserve Your Stay
          </Link>
        </div>
      </div>

      {/* Services */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="text-center">
            <Wifi className="mx-auto text-amber-500 mb-4" />
            <h4 className="font-serif text-xl mb-2">Free WiFi</h4>
            <p className="text-slate-500">High-speed internet everywhere</p>
          </div>

          <div className="text-center">
            <Coffee className="mx-auto text-amber-500 mb-4" />
            <h4 className="font-serif text-xl mb-2">Dining</h4>
            <p className="text-slate-500">Premium food experience</p>
          </div>

          <div className="text-center">
            <Shield className="mx-auto text-amber-500 mb-4" />
            <h4 className="font-serif text-xl mb-2">Security</h4>
            <p className="text-slate-500">Safe and private stay</p>
          </div>

        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif text-center mb-12">
          Featured Rooms
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredRooms.length > 0 ? (
            featuredRooms.map((room, index) => (
              <RoomCard key={room._id || index} room={room} />
            ))
          ) : (
            <p className="text-center col-span-3">Loading rooms...</p>
          )}
        </div>
      </section>

    </div>
  );
};

export default Home;