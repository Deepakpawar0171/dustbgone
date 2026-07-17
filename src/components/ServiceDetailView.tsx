import React from 'react';
import { motion } from 'motion/react';
import { CleaningService, ServiceId } from '../types';
import { Droplets, Waves, Wind, Layers, CheckCircle, HelpCircle, ArrowRight, ShieldAlert, Award } from 'lucide-react';

interface ServiceDetailViewProps {
  service: CleaningService;
  onBookService: (serviceId: ServiceId) => void;
  onGoToCalculator: (serviceId: ServiceId) => void;
  allServices: CleaningService[];
  onSelectService: (serviceId: ServiceId) => void;
}

export default function ServiceDetailView({
  service,
  onBookService,
  onGoToCalculator,
  allServices,
  onSelectService
}: ServiceDetailViewProps) {
  
  // Render corresponding lucide icon
  const renderIcon = (id: ServiceId, className = "h-6 w-6") => {
    switch (id) {
      case 'window':
        return <Droplets className={`${className} text-cyan-500`} />;
      case 'pressure':
        return <Waves className={`${className} text-blue-500`} />;
      case 'dryer':
        return <Wind className={`${className} text-indigo-500`} />;
      case 'gutter':
        return <Layers className={`${className} text-emerald-500`} />;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Back/Switch Service Sidebar Ribbon */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center bg-slate-50 p-2.5 rounded-xl border border-slate-100 max-w-4xl mx-auto">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 flex items-center">
          Explore Services:
        </span>
        {allServices.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              onSelectService(s.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              s.id === service.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {renderIcon(s.id, "h-3.5 w-3.5")}
            <span>{s.title.split(' ')[1] || s.title}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
        
        {/* Left Column: Rich Presentation & 3D Interactive Mock Card */}
        <div className="lg:col-span-7 space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="inline-flex items-center space-x-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 border border-blue-100">
              {renderIcon(service.id, "h-4 w-4")}
              <span>Advanced Property Care</span>
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              {service.title}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {service.description}
            </p>
          </motion.div>

          {/* Service Key Highlights Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {service.highlights.map((highlight, idx) => (
              <div 
                key={idx} 
                className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-blue-100 hover:shadow transition-all duration-300"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-slate-700">{highlight}</span>
              </div>
            ))}
          </motion.div>

          {/* Step-by-Step Clean Process */}
          <div className="space-y-6 pt-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Our Professional Step-by-Step Method</h3>
              <p className="text-xs text-slate-500 mt-1">Engineered to produce perfect streak-free results and long-term protection.</p>
            </div>

            <div className="relative border-l border-slate-200 pl-6 ml-3 space-y-8">
              {service.process.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Step bubble */}
                  <span className="absolute -left-9 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-4 ring-white shadow-sm">
                    {step.step}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-800">{step.title}</h4>
                    <p className="text-xs text-slate-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Card Sidebar, Pricing, Call to Action */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          
          {/* Creative 3D-Look Image Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 text-white shadow-xl shadow-slate-300 border border-slate-100 group"
            style={{ perspective: 1000 }}
          >
            {/* Aspect Ratio Box with hyper-realistic image */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
              <img 
                src={service.image} 
                alt={service.title} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <span className="rounded-lg bg-blue-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                  Curb Appeal Guaranteed
                </span>
                <span className="text-xs font-semibold text-slate-200 flex items-center space-x-1">
                  <Award className="h-3.5 w-3.5 text-yellow-400" />
                  <span>Premium Grade</span>
                </span>
              </div>
            </div>

            {/* Pricing Box & CTA */}
            <div className="p-6 space-y-6">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estimated Pricing Model</span>
                <p className="text-2xl font-black text-white">{service.pricingBasis.split(' (')[0]}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{service.pricingBasis}</p>
              </div>

              {/* Unique Features List */}
              <div className="border-t border-slate-800 pt-4 space-y-3.5">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                    <div>
                      <strong className="text-white block mb-0.5">{feat.title}</strong>
                      <span className="text-slate-400">{feat.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Booking CTA Buttons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => onBookService(service.id)}
                  id={`btn-book-${service.id}`}
                  className="inline-flex w-full items-center justify-center space-x-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-900/40 hover:bg-blue-500 active:scale-95 transition-all"
                >
                  <span>Book this Service</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => onGoToCalculator(service.id)}
                  className="inline-flex w-full items-center justify-center space-x-1 rounded-xl border border-slate-700 bg-slate-850 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition"
                >
                  <span>Calculate Custom Quote</span>
                </button>
              </div>

            </div>
          </motion.div>

          {/* Quick Info Advisory Tip */}
          <div className="rounded-xl border border-blue-50 bg-blue-50/30 p-4 flex items-start space-x-3 text-xs text-slate-600">
            <ShieldAlert className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-blue-900 font-semibold block mb-0.5">Bundle and Save up to 20%</strong>
              Combining {service.title.split(' ')[0]} with our pressure washing, gutter vacuuming, or dryer vent cleaning qualifies you for premium package pricing! Check our Quote Calculator to unlock bundle rewards.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
