import { GuestModel, LandingState } from '../../../landing,model';

export const LANDING_FEATURE_KEY = 'landingBoda';

export const initialLandingState: LandingState = {
  guest: {
    id_guest: 0,
    full_name: '',
    email: '',
    phone: null,
    guest_code: '',
    event_type: 0,
    guest_type: 0,
    guest_note: '',
    guest_extras: [],
    photo: '',
    title: '',
    confirmation: 0,
    event_details: {
      id_event: 0,
      event_address: 0,
      event_date: new Date(),
      place: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      postal_code: 0,
      country: '',
      label: '',
      google_link: '',
    },
    accommodations: [],
  },
  isLoading: false,
  isError: false,
  isMessage: 0,
};
