import { GuestModel, LandingState } from '../../../landing,model';

export const LANDING_FEATURE_KEY = 'landingBoda';

export const initialLandingState: LandingState = {
  guest: {} as GuestModel,
  isLoading: false,
  isError: false,
  isMessage: 0,
  isConfirmed: 0,
};
