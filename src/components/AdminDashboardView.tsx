import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Booking, BookingStatus } from '../types';
import { BarChart2, DollarSign, Clock, ShieldCheck, Check, Calendar, TrendingUp, Settings2, Trash2, Database, AlertCircle, RefreshCw } from 'lucide-react';

interface AdminDashboardViewProps {
  bookingsTrigger: number;
  onRefreshBookings: () => void;
}

export default function AdminDashboardView({ bookingsTrigger, onRefreshBookings }: AdminDashboardViewProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    loadBookings();
  }, [bookingsTrigger]);

  const loadBookings = () => {
    const stored = localStorage.getItem('dust_b_gone_bookings');
    if (stored) {
      try {
        setBookings(JSON.parse(stored));
      } catch (e) {
        setBookings([]);
      }
    } else {
      setBookings([]);
    }
  };

  // Populate Demo Data
  const handlePopulateDemo = () => {
    const demoBookings: Booking[] = [
      {
        id: 'DBG-K8Y7F2',
        clientName: 'Pacific Plaza Retail (Markus Vance)',
        clientEmail: 'mvance@pacificplaza.com',
        clientPhone: '(613) 206-3969',
        address: '888 Princess St, Kingston, ON',
        propertyType: 'commercial',
        services: ['window', 'pressure'],
        quote: {
          breakdown: [
            { serviceId: 'window', name: 'Spotless Window Washing', qty: 45, unit: 'windows', cost: 537.50 },
            { serviceId: 'pressure', name: 'High-Performance Pressure Washing', qty: 2500, unit: 'sq ft', cost: 781.25 }
          ],
          addonsCost: 29.00,
          subtotal: 1318.75,
          bundleDiscount: 131.88, // 10% bundle
          tax: 60.79,
          total: 1276.66
        },
        bookingDate: '2026-07-22',
        timeSlot: '08:00 AM - 10:00 AM',
        specialInstructions: 'Commercial storefront windows & walkway wash. Clean before public opening hours at 9:30.',
        status: 'confirmed',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
      },
      {
        id: 'DBG-A3B9V4',
        clientName: 'Sarah Jenkins',
        clientEmail: 'sarah.j@gmail.com',
        clientPhone: '(613) 555-4411',
        address: '321 Pinecrest Way, Amherstview, ON',
        propertyType: 'residential',
        services: ['gutter', 'dryer'],
        quote: {
          breakdown: [
            { serviceId: 'gutter', name: 'Gutter Vacuuming & Hand Clearing', qty: 150, unit: 'linear ft', cost: 225.00 },
            { serviceId: 'dryer', name: 'Interior & Exterior Dryer Vent Cleaning', qty: 1, unit: 'vents', cost: 120.00 }
          ],
          addonsCost: 19.00,
          subtotal: 345.00,
          bundleDiscount: 34.50, // 10%
          tax: 16.48,
          total: 345.98
        },
        bookingDate: '2026-07-25',
        timeSlot: '01:00 PM - 03:00 PM',
        specialInstructions: 'Gutter vacuum system needed. Downspouts are heavily packed with pine needles.',
        status: 'pending',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        id: 'DBG-F9S5D2',
        clientName: 'Parkade Corp (Operations Dept)',
        clientEmail: 'ops@parkadecorp.ca',
        clientPhone: '(613) 555-9011',
        address: '1050 Frontenac Rd, Kingston, ON',
        propertyType: 'commercial',
        services: ['pressure'],
        quote: {
          breakdown: [
            { serviceId: 'pressure', name: 'High-Performance Pressure Washing', qty: 6000, unit: 'sq ft', cost: 1875.00 }
          ],
          addonsCost: 49.00,
          subtotal: 1875.00,
          bundleDiscount: 0,
          tax: 96.20,
          total: 2020.20
        },
        bookingDate: '2026-07-16',
        timeSlot: '10:30 AM - 12:30 PM',
        specialInstructions: 'Commercial double-level parking deck concrete wash. Standard oil degreaser pretreatment needed.',
        status: 'completed',
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
      }
    ];

    localStorage.setItem('dust_b_gone_bookings', JSON.stringify(demoBookings));
    loadBookings();
    onRefreshBookings();
  };

  const handleClearAll = () => {
    if (confirm('Clear entire database? This clears all demo and user-submitted bookings.')) {
      localStorage.removeItem('dust_b_gone_bookings');
      setBookings([]);
      onRefreshBookings();
    }
  };

  const handleUpdateStatus = (bookingId: string, nextStatus: BookingStatus) => {
    const updated = bookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: nextStatus };
      }
      return b;
    });
    localStorage.setItem('dust_b_gone_bookings', JSON.stringify(updated));
    setBookings(updated);
    onRefreshBookings();
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (confirm('Delete this dispatch file permanently?')) {
      const updated = bookings.filter(b => b.id !== bookingId);
      localStorage.setItem('dust_b_gone_bookings', JSON.stringify(updated));
      setBookings(updated);
      onRefreshBookings();
    }
  };

  // Dispatch metrics
  const totalRevenue = bookings.reduce((sum, b) => b.status !== 'cancelled' ? sum + b.quote.total : sum, 0);
  const activeJobs = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length;
  const completedJobs = bookings.filter(b => b.status === 'completed').length;
  const avgTicket = bookings.length > 0 ? totalRevenue / bookings.length : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 border border-slate-100 p-6 rounded-2xl">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <Settings2 className="h-6 w-6 text-blue-600" />
            <span>Staff Operations Center</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">Real-time scheduling dispatch, projected metrics, and customer queue logs.</p>
        </div>
        
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={handlePopulateDemo}
            className="inline-flex items-center space-x-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
          >
            <Database className="h-3.5 w-3.5" />
            <span>Populate Demo Contracts</span>
          </button>
          
          <button
            onClick={handleClearAll}
            className="inline-flex items-center space-x-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Wipe Database</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Projected Billing</span>
            <span className="text-xl font-black text-slate-900">${totalRevenue.toLocaleString('en', { maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
            <Clock className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Queue</span>
            <span className="text-xl font-black text-slate-900">{activeJobs} Jobs</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Completed Contracts</span>
            <span className="text-xl font-black text-slate-900">{completedJobs} Cleans</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg. Ticket Size</span>
            <span className="text-xl font-black text-slate-900">${avgTicket.toLocaleString('en', { maximumFractionDigits: 2 })}</span>
          </div>
        </div>

      </div>

      {/* Booking Queue Board */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Dispatch Operations Queue</h3>
          <span className="rounded-full bg-slate-200 text-slate-700 px-2.5 py-0.5 text-xs font-bold">
            {bookings.length} Total Registered
          </span>
        </div>

        <div className="overflow-x-auto">
          {bookings.length > 0 ? (
            <table className="w-full min-w-[800px] border-collapse text-left text-sm text-slate-500">
              <thead className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th scope="col" className="px-6 py-3.5">Reference ID</th>
                  <th scope="col" className="px-6 py-3.5">Client & Contact</th>
                  <th scope="col" className="px-6 py-3.5">Service details</th>
                  <th scope="col" className="px-6 py-3.5">Scheduled Slot</th>
                  <th scope="col" className="px-6 py-3.5">Invoice</th>
                  <th scope="col" className="px-6 py-3.5">Status</th>
                  <th scope="col" className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                    
                    {/* Ref */}
                    <td className="px-6 py-4 whitespace-nowrap font-black text-slate-800">
                      {booking.id}
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{booking.clientName}</div>
                      <div className="text-xs text-slate-400 truncate max-w-[200px]">{booking.address}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{booking.clientPhone}</div>
                    </td>

                    {/* Services */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {booking.services.map(sId => (
                          <span 
                            key={sId}
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${
                              sId === 'window' ? 'bg-cyan-50 text-cyan-700 border border-cyan-100' :
                              sId === 'pressure' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                              sId === 'dryer' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                              'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            }`}
                          >
                            {sId}
                          </span>
                        ))}
                      </div>
                      {booking.specialInstructions && (
                        <div className="text-[10px] text-amber-600 mt-1 truncate max-w-[150px]" title={booking.specialInstructions}>
                          📝 "{booking.specialInstructions}"
                        </div>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">
                        {new Date(booking.bookingDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-[10px] text-slate-400">{booking.timeSlot.split(' - ')[0]}</div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 whitespace-nowrap font-black text-slate-900">
                      ${booking.quote.total.toFixed(2)}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        booking.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                        booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        booking.status === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                        'bg-amber-100 text-amber-800 animate-pulse'
                      }`}>
                        {booking.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-1.5">
                        
                        {booking.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                            className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-2 py-1 rounded text-xs font-bold"
                          >
                            Confirm
                          </button>
                        )}

                        {booking.status === 'confirmed' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(booking.id, 'completed')}
                            className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-2 py-1 rounded text-xs font-bold"
                          >
                            Mark Completed
                          </button>
                        )}

                        {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                            className="text-rose-500 hover:bg-rose-50 p-1 rounded"
                            title="Cancel Job"
                          >
                            Cancel
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="text-slate-400 hover:text-slate-600 p-1 rounded"
                          title="Delete Record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-slate-400 space-y-4">
              <AlertCircle className="h-10 w-10 text-slate-300 mx-auto" />
              <div>
                <p className="font-bold">Dispatch operations dashboard is empty</p>
                <p className="text-xs text-slate-400">There are no cleaning requests in the local system.</p>
              </div>
              <button
                type="button"
                onClick={handlePopulateDemo}
                className="inline-flex items-center space-x-1 bg-slate-100 text-slate-700 hover:bg-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-bold transition"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Instantly Inject Sample Contracts</span>
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
