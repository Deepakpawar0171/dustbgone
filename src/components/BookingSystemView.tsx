import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { QuoteResult, Booking, ServiceId, PropertyType } from '../types';
import { SERVICES_DATA, TIME_SLOTS } from '../data';
import { generateReferenceId } from '../utils';
import { Calendar as CalendarIcon, Clock, MapPin, User, Mail, Phone, FileText, CheckCircle, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

interface BookingSystemViewProps {
  initialPreloadedQuote: QuoteResult | null;
  initialPreloadedServices: ServiceId[];
  initialPropertyType: PropertyType;
  initialStories: number;
  onBookingSuccess: (newBooking: Booking) => void;
  onGoToTab: (tabId: string) => void;
}

export default function BookingSystemView({
  initialPreloadedQuote,
  initialPreloadedServices,
  initialPropertyType,
  initialStories,
  onBookingSuccess,
  onGoToTab
}: BookingSystemViewProps) {
  
  const [step, setStep] = useState(1);
  
  // State for form inputs
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [address, setAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Date & Time selection state
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  
  // Calendar UI states (Year: 2026, Month: July/August)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // 0-indexed, July is 6

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate days in month helper
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Pre-configured quote details
  const [bookingQuote, setBookingQuote] = useState<QuoteResult>({
    breakdown: SERVICES_DATA.map(s => ({
      serviceId: s.id,
      name: s.title,
      qty: 1,
      unit: 'service',
      cost: s.basePrice
    })).filter(x => initialPreloadedServices.includes(x.serviceId as ServiceId)),
    addonsCost: 0,
    subtotal: SERVICES_DATA.filter(s => initialPreloadedServices.includes(s.id)).reduce((acc, x) => acc + x.basePrice, 0),
    bundleDiscount: 0,
    tax: 0,
    total: SERVICES_DATA.filter(s => initialPreloadedServices.includes(s.id)).reduce((acc, x) => acc + x.basePrice, 0) * 1.05
  });

  // Keep track of preloaded quote overrides
  useEffect(() => {
    if (initialPreloadedQuote) {
      setBookingQuote(initialPreloadedQuote);
    } else {
      // Re-calculate basic quotes if they bypass the estimator
      const selected = SERVICES_DATA.filter(s => initialPreloadedServices.includes(s.id));
      const subtotalVal = selected.reduce((acc, x) => acc + x.basePrice, 0);
      const discountPct = selected.length === 2 ? 0.1 : selected.length === 3 ? 0.15 : selected.length >= 4 ? 0.2 : 0;
      const discount = subtotalVal * discountPct;
      const taxVal = (subtotalVal - discount) * 0.05;
      const totalVal = subtotalVal - discount + taxVal;

      setBookingQuote({
        breakdown: selected.map(s => ({
          serviceId: s.id,
          name: s.title,
          qty: 1,
          unit: 'job',
          cost: s.basePrice
        })),
        addonsCost: 0,
        subtotal: subtotalVal,
        bundleDiscount: discount,
        tax: taxVal,
        total: totalVal
      });
    }
  }, [initialPreloadedQuote, initialPreloadedServices]);

  // Validation
  const isDateAndTimeValid = selectedDate !== '' && selectedTimeSlot !== '';
  const isContactValid = clientName.trim() !== '' && clientEmail.trim() !== '' && clientPhone.trim() !== '' && address.trim() !== '';

  const handleNextStep = () => {
    if (step === 1 && isDateAndTimeValid) {
      setStep(2);
    } else if (step === 2 && isContactValid) {
      handleSubmitBooking();
    }
  };

  const handleSubmitBooking = () => {
    const referenceCode = generateReferenceId();
    
    const newBooking: Booking = {
      id: referenceCode,
      clientName,
      clientEmail,
      clientPhone,
      address,
      propertyType: initialPropertyType,
      services: initialPreloadedServices,
      quote: bookingQuote,
      bookingDate: selectedDate,
      timeSlot: selectedTimeSlot,
      specialInstructions: specialInstructions.trim() || undefined,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingBookingsStr = localStorage.getItem('dust_b_gone_bookings');
    let bookings: Booking[] = [];
    if (existingBookingsStr) {
      try {
        bookings = JSON.parse(existingBookingsStr);
      } catch (e) {
        bookings = [];
      }
    }
    bookings.unshift(newBooking); // Add newest first
    localStorage.setItem('dust_b_gone_bookings', JSON.stringify(bookings));

    // Callback on App.tsx to change state
    onBookingSuccess(newBooking);
  };

  // Calendar render details
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const blanks = Array(firstDay).fill(null);
  const dayNumbers = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const gridCells = [...blanks, ...dayNumbers];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const formatDateString = (day: number) => {
    const m = (currentMonth + 1).toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    return `${currentYear}-${m}-${d}`;
  };

  // Check if a date is in the past (using the mock current year 2026)
  const isDateInPast = (day: number) => {
    // Current date is 2026-07-17
    const year = currentYear;
    const month = currentMonth;
    
    if (year < 2026) return true;
    if (year === 2026) {
      if (month < 6) return true; // Before July
      if (month === 6 && day < 17) return true; // July before 17th
    }
    return false;
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Step Indicators */}
      <div className="mb-10 max-w-md mx-auto">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
          <span className={step >= 1 ? 'text-blue-600 font-extrabold' : ''}>1. Schedule Slot</span>
          <div className="h-0.5 w-16 bg-slate-200 flex-1 mx-4">
            <div className={`h-full bg-blue-600 transition-all ${step === 2 ? 'w-full' : 'w-0'}`} />
          </div>
          <span className={step >= 2 ? 'text-blue-600 font-extrabold' : ''}>2. Details & Book</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-start">
        
        {/* Left Form Panel: 8 Columns */}
        <div className="md:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          
          {step === 1 ? (
            <div className="space-y-6">
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-blue-500" />
                  <span>Choose Cleaning Date</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Select an active highlight date. Weather guarantees apply to all bookings.</p>
              </div>

              {/* Custom Calendar Card */}
              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-black text-slate-800">
                    {monthNames[currentMonth]} {currentYear}
                  </h4>
                  <div className="flex space-x-1">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="p-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-slate-950 transition"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="p-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-slate-950 transition"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Days of the week */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1.5 text-center">
                  {gridCells.map((day, idx) => {
                    if (day === null) {
                      return <div key={`empty-${idx}`} />;
                    }

                    const dateStr = formatDateString(day);
                    const isSelected = selectedDate === dateStr;
                    const isDisabled = isDateInPast(day);

                    return (
                      <button
                        key={`day-${day}`}
                        type="button"
                        onClick={() => setSelectedDate(dateStr)}
                        disabled={isDisabled}
                        className={`py-2 rounded-lg text-xs font-bold transition-all relative ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                            : isDisabled
                              ? 'text-slate-300 cursor-not-allowed bg-slate-100/50'
                              : 'text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 bg-white'
                        }`}
                      >
                        {day}
                        {day === 17 && currentMonth === 6 && currentYear === 2026 && !isSelected && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-emerald-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
                
                {selectedDate && (
                  <p className="text-xs font-semibold text-blue-600 mt-4 text-center">
                    Selected Date: {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                )}
              </div>

              {/* Time slots selection */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                  <Clock className="h-4.5 w-4.5 text-blue-500" />
                  <span>Select Arrival Time Window</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/10 text-blue-900 shadow-sm'
                            : 'border-slate-100 hover:border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className={`h-2.5 w-2.5 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-slate-300'}`} />
                          <span className="text-xs font-bold">{slot}</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                          Available
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            <div className="space-y-6">
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-500" />
                  <span>Contact & Property Details</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Our dispatch team will coordinate final technician details prior to arrival.</p>
              </div>

              {/* Form Input fields */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Contact Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Contact Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="(604) 555-0199"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Service Property Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="123 Front St, Kingston, ON"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Special instructions */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase flex items-center justify-between">
                  <span>Special Cleaning Instructions</span>
                  <span className="text-[10px] font-semibold text-slate-400 normal-case">Optional</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <textarea
                    rows={3}
                    placeholder="E.g. Beware of friendly dog in backyard, gate code is 4820, fragile heritage frames on the guest window..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-none transition"
                  />
                </div>
              </div>

            </div>
          )}

          {/* Stepper buttons */}
          <div className="mt-8 border-t border-slate-100 pt-5 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous Step</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onGoToTab('calculator')}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Adjust Quote</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleNextStep}
              disabled={step === 1 ? !isDateAndTimeValid : !isContactValid}
              className="inline-flex items-center space-x-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-200 hover:bg-blue-700 disabled:opacity-40 disabled:pointer-events-none transition active:scale-95"
            >
              <span>{step === 1 ? 'Continue to Details' : 'Confirm Book Cleaning'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>

        {/* Right Invoice Panel: 4 Columns */}
        <div className="md:col-span-4 bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-5">
          
          <div className="border-b border-slate-800 pb-3">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wide">Booking Summary</h4>
            <span className="text-[10px] text-slate-400">Locked Pricing Invoice</span>
          </div>

          {/* Selected Services Listing */}
          <div className="space-y-3">
            {bookingQuote.breakdown.map((b) => (
              <div key={b.serviceId} className="flex justify-between items-start text-xs">
                <div>
                  <span className="font-bold text-white block truncate max-w-[150px]">{b.name}</span>
                  <span className="text-[10px] text-slate-400">Qty: {b.qty} {b.unit}</span>
                </div>
                <span className="font-semibold text-slate-300">${b.cost.toFixed(2)}</span>
              </div>
            ))}

            {bookingQuote.addonsCost > 0 && (
              <div className="flex justify-between items-center text-xs text-slate-300 pt-1 border-t border-slate-800/40 border-dashed">
                <span>Addon Upgrades</span>
                <span>+${bookingQuote.addonsCost.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Date, Time & Properties */}
          <div className="border-t border-slate-800/60 pt-3 space-y-2.5 text-xs">
            <div className="flex items-center space-x-2 text-slate-400">
              <CalendarIcon className="h-3.5 w-3.5 text-blue-400" />
              <span>
                {selectedDate 
                  ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                  : 'Date not selected'}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-slate-400">
              <Clock className="h-3.5 w-3.5 text-blue-400" />
              <span className="truncate">{selectedTimeSlot || 'Time not selected'}</span>
            </div>

            <div className="flex items-center space-x-2 text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>{initialPropertyType === 'residential' ? 'Residential Care' : 'Commercial Care'} • {initialStories} Stories</span>
            </div>
          </div>

          {/* Pricing Math */}
          <div className="border-t border-slate-800 pt-3 space-y-1.5 text-xs">
            {bookingQuote.bundleDiscount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Bundle Discount</span>
                <span>-${bookingQuote.bundleDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-400">
              <span>Sales Tax (5%)</span>
              <span>${bookingQuote.tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-base font-black text-white pt-1 border-t border-slate-800">
              <span>Total Price</span>
              <span>${bookingQuote.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-850 p-3.5 text-[10px] text-slate-400 leading-relaxed border border-slate-800/80">
            🔒 <strong>Price Lock Guarantee:</strong> The price estimated here is bound to your schedule. No surprise upcharges on cleanup day.
          </div>

        </div>

      </div>

    </div>
  );
}
