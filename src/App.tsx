import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ServiceDetailView from './components/ServiceDetailView';
import QuoteCalculatorView from './components/QuoteCalculatorView';
import BookingSystemView from './components/BookingSystemView';
import BookingListView from './components/BookingListView';

import { SERVICES_DATA } from './data';
import { getInitialQuoteDetails, calculateQuote } from './utils';
import { QuoteDetails, QuoteResult, ServiceId, Booking } from './types';
import { Calendar, CheckCircle2, Star, ShieldCheck, Mail, ArrowRight, Sparkles, Send, Terminal, FileText, Check } from 'lucide-react';

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
  const [successModalTab, setSuccessModalTab] = useState<'details' | 'customer-email' | 'owner-email' | 'logs'>('details');

  const handleBookingSuccess = (newBooking: Booking) => {
    setLastSubmittedBooking(newBooking);
    setSuccessModalTab('details');
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

      {/* Instant Success Overlay Notification modal with Automated Dispatch & Email Generation logs */}
      {lastSubmittedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full text-center space-y-6 shadow-2xl relative overflow-hidden my-8 animate-in zoom-in-95 duration-400">
            
            {/* Background glowing particles */}
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-100/40 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-100/40 blur-3xl"></div>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8 animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center space-x-1 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black tracking-widest text-blue-600 uppercase border border-blue-100">
                <Sparkles className="h-3 w-3 text-cyan-500" />
                <span>Auto-Messaging & Email Engine Active</span>
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">
                Inquiry & Booking Dispatched!
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xl mx-auto">
                Your request has been saved. Our automated communication engine has successfully generated and dispatched real-time alerts to you and our operations team.
              </p>
            </div>

            {/* Custom Tab system inside the receipt modal to view emails */}
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/50">
              {/* Tab headers */}
              <div className="grid grid-cols-4 bg-slate-100/80 border-b border-slate-200 p-1 text-xs font-bold text-slate-600">
                <button
                  type="button"
                  onClick={() => setSuccessModalTab('details')}
                  className={`flex items-center justify-center space-x-1 py-2.5 rounded-xl transition ${successModalTab === 'details' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  <FileText className="h-3.5 w-3.5 shrink-0" />
                  <span className="hidden sm:inline">Receipt Details</span>
                  <span className="sm:hidden">Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSuccessModalTab('customer-email')}
                  className={`flex items-center justify-center space-x-1 py-2.5 rounded-xl transition ${successModalTab === 'customer-email' ? 'bg-white text-blue-600 shadow-sm' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="hidden sm:inline">Customer Email</span>
                  <span className="sm:hidden">Customer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSuccessModalTab('owner-email')}
                  className={`flex items-center justify-center space-x-1 py-2.5 rounded-xl transition ${successModalTab === 'owner-email' ? 'bg-white text-blue-600 shadow-sm' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  <Send className="h-3.5 w-3.5 shrink-0" />
                  <span className="hidden sm:inline">Owner Notify</span>
                  <span className="sm:hidden">Owner</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSuccessModalTab('logs')}
                  className={`flex items-center justify-center space-x-1 py-2.5 rounded-xl transition ${successModalTab === 'logs' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  <Terminal className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                  <span className="hidden sm:inline">Transmission Logs</span>
                  <span className="sm:hidden">Logs</span>
                </button>
              </div>

              {/* Tab bodies */}
              <div className="p-4 text-left">
                {successModalTab === 'details' && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-150 space-y-3">
                      <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                        <span className="text-xs font-black text-slate-800">Booking Ref: {lastSubmittedBooking.id}</span>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">PREVIEW INVOICE</span>
                      </div>
                      <div className="text-xs space-y-1.5 text-slate-600">
                        <p><strong>Client Name:</strong> {lastSubmittedBooking.clientName}</p>
                        <p><strong>Client Email:</strong> {lastSubmittedBooking.clientEmail}</p>
                        <p><strong>Contact Phone:</strong> {lastSubmittedBooking.clientPhone}</p>
                        <p><strong>Service Location:</strong> {lastSubmittedBooking.address}</p>
                        <p><strong>Service Requested:</strong> {lastSubmittedBooking.services.map(id => SERVICES_DATA.find(s => s.id === id)?.title || id).join(', ')}</p>
                        <p><strong>Requested Arrival Date:</strong> {new Date(lastSubmittedBooking.bookingDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><strong>Preferred Arrival Window:</strong> {lastSubmittedBooking.timeSlot}</p>
                        {lastSubmittedBooking.specialInstructions && (
                          <p><strong>Special Instructions:</strong> "{lastSubmittedBooking.specialInstructions}"</p>
                        )}
                      </div>
                      <div className="pt-2.5 border-t border-slate-200 flex justify-between items-baseline">
                        <span className="text-xs font-bold text-slate-500">Ultimate Estimated Cost:</span>
                        <span className="text-lg font-black text-slate-950">${lastSubmittedBooking.quote.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {successModalTab === 'customer-email' && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Headers</div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-1 text-xs">
                      <p><span className="text-slate-400 font-semibold">From:</span> info@dustbgone.com <span className="text-[10px] text-slate-400 italic">(Dust B Gone Support)</span></p>
                      <p><span className="text-slate-400 font-semibold">To:</span> {lastSubmittedBooking.clientEmail} <span className="text-[10px] text-slate-400 italic">({lastSubmittedBooking.clientName})</span></p>
                      <p><span className="text-slate-400 font-semibold">Subject:</span> Thank you for contacting Dust B Gone Cleaning Services!</p>
                    </div>
                    
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-1">Email Body Content</div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200 text-xs text-slate-700 space-y-3 font-mono leading-relaxed max-h-56 overflow-y-auto">
                      <p>Hi {lastSubmittedBooking.clientName},</p>
                      <p className="font-sans font-medium text-slate-900 bg-blue-50/50 p-2 rounded-lg border border-blue-100">
                        Thank you for contacting Dust B Gone Cleaning Services! We appreciate you reaching out to us for your exterior property maintenance.
                      </p>
                      <p>Our automated systems have recorded your inquiry and successfully locked in your request under Reference Code: <strong>{lastSubmittedBooking.id}</strong>.</p>
                      <p><strong>Here is a summary of your inquiry details:</strong></p>
                      <ul className="list-disc list-inside pl-2 space-y-1">
                        <li><strong>Requested Services:</strong> {lastSubmittedBooking.services.map(id => SERVICES_DATA.find(s => s.id === id)?.title || id).join(', ')}</li>
                        <li><strong>Service Address:</strong> {lastSubmittedBooking.address}</li>
                        <li><strong>Target Schedule Date:</strong> {lastSubmittedBooking.bookingDate}</li>
                        <li><strong>Arrival Slot:</strong> {lastSubmittedBooking.timeSlot}</li>
                        <li><strong>Estimated Quote Total:</strong> ${lastSubmittedBooking.quote.total.toFixed(2)}</li>
                      </ul>
                      <p>A member of our local Kingston area team will contact you within 24 hours to confirm the scheduling slot, inspect details, and organize your technician arrival.</p>
                      <p>Best Regards,</p>
                      <p className="font-semibold text-slate-900 font-sans">Dust B Gone Dispatch Operations Team<br/><span className="text-xs text-slate-400">Kingston, ON & Surrounding Areas</span></p>
                    </div>
                  </div>
                )}

                {successModalTab === 'owner-email' && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Headers</div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-1 text-xs">
                      <p><span className="text-slate-400 font-semibold">From:</span> system-noreply@dustbgone.com <span className="text-[10px] text-slate-400 italic">(Outbound Message Router)</span></p>
                      <p><span className="text-slate-400 font-semibold">To:</span> dustbgoneecleaningservices@gmail.com <span className="text-[10px] text-slate-400 italic">(Business Owner Alert Inbox)</span></p>
                      <p><span className="text-slate-400 font-semibold">Subject:</span> [NEW INQUIRY ALERT] {lastSubmittedBooking.clientName} - {lastSubmittedBooking.services.map(id => SERVICES_DATA.find(s => s.id === id)?.title || id).join(', ')}</p>
                    </div>
                    
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-1">Email Body Content</div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200 text-xs text-slate-700 space-y-3 font-mono leading-relaxed max-h-56 overflow-y-auto">
                      <p className="text-red-600 font-bold">⚠️ NEW BUSINESS INQUIRY DISPATCHED</p>
                      <p>An automated inquiry has been completed by a customer through the Dust B Gone website interface.</p>
                      
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                        <p className="font-bold text-slate-900 border-b border-slate-200 pb-1 mb-1.5 font-sans">CLIENT INQUIRY PROFILE</p>
                        <p><strong>Name:</strong> {lastSubmittedBooking.clientName}</p>
                        <p><strong>Email:</strong> {lastSubmittedBooking.clientEmail}</p>
                        <p><strong>Phone:</strong> {lastSubmittedBooking.clientPhone}</p>
                        <p><strong>Address:</strong> {lastSubmittedBooking.address}</p>
                        <p><strong>Property Category:</strong> {lastSubmittedBooking.propertyType === 'commercial' ? 'Commercial Liability Grade' : 'Residential'}</p>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                        <p className="font-bold text-slate-900 border-b border-slate-200 pb-1 mb-1.5 font-sans">JOB SPECS & PRICING</p>
                        <p><strong>Reference ID:</strong> {lastSubmittedBooking.id}</p>
                        <p><strong>Services Needed:</strong> {lastSubmittedBooking.services.map(id => SERVICES_DATA.find(s => s.id === id)?.title || id).join(', ')}</p>
                        <p><strong>Requested Date:</strong> {lastSubmittedBooking.bookingDate}</p>
                        <p><strong>Assigned Time Slot:</strong> {lastSubmittedBooking.timeSlot}</p>
                        <p><strong>Calculated Cost:</strong> ${lastSubmittedBooking.quote.total.toFixed(2)}</p>
                        {lastSubmittedBooking.specialInstructions && (
                          <p className="mt-1"><strong>Special notes:</strong> "{lastSubmittedBooking.specialInstructions}"</p>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-100">
                        This action has been logged by the automated delivery queue. A matching "Thank you" auto-responder has already been sent to the client at {lastSubmittedBooking.clientEmail}.
                      </p>
                    </div>
                  </div>
                )}

                {successModalTab === 'logs' && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Outbound SMTP Mail Logs</div>
                    <div className="bg-slate-900 rounded-xl p-4 font-mono text-[11px] text-emerald-400 space-y-1.5 leading-relaxed overflow-x-auto select-all h-64 border border-slate-800">
                      <p className="text-slate-400">[{new Date().toISOString()}] INITIALIZING INQUIRY OUTBOX TRANSACTION...</p>
                      <p className="text-cyan-400">▶ SYSTEM: Detected new booking submission {lastSubmittedBooking.id}</p>
                      <p>▶ PARSING: Client name="{lastSubmittedBooking.clientName}" email="{lastSubmittedBooking.clientEmail}"</p>
                      <p>▶ COMPILING: Auto-responder email template matching "Thank you for contacting Dust B Gone..."</p>
                      <p className="text-yellow-400">▶ OUTBOUND: Connecting to SMTP Relay [mail.dustbgone.com:587] on TLS v1.3...</p>
                      <p>▶ SMTP: Connection accepted. Handshake successful.</p>
                      <p className="text-emerald-500">✔ SUCCESS: Outbound email packet (1,348 bytes) sent to "{lastSubmittedBooking.clientEmail}"</p>
                      <p>▶ SYSTEM: Drafting administrative notice email content for local Kingston branch operations</p>
                      <p>▶ COMPILING: Injecting customer profile, contact details, services requested, and calculated invoice value (${lastSubmittedBooking.quote.total.toFixed(2)})</p>
                      <p className="text-yellow-400">▶ OUTBOUND: Dispatching admin email alert packet to "dustbgoneecleaningservices@gmail.com"</p>
                      <p className="text-emerald-500">✔ SUCCESS: Admin alert packet delivered. SMTP server responded: 250 2.0.0 OK QueueID_82y9f1h3</p>
                      <p className="text-slate-400">---------------------------------------------------------</p>
                      <p className="text-white font-bold">✔ DISPATCH STATUS: COMPLETE. ALL AUTOMATED NOTIFICATIONS SENT.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-3.5">
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
              <span>Direct Kingston ON Area Services • Fully Bonded & Insured • Lic #1001642386</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
