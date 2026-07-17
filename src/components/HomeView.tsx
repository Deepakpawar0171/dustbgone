import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CleaningService, ServiceId } from '../types';
import { Droplets, Waves, Wind, Layers, ArrowRight, ShieldCheck, Award, Star, Clock, HelpCircle, ChevronDown, CheckCircle2, ThumbsUp } from 'lucide-react';

interface HomeViewProps {
  services: CleaningService[];
  onSelectService: (serviceId: ServiceId) => void;
  onGoToTab: (tabId: string) => void;
  onOpenBooking: () => void;
}

export default function HomeView({
  services,
  onSelectService,
  onGoToTab,
  onOpenBooking
}: HomeViewProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const stats = [
    { label: '5-Star Local Reviews', val: '4.9/5' },
    { label: 'Commercial Liability', val: '$2 Million' },
    { label: 'Satisfied Properties', val: '1,500+' },
    { label: 'Guaranteed Callback', val: '24 Hours' }
  ];

  const trustPoints = [
    { title: 'Deionized Pure-Water', desc: 'No squeegee lines, zero chemicals. Glass stays cleaner longer because no static residues attract atmospheric dust.', icon: Droplets, color: 'text-cyan-500' },
    { title: 'Rotary Gutter Vacuuming', desc: 'Powerful high-lift suction vacuums out leaf mold, water, and debris without dangerous ladder-leaning or roof scrapes.', icon: Layers, color: 'text-emerald-500' },
    { title: 'Facade Soft-Washing', desc: 'Detergents break down organic growth, mold, and moss spores down to the root instead of just pressure-blasting siding.', icon: Waves, color: 'text-blue-500' },
    { title: 'System-wide Vent Cleans', desc: 'Full-sweep line snakes clean elbows and rigid vents completely to restore safety and save electric utility costs.', icon: Wind, color: 'text-indigo-500' }
  ];

  const faqs = [
    { q: 'What is water-fed telescopic pole window cleaning?', a: 'It utilizes state-of-the-art carbon fiber telescopic poles that extend up to 4 stories. We pump pure, deionized water (0 parts per million minerals) through soft bristled brushes to agitate and rinse away dirt. Because there are no mineral deposits or soap films left behind, the windows dry entirely spotless and streak-free without squeegees.' },
    { q: 'Why is dryer vent cleaning recommended annually?', a: 'Lint is highly combustible. When it restricts air ducts, the heat from the dryer can easily ignite it, making dryer vents a leading cause of home fires. It also increases dryer cycles, costing an extra $15–$35 per month in utility bills and causing excessive wear on your clothing.' },
    { q: 'Are your pressure washing chemicals safe for gardens and pets?', a: 'Absolutely. We utilize biodegradable and eco-friendly soaps for all structural siding, facade, and walkway cleaning. If we need to perform heavier oil-stain degreasing (e.g. in parkades), we isolate the drainage runoff to protect your gardens and local salmon streams.' },
    { q: 'Do you clear gutters by hand or vacuum?', a: 'Both! We use high-suction industrial gutter vacuums with telescopic carbon-fiber poles to safely lift sludge and debris from high roofs. For packed branches or extremely heavy clods, our technicians wear heavy gloves and clear them manually to protect structural hangers, followed by a pressure flush test.' }
  ];

  const testimonials = [
    { name: 'Marcus Sterling', role: 'Property Manager, Sterling Group', text: 'Dust B Gone handled the facade and parkade pressure washing for our commercial block. The water-fed window pole left the high storefront glass pristine. Incredible service and fully documented.', rating: 5, company: 'Commercial Clean' },
    { name: 'Dr. Evelyn Peters', role: 'Homeowner, Bayridge', text: 'I booked the gutter clearing vacuum and window washing. No ladders damaged our eaves, and the price calculated on their quote tool was matched exactly. No hidden extras.', rating: 5, company: 'Residential Clean' },
    { name: 'Julian Cross', role: 'Facility Coordinator, Apex Block', text: 'Having our dryer vents cleaned interior and exterior by their team was fast and professional. Our dryers now dry laundry in one cycle instead of two. Outstanding safety compliance!', rating: 5, company: 'Dryer Care Clean' }
  ];

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const getServiceLabel = (id: ServiceId) => {
    switch (id) {
      case 'window': return 'Pure-Water Window Pole';
      case 'pressure': return 'Deep Concrete & Facades';
      case 'dryer': return 'Air Duct Dryer Vents';
      case 'gutter': return 'Gutter Vacuum & Hands';
    }
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO BANNER - HIGH END STYLED CARD */}
      <section className="relative overflow-hidden bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6">
        
        {/* Background Image overlay with hyper-realistic clean home */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/hero_clean_home_1784317890657.jpg" 
            alt="Dust B Gone Pristine Property" 
            className="h-full w-full object-cover opacity-25"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex items-center space-x-1.5 rounded-full bg-blue-500/10 px-3.5 py-1.5 text-xs font-bold text-blue-400 border border-blue-500/20">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>Certified • $2M Commercial Liability Insured • Lic #1001642386</span>
            </span>
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white leading-none">
              Pristine Curb Appeal. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Guaranteed Results.
              </span>
            </h1>

            <p className="max-w-xl text-sm sm:text-base text-slate-300 leading-relaxed">
              We specialize in advanced commercial and residential exterior property restoration. Utilizing water-fed telescopic poles, high-power gutter vacuums, and facade soft-washing, we make buildings shine from top to bottom.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3.5">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center space-x-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all"
              >
                <span>Book a Cleaning Today</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => onGoToTab('calculator')}
                className="inline-flex items-center justify-center space-x-2 rounded-xl border border-slate-700 bg-slate-800/40 px-6 py-3.5 text-sm font-bold text-slate-200 hover:bg-slate-800 transition backdrop-blur-sm"
              >
                <span>InstaQuote™ Price Calculator</span>
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="pt-6 border-t border-slate-800/80 flex items-center space-x-6 text-xs text-slate-400 font-semibold">
              <span className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                <span>4.9 Star Rating</span>
              </span>
              <span>•</span>
              <span>Eco-Friendly Safe Solutions</span>
              <span>•</span>
              <span>24h Streak-Free Promise</span>
            </div>

          </div>

          {/* Hero Right: Trust Card Container */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl text-slate-300 backdrop-blur-md space-y-4"
            >
              <h3 className="text-sm font-bold text-white tracking-wider uppercase flex items-center space-x-1.5">
                <Award className="h-4 w-4 text-blue-400" />
                <span>The Dust B Gone Creed</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                As a family-operated business, we combine hard work with high-tech equipment. We never compromise on safety, and we treat every square inch of your property as if it were our own.
              </p>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-white font-medium">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-400"></div>
                  <span>100% Water Purified Spotless Dry</span>
                </div>
                <div className="flex items-center space-x-2 text-white font-medium">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-400"></div>
                  <span>High-suction No-clog Gutter Vacuuming</span>
                </div>
                <div className="flex items-center space-x-2 text-white font-medium">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-400"></div>
                  <span>Low-pressure Soft wash Facade Care</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="rounded-xl bg-slate-950/50 p-3 flex justify-between text-center border border-slate-800">
                  <div>
                    <span className="block text-lg font-black text-white">4.9 ★</span>
                    <span className="text-[9px] text-slate-500 uppercase font-bold">Google Rating</span>
                  </div>
                  <div>
                    <span className="block text-lg font-black text-white">$2M</span>
                    <span className="text-[9px] text-slate-500 uppercase font-bold">Liability Insurance</span>
                  </div>
                  <div>
                    <span className="block text-lg font-black text-white">100%</span>
                    <span className="text-[9px] text-slate-500 uppercase font-bold">Satisfaction</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>

      </section>

      {/* 2. STATS ROW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center space-y-1 py-2">
              <span className="block text-2xl font-black text-blue-600 tracking-tight">{s.val}</span>
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SERVICE WEB PAGES LIST (4 EXQUISITE CARDS WITH HYPER-REALISTIC IMAGES) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full">
            Specialized Workflows
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Our Cleaning Solutions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Every service utilizes high-reach safety rigging, expert technicians, and commercial-grade machinery. Choose a service below to explore rates, methods, and process guides.
          </p>
        </div>

        {/* 4 Cards Bento Grid style */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className="group cursor-pointer rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg hover:border-blue-100 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Service picture with gradient zoom */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                <span className="absolute bottom-3 left-3 rounded-lg bg-blue-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                  {getServiceLabel(service.id)}
                </span>
              </div>

              {/* Service copy */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5 mb-4">
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Explore Methods</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* 4. THE DUST B GONE ADVANTAGE (TECH & SAFETY) */}
      <section className="bg-slate-900 text-white py-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">High Tech Cleaners</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                The Dust B Gone Advantage
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                By abandoning outdated, dangerous ladder scrubbing and swapping to high-suction vacuum hoses, chemical soft-washing, and 100% deionized water poles, we provide cleaner results, zero structural eavestrough scrapes, and improved safety compliance.
              </p>
              
              <div className="space-y-3 pt-2 text-xs font-semibold text-slate-300">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                  <span>No metal scraper damage on gutter channels</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                  <span>Windows dry naturally streak-free without soap film</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                  <span>Exterior siding protected from paint peel blowout</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {trustPoints.map((item, idx) => (
                <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 border border-slate-800">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* NEW PORTFOLIO / GALLERY OF ACTUAL ON-SITE WORK */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Real Site Work Portfolio
          </span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Our Work Speaks For Itself
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            See actual photos from project sites across Kingston and surrounding areas. We document our cleanings so property owners and managers get absolute visual proof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Window Washing */}
          <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col h-full">
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
              <img 
                src="/src/assets/images/water_fed_window_clean_1784318792154.jpg" 
                alt="Water-fed pole window cleaning" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-sm text-[10px] font-black text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
                ACTIVE SITE
              </span>
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
                  Pure-Water Window Cleaning
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Telescopic pole system in action, cleaning high-reach multi-family windows safely from ground level up to 4 stories.
                </p>
              </div>
              <div className="text-[10px] text-slate-400 font-bold tracking-wider uppercase pt-2 border-t border-slate-50">
                ● 0 PPM PURE WATER TECHNOLOGY
              </div>
            </div>
          </div>

          {/* Card 2: Gutter Ladder Access */}
          <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col h-full">
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
              <img 
                src="/src/assets/images/gutter_clean_ladder_1784318779997.jpg" 
                alt="Technician on high ladder gutter clearing" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-sm text-[10px] font-black text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
                ACTIVE SITE
              </span>
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
                  Expert Gutter Clearing
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Technician executing downspout checks and clearing stubborn blockages on residential roofing channels.
                </p>
              </div>
              <div className="text-[10px] text-slate-400 font-bold tracking-wider uppercase pt-2 border-t border-slate-50">
                ● COMPREHENSIVE EAVESTROUGH CHECK
              </div>
            </div>
          </div>

          {/* Card 3: Gutter Vacuuming Detail */}
          <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col h-full">
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
              <img 
                src="/src/assets/images/gutter_vacuum_detail_1784318804873.jpg" 
                alt="Before and after gutter vacuuming" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-indigo-600/90 backdrop-blur-sm text-[10px] font-black text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
                VAC PORTFOLIO
              </span>
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
                  High-Suction Gutter Vacuum
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Extracting dense leaf sludge and pine needle blocks instantly, restoring 100% capacity and clean water flow.
                </p>
              </div>
              <div className="text-[10px] text-slate-400 font-bold tracking-wider uppercase pt-2 border-t border-slate-50">
                ● NO-CLOG VACUUM RESTORATION
              </div>
            </div>
          </div>

          {/* Card 4: Pressure Washing Spinner */}
          <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col h-full">
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
              <img 
                src="/src/assets/images/pressure_washing_spinner_1784318818326.jpg" 
                alt="Rotary surface pressure washing concrete" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-purple-600/90 backdrop-blur-sm text-[10px] font-black text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
                ACTIVE SITE
              </span>
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
                  Walkway & Patio Blast
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Deep power restoration removing thick grime, moss, slick algae layers, and tire stains from concrete pathways.
                </p>
              </div>
              <div className="text-[10px] text-slate-400 font-bold tracking-wider uppercase pt-2 border-t border-slate-50">
                ● 3500 PSI SPINNING RESTORATION
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full">
            Customer Reviews
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Trusted by Commercial & Residential Clients
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((test, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between hover:border-slate-200 transition">
              <div className="space-y-3.5">
                <div className="flex space-x-1 text-amber-400">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{test.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{test.name}</h4>
                  <p className="text-[10px] text-slate-400">{test.role}</p>
                </div>
                <span className="rounded-full bg-slate-50 text-slate-500 px-2 py-0.5 text-[9px] font-bold border border-slate-100">
                  {test.company}
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 6. FAQ ACCORDION SECTION */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900">Cleaning Knowledge Base FAQs</h2>
          <p className="text-xs text-slate-500">Everything you need to know about our modern washing technologies.</p>
        </div>

        <div className="border border-slate-100 rounded-2xl bg-white divide-y divide-slate-100 overflow-hidden shadow-sm">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="transition-all">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-left text-sm font-bold text-slate-800 hover:bg-slate-50 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-500 leading-relaxed bg-slate-50/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
}
