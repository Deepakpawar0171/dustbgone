import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, ShieldCheck, Award, Heart, Leaf, Users, CheckCircle, Scale, Beaker, FileText, Download, Building, ExternalLink, HelpCircle } from 'lucide-react';
import logoImg from '../assets/images/dustbgone_logo_1784318749298.jpg';

export default function CredentialsView() {
  const [copiedLicense, setCopiedLicense] = useState(false);
  const [ecoScore, setEcoScore] = useState(100);

  const copyLicense = () => {
    navigator.clipboard.writeText('1001642386');
    setCopiedLicense(true);
    setTimeout(() => setCopiedLicense(false), 2000);
  };

  const certifications = [
    {
      title: 'Commercial General Liability',
      issuer: 'Commercial Insurance Carrier',
      code: 'Policy Verified',
      details: 'Comprehensive $2,000,000.00 coverage including multi-level property, chemical soft-wash operations, and aerial ladder access.',
      status: 'Active & Verified',
      icon: ShieldCheck,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      title: 'Ontario Business License',
      issuer: 'Ministry of Public and Business Service Delivery',
      code: 'License #1001642386',
      details: 'Officially incorporated and registered service contractor operating under strict municipal and provincial bylaws in Eastern Ontario.',
      status: 'Active',
      icon: FileText,
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10'
    }
  ];

  const coreValues = [
    {
      title: 'Safety First Culture',
      desc: 'Our ground-level telescopic window poles and vacuum tubes reduce high-altitude risk. We use professional harness systems and anti-slip stabilizers for all roof-level skylight/gutter work.',
      icon: Shield,
      color: 'text-rose-500'
    },
    {
      title: 'Pure-Water Engineering',
      desc: 'Our commercial deionization filters convert municipal water to 0 PPM (Parts Per Million) purity. This water acts as a natural solvent, scrubbing grime away and drying 100% spotless without chemicals.',
      icon: Beaker,
      color: 'text-sky-500'
    },
    {
      title: 'Eco-Conservation Pledge',
      desc: 'We strictly ban heavy heavy-metal soaps. Our concrete washing uses natural, biodegradable surfactants that decompose safely in local soil, protecting your flowers and pets.',
      icon: Leaf,
      color: 'text-emerald-500'
    },
    {
      title: 'Local Family Heritage',
      desc: 'Not a franchise or nameless aggregate platform. We are owned and operated in Eastern Ontario, supporting Kingston community initiatives and paying our staff high living wages.',
      icon: Users,
      color: 'text-amber-500'
    }
  ];

  const safetySteps = [
    'Every crew member undergoes third-party background screening and regular drug testing.',
    '10-point safe rigging checks before any ladder is raised or high pole extended.',
    'Water runoff routing: we protect landscape topsoil and prevent local municipal storm drain blockages.',
    'Property inspection: we pre-document existing siding cracks or window seal leaks so you are fully informed.'
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Dynamic Header */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 border border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="inline-flex items-center space-x-1 rounded-full bg-blue-500/10 px-3.5 py-1.5 text-xs font-black tracking-widest text-blue-400 uppercase border border-blue-500/20">
            <Award className="h-4 w-4 text-cyan-400" />
            <span>Google E-E-A-T Verified</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-white">
            Credentials, Insurance & <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Safety Verification
            </span>
          </h1>
          <p className="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            At Dust B Gone, we believe professional exterior cleaning is about more than just squeegees. It is about strict safety compliance, $2M general liability underwriting, and protecting your most valuable asset.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-800 text-xs text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold">Fully Insured:</span>
              <span className="text-white font-black">$2,000,000 Liability</span>
            </div>
            <button
              onClick={copyLicense}
              className="flex items-center space-x-2 bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 hover:border-slate-700 transition"
            >
              <span className="font-bold">Ont. Lic:</span>
              <span className="text-white font-mono font-black">#1001642386</span>
              <span className="text-blue-400 text-[10px] uppercase font-black tracking-wider ml-1">
                {copiedLicense ? 'Copied!' : 'Copy'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Trust & E-E-A-T Certifications Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Underwriting & Licensing
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Our Certified Compliance Profiles
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Never hire an uninsured technician. We maintain proactive, 100% transparent registrations so you are always fully covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className={`h-12 w-12 rounded-xl ${cert.bg} flex items-center justify-center`}>
                    <IconComponent className={`h-6 w-6 ${cert.color}`} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                      {cert.issuer}
                    </span>
                    <h3 className="text-base font-black text-slate-900">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-mono font-bold text-blue-600 bg-blue-50/50 inline-block px-2 py-0.5 rounded mt-1.5">
                      {cert.code}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {cert.details}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-50 flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-emerald-600 flex items-center space-x-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    <span>{cert.status}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* The Science of Pure Water Telescopic Poles */}
      <section className="bg-slate-50 border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Science Image Side */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-100/60 px-2.5 py-1 rounded-full">
                Equipment & Technology
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
                The Science of 0 PPM <br />
                Pure-Water Scrubbing
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                Standard Kingston tap water contains roughly 120 to 180 parts per million (PPM) of dissolved calcium, magnesium, and sodium. If sprayed on glass, it leaves hazy white mineral rings when dried.
              </p>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                Our truck-mounted deionization filter tanks use high-capacity ion exchange resin beads to swap minerals for hydrogen and oxygen molecules, lowering TDS readings to exactly <strong>0 PPM</strong>.
              </p>

              <div className="bg-white rounded-xl p-4 border border-slate-200/80 space-y-3.5">
                <div className="flex justify-between text-xs font-black">
                  <span className="text-slate-700">Mineral Level (Kingston Tap Water)</span>
                  <span className="text-rose-500">140+ PPM</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
                
                <div className="flex justify-between text-xs font-black">
                  <span className="text-slate-700">Mineral Level (Dust B Gone Pure Water)</span>
                  <span className="text-emerald-500">0 PPM (Perfect)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '0.1%' }}></div>
                </div>
              </div>
            </div>

            {/* Science Explanation Cards Side */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-3">
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded">METHOD 01</span>
                <h3 className="text-sm font-bold text-slate-900">Physical Solvency</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Zero PPM pure water is chemically unstable and acts like a powerful sponge, magnetically attracting and dissolving environmental dust, tree pollen, and bug droppings on the glass surface.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-3">
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded">METHOD 02</span>
                <h3 className="text-sm font-bold text-slate-900">Static Elimination</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Chemical window soaps leave a micro-thin electrostatic film that actively pulls airborne dust back to your glass. Pure water leaves zero residue, so your windows stay clean up to 2.5x longer.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-3">
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">ECO PROFILE</span>
                <h3 className="text-sm font-bold text-slate-900">Zero Runoff Damage</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Because we wash with pure water, no soaps, acids, or toxic chemicals leak onto your garden topsoil, protecting flowerbeds and local domestic pets completely.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-3">
                <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded">SAFETY CODES</span>
                <h3 className="text-sm font-bold text-slate-900">Ground Level Stability</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Telescopic carbon-fiber poles let our tech wash up to 4 stories high while keeping both feet on the solid ground. Fewer high-ladder hazards mean lower liability risks on your property.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Values & Core Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
            Our Business Blueprint
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Built on Local E-E-A-T Principles
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Experience, Expertise, Authoritativeness, and Trustworthiness. We hold our service model to the absolute highest criteria in the home improvement industry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, index) => {
            const Icon = val.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-slate-200 transition group"
              >
                <div className="h-10 w-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:bg-blue-50 transition">
                  <Icon className={`h-5 w-5 ${val.color}`} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{val.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Safety Protocols Checklist */}
      <section className="bg-slate-900 text-white py-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Rigorous Safety Manuals</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Zero Incidents. Zero Worries.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              We operate under a strict, written safety guideline. This is not just to comply with municipal building laws, but to protect our team and preserve your property's exterior.
            </p>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Commercial Liability Status</span>
                <span className="text-emerald-400 font-bold">Fully Insured & Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Incident History (Since Inception)</span>
                <span className="text-emerald-400 font-bold">0 Incidents</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Field Safety Inspections</span>
                <span className="text-emerald-400 font-bold">Bi-Weekly Checklist</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">Our Pre-Job Safety Run:</h3>
            <div className="space-y-3 text-xs">
              {safetySteps.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-slate-300 leading-relaxed font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Credentials FAQ Accordion */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Licensing & Safety FAQs</h2>
          <p className="text-xs text-slate-500 leading-relaxed">Frequently asked questions about our legal standing and local Ontario operations.</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-sm">
          <div className="p-4 space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-blue-500" />
              <span>What happens if an accident occurs on my property?</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed pl-5">
              Because Dust B Gone carries $2,000,000 in comprehensive Commercial General Liability insurance, any accidental damages or worker incidents are fully underwritten by our policy. You have absolute legal indemnity.
            </p>
          </div>
          <div className="p-4 space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-blue-500" />
              <span>How can I verify your business registration?</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed pl-5">
              You can search our registered Ontario business license number (<strong>#1001642386</strong>) directly in the Ontario Business Registry database. We are a fully registered private enterprise conforming to all corporate regulations.
            </p>
          </div>
          <div className="p-4 space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-blue-500" />
              <span>Do your window telescopic poles damage fragile historical glass?</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed pl-5">
              No. Our brushes use ultra-soft boar-hair and nylon bristles specifically designed to agitate dirt on structural glass without scratching. Our water pressure is extremely gentle, relying on water purity rather than high pressure to wash.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
