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
  on(LandingActions.getGuest, (state: LandingState, { guest_code }) => {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  }),
  on(LandingActions.getGuestSuccess, (state: LandingState, { guest }) => {
    return {
      ...state,
      guest,
      session: false,
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
      isError: false,
    };
  }),
  on(
    LandingActions.updateGuestInformationSuccess,
    (state: LandingState, { guest }) => {
      return {
        ...state,
        guest,
        isValidated: true,
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
        isValidated: false,
        isLoading: false,
        isError: true,
      };
    }
  ),
  on(LandingActions.getImagesVideosFromServer, (state: LandingState, {}) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    LandingActions.getImagesVideosFromServerSuccess,
    (state: LandingState, { data }) => {
      return {
        ...state,
        landingMedia: data,
        isLoading: false,
        isError: false,
      };
    }
  ),
  on(
    LandingActions.getImagesVideosFromServerFailure,
    (state: LandingState, { error }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
  ),
  on(LandingActions.getAllGuests, (state: LandingState, {}) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(LandingActions.getAllGuestsSuccess, (state: LandingState, { guests }) => {
    return {
      ...state,
      guests,
      isLoading: false,
      isError: false,
    };
  }),
  on(LandingActions.getAllGuestsFailure, (state: LandingState, { error }) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }),
  on(LandingActions.validateWeddingPlanner, (state: LandingState, {}) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    LandingActions.validateWeddingPlannerSuccess,
    (state: LandingState, { response }) => {
      return {
        ...state,
        weddingPlanner: typeof response === 'boolean' ? undefined : response,
        isLoading: false,
        isError: false,
      };
    }
  ),
  on(
    LandingActions.validateWeddingPlannerFailure,
    (state: LandingState, { error }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
  ),
  on(LandingActions.resetWeddingPlanner, (state: LandingState) => {
    return {
      ...state,
      weddingPlanner: undefined,
    };
  }),
  on(LandingActions.checkSession, (state: LandingState) => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(LandingActions.checkSessionSuccess, (state: LandingState, { resp }) => {
    return {
      ...state,
      session: resp,
      isLoading: false,
      isError: false,
    };
  }),
  on(LandingActions.checkSessionFailure, (state: LandingState, { error }) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  })
);
