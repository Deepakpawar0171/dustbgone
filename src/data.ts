import { CleaningService } from './types';
import waterFedWindowClean from './assets/images/window_1_logo_pole_v2_1784338520163.jpg';
import pressureWashingSpinner from './assets/images/pressure_1_spinner_v2_1784338580673.jpg';
import dryerVentCleaning from './assets/images/dryer_1_laundry_1784337496359.jpg';
import gutterVacuumDetail from './assets/images/gutter_1_vacuum_1784337539840.jpg';
import houseWashingFacade from './assets/images/pressure_2_facade_1784337461310.jpg';
import commercialHotWash from './assets/images/pressure_4_curb_1784337482207.jpg';

export const SERVICES_DATA: CleaningService[] = [
  {
    id: 'window',
    title: 'Window Cleaning Kingston',
    shortDesc: 'Pure-water telescopic pole window cleaning up to 4 stories & premium interior hand-detailing.',
    description: 'Our professional window cleaning in Kingston, Ontario is designed to give you a pristine, streak-free view. We specialize in state-of-the-art carbon fiber telescopic water-fed poles paired with high-volume pure deionized water filtration (0 PPM). This advanced exterior window washing technique is completely chemical-free, safe for nearby plants, and leaves a static-repellent finish that stays clean twice as long as traditional squeegees. We serve residential and commercial properties throughout Kingston, Amherstview, Bath, Loyalist, Bayridge, Belleville, and Napanee.',
    image: waterFedWindowClean,
    icon: 'Tv',
    highlights: [
      'Pure-water filtration (0 PPM) ensures 100% spotless, streak-free air dry',
      'High-reach telescopic poles clean up to 4 stories safely from the ground',
      'Full-frame, sill, and window track agitation & detailing included',
      'Both exterior water-fed poles and interior hand-crafted cleaning available'
    ],
    features: [
      { title: 'Telescopic Pole System', desc: 'Allows safe, fast, and pristine exterior washing without dangerous ladder-leaning.' },
      { title: 'Pure Water Technology', desc: 'Deionized water acts as a natural soil magnet, leaving an ultra-clean static-repelling finish.' },
      { title: 'Frame & Sill Detailing', desc: 'We do not just clean the glass panes—we wipe down outer frames and clear tracks of grit and spiders.' }
    ],
    process: [
      { step: 1, title: 'Inspection & Prep', desc: 'We inspect window seals, remove exterior screens, and identify fragile glass surfaces.' },
      { step: 2, title: 'Agitation & Pure Wash', desc: 'Our technicians scrub glass with soft-bristled boar-hair pole brushes while pure water flows directly through.' },
      { step: 3, title: 'Spotless Rinse', desc: 'We flush the glass from top to bottom with purified water to carry away all suspended minerals.' },
      { step: 4, title: 'Interior Finishing', desc: 'If interior service is selected, we hand-wash screens and wipe interior windows with lint-free microfiber.' }
    ],
    pricingBasis: '$150 base rate (covers up to 10 windows), then $8 per additional window.',
    basePrice: 150
  },
  {
    id: 'pressure',
    title: 'Pressure Washing Kingston',
    shortDesc: 'Deep blasting driveways, concrete paths, walkways, patios, and masonry.',
    description: 'Breathe new life into your property surfaces with our professional pressure washing in Kingston, Ontario. We restore concrete driveways, brick patios, stone walkways, and exterior masonry to like-new condition. Our commercial-grade hot water systems blast through decades of grease, moss, mold, weeds, tire marks, and heavy organic staining. For softer surfaces, we offer damage-free soft-wash detergent options that protect your siding and timber structures.',
    image: pressureWashingSpinner,
    icon: 'Waves',
    highlights: [
      'Commercial concrete surface spinners prevent messy striping or zebra lines',
      'Safe pressure adjustments tailored to concrete, aggregate, brick, or pavers',
      'Deep oil, rust, and stubborn chemical pre-treatment stain extraction',
      'Eliminates slippery algae, moss, and wet grime to ensure public walking safety'
    ],
    features: [
      { title: 'Surface Spinners', desc: 'Round walk-behind rotary cleaner heads ensure 100% consistent pressure with no streak lines.' },
      { title: 'Soft-Wash Solutions', desc: 'Low-pressure chemical treatment kills organic spores down to the root on soft surfaces.' },
      { title: 'Oil & Rust Pre-treatment', desc: 'Industrial degreasers break up stubborn engine fluids and metal stains before washing.' }
    ],
    process: [
      { step: 1, title: 'Surface Pre-treatment', desc: 'We apply biodegradable cleaners to dissolve underlying oil, grease, and algae spores.' },
      { step: 2, title: 'Pressure Restoration', desc: 'Our team utilizes specialized surface spinners at up to 3500 PSI for patios and driveways.' },
      { step: 3, title: 'Rinsing & Flushing', desc: 'We rinse all walls and adjacent walkways, directing all debris to drainage channels.' },
      { step: 4, title: 'Algae-Shield Post-Spray', desc: 'We apply a mild mold-inhibitor spray to keep your concrete looking brighter and cleaner for longer.' }
    ],
    pricingBasis: '$200 base rate (covers up to 800 sq ft), then $0.25 per additional sq ft.',
    basePrice: 200
  },
  {
    id: 'gutter',
    title: 'Gutter Cleaning Kingston',
    shortDesc: 'Heavy-duty ground-based suction vacuuming and expert hand clearing for flawless water flow.',
    description: 'Protect your building foundation and eaves from devastating water overflow. Our premier gutter cleaning in Kingston, Ontario features robust industrial-grade wet/dry vacuum systems that clear mud, sludge, and pine needles safely from the ground. Combined with manual debris extraction for heavily packed sections and full downspout flushing, we ensure your rainwater drainage operates perfectly all year round.',
    image: gutterVacuumDetail,
    icon: 'Grid',
    highlights: [
      'High-power gutter vacuum extracts packed wet sludge and pine needles',
      'Manual debris extraction for dry leaf clumps, branches, and heavy twigs',
      'Downspout pressure flush testing to ensure 100% open water escape routes',
      'Before-and-after photo inspection reports provided to clients for transparency'
    ],
    features: [
      { title: 'Industrial Gutter Vacuum', desc: 'High-lift suction extracts heavy mud and organic sludge that hand-scooping leaves behind.' },
      { title: 'Water-Jet Downspout Flush', desc: 'If downspouts are clogged, we water-jet them from top to bottom to guarantee flow.' },
      { title: 'Full Bracket Inspection', desc: 'We verify gutter spikes, hangers, slope, and seal seams for leaks or sagging spots.' }
    ],
    process: [
      { step: 1, title: 'Debris Extraction', desc: 'We remove heavy leaves, branches, and mud using custom pole-vacuums or manual scoops.' },
      { step: 2, title: 'Downspout Clearing', desc: 'We feed hoses down all downspouts and wash down any hidden clogs or nests.' },
      { step: 3, title: 'Flush Wash', desc: 'Our technicians run water through the gutter channels to verify perfect slope and flow.' },
      { step: 4, title: 'Debris Disposal', desc: 'We package and haul away all organic debris, leaving your yard perfectly clean.' }
    ],
    pricingBasis: '$150 base rate (covers up to 100 linear feet), then $1.50 per additional linear foot.',
    basePrice: 150
  },
  {
    id: 'dryer',
    title: 'Dryer Vent Cleaning Kingston',
    shortDesc: 'Full internal airway lint removal and back-pressure velocity testing.',
    description: 'Did you know that lint accumulation in dryer vents is a leading cause of residential house fires in Eastern Ontario? Our professional dryer vent cleaning in Kingston, Ontario completely eliminates this risk while cutting your laundry drying times in half. We utilize rotating flex-brush whip lines to clean duct runs up to 40 feet long, extracting combustible lint from the appliance connection all the way to the exterior exhaust terminal.',
    image: dryerVentCleaning,
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
    id: 'house-wash',
    title: 'House Washing Kingston',
    shortDesc: 'Low-pressure soft-wash siding restoration to eliminate vinyl mold, mildew, and black streak stains.',
    description: 'High-pressure washing can crack vinyl siding, strip paint, and compromise structural siding seals. That is why our premium house washing in Kingston, Ontario utilizes specialized low-pressure soft-washing. We apply custom-formulated, 100% biodegradable cleaning solutions that actively kill mold, mildew, lichen, and algae spores down to the root, rather than just blasting the surface. This keeps your home exterior looking sparkling clean and beautiful for significantly longer.',
    image: houseWashingFacade,
    icon: 'Home',
    highlights: [
      'Gentle low-pressure soft-washing protects siding, wood, stucco, and brickwork',
      'Eco-friendly biodegradable sanitizers kill organic spores at the cellular level',
      'Completely removes unsightly dark mold stains, bird waste, and cobwebs',
      'Instantly boosts residential curb appeal and resale value before listing'
    ],
    features: [
      { title: 'Siding Sanitizers', desc: 'Custom soaps actively digest organic growth, grime, and green algae build-up.' },
      { title: 'Damage-Free Delivery', desc: 'Delivered at garden-hose pressure, completely eliminating water ingress or siding damage.' },
      { title: 'Eco-Friendly Safeguards', desc: 'We pre-soak all surrounding gardens and plants to guarantee zero chemical stress.' }
    ],
    process: [
      { step: 1, title: 'Plant Pre-Wet', desc: 'We soak adjacent turf and garden beds with fresh water to shield root systems.' },
      { step: 2, title: 'Soap Application', desc: 'We spray our proprietary soft-wash blend from ground level up to 3 stories high.' },
      { step: 3, title: 'Dwell & Action', desc: 'We let the solution sit for 10-15 minutes, dissolving stubborn stains and organic roots.' },
      { step: 4, title: 'Pristine Rinse', desc: 'We perform a thorough, low-pressure clean rinse, washing away all dirt, debris, and soap residues.' }
    ],
    pricingBasis: '$250 base rate (covers up to 1500 sq ft), then $0.15 per additional sq ft.',
    basePrice: 250
  },
  {
    id: 'commercial',
    title: 'Commercial Exterior Cleaning Kingston',
    shortDesc: 'Multi-unit residential, retail storefronts, corporate facades, and industrial facility exterior maintenance.',
    description: 'A spotless exterior is crucial for welcoming customers and preserving property equity. Dust B Gone provides professional commercial exterior cleaning in Kingston and surrounding Eastern Ontario areas. We clean multi-story office facades, public walkways, retail storefront glass, multi-unit townhomes, parking curbs, and commercial spaces. Our fully trained, safety-certified crew uses top-tier water-fed pure water poles, high-reach safety rigging, and hot water surface spinners designed for fast, streak-free restoration.',
    image: commercialHotWash,
    icon: 'Building',
    highlights: [
      'Customized property service schedules designed around business hours',
      'Fully safety-certified technicians and $2M liability insurance',
      'Pristine retail window washing, facade cleaning, and walkway pressure washing',
      'Full post-project compliance reports and detailed photo audits for property managers'
    ],
    features: [
      { title: 'Business Hour Flex', desc: 'We clean early mornings, late nights, or weekends to minimize client disruption.' },
      { title: 'Safety Compliance', desc: 'Technicians are trained in fall arrest, ladder safety, and operate under strict guidelines.' },
      { title: 'Surface Restoration', desc: 'Hot-water pressure blasting for high-traffic paths to extract gum, oil, and grease.' }
    ],
    process: [
      { step: 1, title: 'Site Inspection & Safety', desc: 'We perform a detailed site risk assessment, establish pedestrian safety barriers, and map water inlets.' },
      { step: 2, title: 'Deep Grime Pre-Treatment', desc: 'We pre-treat high-traffic walkways with oil-eating enzymes and organic sanitizers.' },
      { step: 3, title: 'High-Reach Exterior Agitation', desc: 'We scrub storefront windows and wash upper facades up to 4 stories high safely.' },
      { step: 4, title: 'Pristine Rinse & Polish', desc: 'We complete a final pure water rinse of all glass and pressure rinse paths to clear all residues.' }
    ],
    pricingBasis: '$350 base rate (covers up to 2000 sq ft), then $0.20 per additional sq ft.',
    basePrice: 350
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
