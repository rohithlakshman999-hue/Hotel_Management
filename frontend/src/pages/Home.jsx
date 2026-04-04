import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Coffee, Wifi, Shield } from 'lucide-react';
import RoomCard from '../components/RoomCard';
import api from '../services/api';
import { dummyRooms } from '../data/dummyRooms';

const Home = () => {
  const [featuredRooms, setFeaturedRooms] = useState([]);
  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get('/rooms');
        setFeaturedRooms(res.data.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch rooms", err);
        setFeaturedRooms(dummyRooms.slice(0, 3));
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
          {/* Subtle gradient just at the bottom to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-6 pb-32">
          <span className="text-amber-500 uppercase tracking-[0.3em] text-sm font-bold mb-4 drop-shadow-md">
            Welcome to Paradise
          </span>
          <h1 className="text-5xl md:text-7xl text-white font-serif mb-6 leading-tight max-w-3xl drop-shadow-lg">
            Experience Unrivaled <span className="text-amber-500">Luxury</span> & Elegance.
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl font-light drop-shadow-md">
            Escape to an oasis of tranquility. Our world-class resorts await you with pristine beaches, unparalleled service, and memories that last a lifetime.
          </p>
          <div className="flex gap-4">
            <Link to="/rooms" className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-4 rounded-sm font-semibold tracking-widest uppercase transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              Reserve Your Stay
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Services */}
      <section className="bg-slate-50 py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
             <div className="text-center group">
               <div className="w-16 h-16 mx-auto border-2 border-amber-500 rounded-full flex items-center justify-center mb-6 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                 <Wifi className="w-6 h-6"/>
               </div>
               <h4 className="font-serif text-slate-900 text-xl mb-3">Complimentary WiFi</h4>
               <p className="text-slate-500 font-light">Stay connected with high-speed internet available in all rooms and public areas.</p>
             </div>
             <div className="text-center group">
               <div className="w-16 h-16 mx-auto border-2 border-amber-500 rounded-full flex items-center justify-center mb-6 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                 <Coffee className="w-6 h-6"/>
               </div>
               <h4 className="font-serif text-slate-900 text-xl mb-3">Gourmet Dining</h4>
               <p className="text-slate-500 font-light">Savor exquisite culinary creations crafted by our Michelin-starred executive chefs.</p>
             </div>
             <div className="text-center group">
               <div className="w-16 h-16 mx-auto border-2 border-amber-500 rounded-full flex items-center justify-center mb-6 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                 <Shield className="w-6 h-6"/>
               </div>
               <h4 className="font-serif text-slate-900 text-xl mb-3">Unmatched Privacy</h4>
               <p className="text-slate-500 font-light">Enjoy ultimate seclusion and top-tier security for a completely peaceful retreat.</p>
             </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-white">
        <div className="text-center mb-16">
          <span className="text-amber-500 tracking-[0.2em] font-bold uppercase text-xs">Curated Selection</span>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mt-4 mb-6">Our Signature Accommodations</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <div key={room._id} className="opacity-100 transition-opacity duration-500">
              <RoomCard room={room} />
            </div>
          ))}
          {featuredRooms.length === 0 && (
            <div className="col-span-3 text-center text-slate-500 py-12">Loading exquisite rooms...</div>
          )}
        </div>

        <div className="text-center mt-16">
          <Link to="/rooms" className="inline-flex items-center gap-2 border-b-2 border-amber-500 text-slate-900 font-bold tracking-widest uppercase hover:text-amber-500 hover:gap-4 transition-all pb-1">
             View All Suites <span>&rarr;</span>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
