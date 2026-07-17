import React from 'react';
import { motion } from 'motion/react';
import { QuoteDetails, QuoteResult, ServiceId } from '../types';
import { SERVICES_DATA, ADDONS_DATA } from '../data';
import { calculateQuote } from '../utils';
import { Droplets, Waves, Wind, Layers, Plus, Minus, Info, Calculator, Percent, Sparkles, Building, Home, HelpCircle } from 'lucide-react';

interface QuoteCalculatorViewProps {
  quoteInput: QuoteDetails;
  setQuoteInput: React.Dispatch<React.SetStateAction<QuoteDetails>>;
  onBookQuote: (quote: QuoteResult) => void;
}

export default function QuoteCalculatorView({
  quoteInput,
  setQuoteInput,
  onBookQuote
}: QuoteCalculatorViewProps) {
  
  const quote = calculateQuote(quoteInput);

  const toggleService = (id: ServiceId) => {
    let services = [...quoteInput.selectedServices];
    if (services.includes(id)) {
      // Don't allow removing if it's the only one left
      if (services.length > 1) {
        services = services.filter(s => s !== id);
      }
    } else {
      services.push(id);
    }
    setQuoteInput({ ...quoteInput, selectedServices: services });
  };

  const handleSliderChange = (field: keyof QuoteDetails, val: number) => {
    setQuoteInput({ ...quoteInput, [field]: val });
  };

  const incrementValue = (field: keyof QuoteDetails, step = 1, min = 1, max = 20) => {
    const current = Number(quoteInput[field]) || 0;
    const newVal = Math.min(max, Math.max(min, current + step));
    setQuoteInput({ ...quoteInput, [field]: newVal });
  };

  const handlePropertyType = (type: 'residential' | 'commercial') => {
    setQuoteInput({ ...quoteInput, propertyType: type });
  };

  const handleAddonToggle = (addonId: string) => {
    const key = addonId as keyof QuoteDetails;
    setQuoteInput({ ...quoteInput, [key]: !quoteInput[key] });
  };

  const getServiceLabel = (id: ServiceId) => {
    const s = SERVICES_DATA.find(x => x.id === id);
    return s ? s.title : id;
  };

  const renderServiceIcon = (id: ServiceId, className = "h-5 w-5") => {
    switch (id) {
      case 'window': return <Droplets className={`${className} text-cyan-500`} />;
      case 'pressure': return <Waves className={`${className} text-blue-500`} />;
      case 'dryer': return <Wind className={`${className} text-indigo-500`} />;
      case 'gutter': return <Layers className={`${className} text-emerald-500`} />;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-2">
          <Calculator className="h-5 w-5" />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          InstaQuote™ Price Estimator
        </h2>
        <p className="text-sm text-slate-500">
          Select your services and input your property parameters. Our dynamic algorithm calculates fully customized commercial and residential estimates in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        
        {/* Left Parameter Panel: 7 Columns */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Property Profile */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white font-black">1</span>
              <span>Property Profile</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handlePropertyType('residential')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  quoteInput.propertyType === 'residential'
                    ? 'border-blue-600 bg-blue-50/20 text-blue-900 shadow-sm'
                    : 'border-slate-100 hover:border-slate-200 text-slate-600 bg-slate-50/50'
                }`}
              >
                <Home className={`h-6 w-6 mb-2 ${quoteInput.propertyType === 'residential' ? 'text-blue-600' : 'text-slate-400'}`} />
                <span className="text-sm font-bold">Residential</span>
                <span className="text-[10px] text-slate-400 mt-1">Single-family, Townhome, Condo</span>
              </button>

              <button
                type="button"
                onClick={() => handlePropertyType('commercial')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  quoteInput.propertyType === 'commercial'
                    ? 'border-blue-600 bg-blue-50/20 text-blue-900 shadow-sm'
                    : 'border-slate-100 hover:border-slate-200 text-slate-600 bg-slate-50/50'
                }`}
              >
                <Building className={`h-6 w-6 mb-2 ${quoteInput.propertyType === 'commercial' ? 'text-blue-600' : 'text-slate-400'}`} />
                <span className="text-sm font-bold">Commercial</span>
                <span className="text-[10px] text-slate-400 mt-1">Retail, Office, Parkade, Block</span>
              </button>
            </div>

            {/* Building Stories height selector */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Building Height (Stories)</label>
              <div className="flex rounded-lg bg-slate-100 p-1">
                {[1, 2, 3, 4].map((story) => (
                  <button
                    key={story}
                    type="button"
                    onClick={() => setQuoteInput({ ...quoteInput, stories: story })}
                    className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
                      quoteInput.stories === story
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {story} {story === 1 ? 'Story' : story === 4 ? 'Stories +' : 'Stories'}
                  </button>
                ))}
              </div>
              {quoteInput.stories >= 3 && (
                <p className="text-[10px] text-amber-600 font-semibold mt-1.5 flex items-center space-x-1">
                  <span>⚠️ High-reach safety systems & heavy rigging surcharge (15%) applied.</span>
                </p>
              )}
            </div>
          </div>

          {/* Step 2: Choose Services */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white font-black">2</span>
                <span>Select Services to Bundle</span>
              </h3>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full flex items-center space-x-1 animate-pulse">
                <Percent className="h-3 w-3" />
                <span>Bundle & Save!</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES_DATA.map((service) => {
                const isSelected = quoteInput.selectedServices.includes(service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`flex items-center space-x-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/10'
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isSelected ? 'bg-blue-100' : 'bg-slate-50'}`}>
                      {renderServiceIcon(service.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate">{service.title}</h4>
                      <p className="text-[10px] text-slate-400 truncate">{service.shortDesc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="h-4.5 w-4.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 pointer-events-none"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Customize Service Quantities / Metrics */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white font-black">3</span>
              <span>Metric Customizer</span>
            </h3>

            <div className="space-y-6 divide-y divide-slate-100">
              
              {/* Window Slider */}
              {quoteInput.selectedServices.includes('window') && (
                <div className="space-y-3 pt-0">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center space-x-2">
                      {renderServiceIcon('window', 'h-4 w-4')}
                      <label className="text-xs font-bold text-slate-700">Number of Windows</label>
                    </div>
                    <span className="text-sm font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                      {quoteInput.windowCount} Windows
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="1"
                    value={quoteInput.windowCount}
                    onChange={(e) => handleSliderChange('windowCount', Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>5 Windows (Minimum)</span>
                    <span>100 Windows</span>
                  </div>
                </div>
              )}

              {/* Pressure Square Footage */}
              {quoteInput.selectedServices.includes('pressure') && (
                <div className="space-y-3 pt-4">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center space-x-2">
                      {renderServiceIcon('pressure', 'h-4 w-4')}
                      <label className="text-xs font-bold text-slate-700">Walkway / Facade Surface Area</label>
                    </div>
                    <span className="text-sm font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                      {quoteInput.pressureAreaSqFt.toLocaleString()} Sq Ft
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={quoteInput.pressureAreaSqFt}
                    onChange={(e) => handleSliderChange('pressureAreaSqFt', Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>100 Sq Ft</span>
                    <span>10,000 Sq Ft (Heavy Duty Commercial)</span>
                  </div>
                </div>
              )}

              {/* Dryer Vent Count */}
              {quoteInput.selectedServices.includes('dryer') && (
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center space-x-2">
                    {renderServiceIcon('dryer', 'h-4 w-4')}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block">Dryer Vent Air Duct Units</label>
                      <span className="text-[10px] text-slate-400">10% discount applied for multi-vent orders</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    <button
                      type="button"
                      onClick={() => incrementValue('dryerVentCount', -1, 1, 20)}
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-white border border-slate-200 text-slate-600 hover:text-slate-900 active:scale-95 transition"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-sm font-black text-slate-800 w-6 text-center">{quoteInput.dryerVentCount}</span>
                    <button
                      type="button"
                      onClick={() => incrementValue('dryerVentCount', 1, 1, 20)}
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-white border border-slate-200 text-slate-600 hover:text-slate-900 active:scale-95 transition"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Gutter Length Slider */}
              {quoteInput.selectedServices.includes('gutter') && (
                <div className="space-y-3 pt-4">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center space-x-2">
                      {renderServiceIcon('gutter', 'h-4 w-4')}
                      <label className="text-xs font-bold text-slate-700">Total Gutter Line Length</label>
                    </div>
                    <span className="text-sm font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                      {quoteInput.gutterLengthFt} Linear Feet
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="600"
                    step="10"
                    value={quoteInput.gutterLengthFt}
                    onChange={(e) => handleSliderChange('gutterLengthFt', Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>20 Feet</span>
                    <span>600 Linear Feet</span>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Step 4: Premium Add-ons */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white font-black">4</span>
              <span>Available Premium Add-ons</span>
            </h3>

            <div className="space-y-2.5">
              {ADDONS_DATA.map((addon) => {
                // Filter logic to show screen wash only if window washing selected, or gutter guard only if gutter cleaning selected
                const isWindowAddon = addon.id === 'screenCleaning';
                const isGutterAddon = addon.id === 'gutterGuards';
                
                const showAddon = 
                  (!isWindowAddon || quoteInput.selectedServices.includes('window')) &&
                  (!isGutterAddon || quoteInput.selectedServices.includes('gutter'));

                if (!showAddon) return null;

                const isChecked = !!quoteInput[addon.id as keyof QuoteDetails];

                return (
                  <div
                    key={addon.id}
                    onClick={() => handleAddonToggle(addon.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      isChecked
                        ? 'border-blue-600 bg-blue-50/5'
                        : 'border-slate-50 hover:border-slate-100 hover:bg-slate-50/30'
                    }`}
                  >
                    <div className="flex items-start space-x-3 pr-4">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        className="h-4 w-4 mt-0.5 text-blue-600 border-slate-300 rounded pointer-events-none"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{addon.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{addon.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-blue-600 whitespace-nowrap bg-blue-50 px-2 py-1 rounded-md">
                      +${addon.price}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Live Summary Panel: 5 Columns */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-300 border border-slate-800">
            
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-black tracking-wide text-slate-400 uppercase">Interactive Quote Overview</h3>
                <span className="text-[10px] font-bold text-emerald-400 capitalize flex items-center space-x-1 mt-0.5">
                  <Sparkles className="h-3 w-3" />
                  <span>{quoteInput.propertyType} Package • {quoteInput.stories} Stories</span>
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider bg-slate-800 px-2.5 py-1 rounded-md">
                SUMMER RATES
              </span>
            </div>

            {/* Service breakdowns list */}
            <div className="py-4 space-y-3.5 border-b border-slate-800">
              {quote.breakdown.map((item) => (
                <div key={item.serviceId} className="flex justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{item.name}</span>
                    <span className="text-[10px] text-slate-400">Qty: {item.qty} {item.unit}</span>
                  </div>
                  <span className="font-semibold text-slate-200">${item.cost.toFixed(2)}</span>
                </div>
              ))}

              {quote.breakdown.length === 0 && (
                <p className="text-xs text-amber-400 font-medium">Please select at least one cleaning service above.</p>
              )}

              {/* Addons summary */}
              {quote.addonsCost > 0 && (
                <div className="flex justify-between text-xs text-slate-300 pt-1.5 border-t border-slate-800/60 border-dashed">
                  <span>Selected Premium Add-ons</span>
                  <span>+${quote.addonsCost.toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Calculations and bundle metrics */}
            <div className="py-4 space-y-2 text-xs border-b border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>Services Subtotal</span>
                <span>${quote.subtotal.toFixed(2)}</span>
              </div>

              {/* Bundle reward banner */}
              {quote.bundleDiscount > 0 ? (
                <div className="flex justify-between text-emerald-400 font-semibold bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                  <span className="flex items-center space-x-1">
                    <Percent className="h-3 w-3" />
                    <span>Bundle Discount ({quoteInput.selectedServices.length === 2 ? '10%' : quoteInput.selectedServices.length === 3 ? '15%' : '20%'} off)</span>
                  </span>
                  <span>-${quote.bundleDiscount.toFixed(2)}</span>
                </div>
              ) : (
                <div className="bg-slate-800/40 p-2 rounded-lg text-[10px] text-slate-400 leading-relaxed">
                  💡 <strong>Pro-Tip:</strong> Bundle 2 services to save 10%, 3 services to save 15%, or clean your entire building exterior with all 4 services for 20% off!
                </div>
              )}

              <div className="flex justify-between text-slate-400 pt-1">
                <span>Sales Tax (5%)</span>
                <span>${quote.tax.toFixed(2)}</span>
              </div>
            </div>

            {/* Golden Ultimate Total */}
            <div className="pt-5 pb-6 space-y-1.5 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ultimate Direct Quote</span>
              <div className="text-4xl font-black text-white tracking-tight">
                ${quote.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[10px] text-slate-400">All materials, heavy rigging, and post-clean protection chemicals included.</p>
            </div>

            {/* Book package button */}
            <button
              onClick={() => onBookQuote(quote)}
              disabled={quote.breakdown.length === 0}
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/10 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:pointer-events-none transition-all active:scale-95"
            >
              <span>Secure this Booking Package</span>
            </button>

            {/* Peace of mind labels */}
            <div className="mt-4 flex justify-center space-x-4 text-[10px] text-slate-500 font-semibold">
              <span>✓ No Obligation</span>
              <span>•</span>
              <span>✓ Guaranteed Price</span>
              <span>•</span>
              <span>✓ 24h Clean Return</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
