import { GuestModel, LandingState } from '../../../landing,model';

export const LANDING_FEATURE_KEY = 'landingBoda';

export const initialLandingState: LandingState = {
  guest: false,
  isLoading: false,
  isError: false,
  isMessage: 0,
};
