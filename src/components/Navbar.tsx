import React, { useState } from 'react';
import { Sparkles, Menu, X, Phone, Calculator, Calendar, Shield } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Navbar({ currentTab, setCurrentTab, onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Our Services' },
    { id: 'calculator', label: 'Quote Calculator' },
    { id: 'booking-list', label: 'My Bookings' },
    { id: 'admin', label: 'Admin Panel' }
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex cursor-pointer items-center space-x-2.5 transition-transform hover:scale-[1.02]"
        >
          <img 
            src="/src/assets/images/dustbgone_logo_1784318749298.jpg" 
            alt="Dust B Gone Logo" 
            className="h-11 w-11 object-contain rounded-full shadow-md border border-slate-100"
            referrerPolicy="no-referrer"
          />
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Dust B Gone
            </h1>
            <p className="text-[10px] font-semibold tracking-wider text-blue-600 uppercase">
              Cleaning Services
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id || (item.id === 'services' && ['window', 'pressure', 'dryer', 'gutter'].includes(currentTab));
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50/60' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-1.5 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-blue-600" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons & Contact */}
        <div className="hidden lg:flex items-center space-x-4">
          <a 
            href="tel:+16042063969" 
            className="flex items-center space-x-1.5 text-sm font-semibold text-slate-700 hover:text-blue-600 transition"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 border border-slate-100">
              <Phone className="h-4 w-4 text-blue-500" />
            </div>
            <span>+1 (604) 206-3969</span>
          </a>
          
          <button
            onClick={() => handleNavClick('calculator')}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
          >
            <Calculator className="h-3.5 w-3.5 text-slate-400" />
            <span>Calculate Quote</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center space-x-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
          >
            <Calendar className="h-4 w-4" />
            <span>Book Cleaning</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          <a 
            href="tel:+16042063969" 
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-slate-700 hover:text-blue-600 transition"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden space-y-2 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id || (item.id === 'services' && ['window', 'pressure', 'dryer', 'gutter'].includes(currentTab));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          
          <div className="border-t border-slate-100 pt-3 flex flex-col space-y-2.5">
            <button
              onClick={() => handleNavClick('calculator')}
              className="flex w-full items-center justify-center space-x-2 rounded-lg border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-700 shadow-sm"
            >
              <Calculator className="h-4 w-4 text-slate-400" />
              <span>Free Quote Estimator</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-md"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
