import { CleaningService } from './types';

export const SERVICES_DATA: CleaningService[] = [
  {
    id: 'window',
    title: 'Spotless Window Washing',
    shortDesc: 'Using water-fed telescopic pole pure water systems & interior hand details.',
    description: 'Our advanced pure water window cleaning service features state-of-the-art telescopic water-fed poles. By filtering water to 0 parts per million (PPM) of dissolved solids, we clean windows safely from the ground up to 4 stories. The water acts as a natural solvent to dissolve dirt, drying to a crystal-clear, streak-free finish with no chemical residues or squeegee lines.',
    image: '/src/assets/images/water_fed_window_clean_1784318792154.jpg',
    icon: 'Tv', // fallback representation or custom
    highlights: [
      'Pure-water filtration (0 PPM) for chemical-free, spotless dry',
      'High-reach telescopic poles clean up to 4 stories safely from the ground',
      'Cleans frame, sills, and tracks in addition to the glass pane',
      'Both exterior telescopic and interior hand-crafted cleaning available'
    ],
    features: [
      { title: 'Telescopic Pole System', desc: 'Allows safe, fast, and pristine exterior washing without dangerous ladders.' },
      { title: 'Pure Water Technology', desc: 'Deionized water leaves an ultra-clean static-repelling finish that stays clean longer.' },
      { title: 'Frame & Sill Detailing', desc: 'We do not just clean glass—we wipe down frames and clear tracks of grit and spiders.' }
    ],
    process: [
      { step: 1, title: 'Inspection & Prep', desc: 'Inspect window seals, screen removal, and identify fragile glass surfaces.' },
      { step: 2, title: 'Agitation & Pure Wash', desc: 'Scrub glass with soft-bristled boar-hair pole brushes while pure water flows directly through.' },
      { step: 3, title: 'Spotless Rinse', desc: 'Flush glass from top to bottom with purified water to carry away all suspended minerals.' },
      { step: 4, title: 'Interior Finishing', desc: 'If selected, hand-wash screens and wipe interior windows with lint-free microfiber.' }
    ],
    pricingBasis: '$150 base rate (covers up to 10 windows), then $8 per additional window.',
    basePrice: 150
  },
  {
    id: 'pressure',
    title: 'High-Performance Pressure Washing',
    shortDesc: 'Deep blasting concrete walkways, roof structures, parkades, and facades.',
    description: 'Revitalize your building exterior, walking paths, and vehicle zones with professional commercial-grade pressure washing and soft-washing. We remove decades of built-up oil, grease, tire marks, mold, moss, and atmospheric smog. Our dual-method system uses hot high-pressure water for durable surfaces and delicate soft-washing for shingles, wood, and stucco.',
    image: '/src/assets/images/pressure_washing_spinner_1784318818326.jpg',
    icon: 'Waves',
    highlights: [
      'Commercial concrete surface spinners for fast, streak-free path restoration',
      'Safe soft-wash chemical treatments for delicate roofs and painted siding',
      'Deep stain extraction of parkades (oil, rust, carbon build-ups)',
      'Improves safety by removing slippery moss, algae, and wet leaf grime'
    ],
    features: [
      { title: 'Surface Spinners', desc: 'Round walk-behind rotary cleaner heads ensure 100% consistent pressure without lines.' },
      { title: 'Soft-Wash Solutions', desc: 'Low-pressure detergent wash kills algae spores down to the root on roofs and facades.' },
      { title: 'Oil & Rust Pre-treatment', desc: 'Industrial degreasers break up stubborn engine fluids and metal stains before washing.' }
    ],
    process: [
      { step: 1, title: 'Surface Pre-treatment', desc: 'Apply specialized biodegradable cleaning detergents to dissolve grease and moss spores.' },
      { step: 2, title: 'Pressure Restoration', desc: 'Utilize specialized surface cleaners at 3500 PSI for walkways and building facades.' },
      { step: 3, title: 'Rinsing & Directing', desc: 'Rinse all walls and walkways, pushing dirt directly to drainage channels.' },
      { step: 4, title: 'Post-Treatment Seal', desc: 'Apply a mold-inhibitor spray to guarantee surfaces remain sparkling clean for longer.' }
    ],
    pricingBasis: '$200 base rate (covers up to 800 sq ft), then $0.25 per additional sq ft.',
    basePrice: 200
  },
  {
    id: 'dryer',
    title: 'Interior & Exterior Dryer Vent Cleaning',
    shortDesc: 'Complete lint removal and airway optimization for home safety and energy efficiency.',
    description: 'Dryer vents are one of the top causes of residential building fires due to highly combustible lint build-up. Our specialized dryer vent care accesses the full duct system from both the interior appliance connection and the exterior roof or wall exhaust port. We pull out solid lint packings, inspect vents for blocks, and improve dryer drying times by up to 50%.',
    image: '/src/assets/images/dryer_vent_cleaning_1784317922229.jpg',
    icon: 'Wind',
    highlights: [
      'Dual-brush rotating systems clean entire runs of up to 40 feet of pipe',
      'Decreases drying cycle times, saving money on home utility bills',
      'Crucial fire hazard reduction—removes dry, packed, flammable lint',
      'Includes diagnostic airflow and back-pressure testing before & after'
    ],
    features: [
      { title: 'Rotary Brush System', desc: 'Flexible whipping lines snake through elbows and rigid conduits without tearing foil joints.' },
      { title: 'Pneumatic Lint Vaccum', desc: 'High-power industrial vacuums keep lint securely contained with zero mess in your home.' },
      { title: 'Airflow Gauge Testing', desc: 'We measure velocity at the exhaust terminal to scientifically prove efficiency restoration.' }
    ],
    process: [
      { step: 1, title: 'Airflow Measurement', desc: 'Test starting back-pressure and wind velocity from the dryer exhaust port.' },
      { step: 2, title: 'Appliance Connection', desc: 'Unplug the dryer and clear the flexible duct, vacuuming the dryer lint trap area.' },
      { step: 3, title: 'Rotary Snaking & Vacuum', desc: 'Run rotating brushes through the entire duct line, vacuuming out accumulated clogs.' },
      { step: 4, title: 'Final Terminal Sweep', desc: 'Clear the external wall hood or roof vent, verify louvers flap open and seal shut cleanly.' }
    ],
    pricingBasis: '$120 flat rate per vent system. Multi-unit commercial volume rates available.',
    basePrice: 120
  },
  {
    id: 'gutter',
    title: 'Gutter Vacuuming & Hand Clearing',
    shortDesc: 'Heavy-duty suction vacuuming and hand clearing for flawless water flow.',
    description: 'Clogged gutters lead to water overflow, wood rot, roof leaks, and compromised concrete foundations. We clear and clean gutters thoroughly using industrial gutter vacuums from the safety of the ground, paired with expert hand-clearing and downspout washing where required. Ensure rain flows perfectly away from your building walls.',
    image: '/src/assets/images/gutter_vacuum_detail_1784318804873.jpg',
    icon: 'Grid',
    highlights: [
      'High-power gutter vacuum sucks up sludge, water, mud, and pine needles easily',
      'Manual debris extraction for packed, dry leaf clumps and heavy twigs',
      'Downspout pressure flush testing to ensure 100% open water escape routes',
      'Before-and-after photo inspection reports provided to clients'
    ],
    features: [
      { title: 'Industrial Gutter Vacuum', desc: 'High-lift suction extracts heavy mud and organic sludge that hand-scooping leaves behind.' },
      { title: 'Water-Jet Downspout Flush', desc: 'If downspouts are clogged, we water-jet them from top to bottom to guarantee flow.' },
      { title: 'Full Bracket Inspection', desc: 'We verify gutter spikes, hangers, slope, and seal seams for leaks or sagging spots.' }
    ],
    process: [
      { step: 1, title: 'Debris Extraction', desc: 'Remove heavy leaves, branches, and mud using custom pole-vacuums or manual scoops.' },
      { step: 2, title: 'Downspout Clearing', desc: 'Feed hoses down all downspouts and wash down any hidden clogs or nests.' },
      { step: 3, title: 'Flush Wash', desc: 'Run water through the gutter channels to verify perfect slope, flowing direct to sewers.' },
      { step: 4, title: 'Debris Disposal', desc: 'Package and haul away all organic debris, leaving your yard perfectly clean.' }
    ],
    pricingBasis: '$150 base rate (covers up to 100 linear feet), then $1.50 per additional linear foot.',
    basePrice: 150
  }
];

export const TIME_SLOTS = [
  '08:00 AM - 10:00 AM',
  '10:30 AM - 12:30 PM',
  '01:00 PM - 03:00 PM',
  '03:30 PM - 05:30 PM'
];

export const ADDONS_DATA = [
  { id: 'ecoFriendlySoap', title: 'Premium Eco-Friendly Soap Upgrade', desc: 'Safe for pets, plants, and gardens. 100% biodegradable.', price: 29 },
  { id: 'debrisDisposal', title: 'Debris Hauling & Eco-Composting', desc: 'We haul all roof leaf/gutter sludge off-site for local organic recycling.', price: 19 },
  { id: 'screenCleaning', title: 'Window Screen Deep Soap-Wash & Brush', desc: 'Individual hand scrubbing, detailing, and insect treatment of window screens.', price: 39 },
  { id: 'gutterGuards', title: 'Gutter Guard Leaf-Shield Installation Prep', desc: 'Clear underlying gutter brackets and apply mold prevention before installing guards.', price: 49 }
];
