import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Smartphone, Building } from 'lucide-react';
import api from '../services/api';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails;

  const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  if (!bookingDetails) {
    return <div className="text-center py-40 text-slate-500 font-serif text-xl bg-white min-h-screen">No booking details found. Please select a suite first.</div>;
  }

  const handleCheckout = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Simulate real-time payment terminal delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const bookingPayload = {
        userName: guestInfo.name,
        email: guestInfo.email,
        phone: guestInfo.phone,
        roomId: bookingDetails.roomId,
        fromDate: bookingDetails.fromDate,
        toDate: bookingDetails.toDate
      };

      await api.post('/api/bookings', bookingPayload);

      alert(`Payment of ₹${bookingDetails.totalAmount} Successful via ${paymentMethod.toUpperCase()}! Your luxury reservation is confirmed.`);
      navigate('/');

    } catch (err) {
      alert(err.response?.data?.message || "Error initiating checkout. Please try again.");
    } finally {
      setProcessing(false);
    }
  };
  return (
    <div className="bg-slate-50 min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
        <div className="flex-1 bg-white p-14 shadow-xl border-t-4 border-slate-900">
          <h2 className="text-4xl font-serif text-slate-900 mb-12">Finalize Reservation</h2>

          <form onSubmit={handleCheckout} className="space-y-12">
            {/* Guest Info Section */}
            <div>
              <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-amber-500 mb-8 pb-4 border-b border-slate-200">Guest Particulars</h3>
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-900 block mb-3">Full Legal Name</label>
                  <input type="text" required value={guestInfo.name} onChange={e => setGuestInfo({ ...guestInfo, name: e.target.value })} className="w-full bg-transparent border-b-2 border-slate-200 text-slate-900 focus:border-amber-500 block py-3 outline-none transition-colors text-lg" placeholder="Mr. / Ms." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-900 block mb-3">Email Address</label>
                    <input type="email" required value={guestInfo.email} onChange={e => setGuestInfo({ ...guestInfo, email: e.target.value })} className="w-full bg-transparent border-b-2 border-slate-200 text-slate-900 focus:border-amber-500 block py-3 outline-none transition-colors text-lg" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-900 block mb-3">Mobile Contact</label>
                    <input type="tel" required value={guestInfo.phone} onChange={e => setGuestInfo({ ...guestInfo, phone: e.target.value })} className="w-full bg-transparent border-b-2 border-slate-200 text-slate-900 focus:border-amber-500 block py-3 outline-none transition-colors text-lg" placeholder="+1 234 567 8900" />
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Payment Method UI */}
            <div>
              <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-amber-500 mb-8 pb-4 border-b border-slate-200">Payment Processing</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Card Option */}
                <label className={`cursor-pointer border-2 rounded-xl p-6 flex flex-col items-center gap-4 transition-all ${paymentMethod === 'card' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="sr-only" />
                  <CreditCard className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-amber-500' : 'text-slate-400'}`} />
                  <span className={`font-bold tracking-widest uppercase text-xs ${paymentMethod === 'card' ? 'text-amber-600' : 'text-slate-500'}`}>Credit Card</span>
                </label>

                {/* UPI Option */}
                <label className={`cursor-pointer border-2 rounded-xl p-6 flex flex-col items-center gap-4 transition-all ${paymentMethod === 'upi' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                  <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="sr-only" />
                  <Smartphone className={`w-8 h-8 ${paymentMethod === 'upi' ? 'text-amber-500' : 'text-slate-400'}`} />
                  <span className={`font-bold tracking-widest uppercase text-xs ${paymentMethod === 'upi' ? 'text-amber-600' : 'text-slate-500'}`}>UPI Apps</span>
                </label>

                {/* Pay at Hotel Option */}
                <label className={`cursor-pointer border-2 rounded-xl p-6 flex flex-col items-center gap-4 transition-all ${paymentMethod === 'hotel' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                  <input type="radio" name="payment" value="hotel" checked={paymentMethod === 'hotel'} onChange={() => setPaymentMethod('hotel')} className="sr-only" />
                  <Building className={`w-8 h-8 ${paymentMethod === 'hotel' ? 'text-amber-500' : 'text-slate-400'}`} />
                  <span className={`font-bold tracking-widest uppercase text-xs ${paymentMethod === 'hotel' ? 'text-amber-600' : 'text-slate-500'}`}>Pay on Arrival</span>
                </label>
              </div>

              {/* Dynamic Payment Fields Based on Selection */}
              {paymentMethod === 'card' && (
                <div className="mt-8 p-8 bg-slate-50 border border-slate-200 rounded-xl space-y-6 animate-fade-in relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <CreditCard className="w-24 h-24" />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-900 block mb-3">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" required className="w-full bg-white border border-slate-200 text-slate-900 focus:border-amber-500 block p-3 outline-none transition-colors relative z-10" />
                  </div>
                  <div className="grid grid-cols-2 gap-6 relative z-10">
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-900 block mb-3">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" required className="w-full bg-white border border-slate-200 text-slate-900 focus:border-amber-500 block p-3 outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-900 block mb-3">CVV</label>
                      <input type="text" placeholder="123" required className="w-full bg-white border border-slate-200 text-slate-900 focus:border-amber-500 block p-3 outline-none transition-colors" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="mt-8 p-8 bg-slate-50 border border-slate-200 rounded-xl text-center animate-fade-in relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Smartphone className="w-24 h-24" /></div>
                  <p className="text-sm text-slate-600 mb-4 relative z-10">Enter your UPI ID to simulate a secured GPay/PhonePe ping.</p>
                  <div className="max-w-xs mx-auto relative z-10">
                    <input type="text" placeholder="username@upi" required className="w-full bg-white border border-slate-200 text-slate-900 focus:border-amber-500 block p-3 outline-none transition-colors text-center" />
                  </div>
                </div>
              )}

              {paymentMethod === 'hotel' && (
                <div className="mt-8 p-8 bg-slate-50 border border-slate-200 rounded-xl text-center animate-fade-in relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Building className="w-24 h-24" /></div>
                  <p className="text-sm font-medium text-slate-700 relative z-10">No immediate charge. Payment will be collected securely upon concierge check-in.</p>
                </div>
              )}
            </div>

            <div className="pt-10 border-t border-slate-200">
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold tracking-[0.2em] uppercase text-sm py-6 flex justify-center items-center gap-4 transition-all disabled:opacity-70 shadow-lg hover:shadow-xl rounded-lg"
              >
                {processing ? "Authorizing Securely..." : <><ShieldCheck className="w-5 h-5" /> Confirm & Authenticate Booking</>}
              </button>
              <div className="flex items-center justify-center gap-3 text-slate-500 mt-6 text-xs tracking-widest uppercase">
                <ShieldCheck className="w-4 h-4 text-amber-500" /> AES-256 Simulated Bank-Level Encryption
              </div>
            </div>
          </form>
        </div>

        {/* Same Stay Summary as before */}
        <div className="w-full lg:w-[480px]">
          <div className="bg-slate-900 p-12 shadow-2xl text-white sticky top-32">
            <h3 className="text-2xl font-serif mb-10 border-b border-gray-700 pb-6">Stay Summary</h3>

            <div className="space-y-8 mb-10 pb-10 border-b border-gray-700">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">Selected Suite</p>
                <p className="text-2xl font-serif text-amber-500">{bookingDetails.roomName}</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-2">Arrival</p>
                  <p className="font-light tracking-wide">{new Date(bookingDetails.fromDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-2">Departure</p>
                  <p className="font-light tracking-wide">{new Date(bookingDetails.toDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-2">Party Size</p>
                <p className="font-light tracking-wide">{bookingDetails.guests} Guest(s)</p>
              </div>
            </div>

            <div className="space-y-6 text-sm text-gray-300 mb-10 pb-10 border-b border-gray-700">
              <div className="flex justify-between font-light tracking-wide">
                <span>₹{bookingDetails.price} &times; {bookingDetails.days} nights</span>
                <span className="text-white font-medium">₹{bookingDetails.totalAmount}</span>
              </div>
              <div className="flex justify-between font-light tracking-wide">
                <span>Taxes & Service Fees</span>
                <span className="text-white font-medium">Included</span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <span className="font-bold uppercase tracking-[0.2em] text-gray-400 text-xs">Total</span>
              <span className="font-serif text-amber-500 text-4xl">₹{bookingDetails.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
