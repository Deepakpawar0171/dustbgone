import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Shield, Search, Navigation, CheckCircle2 } from 'lucide-react';

interface LocalArea {
  name: string;
  county: string;
  mapQuery: string;
}

export default function AreasView() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const localAreasData: LocalArea[] = [
    {
      name: 'Kingston (Core Hub)',
      county: 'Frontenac',
      mapQuery: 'Kingston, Ontario',
    },
    {
      name: 'Belleville',
      county: 'Hastings',
      mapQuery: 'Belleville, Ontario',
    },
    {
      name: 'Brockville',
      county: 'Leeds & Grenville',
      mapQuery: 'Brockville, Ontario',
    },
    {
      name: 'Napanee',
      county: 'Lennox & Addington',
      mapQuery: 'Napanee, Ontario',
    },
    {
      name: 'Amherstview & Loyalist',
      county: 'Lennox & Addington',
      mapQuery: 'Amherstview, Ontario',
    },
    {
      name: 'Gananoque',
      county: 'Leeds & Grenville',
      mapQuery: 'Gananoque, Ontario',
    },
    {
      name: 'Prince Edward County',
      county: 'Prince Edward',
      mapQuery: 'Prince Edward County, Ontario',
    }
  ];

  const filteredAreas = localAreasData.filter(area =>
    area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.county.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Dynamic Hero Banner */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-16 sm:py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/40"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-950/80 via-slate-900/10 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="inline-flex items-center space-x-1.5 rounded-full bg-blue-500/15 px-3.5 py-1.5 text-xs font-black tracking-widest text-blue-400 uppercase border border-blue-500/20">
            <MapPin className="h-4 w-4 text-cyan-400 animate-bounce" />
            <span>Serving Eastern Ontario</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-white">
            Our Service Areas & <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Coverage Maps
            </span>
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Find below the interactive regional coverage maps for each municipal district we service across Eastern Ontario.
          </p>

          {/* Quick search input */}
          <div className="max-w-md mx-auto pt-4 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text"
              placeholder="Search by area name or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 backdrop-blur-sm transition"
            />
          </div>
        </div>
      </section>

      {/* 2. Geo Directory List & Maps Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {filteredAreas.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 space-y-4 max-w-md mx-auto">
            <Navigation className="h-10 w-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No Service Zones Match</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We may still service your location for major property portfolios. Please contact us at +1 (604) 206-3969 for a special dispatch assessment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAreas.map((area, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-6 border border-slate-150/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-4">
                  
                  {/* Card Title Header */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 inline-block">
                      {area.county} Region
                    </span>
                    <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center space-x-2">
                      <Navigation className="h-4 w-4 text-blue-600 shrink-0" />
                      <span>{area.name}</span>
                    </h3>
                  </div>

                  {/* Clean Map Embed */}
                  <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 aspect-video relative">
                    <iframe
                      title={`Coverage map of ${area.name}`}
                      width="100%"
                      height="100%"
                      className="border-0"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(area.mapQuery)}&t=&z=11&ie=UTF8&iwloc=&output=embed`}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>

                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-bold">
                  <span>Coverage:</span>
                  <span className="text-emerald-600">Full Service Dispatch</span>
                </div>

              </div>
            ))}
          </div>
        )}

      </section>

      {/* 3. Local Coverage Promise */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-900"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center space-x-1.5 rounded-full bg-blue-500/10 px-3.5 py-1.5 text-xs font-bold text-blue-400 border border-blue-500/20">
              <Shield className="h-4 w-4 text-cyan-400" />
              <span>Full Licensing & Liability Indemnity</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-none text-white">
              The Dust B Gone Local Service Promise
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              We never sub-contract your home to unverified gig workers. Every technician who arrives at your property is a full-time, fully insured, background-checked employee wearing branded Dust B Gone uniforms and operating company trucks.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="flex items-center justify-center space-x-2 text-slate-200 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400" />
                <span>No Out-of-Zone Upcharges</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-slate-200 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400" />
                <span>Next-Day Response Guarantee</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-slate-200 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400" />
                <span>GPS Tracked Dispatches</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
