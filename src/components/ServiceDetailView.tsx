import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CleaningService, ServiceId } from '../types';
import { 
  Droplets, Waves, Wind, Layers, CheckCircle, ArrowRight, 
  ShieldAlert, Award, ShieldCheck, Zap, Flame, Clock, 
  Compass, Eye, Heart, BarChart3, HelpCircle 
} from 'lucide-react';

// Import all 16 newly generated hyper-realistic assets
import window1 from '../assets/images/window_1_logo_pole_v2_1784338520163.jpg';
import window2 from '../assets/images/window_2_skylights_v2_1784338534168.jpg';
import window3 from '../assets/images/window_3_interior_v2_1784338550136.jpg';
import window4 from '../assets/images/window_4_railing_v2_1784338564389.jpg';

import pressure1 from '../assets/images/pressure_1_spinner_v2_1784338580673.jpg';
import pressure2 from '../assets/images/pressure_2_facade_1784337461310.jpg';
import pressure3 from '../assets/images/pressure_3_deck_1784337472483.jpg';
import pressure4 from '../assets/images/pressure_4_curb_1784337482207.jpg';

import dryer1 from '../assets/images/dryer_1_laundry_1784337496359.jpg';
import dryer2 from '../assets/images/dryer_2_lint_1784337506739.jpg';
import dryer3 from '../assets/images/dryer_3_exterior_1784337517661.jpg';
import dryer4 from '../assets/images/dryer_4_airflow_1784337528710.jpg';

import gutter1 from '../assets/images/gutter_1_vacuum_1784337539840.jpg';
import gutter2 from '../assets/images/gutter_2_ladder_1784337549565.jpg';
import gutter3 from '../assets/images/gutter_3_flushing_1784337560248.jpg';
import gutter4 from '../assets/images/gutter_4_camera_1784337569371.jpg';

import logoImg from '../assets/images/dustbgone_logo_1784318749298.jpg';

interface ServiceDetailViewProps {
  service: CleaningService;
  onBookService: (serviceId: ServiceId) => void;
  onGoToCalculator: (serviceId: ServiceId) => void;
  allServices: CleaningService[];
  onSelectService: (serviceId: ServiceId) => void;
}

