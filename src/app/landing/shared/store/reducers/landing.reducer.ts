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
      isValidated: true,
      isLoading: false,
      isError: false,
    };
  }),
  on(LandingActions.getGuestFailure, (state: LandingState, { error }) => {
    return {
      ...state,
      isValidated: false,
      isLoading: false,
      isError: true,
    };
  }),
  on(LandingActions.cleanGuest, (state: LandingState) => {
    return {
      ...state,
      isValidated: false,
      ...initialLandingState,
    };
  }),
  on(LandingActions.setLoading, (state: LandingState) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(LandingActions.cleanLoading, (state: LandingState) => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(
    LandingActions.updateMessageFromVideo,
    (state: LandingState, { isMessage }) => {
      return {
        ...state,
        isMessage,
      };
    }
  ),
  on(LandingActions.updateGuestInformation, (state: LandingState, { data }) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    LandingActions.updateGuestInformationSuccess,
    (state: LandingState, { isConfirmed }) => {
      return {
        ...state,
        isConfirmed,
        isLoading: false,
        isError: false,
      };
    }
  ),
  on(
    LandingActions.updateGuestInformationFailure,
    (state: LandingState, { error }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
  ),
  on(
    LandingActions.getEventAccommodations,
    (state: LandingState, { id_event }) => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(
    LandingActions.getEventAccommodationsSuccess,
    (state: LandingState, { accommodations }) => {
      return {
        ...state,
        accommodations,
        isLoading: false,
        isError: false,
      };
    }
  ),
  on(
    LandingActions.getEventAccommodationsFailure,
    (state: LandingState, { error }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
  )
);
