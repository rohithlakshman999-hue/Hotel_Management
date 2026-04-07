import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Wifi } from 'lucide-react';

const RoomCard = ({ room }) => {
  const imageUrl = room.images?.[0] || 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  
  return (
    <div className="bg-white group cursor-pointer h-full flex flex-col shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-slate-200">
      
      {/* perfectly visible image */}
      <div className="relative h-72 overflow-hidden bg-slate-100">
        <img 
          src={imageUrl} 
          alt={room.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 right-4 bg-slate-900/95 backdrop-blur-sm px-4 py-2 text-white font-semibold tracking-wide text-sm shadow-lg">
          <span className="text-amber-500 font-bold">₹{room.pricePerNight}</span> <span className="text-slate-300 font-normal text-xs uppercase">/ night</span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1 bg-white">
        <h3 className="text-2xl font-serif text-slate-900 mb-3 hover:text-amber-500 transition-colors">{room.name}</h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed font-light">{room.description}</p>
        
        <div className="flex items-center gap-6 text-sm text-slate-500 mb-8 pt-6 border-t border-slate-200">
          <div className="flex items-center gap-2"><Users className="w-4 h-4 text-amber-500"/> {room.capacity} Guests</div>
          {room.amenities?.includes('WiFi') && <div className="flex items-center gap-2"><Wifi className="w-4 h-4 text-amber-500"/> Free WiFi</div>}
        </div>
        
        <div className="mt-auto pt-4">
          <Link 
            to={`/room/${room._id}`}
            className="block text-center bg-slate-900 hover:bg-amber-500 text-white font-semibold tracking-widest text-xs uppercase py-4 transition-all duration-300"
          >
            Explore Suite
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
