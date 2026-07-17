import React from 'react';
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Clock, Award } from 'lucide-react';
import logo from '../assets/images/dustbgone_logo_1784318749298.jpg';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ setCurrentTab, onOpenBooking }: FooterProps) {
  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      
      {/* Upper Trust Banner */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Fully Bonded & Insured</h4>
                <p className="text-xs text-slate-400">$2M commercial liability coverage for complete peace of mind.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white">100% Satisfaction Guarantee</h4>
                <p className="text-xs text-slate-400">If any spot is missed, we return and clean it within 24 hours.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Punctual & Dedicated</h4>
                <p className="text-xs text-slate-400">On-time arrival, fully equipped trucks, and background-checked staff.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <img 
                src={logo} 
                alt="Dust B Gone Logo" 
                className="h-10 w-10 object-contain rounded-full shadow-md border border-slate-800"
                referrerPolicy="no-referrer"
              />
              <span className="text-lg font-bold text-white">Dust B Gone</span>
            </div>
            <p className="text-sm text-slate-400">
              Dust B Gone is the premier choice for commercial and residential exterior property maintenance. We specialize in high-reach pure-water washing, heavy surface restoration, and chimney safety.
            </p>
            <div className="text-xs text-slate-500">
              Licensed License #: 1001642386
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-slate-100 uppercase mb-4">Our Services</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNavClick('window')} className="hover:text-blue-400 transition text-left">
                  Telescopic Window Washing
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('pressure')} className="hover:text-blue-400 transition text-left">
                  Pressure Washing Surfaces
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('dryer')} className="hover:text-blue-400 transition text-left">
                  Dryer Vent Cleansing
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('gutter')} className="hover:text-blue-400 transition text-left">
                  Gutter Vacuum Extraction
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-slate-100 uppercase mb-4">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-blue-400 transition">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('calculator')} className="hover:text-blue-400 transition">
                  Interactive Quote Estimator
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-blue-400 transition">
                  Online Scheduling Center
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('booking-list')} className="hover:text-blue-400 transition">
                  My Active Appts
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-semibold tracking-wider text-slate-100 uppercase mb-4">Contact & Locations</h3>
            <div className="flex items-start space-x-2.5 text-sm">
              <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="block font-semibold text-slate-100">Kingston, ON & Surrounding Areas</span>
                <span className="block text-xs text-slate-400 leading-relaxed">Amherstview, Bath, Loyalist, Bayridge, Belleville, & Napanee</span>
              </div>
            </div>
            <div className="flex items-center space-x-2.5 text-sm">
              <Phone className="h-4 w-4 text-blue-500 shrink-0" />
              <a href="tel:+16042063969" className="hover:text-white transition">+1 (604) 206-3969</a>
            </div>
            <div className="flex items-center space-x-2.5 text-sm">
              <Mail className="h-4 w-4 text-blue-500 shrink-0" />
              <a href="mailto:dustbgoneecleaningservices@gmail.com" className="hover:text-white transition">dustbgoneecleaningservices@gmail.com</a>
            </div>
            <div className="pt-2">
              <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                ● Now Scheduling for Summer 2026
              </span>
            </div>
          </div>

        </div>

        {/* Lower copyright */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Dust B Gone Cleaning Services Ltd. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-slate-400 transition">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400 transition">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
