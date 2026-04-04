import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-24 text-center border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-6">
        <h3 className="text-4xl font-serif mb-8 tracking-[0.2em]">LuxeHotels</h3>
        <p className="text-gray-400 font-light tracking-wide max-w-lg mx-auto leading-loose mb-12">
          Experience world-class luxury and unparalleled sophistication at our premier resort destinations worldwide.
        </p>
        <div className="flex justify-center gap-12 text-xs tracking-[0.2em] uppercase font-bold text-amber-500 mb-16">
           <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
           <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
           <a href="#" className="hover:text-white transition-colors">Contact Us</a>
        </div>
        <p className="text-xs tracking-[0.2em] uppercase text-gray-600">&copy; {new Date().getFullYear()} LuxeHotels Resorts. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
