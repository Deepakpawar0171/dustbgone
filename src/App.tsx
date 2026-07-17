import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ServiceDetailView from './components/ServiceDetailView';
import QuoteCalculatorView from './components/QuoteCalculatorView';
import BookingSystemView from './components/BookingSystemView';
import BookingListView from './components/BookingListView';
import AdminDashboardView from './components/AdminDashboardView';

import { SERVICES_DATA } from './data';
import { getInitialQuoteDetails, calculateQuote } from './utils';
import { QuoteDetails, QuoteResult, ServiceId, Booking } from './types';
import { Calendar, CheckCircle2, Star, ShieldCheck, Mail, ArrowRight, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation tabs: 'home' | 'calculator' | 'booking-form' | 'booking-list' | 'admin' | ServiceId
  const [currentTab, setCurrentTab] = useState<string>('home');
  
  // Dynamic Quote details
  const [quoteInput, setQuoteInput] = useState<QuoteDetails>(getInitialQuoteDetails());
  
  // Pre-loaded booking payload overrides (from Quote Estimator)
  const [preloadedQuote, setPreloadedQuote] = useState<QuoteResult | null>(null);
  const [preloadedServices, setPreloadedServices] = useState<ServiceId[]>(['window']);
  
  // State trigger to force list and metrics refresh across tabs
  const [bookingsTrigger, setBookingsTrigger] = useState<number>(0);
  
  // Modal states for successful booking confirmation overlay
  const [lastSubmittedBooking, setLastSubmittedBooking] = useState<Booking | null>(null);

  const handleBookingSuccess = (newBooking: Booking) => {
    setLastSubmittedBooking(newBooking);
    setBookingsTrigger(prev => prev + 1);
    setCurrentTab('booking-list');
  };

  const handleBookFromQuote = (calculatedQuote: QuoteResult) => {
    setPreloadedQuote(calculatedQuote);
    setPreloadedServices([...quoteInput.selectedServices]);
    setCurrentTab('booking-form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookFromServiceDetail = (serviceId: ServiceId) => {
    // Standard base quote for this individual service
    const singleSvcData = SERVICES_DATA.find(s => s.id === serviceId);
    if (singleSvcData) {
      const breakdown = [{
        serviceId,
        name: singleSvcData.title,
        qty: 1,
        unit: 'job',
        cost: singleSvcData.basePrice
      }];
      
      const subtotal = singleSvcData.basePrice;
      const tax = subtotal * 0.05;
      const total = subtotal + tax;

      setPreloadedQuote({
        breakdown,
        addonsCost: 0,
        subtotal,
        bundleDiscount: 0,
        tax,
        total
      });
    } else {
      setPreloadedQuote(null);
    }
    
    setPreloadedServices([serviceId]);
    setCurrentTab('booking-form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToCalculatorFromDetail = (serviceId: ServiceId) => {
    // Turn on the selected service on the calculator and switch tabs
    setQuoteInput(prev => {
      const currentSelected = [...prev.selectedServices];
      if (!currentSelected.includes(serviceId)) {
        currentSelected.push(serviceId);
      }
      return {
        ...prev,
        selectedServices: currentSelected
      };
    });
    setCurrentTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickBookCTA = () => {
    // Default pre-load
    setPreloadedServices(['window']);
    setPreloadedQuote(null);
    setCurrentTab('booking-form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefreshBookings = () => {
    setBookingsTrigger(prev => prev + 1);
  };

  // Render the current viewport
  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomeView
            services={SERVICES_DATA}
            onSelectService={(sId) => setCurrentTab(sId)}
            onGoToTab={(tabId) => setCurrentTab(tabId)}
            onOpenBooking={handleQuickBookCTA}
          />
        );
      
      case 'calculator':
        return (
          <QuoteCalculatorView
            quoteInput={quoteInput}
            setQuoteInput={setQuoteInput}
            onBookQuote={handleBookFromQuote}
          />
        );

      case 'booking-form':
        return (
          <BookingSystemView
            initialPreloadedQuote={preloadedQuote}
            initialPreloadedServices={preloadedServices}
            initialPropertyType={quoteInput.propertyType}
            initialStories={quoteInput.stories}
            onBookingSuccess={handleBookingSuccess}
            onGoToTab={(tabId) => setCurrentTab(tabId)}
          />
        );

      case 'booking-list':
        return (
          <BookingListView
            onGoToTab={(tabId) => setCurrentTab(tabId)}
            bookingsTrigger={bookingsTrigger}
          />
        );

      case 'admin':
        return (
          <AdminDashboardView
            bookingsTrigger={bookingsTrigger}
            onRefreshBookings={handleRefreshBookings}
          />
        );

      // Dedicated Webpage representation for each service
      case 'window':
      case 'pressure':
      case 'dryer':
      case 'gutter': {
        const activeService = SERVICES_DATA.find(s => s.id === currentTab);
        if (!activeService) return <div className="p-12 text-center text-slate-500">Service Not Found</div>;
        return (
          <ServiceDetailView
            service={activeService}
            onBookService={handleBookFromServiceDetail}
            onGoToCalculator={handleGoToCalculatorFromDetail}
            allServices={SERVICES_DATA}
            onSelectService={(sId) => setCurrentTab(sId)}
          />
        );
      }

      default:
        return (
          <HomeView
            services={SERVICES_DATA}
            onSelectService={(sId) => setCurrentTab(sId)}
            onGoToTab={(tabId) => setCurrentTab(tabId)}
            onOpenBooking={handleQuickBookCTA}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 py-2 px-4 text-center text-[11px] font-bold text-slate-300 border-b border-slate-800 tracking-wider">
        <span className="text-emerald-400">● NOW SCHEDULING:</span> Summer 2026 exterior washing deep cleanings. Combine services and unlock 20% package discounts!
      </div>

      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        onOpenBooking={handleQuickBookCTA} 
      />

      {/* Main View Port */}
      <main className="flex-grow">
        {renderTabContent()}
      </main>

      <Footer 
        setCurrentTab={setCurrentTab} 
        onOpenBooking={handleQuickBookCTA} 
      />

      {/* Instant Success Overlay Notification modal */}
      {lastSubmittedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center space-y-6 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-400">
            
            {/* Background glowing particles */}
            <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-blue-100/40 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-cyan-100/40 blur-2xl"></div>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full">
                Booking Dispatch Confirmed
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Appointment Registered!
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                Thank you for choosing Dust B Gone. Your booking reservation has been locked with dispatch.
              </p>
            </div>

            {/* Quick Summary Invoice */}
            <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-100 space-y-3">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                <span className="text-xs font-black text-slate-800">Ref: {lastSubmittedBooking.id}</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">LOCKED INVOICE</span>
              </div>
              <div className="text-xs space-y-1 text-slate-600">
                <p><strong>Client:</strong> {lastSubmittedBooking.clientName}</p>
                <p><strong>Property Address:</strong> {lastSubmittedBooking.address}</p>
                <p><strong>Scheduled Arrival Date:</strong> {new Date(lastSubmittedBooking.bookingDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>Arrival Time Window:</strong> {lastSubmittedBooking.timeSlot}</p>
              </div>
              <div className="pt-2.5 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-500">Ultimate Bound Total:</span>
                <span className="text-lg font-black text-slate-950">${lastSubmittedBooking.quote.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-1 grid grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={() => setLastSubmittedBooking(null)}
                className="w-full rounded-xl bg-slate-900 py-3 text-xs font-bold text-white shadow hover:bg-slate-800 transition active:scale-95"
              >
                Go to Active Queue
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setLastSubmittedBooking(null);
                  setCurrentTab('home');
                }}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Back to Homepage
              </button>
            </div>

            <div className="flex justify-center items-center space-x-1.5 text-[10px] text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
              <span>Fully Bonded • Clean Return Satis Guaranteed</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