// 4 Hyper-Realistic Pictures data per service
const GALLERY_DATA: Record<ServiceId, { src: string; title: string; desc: string; tag: string }[]> = {
  window: [
    {
      src: window1,
      tag: "Pure Water Pole",
      title: "Dust B Gone Branded Telescopic Care",
      desc: "Our field expert in a neat navy Dust B Gone logo polo shirt operates a specialized water-fed telescopic pole, scrubbing and rinsing glass safely from the safety of the ground."
    },
    {
      src: window2,
      tag: "Sky Glass Wash",
      title: "Pristine Roof Skylight Restoration",
      desc: "Safely reaching high glass skylights with carbon-fiber pole lines. The purified water dissolves grime, drying with absolute mineral-free clarity."
    },
    {
      src: window3,
      tag: "Interior Squeegee",
      title: "Hand-Crafted Interior Window Detail",
      desc: "Using fine-edge brass squeegees, premium lint-free microfibers, and protective floor drop-sheets for streak-free indoor window detailing."
    },
    {
      src: window4,
      tag: "Railing Glass",
      title: "Balcony Railing Glass Hand Polish",
      desc: "Detailed polishing of exterior terrace glass and wind-guards, removing salt mist, atmospheric haze, fingerprints, and hard water spots."
    }
  ],
  pressure: [
    {
      src: pressure1,
      tag: "Rotary Spinner",
      title: "Flat-Surface Driveway Restoration",
      desc: "A heavy-duty rotary spinner in action, pressure washing dirt and dark organic staining from concrete and brick, leaving sharp contrast lines."
    },
    {
      src: pressure2,
      tag: "Facade Washing",
      title: "High-Reach Siding & Facade Blasting",
      desc: "Tackling multi-story brick siding and stucco, stripping away decades of vehicle carbon exhaust, mold spores, and grime build-ups safely."
    },
    {
      src: pressure3,
      tag: "Cedar Restoring",
      title: "Cedar Deck Wood Fiber Revitalization",
      desc: "A precise, low-pressure cedar wash showing a clean contrast line. Removing dead grey fibers to restore the original golden cedar wood."
    },
    {
      src: pressure4,
      tag: "Curb Hot Wash",
      title: "Commercial Sidewalk & Curb Steam Clean",
      desc: "Blasting stubborn chewing gum, oily dark stains, and heavy tyre residue on parking curbs using high-temperature hot water pressure."
    }
  ],
  dryer: [
    {
      src: dryer1,
      tag: "Rotary Whipping",
      title: "Laundry Room Duct Attachment",
      desc: "Inserting high-end flexible rotary snaking brushes from the indoor dryer collar to dislodge deeply packed lint runs inside the house."
    },
    {
      src: dryer2,
      tag: "Safe Containment",
      title: "Combustible Lint Vacuum Extraction",
      desc: "Using heavy suction vacuums to pull thick, highly flammable gray lint clumps out of metal dryer exhaust lines, eliminating house fire risks."
    },
    {
      src: dryer3,
      tag: "Exhaust Inspection",
      title: "Exterior Wall Exhaust Cap Detailing",
      desc: "Clearing exterior vents, dampers, and outer louvers of birds' nests and dense lint accumulation so hot exhaust flows completely unobstructed."
    },
    {
      src: dryer4,
      tag: "Airflow Proof",
      title: "Digital Anemometer Velocity Verification",
      desc: "Utilizing professional flow rate gauges to measure exhaust wind speed before and after cleaning to prove 100% system efficiency."
    }
  ],
  gutter: [
    {
      src: gutter1,
      tag: "Ground-Vac Care",
      title: "Ground-Based Gutter Vacuuming",
      desc: "Using heavy-duty wet/dry suction vacuums with high-reach carbon fiber poles to clear sludge and leaves safely from the ground."
    },
    {
      src: gutter2,
      tag: "Hand Extraction",
      title: "Ladder Stand-Off Manual Cleaning",
      desc: "Climbing high roofs safely with rubberized ladder stabilizer brackets to hand-scoop dense branch blockages and pack them for green disposal."
    },
    {
      src: gutter3,
      tag: "Downspout Flush",
      title: "High-Volume Water Flush & Flow Test",
      desc: "Flushing gutters with heavy water lines to confirm perfectly pitched channels and ensure 100% open downspout drainage pathways."
    },
    {
      src: gutter4,
      tag: "Camera Audit",
      title: "Pole-Mounted Inspection Camera Audit",
      desc: "Inspecting the gutter channel interior with high-resolution pole cameras to verify absolute clearing and perfect visual cleanliness."
    }
  ]
};

