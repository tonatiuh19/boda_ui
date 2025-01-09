//export const DOMAIN = 'http://localhost:8015/api';
export const DOMAIN = 'https://garbrix.com/boda/api';

export interface LandingState {
  guest: GuestModel;
  landingMedia?: LandingMediaModel;
  isValidated?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isMessage?: number;
}

export interface GuestModel {
  id_guest: number;
  full_name: string;
  email: string;
  phone: null;
  guest_code: string;
  event_type: number;
  guest_type: number;
  guest_note: string;
  photo: string;
  title: string;
  guest_extras: GuestExtra[];
  confirmation: number;
  event_details: EventDetailsModel;
  accommodations: EventAccommodationsModel[];
}

export interface EventDetailsModel {
  id_event: number;
  event_address: number;
  event_date: Date;
  place: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: number;
  country: string;
  label: string;
  google_link: string;
}

export interface EventAccommodationsModel {
  id_event_accomodations_suggestions: number;
  title: string;
  address_link: string;
  promo_code: string;
}

export interface LandingMediaModel {
  mainSection: DataImagesVideosModel[];
  secondarySection: DataImagesVideosModel[];
  startTime: string;
  civilMarriage: string;
  religiuosMarriage: string;
  ladieBachelorTrip: string;
  manBachelorTrip: string;
  mixBachelorTrip: string;
}

export interface DataImagesVideosModel {
  name: string;
  path: string;
}

export interface GuestExtra {
  id_guest_extra: number;
  full_name: string;
  email: string;
  phone: null;
  confirmation: number;
}
