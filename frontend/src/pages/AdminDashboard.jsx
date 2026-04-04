import React, { useState, useEffect } from 'react';
import { LayoutDashboard, BedDouble, CalendarCheck, Users, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newRoom, setNewRoom] = useState({
    name: '', description: '', price: '', capacity: 2, roomType: 'Standard'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [roomsRes, bookingsRes, usersRes] = await Promise.all([
        api.get('/rooms?admin=true'),
        api.get('/bookings'),
        api.get('/users')
      ]);
      setRooms(roomsRes.data);
      setBookings(bookingsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error("Failed to fetch admin data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await api.post('/rooms', newRoom);
      alert('Room added successfully');
      setNewRoom({ name: '', description: '', price: '', capacity: 2, roomType: 'Standard' });
      fetchData();
    } catch (err) {
      alert('Error adding room');
    }
  };

  const handleDeleteRoom = async (id) => {
    if(!window.confirm('Delete this room?')) return;
    try {
      await api.delete(`/rooms/${id}`);
      fetchData();
    } catch (err) {
      alert('Error deleting room');
    }
  };

  const handleDeleteBooking = async (id) => {
    if(!window.confirm('Delete this booking?')) return;
    try {
      await api.delete(`/bookings/${id}`);
      fetchData();
    } catch (err) {
      alert('Error deleting booking');
    }
  };

  const handleDeleteGuest = async (id) => {
    if(!window.confirm('Delete this guest account?')) return;
    try {
      await api.delete(`/users/${id}`);
      fetchData();
    } catch (err) {
      alert('Error deleting guest');
    }
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

  if (loading) return <div className="text-center py-20">Loading Admin Dashboard...</div>;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="w-64 bg-slate-900 text-slate-300 min-h-screen p-6 shadow-xl z-10">
        <h2 className="text-white text-2xl font-bold mb-10 tracking-tight">Admin Panel</h2>
        <nav className="space-y-4">
          <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors font-medium ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-800'}`}>
            <LayoutDashboard className="w-5 h-5"/> Overview
          </button>
          <button onClick={() => setActiveTab('rooms')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors font-medium ${activeTab === 'rooms' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-800'}`}>
            <BedDouble className="w-5 h-5"/> Rooms
          </button>
          <button onClick={() => setActiveTab('bookings')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors font-medium ${activeTab === 'bookings' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-800'}`}>
            <CalendarCheck className="w-5 h-5"/> Bookings
          </button>
          <button onClick={() => setActiveTab('guests')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors font-medium ${activeTab === 'guests' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-800'}`}>
            <Users className="w-5 h-5"/> Guests
          </button>
        </nav>
      </div>

      <div className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'overview' && (
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Revenue</p>
                <p className="text-3xl font-black text-indigo-600 mt-2">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Bookings</p>
                <p className="text-3xl font-black text-slate-900 mt-2">{bookings.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rooms Active</p>
                <p className="text-3xl font-black text-slate-900 mt-2">{rooms.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Unique Guests</p>
                <p className="text-3xl font-black text-slate-900 mt-2">{users.length}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
               <h3 className="font-bold text-slate-900 mb-6">Revenue Analytics</h3>
               <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={bookings.map(b => ({ name: new Date(b.fromDate).toLocaleDateString('en-US',{month:'short',day:'numeric'}), revenue: b.totalAmount || 0 }))}>
                     <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                     <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                     <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                     <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Room Management</h1>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
              <h3 className="font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Add New Room</h3>
              <form onSubmit={handleAddRoom} className="grid grid-cols-2 gap-6">
                <input type="text" placeholder="Room Name" required value={newRoom.name} onChange={e => setNewRoom({...newRoom, name: e.target.value})} className="border border-slate-200 outline-none p-3 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-900" />
                <input type="number" placeholder="Price Per Night" required value={newRoom.price} onChange={e => setNewRoom({...newRoom, price: e.target.value})} className="border border-slate-200 outline-none p-3 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-900" />
                <select value={newRoom.roomType} onChange={e => setNewRoom({...newRoom, roomType: e.target.value})} className="border border-slate-200 outline-none p-3 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-900">
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Suite">Suite</option>
                </select>
                <input type="number" placeholder="Capacity" required value={newRoom.capacity} onChange={e => setNewRoom({...newRoom, capacity: e.target.value})} className="border border-slate-200 outline-none p-3 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-900" />
                <textarea placeholder="Description" required value={newRoom.description} onChange={e => setNewRoom({...newRoom, description: e.target.value})} className="border border-slate-200 outline-none p-3 rounded-lg col-span-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all min-h-[100px] text-slate-900" />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg col-span-2 transition-all shadow-md hover:shadow-lg">Create Room</button>
              </form>
            </div>
            
            <div className="bg-white border border-slate-200 text-sm rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rooms.map(room => (
                    <tr key={room._id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-medium text-slate-900">{room.name}</td>
                      <td className="p-4 text-slate-600">{room.roomType}</td>
                      <td className="p-4 text-slate-900 font-medium">₹{room.price}</td>
                      <td className="p-4">
                        <button onClick={() => handleDeleteRoom(room._id)} className="text-rose-500 font-medium hover:text-rose-700 flex items-center gap-2">
                           <Trash2 className="w-4 h-4"/> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">All Bookings</h1>
            <div className="bg-white border border-slate-200 text-sm rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="p-4">Guest</th>
                    <th className="p-4">Room</th>
                    <th className="p-4">Dates</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map(book => (
                    <tr key={book._id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-slate-900">{book.userName}</div>
                        <div className="text-xs text-slate-500 mt-1">{book.phone}</div>
                      </td>
                      <td className="p-4 text-slate-700 font-medium">{book.roomId?.name || 'Unknown Room'}</td>
                      <td className="p-4 text-xs font-medium text-slate-600">
                        {new Date(book.fromDate).toLocaleDateString()} to {new Date(book.toDate).toLocaleDateString()}
                      </td>
                      <td className="p-4 font-bold text-slate-900">₹{book.totalAmount}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-emerald-100 text-emerald-700">
                            Confirmed
                          </span>
                          <button onClick={() => handleDeleteBooking(book._id)} className="text-rose-400 hover:text-rose-600 transition-colors p-2 rounded-lg hover:bg-rose-50" title="Delete Booking">
                            <Trash2 className="w-4 h-4"/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'guests' && (
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Guest Directory</h1>
            <div className="bg-white border border-slate-200 text-sm rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="p-4">Guest Name</th>
                    <th className="p-4">Contact Info</th>
                    <th className="p-4">First Visited</th>
                    <th className="p-4">Total Stays</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map(u => (
                    <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">{u.name}</td>
                      <td className="p-4">
                        <div className="text-sm font-medium text-slate-700">{u.email}</div>
                        <div className="text-xs text-slate-500 mt-1">{u.phone}</div>
                      </td>
                      <td className="p-4 text-xs font-medium text-slate-600">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-between font-bold text-indigo-600">
                          <span className="bg-indigo-50 px-3 py-1 rounded-full">{u.totalBookings} Stays</span>
                          <button onClick={() => handleDeleteGuest(u._id)} className="text-rose-400 hover:text-rose-600 transition-colors p-2 rounded-lg hover:bg-rose-50" title="Delete Guest">
                            <Trash2 className="w-4 h-4"/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