// Custom core benefits data per service
const BENEFITS_DATA: Record<ServiceId, { title: string; desc: string; icon: React.ReactNode }[]> = {
  window: [
    {
      title: "30% More Natural Daylight",
      desc: "Removing the grey micro-layer of grime instantly brightens up your indoor rooms, improving mood and reducing electric lighting use.",
      icon: <Zap className="h-5 w-5 text-cyan-500" />
    },
    {
      title: "Extended Window Lifespan",
      desc: "Hard water minerals, acid rain, and salt build-up permanently etch glass. Cleanings prevent expensive glass pitting and structural fogging.",
      icon: <Award className="h-5 w-5 text-cyan-500" />
    },
    {
      title: "Prevent Rotten Window Sills",
      desc: "Wiping clean the frames and channels prevents stagnant moisture retention, avoiding wood rot, mold growth, and mechanical failures.",
      icon: <ShieldCheck className="h-5 w-5 text-cyan-500" />
    },
    {
      title: "Eco-Friendly Spotless Finish",
      desc: "Our deionized pure water leaves a static-repellent glass surface with no chemical residue, meaning your windows stay clean 2x longer.",
      icon: <Compass className="h-5 w-5 text-cyan-500" />
    }
  ],
  pressure: [
    {
      title: "Slip & Fall Hazard Prevention",
      desc: "Slippery green moss, wet algae, and mold are major liability risks. Pressure washing restores high-traction concrete and brick walks.",
      icon: <ShieldCheck className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Stunning Instant Curb Appeal",
      desc: "Restores dirty grey fences, mildewed siding, and oil-stained driveways to their original bright, like-new developer colors.",
      icon: <Heart className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Eliminates Structural Acid Erosion",
      desc: "Bird droppings, soot, and acid moss eat away at painted siding and shingles. Soft-washing destroys spores down to the roots safely.",
      icon: <Zap className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Allergen & Spore Reduction",
      desc: "Removes thick mold and pollen spores from exterior patios and brick pathways before they get tracked into your home or HVAC vents.",
      icon: <Award className="h-5 w-5 text-blue-500" />
    }
  ],
  dryer: [
    {
      title: "Complete Fire Risk Mitigation",
      desc: "Dryer lint is highly flammable. Regular extraction eliminates one of the top causes of active house fires in residential buildings.",
      icon: <Flame className="h-5 w-5 text-indigo-500" />
    },
    {
      title: "Save on Energy Utility Bills",
      desc: "Clogged vents restrict air flow, forcing the dryer to work twice as hard. Restored flow saves up to $180/year in household utilities.",
      icon: <BarChart3 className="h-5 w-5 text-indigo-500" />
    },
    {
      title: "Extend Dryer System Lifespan",
      desc: "Prevents high back-pressure that overheats internal heating elements, burns out thermal fuses, and destroys the motor.",
      icon: <Clock className="h-5 w-5 text-indigo-500" />
    },
    {
      title: "Clothes Dry 50% Faster",
      desc: "Say goodbye to damp laundry after a full cycle. Enjoy perfectly dry clothes in a single standard 40-minute run.",
      icon: <Zap className="h-5 w-5 text-indigo-500" />
    }
  ],
  gutter: [
    {
      title: "Water Damage Protection",
      desc: "Clogged gutters overflow, spilling down your walls and causing structural siding rot, mold infestation, and fascia board decay.",
      icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />
    },
    {
      title: "Protect Concrete Foundations",
      desc: "Diverts thousands of gallons of heavy rainwater safely away from building basements, preventing soil erosion and foundation cracks.",
      icon: <Layers className="h-5 w-5 text-emerald-500" />
    },
    {
      title: "Avoid Costly Ice Damming",
      desc: "Stagnant, frozen water in clogged gutters forces ice blocks under your shingles during winter, creating severe roof leaks.",
      icon: <Flame className="h-5 w-5 text-emerald-500" />
    },
    {
      title: "Pest & Mosquito Eradication",
      desc: "Removing damp, rotting organic material destroys the perfect damp habitat for breeding mosquitoes, insects, birds, and mice.",
      icon: <Heart className="h-5 w-5 text-emerald-500" />
    }
  ]
};

