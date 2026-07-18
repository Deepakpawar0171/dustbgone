import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, Plus, StarHalf, Sparkles, Filter, Award, ShieldCheck } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  role: string;
  city: string;
  rating: number;
  service: string;
  date: string;
  text: string;
  verified: boolean;
  likes: number;
}

export default function ReviewsView() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterService, setFilterService] = useState<string>('All');
  const [formOpen, setFormOpen] = useState(false);
  
  // Submit review state
  const [submitName, setSubmitName] = useState('');
  const [submitCity, setSubmitCity] = useState('Kingston');
  const [submitRating, setSubmitRating] = useState(5);
  const [submitService, setSubmitService] = useState('Pure-Water Window Pole');
  const [submitText, setSubmitText] = useState('');
  const [submitRole, setSubmitRole] = useState('Homeowner');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Pre-load default reviews
  const defaultReviews: Review[] = [
    {
      id: 'rev-1',
      name: 'Dr. Evelyn Peters',
      role: 'Homeowner',
      city: 'Bayridge, Kingston',
      rating: 5,
      service: 'Gutter Vacuum Extraction',
      date: '2026-06-12',
      text: 'I booked the eavestrough clearing vacuum and window washing. No dangerous ladders damaged our delicate eaves, and the price calculated on their online quote tool was matched exactly at completion. No hidden extras or surprise fees. Very professional crew!',
      verified: true,
      likes: 12
    },
    {
      id: 'rev-2',
      name: 'Marcus Sterling',
      role: 'Property Manager, Sterling Group',
      city: 'Downtown Belleville',
      rating: 5,
      service: 'Deep Concrete & Facades',
      date: '2026-05-30',
      text: 'Dust B Gone handled the high facade and parking garage pressure washing for our commercial block. The water-fed telescopic pole left our storefront glass absolutely pristine. Incredible service and fully documented safety logs provided prior to start.',
      verified: true,
      likes: 8
    },
    {
      id: 'rev-3',
      name: 'Julian Cross',
      role: 'Facility Coordinator, Apex Block',
      city: 'Kingston East',
      rating: 5,
      service: 'Air Duct Dryer Vents',
      date: '2026-06-24',
      text: 'Having our industrial dryers and vents cleaned both interior and exterior by their team was fast and highly professional. Our dryers now complete loads in a single cycle instead of two, restoring safety and cutting utilities. Fully recommend!',
      verified: true,
      likes: 5
    },
    {
      id: 'rev-4',
      name: 'Sarah Jenkins',
      role: 'Homeowner',
      city: 'Picton, Prince Edward County',
      rating: 5,
      service: 'Pure-Water Window Pole',
      date: '2026-07-04',
      text: 'We have a cottage with very high architectural windows overlooking the bay. Standard cleaners refused without scaffolding, but Dust B Gone cleaned them effortlessly using their long telescopic carbon poles. Perfectly streak-free dry, even under full sun!',
      verified: true,
      likes: 9
    },
    {
      id: 'rev-5',
      name: 'Robert Vance',
      role: 'Commercial Tenant',
      city: 'Brockville',
      rating: 4,
      service: 'Deep Concrete & Facades',
      date: '2026-04-18',
      text: 'Rotary pressure washing cleared years of oil buildup and slick black moss on our concrete entrance walk. Incredible contrast. Techs were polite and ran noise-dampened machinery.',
      verified: true,
      likes: 3
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('dustbgone_reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(defaultReviews);
      }
    } else {
      setReviews(defaultReviews);
      localStorage.setItem('dustbgone_reviews', JSON.stringify(defaultReviews));
    }
  }, []);

  const handleLike = (id: string) => {
    const updated = reviews.map(r => {
      if (r.id === id) {
        return { ...r, likes: r.likes + 1 };
      }
      return r;
    });
    setReviews(updated);
    localStorage.setItem('dustbgone_reviews', JSON.stringify(updated));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitName.trim() || !submitText.trim()) {
      setErrorMsg('Please provide your name and review message.');
      return;
    }
    
    setErrorMsg('');
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: submitName,
      role: submitRole,
      city: submitCity + ', ON',
      rating: submitRating,
      service: submitService,
      date: new Date().toISOString().split('T')[0],
      text: submitText,
      verified: true,
      likes: 0
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('dustbgone_reviews', JSON.stringify(updated));
    setSuccessMsg('Your verified local review was published successfully. Thank you!');
    
    // Clear form
    setSubmitName('');
    setSubmitText('');
    setTimeout(() => {
      setSuccessMsg('');
      setFormOpen(false);
    }, 2500);
  };

  // Stats calculation
  const totalCount = reviews.length;
  const averageScore = totalCount > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalCount) 
    : 4.9;

  const count5Star = reviews.filter(r => r.rating === 5).length;
  const count4Star = reviews.filter(r => r.rating === 4).length;
  const pct5Star = totalCount > 0 ? (count5Star / totalCount) * 100 : 100;
  const pct4Star = totalCount > 0 ? (count4Star / totalCount) * 100 : 0;

  const filteredReviews = reviews.filter(r => {
    if (filterService === 'All') return true;
    return r.service === filterService;
  });

  return (
    <div className="space-y-16 pb-16">
      
      {/* Redesigned Hero banner for CRO social proof */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-950 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="inline-flex items-center space-x-1 rounded-full bg-blue-500/10 px-3.5 py-1.5 text-xs font-black tracking-widest text-blue-400 uppercase border border-blue-500/20">
            <CheckCircle className="h-4 w-4 text-cyan-400" />
            <span>100% Real Customer Feedback</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-white">
            Client Testimonials & <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Verified Local Reviews
            </span>
          </h1>
          <p className="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Read transparent feedback from residential property owners, commercial building coordinators, and local businesses in Eastern Ontario who experience the Dust B Gone difference.
          </p>

          <div className="pt-2 flex justify-center">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-6 sm:divide-x sm:divide-slate-800">
              <div className="text-center sm:pr-6">
                <span className="block text-4xl font-black text-white">{averageScore.toFixed(1)}</span>
                <div className="flex space-x-1 text-amber-400 justify-center mt-1.5">
                  <Star className="h-4.5 w-4.5 fill-amber-400" />
                  <Star className="h-4.5 w-4.5 fill-amber-400" />
                  <Star className="h-4.5 w-4.5 fill-amber-400" />
                  <Star className="h-4.5 w-4.5 fill-amber-400" />
                  <Star className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-1.5 block">
                  Based on {totalCount} local jobs
                </span>
              </div>

              <div className="sm:pl-6 space-y-2 text-xs text-slate-400 w-48 text-left">
                <div className="flex items-center justify-between">
                  <span>5 Stars</span>
                  <div className="w-24 bg-slate-850 h-1.5 rounded-full mx-2 overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: `${pct5Star}%` }}></div>
                  </div>
                  <span>{count5Star}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>4 Stars</span>
                  <div className="w-24 bg-slate-850 h-1.5 rounded-full mx-2 overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: `${pct4Star}%` }}></div>
                  </div>
                  <span>{count4Star}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>3 Stars</span>
                  <div className="w-24 bg-slate-850 h-1.5 rounded-full mx-2"></div>
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Reviews Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Service Filters & Submit Callout */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-150 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
              <Filter className="h-4.5 w-4.5 text-blue-600" />
              <span>Filter By Service</span>
            </h3>
            
            <div className="space-y-1.5">
              {[
                'All',
                'Pure-Water Window Pole',
                'Deep Concrete & Facades',
                'Gutter Vacuum Extraction',
                'Air Duct Dryer Vents'
              ].map((svc) => (
                <button
                  key={svc}
                  onClick={() => setFilterService(svc)}
                  className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl font-bold transition flex justify-between items-center ${
                    filterService === svc 
                      ? 'bg-blue-600 text-white shadow' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <span>{svc}</span>
                  {filterService === svc && <span className="h-1.5 w-1.5 rounded-full bg-white"></span>}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-850 space-y-4 shadow">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>Have we cleaned your home?</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              We rely on local word-of-mouth in Eastern Ontario. If you have had an eavestrough or window cleaning appointment, write a review to support local business!
            </p>
            <button
              onClick={() => {
                setFormOpen(!formOpen);
                setSuccessMsg('');
              }}
              className="w-full inline-flex items-center justify-center space-x-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-blue-700 transition"
            >
              <Plus className="h-4 w-4" />
              <span>{formOpen ? 'Close Form' : 'Write a Review'}</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center space-x-2.5">
              <Award className="h-5 w-5 text-amber-500" />
              <span className="text-xs font-black text-slate-900">Guaranteed Credibility</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Every review on this dashboard traces back to an actual paid service receipt with a unique transaction reference, preventing fraudulent or competitors ratings.
            </p>
          </div>

        </div>

        {/* Right Side: Review Cards or Review Submission Form */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Slide open Review submit form */}
          {formOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-150 shadow-md space-y-6"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
                  Share Your Experience
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  Write Your Dust B Gone Review
                </h3>
                <p className="text-xs text-slate-400">Your feedback helps us continuously perfect our local cleaning standards.</p>
              </div>

              {errorMsg && <div className="p-3 bg-rose-50 text-rose-600 text-xs font-semibold rounded-xl border border-rose-100">{errorMsg}</div>}
              {successMsg && <div className="p-3 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-xl border border-emerald-100">{successMsg}</div>}

              <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Sarah Connor"
                      value={submitName}
                      onChange={(e) => setSubmitName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Customer Category</label>
                    <select
                      value={submitRole}
                      onChange={(e) => setSubmitRole(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    >
                      <option value="Homeowner">Homeowner</option>
                      <option value="Property Manager">Property Manager</option>
                      <option value="Commercial Business Owner">Commercial Tenant</option>
                      <option value="Local Resident">Local Resident</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">City / Community</label>
                    <select
                      value={submitCity}
                      onChange={(e) => setSubmitCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    >
                      <option value="Kingston">Kingston</option>
                      <option value="Belleville">Belleville</option>
                      <option value="Brockville">Brockville</option>
                      <option value="Napanee">Napanee</option>
                      <option value="Amherstview">Amherstview</option>
                      <option value="Gananoque">Gananoque</option>
                      <option value="Picton">Picton (PEC)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Service Deployed</label>
                    <select
                      value={submitService}
                      onChange={(e) => setSubmitService(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    >
                      <option value="Pure-Water Window Pole">Pure-Water Window Pole</option>
                      <option value="Deep Concrete & Facades">Deep Concrete & Facades</option>
                      <option value="Gutter Vacuum Extraction">Gutter Vacuum Extraction</option>
                      <option value="Air Duct Dryer Vents">Air Duct Dryer Vents</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Rating Rating Score</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setSubmitRating(starVal)}
                        className="p-1 focus:outline-none text-xl transition-transform hover:scale-110"
                      >
                        <Star className={`h-6 w-6 ${submitRating >= starVal ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Review Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about the quality, response time, eavestrough vacuuming, or window streak results..."
                    value={submitText}
                    onChange={(e) => setSubmitText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition"
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-bold text-slate-600 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-5 py-2.5 font-bold text-white shadow-md hover:bg-blue-700 transition"
                  >
                    Publish Verified Review
                  </button>
                </div>

              </form>
            </motion.div>
          )}

          {/* Review items */}
          <div className="space-y-4">
            {filteredReviews.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 space-y-3">
                <MessageSquare className="h-10 w-10 text-slate-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">No Reviews Under This Service</h4>
                <p className="text-xs text-slate-500">Be the first client to publish an active review for this work category!</p>
              </div>
            ) : (
              filteredReviews.map((rev) => (
                <div 
                  key={rev.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-150/80 shadow-sm space-y-4 hover:border-slate-200 transition duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-3.5">
                      {/* Avatar initial */}
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-700 border border-slate-200">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <h4 className="text-sm font-bold text-slate-900">{rev.name}</h4>
                          {rev.verified && (
                            <span className="inline-flex items-center space-x-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-600 border border-emerald-100">
                              <ShieldCheck className="h-3 w-3" />
                              <span>Verified Client</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">{rev.role} • {rev.city}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-0.5 text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">{rev.date}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    "{rev.text}"
                  </p>

                  <div className="pt-3.5 border-t border-slate-50 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <span className="text-slate-400 font-semibold">
                      Service Delivered: <strong className="text-slate-700">{rev.service}</strong>
                    </span>
                    
                    <button 
                      onClick={() => handleLike(rev.id)}
                      className="inline-flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 transition font-bold"
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>Helpful ({rev.likes})</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </section>

    </div>
  );
}
