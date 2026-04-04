import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 sticky top-0 z-50 border-b border-amber-500/30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-4 group">
            <Building2 className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform duration-500"/>
            <span className="text-2xl font-serif text-white tracking-[0.2em] group-hover:text-amber-500 transition-colors">LuxeHotels</span>
          </Link>
          
          <div className="hidden md:flex gap-12 items-center">
            <Link to="/" className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-300 hover:text-amber-500 transition-colors">Home</Link>
            <Link to="/rooms" className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-300 hover:text-amber-500 transition-colors">The Collection</Link>
            <Link to="/rooms" className="bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white px-8 py-3 font-bold text-xs uppercase tracking-[0.2em] transition-all">Reserve</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