export default function ServiceDetailView({
  service,
  onBookService,
  onGoToCalculator,
  allServices,
  onSelectService
}: ServiceDetailViewProps) {
  
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

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

  const currentGallery = GALLERY_DATA[service.id] || [];
  const currentBenefits = BENEFITS_DATA[service.id] || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-16">
      
      {/* Back/Switch Service Sidebar Ribbon */}
      <div className="flex flex-wrap gap-2 justify-center bg-white p-2.5 rounded-2xl border border-slate-200/80 max-w-4xl mx-auto shadow-sm">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 flex items-center">
          Explore Services:
        </span>
        {allServices.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              onSelectService(s.id);
              setActiveImageIdx(0);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              s.id === service.id
                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-100'
            }`}
          >
            {renderIcon(s.id, "h-4 w-4")}
            <span>{s.title.split(' ')[1] || s.title}</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Header & Core Info */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
        
        {/* Left Column: Rich Presentation */}
        <div className="lg:col-span-7 space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="inline-flex items-center space-x-1.5 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-extrabold text-blue-700 border border-blue-100 uppercase tracking-wider">
              {renderIcon(service.id, "h-4 w-4")}
              <span>Advanced Property Care</span>
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
              {service.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
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
                className="flex items-start space-x-3 bg-white p-4.5 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug">{highlight}</span>
              </div>
            ))}
          </motion.div>

          {/* Step-by-Step Clean Process */}
          <div className="space-y-6 pt-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
            <div>
              <h3 className="text-lg font-black text-slate-900">Our Professional Step-by-Step Method</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">Engineered to produce perfect streak-free results and long-term protection.</p>
            </div>

            <div className="relative border-l border-slate-200 pl-6 ml-3 space-y-8">
              {service.process.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Step bubble */}
                  <span className="absolute -left-9 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white ring-4 ring-white shadow-sm">
                    {step.step}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-slate-800">{step.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Card Sidebar, Pricing, Call to Action */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          
          {/* Creative Featured Image Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl shadow-slate-200 border border-slate-800 group"
          >
            {/* Aspect Ratio Box with hyper-realistic image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
              <img 
                src={service.image} 
                alt={service.title} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              {/* Brand Watermark Overlay */}
              <div className="absolute top-3 right-3 flex items-center bg-white/95 text-slate-900 text-[10px] font-extrabold px-2.5 py-1.5 rounded-lg uppercase tracking-wider shadow-md backdrop-blur-sm border border-white/10 select-none">
                <img src={logoImg} alt="Dust B Gone Logo" className="h-4.5 w-4.5 mr-1.5 rounded-full object-contain" />
                <span>Dust B Gone</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <span className="rounded-lg bg-blue-600/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-sm border border-blue-400/20">
                  Curb Appeal Guaranteed
                </span>
                <span className="text-xs font-bold text-slate-200 flex items-center space-x-1 bg-slate-900/80 px-2 py-1 rounded-md backdrop-blur-sm">
                  <Award className="h-3.5 w-3.5 text-yellow-400" />
                  <span>Premium Grade</span>
                </span>
              </div>
            </div>

            {/* Pricing Box & CTA */}
            <div className="p-6 space-y-6">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Estimated Pricing Model</span>
                <p className="text-2xl font-black text-white">{service.pricingBasis.split(' (')[0]}</p>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{service.pricingBasis}</p>
              </div>

              {/* Unique Features List */}
              <div className="border-t border-slate-800/80 pt-4 space-y-3.5">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                    <div>
                      <strong className="text-white block mb-0.5 font-bold text-[13px]">{feat.title}</strong>
                      <span className="text-slate-400 leading-relaxed font-medium">{feat.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Booking CTA Buttons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => onBookService(service.id)}
                  id={`btn-book-${service.id}`}
                  className="inline-flex w-full items-center justify-center space-x-2 rounded-xl bg-blue-600 px-4 py-3.5 text-xs font-black text-white uppercase tracking-wider shadow-md shadow-blue-900/30 hover:bg-blue-500 active:scale-95 transition-all"
                >
                  <span>Book Now</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => onGoToCalculator(service.id)}
                  className="inline-flex w-full items-center justify-center space-x-1 rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3.5 text-xs font-bold text-slate-200 hover:bg-slate-800 transition uppercase tracking-wider"
                >
                  <span>Custom Quote</span>
                </button>
              </div>

            </div>
          </motion.div>

          {/* Quick Info Advisory Tip */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/20 p-5 flex items-start space-x-3.5 text-xs text-slate-600">
            <ShieldAlert className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-blue-950 font-extrabold block mb-0.5 text-sm uppercase tracking-wider">Bundle and Save up to 20%</strong>
              <p className="font-medium leading-relaxed">
                Combining {service.title.split(' ')[1] || 'this service'} with our pressure washing, gutter vacuuming, or dryer vent cleaning qualifies you for premium package pricing! Check our Quote Calculator to unlock bundle rewards.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* New Section: Hyper-Realistic Interactive Picture Gallery */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white space-y-8 shadow-xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"></div>

        <div className="text-center space-y-2 max-w-2xl mx-auto relative z-10">
          <span className="inline-flex items-center space-x-1 rounded-full bg-blue-950 px-3 py-1 text-[10px] font-black tracking-widest text-blue-400 uppercase border border-blue-900">
            <Eye className="h-3.5 w-3.5 text-cyan-400" />
            <span>Field Gallery</span>
          </span>
        </div>

        {/* Dynamic Gallery Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
          
          {/* Main Selected Image Showcase (Left Column of Gallery) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4 bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIdx}
                  src={currentGallery[activeImageIdx]?.src}
                  alt={currentGallery[activeImageIdx]?.title}
                  className="h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              <div className="absolute top-3 left-3 bg-slate-900/90 text-cyan-400 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-slate-800 backdrop-blur-sm">
                Active Capture 0{activeImageIdx + 1}
              </div>

              {/* Brand Watermark Overlay */}
              <div className="absolute top-3 right-3 flex items-center bg-white/95 text-slate-900 text-[10px] font-extrabold px-2.5 py-1.5 rounded-lg uppercase tracking-wider shadow-md backdrop-blur-sm border border-white/10 select-none">
                <img src={logoImg} alt="Dust B Gone Logo" className="h-4.5 w-4.5 mr-1.5 rounded-full object-contain" />
                <span>Dust B Gone</span>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h4 className="text-base sm:text-lg font-black text-white">
                {currentGallery[activeImageIdx]?.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                {currentGallery[activeImageIdx]?.desc}
              </p>
            </div>
          </div>

          {/* Selector Thumbnails (Right Column of Gallery) */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Select Field Capture:
            </div>
            {currentGallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIdx(idx)}
                className={`flex items-center space-x-3.5 p-3 rounded-xl border text-left transition-all ${
                  idx === activeImageIdx
                    ? 'bg-blue-600/10 border-blue-500 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="relative h-12 w-16 shrink-0 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {idx === activeImageIdx && (
                    <div className="absolute inset-0 bg-blue-600/30 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="text-xs font-extrabold truncate">{img.title}</div>
                  <div className="text-[10px] text-slate-500 font-medium truncate">{img.desc}</div>
                </div>
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* New Section: Core Service Benefits & Editorial Advantages */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 text-[11px] font-extrabold text-emerald-700 border border-emerald-100 uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>Why It Matters</span>
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Core Service Benefits & Value
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
            Discover the direct structural and economic benefits of investing in professional regular maintenance for your property.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentBenefits.map((benefit, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm hover:shadow-md transition-all duration-300 space-y-4 hover:border-blue-100"
            >
              <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
                {benefit.icon}
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                  {benefit.title}
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call To Action Banner bottom */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-lg">
        <div className="absolute top-0 left-0 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl"></div>
        
        <div className="max-w-xl mx-auto space-y-6 relative z-10">
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
            Ready to Restore Your Property's Shine?
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-medium">
            Secure your spot in our local Kingston service queue. Check custom estimates using our interactive Quote Calculator, or instantly request a slot.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onBookService(service.id)}
              className="w-full sm:w-auto px-6 py-4.5 bg-white text-blue-700 font-extrabold uppercase text-xs tracking-wider rounded-xl shadow-md hover:bg-slate-50 transition active:scale-95"
            >
              Request Spotless Booking
            </button>
            <button
              onClick={() => onGoToCalculator(service.id)}
              className="w-full sm:w-auto px-6 py-4.5 bg-blue-900/50 border border-blue-400/30 text-white font-bold uppercase text-xs tracking-wider rounded-xl hover:bg-blue-900/70 transition"
            >
              Calculate Quote Estimate
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
