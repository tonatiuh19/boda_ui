export const DOMAIN = 'http://localhost:8015/api';
//export const DOMAIN = 'https://garbrix.com/regalame/api';

export interface LandingState {
  guest?: GuestModel;
  isLoading?: boolean;
  isError?: boolean;
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
  guest_extras: number;
  confirmation: number;
  event_details: EventDetailsModel;
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
}