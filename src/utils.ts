import { QuoteDetails, QuoteResult, ServicePriceBreakdown, ServiceId } from './types';

export const getInitialQuoteDetails = (): QuoteDetails => ({
  propertyType: 'residential',
  stories: 1,
  selectedServices: ['window'],
  windowCount: 10,
  pressureAreaSqFt: 800,
  dryerVentCount: 1,
  gutterLengthFt: 100,
  houseWashSqFt: 1500,
  commercialAreaSqFt: 2000,
  ecoFriendlySoap: false,
  debrisDisposal: false,
  screenCleaning: false,
  gutterGuards: false
});

export function calculateQuote(input: QuoteDetails): QuoteResult {
  const {
    propertyType,
    stories,
    selectedServices,
    windowCount,
    pressureAreaSqFt,
    dryerVentCount,
    gutterLengthFt,
    houseWashSqFt,
    commercialAreaSqFt,
    ecoFriendlySoap,
    debrisDisposal,
    screenCleaning,
    gutterGuards
  } = input;

  const breakdown: ServicePriceBreakdown[] = [];
  let subtotal = 0;

  // Commercial jobs have a 25% premium due to higher insurance, safety gear, and administrative overhead
  const propertyMultiplier = propertyType === 'commercial' ? 1.25 : 1.0;

  // 1. Window Washing
  if (selectedServices.includes('window')) {
    let cost = 150; // covers 10 windows
    const extraQty = Math.max(0, windowCount - 10);
    cost += extraQty * 8;

    // Apply high-reach stories premium
    if (stories >= 3) {
      cost *= 1.15; // 15% high reach premium
    }
    
    cost *= propertyMultiplier;
    
    breakdown.push({
      serviceId: 'window',
      name: 'Window Washing Service',
      qty: windowCount,
      unit: 'windows',
      cost: Math.round(cost * 100) / 100
    });
    subtotal += cost;
  }

  // 2. Pressure Washing
  if (selectedServices.includes('pressure')) {
    let cost = 200; // covers 800 sq ft
    const extraQty = Math.max(0, pressureAreaSqFt - 800);
    cost += extraQty * 0.25;

    // Stories premium (for cleaning tall facades)
    if (stories >= 2) {
      cost *= 1.10; // 10% elevation facade fee
    }

    cost *= propertyMultiplier;

    breakdown.push({
      serviceId: 'pressure',
      name: 'Power & Pressure Washing',
      qty: pressureAreaSqFt,
      unit: 'sq ft',
      cost: Math.round(cost * 100) / 100
    });
    subtotal += cost;
  }

  // 3. Dryer Vent Cleaning
  if (selectedServices.includes('dryer')) {
    // $120 flat per vent, 10% discount for multi-vents
    let cost = dryerVentCount * 120;
    if (dryerVentCount > 1) {
      cost *= 0.90; // 10% bulk discount on vents
    }
    cost *= propertyMultiplier;

    breakdown.push({
      serviceId: 'dryer',
      name: 'Dryer Vent Airway Cleaning',
      qty: dryerVentCount,
      unit: 'vents',
      cost: Math.round(cost * 100) / 100
    });
    subtotal += cost;
  }

  // 4. Gutter Clearing
  if (selectedServices.includes('gutter')) {
    let cost = 150; // covers up to 100 linear ft
    const extraQty = Math.max(0, gutterLengthFt - 100);
    cost += extraQty * 1.50;

    if (stories >= 3) {
      cost *= 1.15; // 15% high gutter safety fee
    }
    cost *= propertyMultiplier;

    breakdown.push({
      serviceId: 'gutter',
      name: 'Roof Gutter Vacuum & Hand Clearing',
      qty: gutterLengthFt,
      unit: 'linear ft',
      cost: Math.round(cost * 100) / 100
    });
    subtotal += cost;
  }

  // 5. House Washing (Siding Soft-Wash)
  if (selectedServices.includes('house-wash')) {
    const sqFt = houseWashSqFt || 1500;
    let cost = 250; // covers up to 1500 sq ft
    const extraQty = Math.max(0, sqFt - 1500);
    cost += extraQty * 0.15;

    if (stories >= 2) {
      cost *= 1.10; // 10% elevation surcharge
    }
    cost *= propertyMultiplier;

    breakdown.push({
      serviceId: 'house-wash',
      name: 'House Soft-Wash & Siding Restoration',
      qty: sqFt,
      unit: 'sq ft',
      cost: Math.round(cost * 100) / 100
    });
    subtotal += cost;
  }

  // 6. Commercial Exterior Cleaning
  if (selectedServices.includes('commercial')) {
    const sqFt = commercialAreaSqFt || 2000;
    let cost = 350; // covers up to 2000 sq ft
    const extraQty = Math.max(0, sqFt - 2000);
    cost += extraQty * 0.20;

    if (stories >= 3) {
      cost *= 1.15; // 15% safety / high access charge
    }
    cost *= propertyMultiplier;

    breakdown.push({
      serviceId: 'commercial',
      name: 'Commercial Facade & Property Maintenance',
      qty: sqFt,
      unit: 'sq ft',
      cost: Math.round(cost * 100) / 100
    });
    subtotal += cost;
  }

  // Calculate Addons
  let addonsCost = 0;
  if (ecoFriendlySoap) addonsCost += 29;
  if (debrisDisposal) addonsCost += 19;
  if (screenCleaning && selectedServices.includes('window')) addonsCost += 39;
  if (gutterGuards && selectedServices.includes('gutter')) addonsCost += 49;

  // Multi-service Bundle Discount percentages
  let discountPct = 0;
  const activeServiceCount = selectedServices.length;
  if (activeServiceCount === 2) {
    discountPct = 0.10; // 10% off
  } else if (activeServiceCount === 3) {
    discountPct = 0.15; // 15% off
  } else if (activeServiceCount >= 4) {
    discountPct = 0.20; // 20% off
  }

  const bundleDiscount = subtotal * discountPct;
  const subtotalAfterDiscount = subtotal - bundleDiscount;
  
  // Tax rate of 5%
  const tax = (subtotalAfterDiscount + addonsCost) * 0.05;
  const total = subtotalAfterDiscount + addonsCost + tax;

  return {
    breakdown,
    addonsCost,
    subtotal: Math.round(subtotal * 100) / 100,
    bundleDiscount: Math.round(bundleDiscount * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100
  };
}

export function generateReferenceId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let refId = 'DBG-';
  for (let i = 0; i < 6; i++) {
    refId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return refId;
}
