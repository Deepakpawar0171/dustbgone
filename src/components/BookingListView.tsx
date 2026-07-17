import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Booking } from '../types';
import { Calendar, MapPin, Phone, Mail, Clock, ShieldCheck, Trash2, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

interface BookingListViewProps {
  onGoToTab: (tabId: string) => void;
  // Trigger update from App
  bookingsTrigger: number;
}

export default function BookingListView({ onGoToTab, bookingsTrigger }: BookingListViewProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('dust_b_gone_bookings');
    if (stored) {
      try {
        setBookings(JSON.parse(stored));
      } catch (e) {
        setBookings([]);
      }
    }
  }, [bookingsTrigger]);

  const handleCancelBooking = (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking? This will remove your appointment lock.')) {
      const updated = bookings.filter(b => b.id !== bookingId);
      localStorage.setItem('dust_b_gone_bookings', JSON.stringify(updated));
      setBookings(updated);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-1 text-xs font-bold uppercase tracking-wide">✓ Completed</span>;
      case 'confirmed':
        return <span className="rounded-full bg-blue-100 text-blue-800 px-2.5 py-1 text-xs font-bold uppercase tracking-wide">● Confirmed</span>;
      case 'cancelled':
        return <span className="rounded-full bg-rose-100 text-rose-800 px-2.5 py-1 text-xs font-bold uppercase tracking-wide">Cancelled</span>;
      default:
        return <span className="rounded-full bg-amber-100 text-amber-800 px-2.5 py-1 text-xs font-bold uppercase tracking-wide animate-pulse">⚙ Pending Dispatch</span>;
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* View Header */}
      <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          My Active Bookings
        </h2>
        <p className="text-sm text-slate-500">
          Review, lock, or cancel your upcoming premium exterior maintenance slots.
        </p>
      </div>

      <div className="space-y-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
            >
              {/* Header Ribbon */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex flex-wrap justify-between items-center gap-2">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-black text-slate-800 bg-slate-200 px-2.5 py-1 rounded-md">
                    Ref: {booking.id}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div>{getStatusBadge(booking.status)}</div>
              </div>

              {/* Booking Body details */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left Side Info */}
                <div className="md:col-span-7 space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Info & Property</h4>
                    <p className="text-base font-bold text-slate-900">{booking.clientName}</p>
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>{booking.address}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center space-x-1">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        <span>{booking.clientPhone}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        <span className="truncate">{booking.clientEmail}</span>
                      </span>
                    </div>
                  </div>

                  {booking.specialInstructions && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/60 text-xs text-slate-600">
                      <strong>Instructions:</strong> "{booking.specialInstructions}"
                    </div>
                  )}

                  {/* Arrival Date and Time */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-blue-50/40 p-3 rounded-xl border border-blue-50 text-left">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Arrival Date</span>
                      <span className="text-xs font-extrabold text-blue-900 flex items-center space-x-1.5 mt-1">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span>{new Date(booking.bookingDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </span>
                    </div>

                    <div className="bg-indigo-50/40 p-3 rounded-xl border border-indigo-50 text-left">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Arrival Slot</span>
                      <span className="text-xs font-extrabold text-indigo-900 flex items-center space-x-1.5 mt-1">
                        <Clock className="h-4 w-4 text-indigo-500" />
                        <span className="truncate">{booking.timeSlot.split(' - ')[0]}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side Quote Invoice Breakdown */}
                <div className="md:col-span-5 bg-slate-50 rounded-xl p-4 border border-slate-100/80 space-y-3.5 flex flex-col justify-between">
                  <div>
                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5">Price Breakdown</h5>
                    <div className="space-y-1.5">
                      {booking.quote.breakdown.map((item) => (
                        <div key={item.serviceId} className="flex justify-between text-[11px] text-slate-600">
                          <span className="font-semibold text-slate-700 truncate max-w-[120px]">{item.name}</span>
                          <span>${item.cost.toFixed(2)}</span>
                        </div>
                      ))}
                      {booking.quote.addonsCost > 0 && (
                        <div className="flex justify-between text-[11px] text-slate-500">
                          <span>Premium Add-ons</span>
                          <span>+${booking.quote.addonsCost.toFixed(2)}</span>
                        </div>
                      )}
                      {booking.quote.bundleDiscount > 0 && (
                        <div className="flex justify-between text-[11px] text-emerald-600 font-semibold">
                          <span>Bundle Discount</span>
                          <span>-${booking.quote.bundleDiscount.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-2.5 flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-500">Total Price:</span>
                    <span className="text-lg font-black text-slate-900">${booking.quote.total.toFixed(2)}</span>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleCancelBooking(booking.id)}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2 py-1.5 rounded-lg transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Cancel Appointment</span>
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center space-y-4 shadow-sm max-w-md mx-auto">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400 mx-auto">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900">No active bookings found</h3>
              <p className="text-xs text-slate-500">
                You haven't scheduled any cleaning services yet. Start by generating an estimate or selecting a service.
              </p>
            </div>
            <button
              onClick={() => onGoToTab('calculator')}
              className="inline-flex items-center space-x-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-200 hover:bg-blue-700 transition"
            >
              <span>Explore Quote Calculator</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
