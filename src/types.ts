export type ServiceId = 'window' | 'pressure' | 'dryer' | 'gutter' | 'house-wash' | 'commercial';

export interface CleaningService {
  id: ServiceId;
  title: string;
  shortDesc: string;
  description: string;
  image: string;
  icon: string; // lucide icon name
  highlights: string[];
  features: { title: string; desc: string }[];
  process: { step: number; title: string; desc: string }[];
  pricingBasis: string;
  basePrice: number;
}

export type PropertyType = 'residential' | 'commercial';

export interface QuoteDetails {
  propertyType: PropertyType;
  stories: number;
  selectedServices: ServiceId[];
  
  // Service specific metrics
  windowCount: number;
  pressureAreaSqFt: number;
  dryerVentCount: number;
  gutterLengthFt: number;
  houseWashSqFt: number;
  commercialAreaSqFt: number;
  
  // Add-ons
  ecoFriendlySoap: boolean;
  debrisDisposal: boolean;
  screenCleaning: boolean;
  gutterGuards: boolean;
}

export interface ServicePriceBreakdown {
  serviceId: ServiceId;
  name: string;
  qty: number;
  unit: string;
  cost: number;
}

export interface QuoteResult {
  breakdown: ServicePriceBreakdown[];
  addonsCost: number;
  subtotal: number;
  bundleDiscount: number; // e.g. 10% off for 2 services, 15% for 3+
  tax: number;
  total: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  address: string;
  propertyType: PropertyType;
  services: ServiceId[];
  quote: QuoteResult;
  bookingDate: string;
  timeSlot: string;
  specialInstructions?: string;
  status: BookingStatus;
  createdAt: string;
}
