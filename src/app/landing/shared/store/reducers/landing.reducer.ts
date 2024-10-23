import { Action, createReducer, on } from '@ngrx/store';
import {
  initialLandingState,
  LANDING_FEATURE_KEY,
} from '../states/landing.state';
import { LandingActions } from '../actions';
import { createRehydrateReducer } from '../../../../shared/utils/rehydrate-reducer';
import { LandingState } from '../../../landing,model';
export const LandingReducer = createRehydrateReducer(
  { key: LANDING_FEATURE_KEY },
  initialLandingState,
  on(
    LandingActions.getGuest,
    (state: LandingState, { guest_code, event_type }) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
  ),
  on(LandingActions.getGuestSuccess, (state: LandingState, { guest }) => {
    return {
      ...state,
      guest,
      isLoading: false,
      isError: false,
    };
  }),
  on(LandingActions.getGuestFailure, (state: LandingState, { error }) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  })
);
